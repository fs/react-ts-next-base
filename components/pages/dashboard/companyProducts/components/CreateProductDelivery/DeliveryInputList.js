import React from 'react';

import Radio from 'components/shared/atoms/Radio';
import Input from 'components/shared/atoms/Input';
import SelectField from 'components/shared/atoms/Selects/SelectField';
// TODO: временно убрали упаковку товара https://www.pivotaltracker.com/n/projects/2496414/stories/181805681
// import { ErrorMessage } from 'formik';
// import Checkbox from 'components/shared/atoms/Checkbox';
import HazardClassesModal from '../HazardClassesModal';
import hazardClasses from '../HazardClassesModal/hazardClasses';

import {
  Subtitle,
  DescriptionInsurance,
  FieldWrapper,
  AriaWrapper,
  HazardClassesWrapper,
  // PackagingWrapper, ErrorWrapper, // TODO: временно убрали упаковку товара https://www.pivotaltracker.com/n/projects/2496414/stories/181805681
  CommentWrapper,
} from './styled';

const DeliveryInputList = ({ externalHelpers, variantIndex, readOnly = false }) => {
  const { setFieldValue, values } = externalHelpers;

  const isVariantSetup = variantIndex !== undefined;

  // TODO: временно убрали упаковку товара https://www.pivotaltracker.com/n/projects/2496414/stories/181805681
  // const [packagingWooden, setPackagingWooden] = useState(false);
  // const [packagingCardboard, setPackagingCardboard] = useState(false);

  const hazardClassOptions = hazardClasses
    .map(item => item.list)
    .flat()
    .map(({ id }) => ({ value: id, label: id }));

  const insuranceRequiredOptions = [
    { label: 'да', value: true },
    { label: 'нет', value: false },
  ];

  // here we can get template fields for form blocks
  const getFields = currentIndex => {
    const variantPrefix = currentIndex >= 0 ? `variants.${currentIndex}.` : '';

    return {
      hazardClassFields: {
        title: 'Класс опасности',
        fields: [
          {
            name: `${variantPrefix}hazardClass`,
            type: 'select',
            options: hazardClassOptions,
            placeholder: '1.0',
            width: {
              min: '9rem',
            },
          },
        ],
      },
      insuranceRequiredFields: {
        title: 'Температурный режим при перевозке',
        subtitle: 'Страховка груза',
        type: 'radio',
        name: `${variantPrefix}insuranceRequired`,
        options: insuranceRequiredOptions,
        direction: 'row',
      },
      /* TODO: временно убрали упаковку товара https://www.pivotaltracker.com/n/projects/2496414/stories/181805681 */
      // productPackagingFields: {
      //   title: 'Как упаковать товар',
      //   fields: [
      //     {
      //       label: 'Картонные коробки',
      //       type: 'checkbox',
      //       name: `${variantPrefix}packaging`,
      //       initialValue: false,
      //       value: 'carboard',
      //       checked: packagingCardboard,
      //       onChange: setPackagingCardboard,
      //     },
      //     {
      //       label: 'Деревянная обрешетка',
      //       type: 'checkbox',
      //       name: `${variantPrefix}packaging`,
      //       initialValue: false,
      //       value: 'wooden',
      //       checked: packagingWooden,
      //       onChange: setPackagingWooden,
      //     },
      //   ],
      // },
      commentField: {
        type: 'textarea',
        name: `${variantPrefix}comment`,
        placeholder: 'Напишите комментарий если нужно еще что-то учесть ',
      },
    };
  };

  const {
    hazardClassFields,
    insuranceRequiredFields,
    // productPackagingFields,
    commentField,
  } = getFields(variantIndex);

  return (
    <>
      {hazardClassFields.fields.map(({ name, options, placeholder, width }, i) => {
        return (
          <div key={i}>
            <Subtitle>{hazardClassFields.title}</Subtitle>
            <AriaWrapper>
              <FieldWrapper minWidth={width.min}>
                <SelectField
                  readOnly={readOnly}
                  name={name}
                  options={options}
                  placeholder={placeholder}
                />
              </FieldWrapper>
              <HazardClassesWrapper>
                <HazardClassesModal />
              </HazardClassesWrapper>
            </AriaWrapper>
          </div>
        );
      })}

      <Subtitle>{insuranceRequiredFields.subtitle}</Subtitle>
      <DescriptionInsurance>
        Производится транспортными логистическими компаниями
      </DescriptionInsurance>
      <FieldWrapper>
        <Radio
          readOnly={readOnly}
          options={insuranceRequiredFields.options}
          name={insuranceRequiredFields.name}
          direction={insuranceRequiredFields.direction}
          setFieldValue={setFieldValue}
          selected={
            isVariantSetup
              ? values.variants[variantIndex]?.insuranceRequired
              : values[insuranceRequiredFields.name]
          }
        />
      </FieldWrapper>
      {/* TODO: временно убрали упаковку товара https://www.pivotaltracker.com/n/projects/2496414/stories/181805681 */}
      {/* <Subtitle>{productPackagingFields?.title}</Subtitle> */}
      {/* <PackagingWrapper> */}
      {/*  {productPackagingFields?.fields?.map(({ name, label, value, onChange, checked }, i) => { */}
      {/*    return ( */}
      {/*      <FieldWrapper key={i}> */}
      {/* <Checkbox name={name} label={label} onChange={onChange} value={value} checked={checked} /> */}
      {/*      </FieldWrapper> */}
      {/*    ); */}
      {/*  })} */}
      {/* </PackagingWrapper> */}
      {/* <ErrorMessage name={productPackagingFields.fields[0].name} render={msg => <ErrorWrapper>{msg}</ErrorWrapper>} /> */}

      <CommentWrapper>
        <FieldWrapper>
          <Input
            readOnly={readOnly}
            type={commentField.type}
            name={commentField.name}
            testId={commentField.name}
            placeholder={commentField.placeholder}
          />
        </FieldWrapper>
      </CommentWrapper>
    </>
  );
};

export default DeliveryInputList;
