import React, { useState, useEffect } from 'react';

import { Formik, Form as FormikForm } from 'formik';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withRoutesRules from 'lib/roles/withRoutesRules';

import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';
import { useCompanies } from 'lib/apollo/hooks/state/companies';
import { useCompanyRatingHistory } from 'lib/apollo/hooks/state/companyRatingHistory';

import { getStatus, VERIFIED } from 'config/constants/status';

import Rating from 'components/shared/atoms/Rating';
import ReviewsChart from 'components/shared/atoms/ReviewsChart';
import SelectField from 'components/shared/atoms/Selects/SelectField';
import EmptyMessageCheckingCompany from 'components/shared/molecules/EmptyMessageCheckingCompany';
import CompanyTemplate from 'components/shared/templates/CompanyTemplate';
import ErrorPage from 'pages/_error';

import {
  Wrapper,
  ChartWrapper,
  RatingPageTitle,
  SyllableCountText,
  BoldText,
  Text,
  Line,
  RatingWrapper,
  InfoWrapper,
  TextWrapper,
  SelectWrapper,
} from './styled';

export const CompanyRatingPage = ({ query }) => {
  const { companyId } = query;
  const [selectedCompanyId, setSelectedCompanyId] = useState(companyId);
  const [chart, setChart] = useState([]);

  const { myCompanies, loading } = useMyCompanies({ companyIds: [companyId] });
  const [company] = myCompanies;
  const { companyRatingHistory, loading: ratingHistoryLoading } = useCompanyRatingHistory({
    companyId: selectedCompanyId,
  });

  const { companies } = useCompanies({ statuses: [VERIFIED] });

  const companiesList = companies
    ?.map(({ officialName, id }) => ({
      value: id,
      label: officialName,
    }))
    ?.filter(companyItem => companyItem.value !== companyId);
  const isCompanyVerified = getStatus(company?.status);

  if (!company && !loading) return <ErrorPage statusCode={404} />;

  const field = {
    name: 'company',
    type: 'select',
    options: companiesList,
  };

  const initialValue = {
    company: '',
  };

  const onSubmit = () => {};

  const deleteLastCompanyChart = () => {
    setChart(chart.splice(0, 1));
  };

  const replaceLastCompanyChart = () => {
    setChart([chart[0], companyRatingHistory]);
  };

  const handleCompanySelection = compId => {
    if (compId) {
      setSelectedCompanyId(compId);
    } else {
      deleteLastCompanyChart();
      setSelectedCompanyId(companyId);
    }
  };

  useEffect(() => {
    if (ratingHistoryLoading) return;

    switch (true) {
      case chart?.length < 2:
        setChart(
          selectedCompanyId === companyId
            ? [companyRatingHistory]
            : [...chart, companyRatingHistory],
        );
        break;
      case chart?.length === 2:
        replaceLastCompanyChart();
        break;
      default:
        deleteLastCompanyChart();
        break;
    }
  }, [ratingHistoryLoading]);

  return (
    <CompanyTemplate testId="company-rating-page" company={company}>
      {isCompanyVerified ? (
        <Wrapper>
          <RatingPageTitle>Рейтинг</RatingPageTitle>
          <Text>
            Здесь отображается рейтинг вашей компании. Рейтинг формируется из средней суммы оценок
            поставленных вам Продавцами. Голосовать как за вас, так и вам, можно за одну сделку один
            раз.
          </Text>
          <Line />
          <InfoWrapper>
            <RatingWrapper>
              <BoldText>Рейтинг вашей компании:</BoldText>
              <Rating rating={company?.rating ?? 0} />
            </RatingWrapper>
            <TextWrapper>
              <BoldText>Вас оценили:</BoldText>
              <SyllableCountText>
                {company?.sellableProductsCount ?? 0} покупателей
              </SyllableCountText>
            </TextWrapper>
          </InfoWrapper>
          <Text>Вы можете сравнить рейтинги ваших компаний.</Text>
          <Formik initialValues={initialValue} onSubmit={onSubmit}>
            {() => (
              <FormikForm>
                <SelectWrapper>
                  <SelectField
                    name={field.name}
                    options={field.options}
                    onChange={target => handleCompanySelection(target?.value)}
                    isClearable
                    placeholder="Выберите с какой компанией сравнить"
                  />
                </SelectWrapper>
              </FormikForm>
            )}
          </Formik>
          <ChartWrapper>
            <ReviewsChart chart={chart} />
          </ChartWrapper>
          <Line />
        </Wrapper>
      ) : (
        <EmptyMessageCheckingCompany />
      )}
    </CompanyTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(withRoutesRules(CompanyRatingPage))));
