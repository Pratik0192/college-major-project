// import i18n from "i18next"
// import { initReactI18next } from "react-i18next"

// const resources = {
//   en: {
//     translation: {
//       allProducts: "All Products",
//       profile: "Profile",
//       orders: "Orders",
//       wishlist: "Wishlist",
//       cart: "Cart",
//       logout: "Logout",
//       welcome: "Welcome!",
//       loginContinue: "Login to Continue",
//     },
//   },
//   hi: {
//     translation: {
//       allProducts: "सभी उत्पाद",
//       profile: "प्रोफ़ाइल",
//       orders: "ऑर्डर",
//       wishlist: "इच्छा-सूची",
//       cart: "कार्ट",
//       logout: "लॉग आउट",
//       welcome: "स्वागत है!",
//       loginContinue: "जारी रखने के लिए लॉगिन करें",
//     },
//   },
// };

// i18n.use(initReactI18next).init({
//   resources,
//   lng: "en", // default language
//   fallbackLng: "en",
//   interpolation: {
//     escapeValue: false,
//   },
// });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import your translation files

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        allProducts: "All Products",
        profile: "Profile",
        orders: "Orders",
        wishlist: "Wishlist",
        cart: "Cart",
        logout: "Logout",
        welcome: "Welcome!",
        loginContinue: "Login to Continue",

        //for all product page
        recommended: "Recommended",
        priceHighLow: "Price: High to Low",
        priceLowHigh: "Price: Low to High",
        popularity: "Popularity",
        topRated: "Top Rated",
        filters: "Filters",
        close: "Close",

        //for sidebar filters
        price: "PRICE",
        brands: "BRANDS",
        frameColours: "FRAME COLOURS",
        frameSizes: "FRAME SIZES",

        //for searchbar
        searchPlaceholder: "Search for Products...",
        noMatchingProducts: "No matching products found.",
        off: "OFF",
        reviews: "reviews",

        //for productItem
        off: "% OFF",
        priceDropped: "Price dropped by",
        wishlistAdded: "Added to Wishlist",
        wishlistRemoved: "Removed from Wishlist",
        colors: "Colors:",
        name: "Name",
        category: "Category",
        frameWidth: "Frame Width",
        frameDimensions: "Frame Dimensions",
        brand: "Brand",
        reviews: "reviews",
      },
    },
    hi: {
      translation: {
        allProducts: "सभी उत्पाद",
        profile: "प्रोफ़ाइल",
        orders: "ऑर्डर",
        wishlist: "इच्छा-सूची",
        cart: "कार्ट",
        logout: "लॉग आउट",
        welcome: "स्वागत है!",
        loginContinue: "जारी रखने के लिए लॉगिन करें",

        //for all product page
        recommended: "सुझाए गए",
        priceHighLow: "कीमत: उच्च से निम्न",
        priceLowHigh: "कीमत: निम्न से उच्च",
        popularity: "लोकप्रियता",
        topRated: "उच्चतम रेटेड",
        filters: "फ़िल्टर",
        close: "बंद करें",

        //for sidebar filters
        price: "मूल्य",
        brands: "ब्रांड्स",
        frameColours: "फ्रेम रंग",
        frameSizes: "फ्रेम आकार",

        //for searchbar
        searchPlaceholder: "उत्पाद खोजें...",
        noMatchingProducts: "कोई मेल खाते उत्पाद नहीं मिले।",
        off: "छूट",
        reviews: "समीक्षाएं",

        //product item
        off: "% छूट",
        priceDropped: "कीमत में गिरावट",
        wishlistAdded: "इच्छा-सूची में जोड़ा गया",
        wishlistRemoved: "इच्छा-सूची से हटा दिया गया",
        colors: "रंग:",
        name: "नाम",
        category: "श्रेणी",
        frameWidth: "फ्रेम चौड़ाई",
        frameDimensions: "फ्रेम आयाम",
        brand: "ब्रांड",
        reviews: "समीक्षाएं",
      },
    },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
