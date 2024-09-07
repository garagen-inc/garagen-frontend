import React from 'react'
import FormElement from './FormElement'

interface CompanyFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  formValues: {
    companyName: string
    address: string
    number: string
    postalCode: string
    city: string
    state: string
  }
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  onChange,
  isLoading,
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
    <div className="flex flex-row gap-4">
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
    </div>
    <div className="flex flex-row gap-4">
      <FormElement
        isRequired={true}
        nameid="city"
        span="Cidade"
        type="text"
        value={formValues.city}
        onChange={onChange}
      />
      <FormElement
        isRequired={true}
        nameid="state"
        span="Estado"
        type="text"
        value={formValues.state}
        onChange={onChange}
      />
    </div>
    <FormElement
      isRequired={true}
      nameid="postalCode"
      span="CEP"
      type="text"
      value={formValues.postalCode}
      onChange={onChange}
    />
    <button
      disabled={isLoading}
      type="submit"
      className="w-full bg-gg-rich-black text-white p-2 rounded-lg mb-6 transition-colors duration-200 ease-in-out hover:bg-gg-lavender-blush hover:text-black hover:border hover:border-gray-300"
    >
      {isLoading ? 'Carregando...' : 'Enviar Dados'}
    </button>
  </form>
)

export default CompanyForm
