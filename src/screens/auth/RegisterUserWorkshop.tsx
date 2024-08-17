import React from "react";
import UserIcon from "../shared_components/shared_assets/user.svg";
import CustomButton from "./assets/components/CustomButton";
import BasePageLayout from "./assets/components/BasePage";
import FormRegisterUserWorkshop from "./assets/FormRegisterUserWorkshop";
export function RegisterUserWorkshop() {
  const buttons = (
    <>
      <CustomButton
        redirectTo="login"
        buttonText="Logar-se"
        imgSrc={UserIcon}
        imgAlt="Ícone de usuário"
        buttonColor="bg-gg-robin-egg-blue"
        hoverColor="hover:bg-gg-sunglow"
        textColor="text-black"
      />
      <CustomButton
        redirectTo="registeruser"
        buttonText="Cadastrar conta convencional"
        imgSrc={UserIcon}
        imgAlt="Ícone de usuário"
        buttonColor="bg-gg-robin-egg-blue"
        hoverColor="hover:bg-gg-sunglow"
        textColor="text-black"
      />
    </>
  );
  return (
    <BasePageLayout
      mdFlexOrientation="md:flex-row-reverse"
      fadeFrom="from-gg-cinnabar"
      formComponent={<FormRegisterUserWorkshop />}
      buttons={buttons}
    />
  );
}
