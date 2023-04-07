import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown } from "./Icons";
import { useOutsideClickHandler } from "./utils";
import "./dropdown.css";

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
  const [showList, setShowList] = useState(false);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  const selectedOptionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    selectedOptionRef.current?.scrollIntoView(); // scroll to selected option in the dropdown
  }, [showList]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(wrapperRef, () => {
    setShowList(false); // hide dropdown list when clicked outside
  });

  return (
    <div ref={wrapperRef} className={`dropdown ${showList ? "is-open" : ""}`}>
      <div
        className="dropdown-display"
        onClick={() => {
          setShowList((current) => !current);
        }}
      >
        <div className={`display-value ${selectedOption ? "" : "no-value"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </div>
        <div className="arrow">
          <ArrowDown />
        </div>
      </div>
      {showList && (
        <div className="dropdown-list-wrapper">
          <div className="dropdown-list">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onSelect(option);
                  setShowList(false);
                }}
                ref={(node) => {
                  if (selectedOption?.value === option.value) {
                    selectedOptionRef.current = node;
                  }
                }}
                className={`dropdown-option ${
                  selectedOption?.value === option.value ? "selected" : ""
                }`}
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
