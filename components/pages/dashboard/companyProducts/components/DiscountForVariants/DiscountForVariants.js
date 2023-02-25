import React from 'react';
import { FieldArray, ErrorMessage } from 'formik';

import { WEEKLY_DISCOUNTS, PERIOD_DISCOUNTS } from 'config/constants/discount';
import VariantsInfoTable from '../VariantsInfoTable';
import DiscountForVariantsRow from './DiscountForVariantsRow';

import {
  getFieldsWeeklyDiscounts,
  getFieldsPeriodDiscounts,
} from '../CreateProductDiscounts/fields';

import { DiscountsWrapper, Row, Col, Title, TableWeeklyDiscounts, ErrorWrapper } from './styled';

const tables = [
  {
    name: WEEKLY_DISCOUNTS,
    title: 'Настройте скидку на товары в определенные дни недели',
    width: 53,
    colWidth: 191,
    fields: getFieldsWeeklyDiscounts(),
  },
  {
    name: PERIOD_DISCOUNTS,
    title: 'Настройте скидку на товары в период',
    width: 45,
    colWidth: 158,
    fields: getFieldsPeriodDiscounts(),
  },
];

const DiscountForVariants = ({ variants, values, setFieldValue, readOnly }) => (
  <div>
    {tables.map(({ name, title, width, colWidth, fields }, index) => {
      return (
        <DiscountsWrapper key={index}>
          <FieldArray name={name}>
            {() => (
              <>
                <Title>{title}</Title>
                <Row>
                  <Col width={width}>
                    <VariantsInfoTable variants={variants} colWidth={colWidth} cols={2} />
                  </Col>
                  <Col width={96 - width}>
                    <TableWeeklyDiscounts>
                      <tbody>
                        <tr>
                          {fields.map(({ title: colTitle }, i) => (
                            <td key={i}>{colTitle}</td>
                          ))}
                        </tr>
                        {variants.map((_, i) => (
                          <DiscountForVariantsRow
                            key={i}
                            fields={fields}
                            nameDiscount={name}
                            values={values}
                            setFieldValue={setFieldValue}
                            index={i}
                            readOnly={readOnly}
                          />
                        ))}
                      </tbody>
                    </TableWeeklyDiscounts>
                    <ErrorMessage name={`variants_${name}`}>
                      {msg => <ErrorWrapper>{msg}</ErrorWrapper>}
                    </ErrorMessage>
                  </Col>
                </Row>
              </>
            )}
          </FieldArray>
        </DiscountsWrapper>
      );
    })}
  </div>
);

export default DiscountForVariants;
