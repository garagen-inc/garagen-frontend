import React from "react";
import UserIcon from "../shared_components/shared_assets/user.svg";
import GarageIcon from "../shared_components/shared_assets/garage.svg";
import { FormLogin } from "./assets/FormLogin";
import CustomButton from "./assets/components/CustomButton";
import BasePageLayout from "./assets/components/BasePage";

export function Login() {
  const buttons = (
    <>
      <CustomButton
        redirectTo="registeruser"
        buttonText="Cadastrar conta convencional"
        imgSrc={UserIcon}
        imgAlt="Ícone de usuário"
        buttonColor="bg-gg-lavender-blush"
        hoverColor="hover:bg-gg-sunglow"
        textColor="text-black"
      />
      <CustomButton
        redirectTo="registerworkshop"
        buttonText="Cadastrar conta administrativa"
        imgSrc={GarageIcon}
        imgAlt="Ícone de garagem"
        buttonColor="bg-gg-lavender-blush"
        hoverColor="hover:bg-gg-sunglow"
        textColor="text-black"
      />
    </>
  );
  return (
    <BasePageLayout
      mdFlexOrientation="md:flex-row"
      formComponent={<FormLogin />}
      buttons={buttons}
    />
  );
}
