import React, { useState } from 'react'
import InputForm from '../../auth/assets/components/InputForm'
import toast from 'react-hot-toast'
import { digestApiError } from '../../../utils/functions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '../../../constants/enums'
import { GaragerApi } from '../../../services/api'
import { UpdateWorkshopDTO } from '../../../interfaces/workshop/update-workshop.dto'
import { WorkshopDTO } from '../../../interfaces/workshop/workshop.dto'

interface ModalProps {
  workshop: WorkshopDTO
  onClose: () => void
  onConfirm: () => void
}

const EditWorkshopModal: React.FC<ModalProps> = ({
  workshop,
  onClose,
  onConfirm,
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationKey: [QueryKeys.CREATE_WORKSHOP_USER],
    mutationFn: async (data: UpdateWorkshopDTO) => {
      return await GaragerApi.updateWorkshop(data)
    },
    onSuccess: () => {
      toast.success('Oficina atualizada com sucesso!', { duration: 4000 })
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKSHOP] })

      //   onConfirm()
    },
    onError: (error) => {
      toast.error(digestApiError(error))
    },
  })

  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState({
    companyName: workshop.name,
    workshop_description: workshop.description,
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

    const { companyName, workshop_description } = formValues

    if (!companyName || !workshop_description) {
      setError('Por favor, preencha todos os campos da empresa.')
    }

    await mutateAsync({
      workshopId: workshop.id,
      name: companyName,
      description: workshop_description,
      // address_name: number,
      // street: address,
      // city: city,
      // zip_code: postalCode,
      // state: state,
    })
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-auto sm:overflow-auto xl:overflow-hidden xl:h-auto">
          <h2 className="text-xl font-bold mb-4">Editar informações</h2>
          <p className="text-sm font-normal mb-4">
            Altere informações da sua oficina!
          </p>

          <div className="my-4 gap-4 flex flex-row xl:flex-row sm:flex-col">
            <form className="space-y-4" onSubmit={onSubmit}>
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
                  {error}
                </div>
              )}
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
              {/* <div className="flex flex-row gap-4">
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
              /> */}
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
                    !formValues.companyName ||
                    !formValues.workshop_description
                  }
                  className={`px-4 py-2 rounded ${
                    !isLoading &&
                    formValues.companyName &&
                    formValues.workshop_description
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

export default EditWorkshopModal
