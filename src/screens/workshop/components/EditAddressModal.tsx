import React, { useState } from 'react'
import InputForm from '../../auth/assets/components/InputForm'
import toast from 'react-hot-toast'
import { digestApiError } from '../../../utils/functions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '../../../constants/enums'
import { GaragerApi } from '../../../services/api'
import { AddressDTO } from '../../../interfaces/address/address.dto'
import { UpdateAddressDTO } from '../../../interfaces/address/update-address.dto'

interface ModalProps {
  address: AddressDTO
  onClose: () => void
  onConfirm: () => void
}

const EditAddressModal: React.FC<ModalProps> = ({
  address,
  onClose,
  onConfirm,
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationKey: [QueryKeys.CREATE_WORKSHOP_USER],
    mutationFn: async (data: UpdateAddressDTO) => {
      return await GaragerApi.updateAddress(data)
    },
    onSuccess: () => {
      toast.success('Oficina atualizada com sucesso!', { duration: 4000 })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKSHOP] })

      onConfirm()
    },
    onError: (error) => {
      toast.error(digestApiError(error))
    },
  })

  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState({
    address: address.street,
    number: address.name,
    postalCode: address.zip_code,
    city: address.city,
    state: address.state,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { address: street, number, postalCode, city, state } = formValues

    if (!street || !number || !postalCode || !city || !state) {
      setError('Por favor, preencha todos os campos da empresa.')
      return
    } else {
      setError('')
    }

    await mutateAsync({
      addressId: address.id,
      name: number,
      street: street,
      city: city,
      zip_code: postalCode,
      state: state,
    })
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-auto sm:overflow-auto xl:overflow-hidden xl:h-auto">
          <h2 className="text-xl font-bold mb-4">Editar endereço</h2>
          <p className="text-sm font-normal mb-4">
            Altere informações do endereço da sua oficina!
          </p>

          <div className="my-4 gap-4 flex flex-row xl:flex-row sm:flex-col">
            <form className="space-y-4" onSubmit={onSubmit}>
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
                  {error}
                </div>
              )}

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
              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !formValues.address ||
                    !formValues.number ||
                    !formValues.postalCode ||
                    !formValues.city ||
                    !formValues.state
                  }
                  className={`px-4 py-2 rounded ${
                    !isLoading &&
                    formValues.address &&
                    formValues.number &&
                    formValues.postalCode &&
                    formValues.city &&
                    formValues.state
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300'
                  }`}
                >
                  {isLoading ? 'Carregando...' : 'Confirmar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditAddressModal
