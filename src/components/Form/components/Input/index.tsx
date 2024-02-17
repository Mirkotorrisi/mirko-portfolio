import React, { useState } from "react";
import { FormField, FormFieldEntity } from "../../types";

type Props = {
  name: string;
  field: FormField;
  fieldConfig: FormFieldEntity;
  className: string;
  customWrapperClass?: string;
  onChange: (e: React.BaseSyntheticEvent<object, any, any>) => void;
};
const Input = ({
  name,
  field,
  className,
  onChange,
  fieldConfig,
  customWrapperClass,
}: Props) => {
  const { label, placeholder, pattern, message, type } = fieldConfig;
  const [touched, setTouched] = useState(false);
  const onBlur = () => {
    setTouched(true);
  };
  const showError = touched && !field.valid;
  const inputClassName = `${className} ${showError ? "!border-red-500" : ""}`;
  const wrapperClassName = `flex flex-col ${customWrapperClass ?? ""} ${
    showError ? "text-red-500" : ""
  }`;
  return (
    <div className={wrapperClassName}>
      <span className="text-xs mb-1 font-bold">{label}</span>
      <input
        name={name}
        value={field.value}
        onChange={onChange}
        onFocus={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type || "text"}
        pattern={pattern}
        className={inputClassName}
      />
      {showError && <span className="text-red-500 text-xs">{message}</span>}
    </div>
  );
};

export default Input;
