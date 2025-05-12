import React from "react";

const ProductLeftImage = ({productData}) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center gap-2 px-4">
      <div className="relative w-full">
        {/* Carousel */}
        <div className="carousel rounded-box">
          {productData.image.map((img, index) => (
            <div
              className="carousel-item relative w-full vignette-effect"
              key={index}
            >
              <img
                src={img}
                alt={`${productData.name} view ${index + 1}`}
                className="w-full max-h-[300px] sm:max-h-[400px] md:max-h-[400px] lg:max-h-[450px] object-contain"
              />
              {/* Navigation Buttons */}
              <div className="hidden md:flex absolute top-1/2 transform -translate-y-1/2 w-full px-2 sm:px-4 justify-between">
                <button className="btn btn-circle bg-white text-gray-800 hover:bg-gray-200 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
                  ❮
                </button>
                <button className="btn btn-circle bg-white text-gray-800 hover:bg-gray-200 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
                  ❯
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Product Name Below Image */}
      <div className="text-white bg-blue-950 text-center font-bold text-2xl sm:text-3xl md:text-4xl w-full py-2">
        {productData.name}
      </div>
    </div>
  );
};

export default ProductLeftImage;
