import React from "react";

const TechnicalAndWarranty = ({ productData }) => {
  return (
    <div>
      <div className="collapse collapse-plus bg-white">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold text-gray-700">
          Technical Information
        </div>
        <div className="collapse-content text-sm">
          <p className="text-gray-700">
            <span className="font-medium">Category:</span>{" "}
            {productData.category || "Kids"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Frame Colour:</span>{" "}
            {productData.frameColour || "Medium"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Frame Dimensions:</span>{" "}
            {productData.frameDimensions || "Medium"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Frame Width:</span>{" "}
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
          Warranty
        </div>
        <div className="collapse-content text-sm text-gray-700">
          The product comes with a comprehensive warranty that covers
          manufacturing defects and malfunctions. It provides peace of mind and
          assurance of product quality. Customers can enjoy reliable support and
          prompt assistance for any issues related to the product during the
          warranty period.
        </div>
      </div>
    </div>
  );
};

export default TechnicalAndWarranty;
