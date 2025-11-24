import { useRoute, Link } from 'wouter';
import { ArrowLeft, ShoppingCart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetail() {
  const [match, params] = useRoute('/product/:id');
  const { t, language } = useLanguage();
  const { getProductById } = useProducts();
  const { addItem } = useCart();

  if (!match) {
    return null;
  }

  const product = getProductById(params!.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products">
            <Button asChild>
              <a>Back to Products</a>
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const displayName = language === 'ar' ? product.name_ar : product.name;
  const displayDescription = language === 'ar' ? product.description_ar : product.description;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      name_ar: product.name_ar,
      price: product.price,
      image: product.image,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: displayName,
        text: displayDescription,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          {/* Back Button */}
          <Link href="/products">
            <a className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </a>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden min-h-96">
              <img
                src={product.image}
                alt={displayName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x500?text=' + encodeURIComponent(displayName);
                }}
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              {/* Category Badge */}
              <div className="inline-flex w-fit">
                <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl font-bold mb-2 gradient-text">
                  {displayName}
                </h1>
              </div>

              {/* Price */}
              <div className="py-4 border-y border-gray-200 dark:border-gray-700">
                <p className="text-sm text-muted-foreground mb-2">{t('product.price')}</p>
                <p className="text-4xl font-bold text-accent">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">{t('product.description')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {displayDescription}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t('product.addToCart')}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <h4 className="font-semibold mb-4">Product Details</h4>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t('product.category')}</dt>
                    <dd className="font-medium">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Availability</dt>
                    <dd className="font-medium text-green-600">In Stock</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd className="font-medium">Worldwide Available</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
