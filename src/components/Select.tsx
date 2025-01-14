import * as React from 'react';

import { Dropdown, DropdownProps } from 'components/Dropdown';
import { Input, InputProps } from 'components/Input';

export type SelectAllowedValueType =
  | string
  | number
  | boolean
  | null
  | undefined;

export type SelectOption<Value extends SelectAllowedValueType> = {
  value: Value;
  title: string;
  id?: string | number;
};

export type SelectProps<Value extends SelectAllowedValueType> = {
  value: Value;
  options: SelectOption<Value>[];
  loading?: boolean;
  disabled?: boolean;
  notFoundContent?: React.ReactNode;
  label?: string;
  minWidth?: number;
  placement?: DropdownProps['placement'];
  onOpen?: DropdownProps['onOpen'];
  onChange: (newValue?: Value) => void;
  onChangeInput?: InputProps['onChange'];
};

export const Select = <Value extends SelectAllowedValueType>({
  value,
  onChange,
  options,
  label,
  minWidth,
  placement = 'bottom-start',
  onOpen,
  loading,
  disabled,
  notFoundContent,
  onChangeInput,
}: SelectProps<Value>) => {
  const selectedOption = React.useMemo(
    () => options.find(option => option.value === value),
    [options, value],
  );

  return (
    <Dropdown
      hideOnClick
      placement={placement}
      minWidth={minWidth}
      onOpen={onOpen}
      opened={disabled ? false : undefined}
      trigger={disabled ? 'manual' : undefined}
      renderContent={() =>
        loading ? (
          <div>Loading...</div>
        ) : (
          <div className='flex flex-col overflow-auto max-h-80'>
            {options.length
              ? options.map(option => (
                  <button
                    key={`${option.id ?? option.value}`}
                    type='button'
                    onClick={() => onChange(option.value)}
                    className={`flex p-3 text-sm text-white hover:bg-sky-800 focus:outline-none focus-visible:bg-sky-900 ${value === option.value ? 'bg-sky-700' : ''}`}
                  >
                    {option.title}
                  </button>
                ))
              : notFoundContent || 'Not found.'}
          </div>
        )
      }
    >
      <div>
        <Input
          label={label}
          value={selectedOption?.title || `${value}`}
          onChange={onChangeInput}
          readOnly={!onChangeInput}
          disabled={disabled}
          inputClassName={`${onChangeInput ? '' : 'cursor-pointer'} ${disabled ? 'cursor-not-allowed' : ''}`}
        />
      </div>
    </Dropdown>
  );
};
