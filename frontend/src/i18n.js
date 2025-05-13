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

        //for single page
        stock: "In Stock",
        shipping: "Shipping",
        power: "Power",
        selSize: "Select Sizes",
        freeDel: "Free delivery if ordered within",
        addtocart: "Add to Cart",
        tech: "Technical Information",
        war: "Warranty",
        wanDet: "The product comes with a comprehensive warranty that covers manufacturing defects and malfunctions. It provides peace of mind and assurance of product quality. Customers can enjoy reliable support and prompt assistance for any issues related to the product during the warranty period.",

        Sunnav: "Sun Glasses",
        Eye: "Eye Glasses",
        Screen: "Screen Glasses",
        Pay: "Pay via",
        Our: "Our Propose",
        Do: "Do More, Be More.",
        Discover: "Discover",
        Recently : "Recently Viewed",
        Clear: "Clear Recently Viewed",
        Benefits: "Benefits",
        Related: "Related Products",
        Customer: "Customer Reviews",
        Wishlist: "Your Wishlist",
        Cart: "Shopping Cart",
        Items: "Items",
        BillDetails: "Bill Details",
        Payable: "Total Payable",
        ItemPrice: "Total Item Price",
        ShippingDetails: "Shipping Details",
        PersonalInformation: "Personal Information",
        AddressDetails: "Address Details",
        Discount: "Discount",
        DeliveryFee: "Delivery Fee",
        ApplyCoupon: "Apply Coupon",
        PaymentMethod: "Payment Method",
        PlaceOrder: "Place Order",
        PurchaseSummary: "Purchase Summary",
        ContinueShopping: "Continue Shopping",
        TrackOrder: "Track Order",
        AddReview: "Add Review",
        CancelOrder: "Cancel Order"
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

        //for single page
        stock: "उपलब्ध",
        shipping: "शिपिंग",
        power: "पावर",
        selSize: "आकार चुनें",
        freeDel: "अगर इस समय सीमा के भीतर आदेश दिया जाए तो मुफ्त डिलीवरी ",
        addtocart: "कार्ट में जोड़ें",
        tech: "तकनीकी जानकारी",
        war: "वारंटी",
        wanDet: "यह उत्पाद एक व्यापक वारंटी के साथ आता है जो निर्माण दोषों और खराबी को कवर करती है। यह मानसिक शांति और उत्पाद की गुणवत्ता की गारंटी प्रदान करता है। ग्राहक वारंटी अवधि के दौरान उत्पाद से संबंधित किसी भी समस्या के लिए विश्वसनीय समर्थन और त्वरित सहायता का आनंद ले सकते हैं।",

        Sunnav: "धूप के चश्मे",
        Eye: "चश्मे",
        Screen: "स्क्रीन के चश्मे",
        Pay: "भुगतान करें",
        Our: "हमारा प्रस्ताव",
        Do: "अधिक करें, अधिक बनें।",
        Discover: "खोजें",
        Recently : "हाल ही में देखे गए",
        Clear: "हाल ही में देखे गए को साफ करें",
        Benefits: "लाभ",
        Related: "संबंधित उत्पाद",
        Customer: "ग्राहक समीक्षाएँ",
        Wishlist: "आपकी इच्छापत्रिका",
        Cart: "शॉपिंग कार्ट",
        Items: "आइटम",
        BillDetails: "बिल विवरण",
        Payable: "कुल देय",
        ItemPrice: "कुल आइटम मूल्य",
        ShippingDetails: "शिपिंग विवरण",
        PersonalInformation: "व्यक्तिगत जानकारी",
        AddressDetails: "पता विवरण",
        Discount: "छूट",
        DeliveryFee: "डिलीवरी शुल्क",
        ApplyCoupon: "कूपन लागू करें",
        PaymentMethod: "भुगतान विधि",
        PlaceOrder: "आदेश दें",
        PurchaseSummary: "खरीद का सारांश",
        ContinueShopping: "खरीदारी जारी रखें",
        TrackOrder: "आदेश ट्रैक करें",
        AddReview: "समीक्षा जोड़ें",
        CancelOrder: "आदेश रद्द करें"

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
