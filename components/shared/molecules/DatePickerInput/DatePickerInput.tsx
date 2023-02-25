import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import ru from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-datepicker/dist/react-datepicker.css';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import Checkbox from 'components/shared/atoms/Checkbox';

import { dateFormat } from 'helpers';

import { TDatePickerInput } from './types';
import { borderConfig, sizeConfig } from './config';

import {
  DatePickerWrapper,
  DatePickerField,
  DatePickerTooltip,
  ClearButton,
  ActionWrapper,
  CheckboxWrapper,
  ErrorWrapper,
} from './styled';

const DatePickerInput: React.FunctionComponent<React.PropsWithChildren<TDatePickerInput>> = ({
  variant = 'default',
  size = 'medium',
  $width = 'auto',
  name = 'date-picker',
  placeholder = '',
  checkbox = '',
  error,
  disabled = false,
  currentDate,
  minDate = new Date(new Date().setDate(new Date().getDate() + 1)),
  maxDate,
  onSubmit = () => {},
  setFieldValue = () => {},
  clearable = true,
  offset = [188, -322],
  readOnly = false,
  ...props
}) => {
  const initialDate = currentDate || null;
  const value = useMemo(() => {
    if (initialDate) return dateFormat(initialDate.toString());
    if (currentDate === null) return checkbox;
    return null;
  }, [currentDate]);

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [checked, setChecked] = useState(currentDate === null);

  const { visible, setTriggerRef, setTooltipRef, getTooltipProps } = usePopperTooltip({
    trigger: 'click',
    offset,
    placement: 'right',
    visible: isOpen,
    onVisibleChange: readOnly ? () => {} : setIsOpen,
    closeOnTriggerHidden: true,
    interactive: true,
    delayHide: 200,
  });

  const onSubmitDate = () => {
    const submitDate = checked ? null : date ? new Date(date).toISOString() : null;
    onSubmit(submitDate);
    setFieldValue(name, submitDate);
    setIsOpen(false);
  };

  const onClearInput = () => {
    onSubmit(undefined);
    setFieldValue(name, undefined);
  };

  return (
    <DatePickerWrapper
      variant={variant}
      $width={$width}
      border={borderConfig[variant]}
      size={sizeConfig[size]}
      {...props}
    >
      <>
        <DatePickerField
          type="button"
          data-testid={name}
          data-cy={name}
          empty={!value}
          ref={setTriggerRef}
          disabled={disabled}
        >
          {value || placeholder}
        </DatePickerField>
        {visible &&
          createPortal(
            <DatePickerTooltip ref={setTooltipRef} {...getTooltipProps()}>
              <DatePicker
                selected={initialDate ? new Date(initialDate) : undefined}
                onChange={newDate => {
                  if (newDate) {
                    newDate.setTime(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
                    setDate(newDate.toISOString());
                    setChecked(false);
                  }
                }}
                dateFormat="dd.MM.yyyy"
                minDate={minDate}
                maxDate={maxDate}
                locale={ru}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                shouldCloseOnSelect={false}
                inline
              >
                <ActionWrapper>
                  {checkbox && (
                    <CheckboxWrapper>
                      <Checkbox
                        name="no-date"
                        label={checkbox}
                        onChange={setChecked}
                        checked={checked}
                      />
                    </CheckboxWrapper>
                  )}
                  <Button
                    label="Применить"
                    testId="datepicker-button-submit"
                    onClick={onSubmitDate}
                    disabled={!checked && !date}
                    $mt={16}
                  />
                </ActionWrapper>
              </DatePicker>
            </DatePickerTooltip>,
            document.body,
          )}

        {!readOnly && (
          <ClearButton>
            <Button
              variant="hollow"
              iconType="only"
              size="small"
              icon={
                <Icon name={clearable && value ? 'close' : 'calendar'} $size={16} $color="greyCC" />
              }
              onClick={clearable && value ? onClearInput : () => setIsOpen(true)}
              disabled={disabled}
            />
          </ClearButton>
        )}

        {error && (
          <ErrorWrapper>
            <>{error}</>
          </ErrorWrapper>
        )}
      </>
    </DatePickerWrapper>
  );
};

export default DatePickerInput;
