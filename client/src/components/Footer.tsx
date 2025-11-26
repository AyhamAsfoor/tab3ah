import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold gradient-text">Tab3a</h3>
            <p className="text-sm text-gray-400">
              {t('about.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">{t('nav.products')}</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@tab3ah.com</li>
              <li>Phone: +962 7 8635 5525</li>
              <li>Location: Amman, Jordan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
