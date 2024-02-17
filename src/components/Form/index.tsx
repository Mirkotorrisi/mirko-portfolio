import React from "react";
import Input from "./components/Input";
import { FormFieldEntity } from "./types";
import useForm from "./useForm";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => any;
  formConfig: Record<string, FormFieldEntity>;
  submitLabel: string;
  formClassNames: {
    container: string;
    input: string;
    submit: string;
    [key: string]: string;
  };
};

const Form = ({
  handleSubmit,
  formConfig,
  submitLabel,
  formClassNames,
}: Props) => {
  const { form, handleChange } = useForm(formConfig);

  const hasErrors = Object.values(form).some((v) => !v.valid);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} className={formClassNames.container}>
      {Object.entries(form).map(([key, field]) => (
        <Input
          name={key}
          field={field}
          className={formClassNames.input}
          onChange={handleChange}
          fieldConfig={formConfig[key]}
          customWrapperClass={formClassNames[key]}
        />
      ))}
      <input
        type="submit"
        className={formClassNames.submit}
        title={submitLabel}
        disabled={hasErrors}
      />
    </form>
  );
};

export default Form;
