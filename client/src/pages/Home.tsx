import { Link } from 'wouter';
import { ArrowRight, Zap, Palette, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const { t, isRTL } = useLanguage();
  const { products, getFeaturedProducts, getCategories } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10 dark:from-accent/5 dark:to-secondary/5" />
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="flex items-center gap-2" asChild>
                    <a>
                      {t('products.all')}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" asChild>
                    <a>{t('nav.about')}</a>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
              Why Choose Tab3a?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-xl text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">High Quality</h3>
                <p className="text-muted-foreground">
                  Premium materials and precision printing for exceptional results
                </p>
              </div>
              <div className="glass p-8 rounded-xl text-center">
                <Palette className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-2">Custom Designs</h3>
                <p className="text-muted-foreground">
                  Bring your unique ideas to life with our custom printing services
                </p>
              </div>
              <div className="glass p-8 rounded-xl text-center">
                <Cpu className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-bold mb-2">Modern Technology</h3>
                <p className="text-muted-foreground">
                  State-of-the-art 3D printing equipment for superior precision
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 gradient-text">
              {t('home.categories')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>
                  <a className="group relative overflow-hidden rounded-xl h-48 flex items-center justify-center cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent to-secondary opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="relative z-10 text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {category}
                      </h3>
                      <p className="text-white/80 text-sm">
                        Explore our collection
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section className="py-16 bg-white dark:bg-gray-800">
            <div className="container">
              <h2 className="text-3xl font-bold mb-12 gradient-text">
                {t('home.featured')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-accent to-secondary">
          <div className="container text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
            <p className="text-lg mb-8 opacity-90">
              Explore our full collection of 3D-printed products and custom services
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary" className="text-accent" asChild>
                <a>Start Shopping</a>
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
