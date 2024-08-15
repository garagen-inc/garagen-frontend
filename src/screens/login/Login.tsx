import React from "react";
import UserIcon from "../shared_components/shared_assets/user.svg";
import GarageIcon from "../shared_components/shared_assets/garage.svg";
import { FormLogin } from "./assets/FormLogin";
import CustomButton from "./assets/ButtonLogin";
export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gg-rich-black overf">
      <div className="absolute overflow-hidden h-screen w-screen justify-items-start items-center">
        <div className="circle "></div>
      </div>

      <div className="relative flex flex-col md:flex-row w-full max-w-6xl m-6 bg-gg-lavender-blush shadow-2xl rounded-3xl overflow-hidden">
        <FormLogin />

        <div className="relative flex-col  w-full md:w-1/2 flex items-center p-12 justify-center inset-0 bg-gradient-to-b from-gg-robin-egg-blue to-gg-sunglow">
          <div>
            <span className="lg:text-4xl font-bold text-3xl text-gg-lavender-blush mb-4">
              Primeira vez aqui?
            </span>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-5">
            <CustomButton
              buttonText="Cadastrar conta convencional"
              imgSrc={UserIcon}
              imgAlt="Ícone de oficina"
              buttonColor="bg-gg-robin-egg-blue"
              hoverColor="hover:bg-gg-sunglow"
              textColor="text-black"
            />
            <CustomButton
              buttonText="Cadastrar conta administrativa"
              imgSrc={GarageIcon}
              imgAlt="Ícone de oficina"
              buttonColor="bg-gg-robin-egg-blue"
              hoverColor="hover:bg-gg-sunglow"
              textColor="text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
