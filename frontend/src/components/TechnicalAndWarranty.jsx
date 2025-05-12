import React from "react";
import { useTranslation } from "react-i18next";

const TechnicalAndWarranty = ({ productData }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="collapse collapse-plus bg-white">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold text-gray-700">
          {t("tech")}
        </div>
        <div className="collapse-content text-sm">
          <p className="text-gray-700">
            <span className="font-medium">{t('category')}:</span>{" "}
            {productData.category || "Kids"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">{t('frameColours')}:</span>{" "}
            {productData.frameColour || "Medium"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">{t('frameDimensions')}:</span>{" "}
            {productData.frameDimensions || "Medium"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">{t("frameWidth")}:</span>{" "}
            {productData.frameWidth || "Medium"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Sub Category:</span>{" "}
            {productData.subCategory || "Medium"}
          </p>
        </div>
      </div>

      <div className="collapse collapse-plus bg-white">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold text-gray-700">
          {t("war")}
        </div>
        <div className="collapse-content text-sm text-gray-700">
          {t("wanDet")}
        </div>
      </div>
    </div>
  );
};

export default TechnicalAndWarranty;
