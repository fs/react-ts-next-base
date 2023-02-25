import React from 'react';
import head from 'lodash/head';
import useRouter from 'hooks/useRouter';
import { useModal } from '@ebay/nice-modal-react';
import { Formik, Form as FormikForm } from 'formik';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';
import { useCustomerProducts } from 'lib/apollo/hooks/state/customerProducts';
import { useConfirmProduct, useRejectProduct } from 'lib/apollo/hooks/actions/product';

import { ADMIN_PRODUCTS } from 'config/routes';
import { NOT_VERIFIED, REJECTED } from 'config/constants/status';
import { courierServices } from 'config/constants/createProductDelivery';

import ErrorPage from 'pages/_error';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import Loader from 'components/shared/atoms/Loader';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';
import EmptyMessage from 'components/shared/molecules/EmptyMessage';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';
import AdminTemplate from 'components/shared/templates/AdminTemplate';

import { TABS_CONFIG } from 'components/pages/admin/addresses/AdminAddressesPage';

import MainInfo from './components/MainInfo';
import Variant from './components/Variant';
import Delivery from './components/Delivery';
import Comment from './components/Comment';

import { SectionH4, SectionTitle } from './components/styled';
import { Header, ContentWrapper, ActionsWrapper } from './styled';

const flattenCategory = ({ id, name, depth, parent }) => {
  const category = { id, name, depth };
  if (!parent) {
    return [category];
  }
  return [...flattenCategory(parent), category];
};

const getCourierService = ({ sdekCourierAllowed, dellinCourierAllowed }) => {
  if (sdekCourierAllowed && dellinCourierAllowed) {
    return courierServices.ANY_SERVICE;
  }
  if (!sdekCourierAllowed) {
    return courierServices.NO_SDEK;
  }
  if (!dellinCourierAllowed) {
    return courierServices.NO_DELLIN;
  }
  return null;
};

const ActionsSection = ({ productId, productName }) => {
  const { pushRoute } = useRouter();
  const onConfirm = () => pushRoute(ADMIN_PRODUCTS);

  const [rejectProduct] = useRejectProduct({ productName, onConfirm });
  const [confirmProduct] = useConfirmProduct({ productName, onConfirm });
  const confirmProductModal = useModal(SimpleModal);
  const rejectProductModal = useModal(SimpleModal);

  const showConfirm = () =>
    confirmProductModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await confirmProduct({ productId });
      },
      title: 'Добавление товара',
      description:
        'Нажимая “Подтвердить”, вы соглашаетесь с тем, что все поля заполнены верно и товар добавляется в каталог на сайте',
    });

  const showRequestChange = async values => {
    rejectProductModal.show({
      variant: 'change',
      roundedButton: true,
      onSubmit: async () => {
        await rejectProduct({ productId, rejectionMessage: values.comment });
      },
      title: 'Запросить изменения',
      description:
        'Нажимая “Подтвердить”, вы отправляете уведомление пользователю о том, что он должен отредактировать данные',
    });
  };

  return (
    <>
      <ActionsWrapper>
        <Button label="Подтвердить товар" variant="confirm" shape="rounded" onClick={showConfirm} />
      </ActionsWrapper>
      <SectionH4>Если вы обнаружили ошибку в заполненном товаре оставьте комментарий</SectionH4>
      <SectionTitle>Опишите то, что заполнено не верно</SectionTitle>
      <Formik initialValues={{ comment: '' }} onSubmit={showRequestChange}>
        {() => (
          <FormikForm>
            <Input
              type="textarea"
              as="textarea"
              name="comment"
              placeholder="Впишите комментарий..."
            />
            <ActionsWrapper>
              <Button type="submit" label="Запросить изменения" variant="change" shape="rounded" />
            </ActionsWrapper>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

const Product = ({ loading, product, productId }) => {
  if (loading) {
    return <Loader testId="admin-confirm-product-page-loader" />;
  }
  if (!product) {
    return (
      <EmptyMessage title="Ой!" description={`Cтраница не доступна для товара №${productId}`} />
    );
  }

  const {
    id,
    category,
    condition,
    name,
    manufacturer,
    country,
    description,
    variants,
    wholesaleLot,
    shipmentMethod,
    deliveryCondition,
    dellinCourierAllowed,
    sdekCourierAllowed,
    companyLocation,
    disablePickup,
    productFreeDeliveries,
    productPaidDeliveries,
    vat,
    status,
    rejectionMessage,
  } = product;

  const categories = flattenCategory(category);
  const courierService = getCourierService({ sdekCourierAllowed, dellinCourierAllowed });

  return (
    <>
      <MainInfo
        categories={categories}
        name={name}
        manufacturer={manufacturer}
        condition={condition}
        countryName={country?.name}
        description={description}
        vat={vat}
      />
      <Variant
        variants={variants}
        wholesaleLot={wholesaleLot}
        shipmentMethod={shipmentMethod}
        courierService={courierService}
        productDeliveryCondition={deliveryCondition}
      />
      <Delivery
        address={companyLocation?.address}
        disablePickup={disablePickup}
        productFreeDeliveries={productFreeDeliveries}
        productPaidDeliveries={productPaidDeliveries}
      />
      {status === NOT_VERIFIED && <ActionsSection productId={id} productName={name} />}
      {status === REJECTED && <Comment rejectionMessage={rejectionMessage} />}
    </>
  );
};

const TABS = {
  [NOT_VERIFIED]: TABS_CONFIG.NEW,
  [REJECTED]: TABS_CONFIG.REJECTED,
};

const AdminConfirmProductPage = ({ query }) => {
  const { productId } = query;

  const { customerProducts, loading, error } = useCustomerProducts({
    productIds: [productId],
    deleted: false,
    draft: false,
    template: false,
    statuses: [NOT_VERIFIED, REJECTED],
  });

  if (!loading && error) return <ErrorPage statusCode={404} />;
  const product = head(customerProducts);

  return (
    <AdminTemplate>
      <Header>
        <Breadcrumbs
          url={ADMIN_PRODUCTS}
          params={{ tab: TABS[product?.status] }}
          text="Вернуться ко всем товарам"
          back
        />
      </Header>
      <ContentWrapper>
        <Product loading={loading} product={product} productId={productId} />
      </ContentWrapper>
    </AdminTemplate>
  );
};

export default withGetDataFromTree(
  withAuth(withAuthSecurity(withRoutesRules(AdminConfirmProductPage))),
);
