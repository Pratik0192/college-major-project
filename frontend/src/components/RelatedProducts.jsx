import React from 'react'
import ProductItem from './ProductItem'
import { useTranslation } from "react-i18next";

const RelatedProducts = ({relatedProducts}) => {
  const { t } = useTranslation()
  return (
    <div className="mt-12 px-2">
      <h2 className="text-xl text-black font-bold mb-6">{t("Related")}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>

      {relatedProducts.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No related products found
        </p>
      )}
    </div>
  )
}

export default RelatedProducts