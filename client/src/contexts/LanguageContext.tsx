import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'home.title': 'Tab3ah Store',
    'home.subtitle': 'Modern 3D Printing Solutions',
    'home.hero.title': 'Welcome to Tab3ah',
    'home.hero.subtitle': 'Discover our collection of premium 3D-printed products and custom printing services',
    'home.featured': 'Featured Products',
    'home.categories': 'Shop by Category',
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About Us',
    'nav.cart': 'Cart',
    'products.all': 'All Products',
    'products.search': 'Search products...',
    'products.filter': 'Filter by Category',
    'products.category.all': 'All Categories',
    'products.category.models': '3D Models',
    'products.category.custom': 'Custom Prints',
    'products.category.materials': 'Materials',
    'product.price': 'Price',
    'product.addToCart': 'Add to Cart',
    'product.viewDetails': 'View Details',
    'product.description': 'Description',
    'product.category': 'Category',
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.continueShopping': 'Continue Shopping',
    'cart.quantity': 'Quantity',
    'cart.remove': 'Remove',
    'about.title': 'About Tab3ah',
    'about.description': 'Tab3ah is a modern 3D printing shop dedicated to bringing your ideas to life with cutting-edge technology and exceptional quality.',
    'footer.copyright': '© 2024 Tab3ah Store. All rights reserved.',
    'footer.contact': 'Contact Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  ar: {
    'home.title': 'متجر طبعة',
    'home.subtitle': 'حلول الطباعة ثلاثية الأبعاد الحديثة',
    'home.hero.title': 'أهلا بك في طبعة',
    'home.hero.subtitle': 'اكتشف مجموعتنا من منتجات الطباعة ثلاثية الأبعاد المتميزة وخدمات الطباعة المخصصة',
    'home.featured': 'المنتجات المميزة',
    'home.categories': 'التسوق حسب الفئة',
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.about': 'عن الشركة',
    'nav.cart': 'السلة',
    'products.all': 'جميع المنتجات',
    'products.search': 'ابحث عن المنتجات...',
    'products.filter': 'تصفية حسب الفئة',
    'products.category.all': 'جميع الفئات',
    'products.category.models': 'نماذج ثلاثية الأبعاد',
    'products.category.custom': 'طبعات مخصصة',
    'products.category.materials': 'المواد',
    'product.price': 'السعر',
    'product.addToCart': 'أضف إلى السلة',
    'product.viewDetails': 'عرض التفاصيل',
    'product.description': 'الوصف',
    'product.category': 'الفئة',
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلتك فارغة',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.shipping': 'الشحن',
    'cart.total': 'الإجمالي',
    'cart.checkout': 'متابعة الدفع',
    'cart.continueShopping': 'متابعة التسوق',
    'cart.quantity': 'الكمية',
    'cart.remove': 'إزالة',
    'about.title': 'عن طبعة',
    'about.description': 'طبعة هي متجر طباعة ثلاثية الأبعاد حديث مكرس لتحويل أفكارك إلى واقع باستخدام التكنولوجيا المتقدمة والجودة الاستثنائية.',
    'footer.copyright': '© 2024 متجر طبعة. جميع الحقوق محفوظة.',
    'footer.contact': 'اتصل بنا',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language | null;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
