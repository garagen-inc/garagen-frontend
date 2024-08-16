import React from "react";

interface CustomFieldProps {
  span: string;
  nameid: string;
  type?: string;
  isRequired: boolean;
}

const FormElement: React.FC<CustomFieldProps> = ({
  span = "Default",
  nameid = "default",
  type = "text",
  isRequired = true,
}) => {
  return (
    <div className="py-1">
      <span className="mb-2 text-md">{span}</span>
      <input
        type={type}
        name={nameid}
        id={nameid}
        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        {...(isRequired ? { required: true } : {})}
      />
    </div>
  );
};

export default FormElement;
