import React from 'react'
import UserIcon from '../shared_components/shared_assets/user.svg'
import GarageIcon from '../shared_components/shared_assets/garage.svg'
import CustomButton from './assets/components/CustomButton'
import BasePageLayout from './assets/components/BasePage'
import FormRegisterUser from './assets/FormRegisterUser'
export function RegisterUser() {
  const buttons = (
    <>
      <CustomButton
        redirectTo="login"
        buttonText="Entrar"
        imgSrc={UserIcon}
        imgAlt="Ícone de usuário"
        buttonColor="bg-gg-lavender-blush"
        hoverColor="hover:bg-gg-sunglow"
        textColor="text-black"
      />
      <CustomButton
        redirectTo="registerworkshop"
        buttonText="Sou dono de garagem"
        imgSrc={GarageIcon}
        imgAlt="Ícone de garagem"
        buttonColor="bg-gg-lavender-blush"
        hoverColor="hover:bg-gg-sunglow"
        textColor="text-black"
      />
    </>
  )
  return (
    <BasePageLayout
      mdFlexOrientation="md:flex-row-reverse"
      fadeFrom="from-gg-cinnabar"
      formComponent={<FormRegisterUser />}
      buttons={buttons}
    />
  )
}
