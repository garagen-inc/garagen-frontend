import React from 'react'
import { useNavigate } from 'react-router-dom'

// Define a interface para as props
interface CustomButtonProps {
  buttonText?: string // Texto do botão (opcional)
  imgSrc: string // Fonte da imagem (obrigatório)
  imgAlt?: string // Texto alternativo da imagem (opcional)
  buttonColor?: string // Cor de fundo do botão (opcional)
  hoverColor?: string // Cor de fundo do botão ao passar o mouse (opcional)
  textColor?: string // Cor do texto do botão (opcional)
  redirectTo: string
}

// Define o componente com props para customização
const CustomButton: React.FC<CustomButtonProps> = ({
  buttonText = 'Criar conta',
  imgSrc,
  imgAlt = 'user',
  buttonColor = 'bg-gg-lavender-blush',
  hoverColor = 'hover:bg-gg-sunglow',
  textColor = 'text-gg-rich-black',
  redirectTo = '/',
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/${redirectTo}`) // Redireciona para a URL desejada
  }
  return (
    <button
      onClick={() => handleClick()}
      className={`flex flex-col items-center justify-center w-32 h-32 ${buttonColor} ${textColor} rounded-lg shadow-lg transition-colors duration-200 ease-in-out ${hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-400`}
    >
      <img src={imgSrc} alt={imgAlt} className="w-1/3 h-1/3 object-contain" />
      <span className="mt-2 text-sm text-center">{buttonText}</span>
    </button>
  )
}

export default CustomButton
