import React from 'react';
import { ErrorMessage, useField } from 'formik';
import head from 'lodash/head';

import NumberInput from 'components/shared/atoms/NumberInput';

import { humanizeUnitKind } from 'helpers/suffix';
import VariantsInfoTable from '../VariantsInfoTable';

import {
  Title,
  DescriptionWrapper,
  Row,
  Col,
  TablePieceSale,
  TableWholeSale,
  ErrorWrapper,
} from './styled';

const PIECESALE = 'piecesale';

const tablePieceSale = (index, setFieldValue, unitKind) => [
  {
    name: `variants.${index}.price`,
    suffix: ' руб.',
    placeholder: 'руб.',
    onChange: value => {
      setFieldValue(`variants.${index}.price`, value);
      setFieldValue(`variants.${index}.wholesalePrice`, '');
    },
    decimalScale: 2,
  },
  {
    name: `variants.${index}.stock`,
    suffix: ` ${humanizeUnitKind(unitKind)}`,
    placeholder: humanizeUnitKind(unitKind),
  },
  {
    name: `variants.${index}.minShipmentLot`,
    suffix: ` ${humanizeUnitKind(unitKind)}`,
    placeholder: humanizeUnitKind(unitKind),
  },
];

const PricesTable = ({ table, variants, values, setFieldValue, readOnly }) => {
  const { name: nameTable, title, description, descriptionPrice, colWidth } = table;
  const [, , { setTouched }] = useField('wholesaleLot');

  const onBlurWholesalePrice = () => setTouched(true);

  return (
    <>
      <Title>{title}</Title>
      <DescriptionWrapper wholesale={descriptionPrice}>
        <div>{description}</div>
        {descriptionPrice && <div>{descriptionPrice}</div>}
      </DescriptionWrapper>
      <Row>
        <Col width={colWidth * 2 + 53}>
          <VariantsInfoTable variants={variants} colWidth={colWidth} cols={2} />
        </Col>
        <Col>
          {nameTable === PIECESALE ? (
            <>
              <TablePieceSale>
                <tbody>
                  <tr>
                    <td>Цена, руб.</td>
                    <td>Кол-во товара на руках</td>
                    <td>Мин. партия отгрузки</td>
                  </tr>
                  {variants.map(({ unitKind }, i) => {
                    return (
                      <tr key={i}>
                        {tablePieceSale(i, setFieldValue, unitKind).map(
                          ({ name, placeholder, suffix, onChange, decimalScale }, index) => (
                            <td key={index}>
                              <NumberInput
                                readOnly={readOnly}
                                name={name}
                                testId={name}
                                placeholder={placeholder}
                                suffix={suffix}
                                onChange={onChange}
                                variant="table_cell"
                                decimalScale={decimalScale}
                              />
                            </td>
                          ),
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </TablePieceSale>
              <ErrorMessage name="variants">
                {msg => <ErrorWrapper>{msg}</ErrorWrapper>}
              </ErrorMessage>
            </>
          ) : (
            <>
              <TableWholeSale>
                <tbody>
                  <tr>
                    <td>
                      <span>Цена: от </span>
                      <NumberInput
                        name="wholesaleLot"
                        testId="wholesaleLot"
                        suffix={` ${humanizeUnitKind(head(variants)?.unitKind)}`}
                        placeholder={humanizeUnitKind(head(variants)?.unitKind)}
                        variant="table_cell"
                        readOnly={readOnly}
                      />
                    </td>
                  </tr>
                  {variants.map((_, i) => {
                    const fieldName = `variants.${i}.wholesalePrice`;
                    return (
                      <tr key={i}>
                        <td>
                          <NumberInput
                            name={fieldName}
                            testId={fieldName}
                            placeholder="руб."
                            suffix=" руб."
                            variant="table_cell"
                            onBlur={onBlurWholesalePrice}
                            decimalScale={2}
                            readOnly={readOnly}
                            onChange={value =>
                              setFieldValue(
                                fieldName,
                                value > values.variants[i].price ? values.variants[i].price : value,
                              )
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </TableWholeSale>
              <ErrorMessage name="wholesaleLot">
                {msg => <ErrorWrapper>{msg}</ErrorWrapper>}
              </ErrorMessage>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default PricesTable;
