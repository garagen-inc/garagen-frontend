import React from "react";

interface CustomFieldProps {
  span: string;
  nameid: string;
  type?: string;
  isRequired: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // Tipo correto para onChange
  value?: string; // Adiciona a prop value
}

const FormElement: React.FC<CustomFieldProps> = ({
  span = "Default",
  nameid = "default",
  type = "text",
  isRequired = true,
  onChange,
  value = "",
}) => {
  // Se onChange e value são fornecidos, renderiza o input controlado
  return (
    <div className="py-1">
      <span className="mb-2 text-md">{span}</span>
      <input
        type={type}
        name={nameid}
        id={nameid}
        onChange={onChange} // Aplicando o onChange
        value={value} // Aplicando o value
        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        {...(isRequired ? { required: true } : {})}
      />
    </div>
  );
};
export default FormElement;
