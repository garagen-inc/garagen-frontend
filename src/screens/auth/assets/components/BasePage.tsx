import React from "react";

interface BasePageLayoutProps {
  formComponent: React.ReactNode;
  buttons: React.ReactNode;
  mdFlexOrientation?: string;
  fadeFrom?: string;
  fadeTo?: string;
}

export const BasePageLayout: React.FC<BasePageLayoutProps> = ({
  formComponent,
  buttons,
  mdFlexOrientation = "md:flex-row",
  fadeFrom = "from-gg-robin-egg-blue",
  fadeTo = "to-gg-sunglow",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gg-rich-black overflow-hidden">
      <div className="absolute overflow-hidden h-screen w-screen justify-items-start items-center">
        <div className="circle"></div>
      </div>

      <div
        className={`relative flex flex-col ${mdFlexOrientation} w-full max-w-6xl m-6 bg-gg-lavender-blush shadow-2xl rounded-3xl overflow-hidden`}
      >
        {formComponent}

        <div
          className={`relative flex-col w-full md:w-1/2 flex items-center p-12 justify-center inset-0 bg-gradient-to-b ${fadeFrom} ${fadeTo} `}
        >
          <div>
            <span className="lg:text-4xl font-bold text-3xl text-gg-lavender-blush mb-4">
              Primeira vez aqui?
            </span>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-5">
            {buttons}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasePageLayout;
