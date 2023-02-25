import React from 'react';
import { render, screen } from '@testing-library/react';

import { Formik } from 'formik';
import renderWithTheme from '__tests__/helpers/renderWithTheme';
import userEvent from '@testing-library/user-event';

import { fields } from '../../../fields';
import IntegerFields from './IntegerFields';

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

describe('IntegerFields', () => {
  test('should open field on check switch', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      renderWithTheme(
        <Formik
          enableReinitialize
          initialValues={{ [fields.checkedUnit]: false }}
          onSubmit={() => {}}
        >
          <IntegerFields />
        </Formik>,
      ),
    );
    const openUnitsSwitch = screen.getByRole('switch');

    // Act
    await user.click(openUnitsSwitch);
    const integerInput = screen.getByTestId('units-field');

    // Assert
    expect(integerInput).toBeVisible();
  });
});
