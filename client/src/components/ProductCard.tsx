import { Link } from 'wouter';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { addItem } = useCart();

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

  return (
    <div className="product-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden group">
        <img
          src={product.image}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(displayName);
          }}
        />
        <div className="absolute top-2 right-2 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
          {language === 'ar' ? (
            product.category === '3D Models' ? 'نماذج ثلاثية الأبعاد' :
            product.category === 'Custom Prints' ? 'طبعات مخصصة' :
            'المواد'
          ) : product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-bold text-lg line-clamp-2 text-foreground">
          {displayName}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {displayDescription}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-accent">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            {t('product.addToCart')}
          </Button>

          <Link href={`/product/${product.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <a>{t('product.viewDetails')}</a>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
