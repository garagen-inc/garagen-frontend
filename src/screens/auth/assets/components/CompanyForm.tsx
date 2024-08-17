import React from "react";
import FormElement from "./FormElement";

interface CompanyFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: {
    companyName: string;
    address: string;
    number: string;
    postalCode: string;
  };
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  onChange,
  formValues,
  onSubmit,
}) => (
  <form className="space-y-4" onSubmit={onSubmit}>
    <FormElement
      isRequired={true}
      nameid="companyName"
      span="Nome da Empresa"
      type="text"
      value={formValues.companyName}
      onChange={onChange}
    />
    <FormElement
      isRequired={true}
      nameid="address"
      span="Logradouro"
      type="text"
      value={formValues.address}
      onChange={onChange}
    />
    <FormElement
      isRequired={true}
      nameid="number"
      span="Número"
      type="text"
      value={formValues.number}
      onChange={onChange}
    />
    <FormElement
      isRequired={true}
      nameid="postalCode"
      span="CEP"
      type="text"
      value={formValues.postalCode}
      onChange={onChange}
    />
    <button
      type="submit"
      className="w-full bg-gg-rich-black text-white p-2 rounded-lg mb-6 transition-colors duration-200 ease-in-out hover:bg-gg-lavender-blush hover:text-black hover:border hover:border-gray-300"
    >
      Enviar Dados
    </button>
  </form>
);

export default CompanyForm;
