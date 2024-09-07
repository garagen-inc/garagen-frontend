import React from 'react'
import InputForm from './InputForm'

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
    workshop_description: string
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
    <InputForm
      isRequired={true}
      nameid="companyName"
      span="Nome da Oficina"
      type="text"
      value={formValues.companyName}
      onChange={onChange}
    />
    <InputForm
      isRequired={true}
      nameid="workshop_description"
      span="Descrição da Oficina"
      type="text"
      value={formValues.workshop_description}
      onChange={onChange}
    />
    <div className="flex flex-row gap-4">
      <InputForm
        isRequired={true}
        nameid="address"
        span="Logradouro"
        type="text"
        value={formValues.address}
        onChange={onChange}
      />
      <InputForm
        isRequired={true}
        nameid="number"
        span="Número"
        type="text"
        value={formValues.number}
        onChange={onChange}
      />
    </div>
    <div className="flex flex-row gap-4">
      <InputForm
        isRequired={true}
        nameid="city"
        span="Cidade"
        type="text"
        value={formValues.city}
        onChange={onChange}
      />
      <InputForm
        isRequired={true}
        nameid="state"
        span="Estado"
        type="text"
        value={formValues.state}
        onChange={onChange}
      />
    </div>
    <InputForm
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
