import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useOutsideClickHandler } from "./utils";
import { ArrowDown } from "./icons/ArrowDown";
import styles from "./dropdown.module.scss";

type DropdownOption<ValueType, LabelType> = {
  value: ValueType;
  label: LabelType;
};

type DropdownProps<ValueType, LabelType> = {
  value?: ValueType | null;
  placeholder?: ReactNode;
  options: DropdownOption<ValueType, LabelType>[];
  onSelect: (option: DropdownOption<ValueType, LabelType>) => void;
};

export const Dropdown = <
  ValueType extends string | number,
  LabelType extends JSX.Element | ReactNode
>({
  value,
  placeholder,
  options,
  onSelect,
}: DropdownProps<ValueType, LabelType>) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  const selectedOptionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    selectedOptionRef.current?.scrollIntoView(false); // scroll to selected option in the dropdown
  }, [isOpen]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(wrapperRef, () => {
    setIsOpen(false); // hide dropdown list when clicked outside
  });

  return (
    <div
      ref={wrapperRef}
      className={classNames(styles.dropdown, {
        [styles.isOpen]: isOpen,
      })}
    >
      <div
        className={styles.display}
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <div
          className={classNames(styles.displayValue, {
            [styles.noValue]: !selectedOption,
          })}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        <div className={styles.arrow}>
          <ArrowDown />
        </div>
      </div>
      {isOpen && (
        <div className={styles.listWrapper}>
          <div className={styles.list}>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                ref={(node) => {
                  if (selectedOption?.value === option.value) {
                    selectedOptionRef.current = node;
                  }
                }}
                className={classNames(styles.option, {
                  [styles.selected]: selectedOption?.value === option.value,
                })}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
