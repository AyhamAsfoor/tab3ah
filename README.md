# 🖨️ Tab3ah — طبعة | Modern 3D Printing Store

> A fully static, modern e-commerce platform for 3D printing products with dual-language support (English/Arabic), Git-based CMS, and Snipcart integration.

---

## ✨ Features

### 🎨 **Modern Design & User Experience**
- **Clean, Minimal Aesthetic**: Futuristic design with glassmorphism effects tailored for 3D printing industry
- **Professional Color Palette**: Electric Blue primary, Dark Gray text, Neon Purple accents
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens
- **Smooth Animations**: Subtle transitions and hover effects for enhanced interactivity

### 🌍 **Dual Language Support**
- **English & Arabic**: Full RTL/LTR support with seamless language switching
- **Localized Content**: All UI text, product names, and descriptions available in both languages
- **Language Persistence**: User language preference saved to localStorage

### 📦 **Product Management**
- **JSON-Based Products**: All products stored in `/data/products.json` for easy management
- **Rich Product Data**: Support for images, descriptions, pricing, and categories
- **Dynamic Product Loading**: JavaScript automatically fetches and displays products
- **Product Categories**: Organize products into 3D Models, Custom Prints, and Materials

### 🛒 **Shopping Experience**
- **Local Cart Management**: Shopping cart stored in browser localStorage
- **Add to Cart**: One-click product addition with quantity management
- **Cart Persistence**: Cart contents preserved across sessions
- **Checkout Integration**: Snipcart integration for secure, no-login checkout

### 🔧 **Admin Dashboard (Git-Based CMS)**
- **Netlify CMS Integration**: Web-based interface for managing products
- **Git-Driven Workflow**: Every change creates a Git commit automatically
- **Product CRUD**: Add, edit, and delete products through the dashboard
- **Preview Before Publishing**: Review changes before committing to production
- **No Backend Required**: Everything managed through Git and static files

### 🔍 **Search & Filtering**
- **Full-Text Search**: Search products by name, description in both languages
- **Category Filtering**: Filter products by type (3D Models, Custom Prints, Materials)
- **Real-Time Results**: Instant filtering and search results

### 📱 **Mobile-First Development**
- **Touch-Friendly Interface**: Optimized buttons and interactions for mobile
- **Responsive Navigation**: Hamburger menu on mobile, full nav on desktop
- **Mobile Checkout**: Streamlined checkout experience on all devices

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git (for deployment and CMS)
- A GitHub account (for Netlify CMS)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tab3ah_store

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The development server will start at `http://localhost:3000`

---

## 📁 Project Structure

```
tab3ah_store/
├── client/
│   ├── public/
│   │   ├── data/
│   │   │   └── products.json          # Product database
│   │   ├── images/                    # Product images
│   │   ├── admin/
│   │   │   ├── index.html            # CMS admin page
│   │   │   └── config.yml            # Netlify CMS configuration
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx            # Navigation header
│   │   │   ├── Footer.tsx            # Footer component
│   │   │   ├── ProductCard.tsx       # Product card component
│   │   │   └── ErrorBoundary.tsx
│   │   ├── contexts/
│   │   │   ├── LanguageContext.tsx   # i18n context
│   │   │   ├── CartContext.tsx       # Shopping cart state
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/
│   │   │   └── useProducts.ts        # Product data hook
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Homepage
│   │   │   ├── Products.tsx          # Products listing
│   │   │   ├── ProductDetail.tsx     # Single product page
│   │   │   ├── Cart.tsx              # Shopping cart
│   │   │   ├── About.tsx             # About page
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx                   # Main app component
│   │   ├── main.tsx
│   │   └── index.css                 # Global styles
│   └── tailwind.config.ts
├── public/
│   └── admin/                        # CMS configuration
├── README.md
└── package.json
```

---

## 🛍️ Product Management

### Adding Products via JSON

Edit `/client/public/data/products.json`:

```json
{
  "id": "unique-product-id",
  "name": "Product Name",
  "name_ar": "اسم المنتج",
  "price": 49.99,
  "image": "/images/product.jpg",
  "description": "English description...",
  "description_ar": "الوصف بالعربية...",
  "category": "3D Models",
  "featured": true
}
```

### Using Netlify CMS

1. Deploy your site to Netlify
2. Enable GitHub authentication in Netlify
3. Access the CMS at `/admin`
4. Add/edit products through the web interface
5. Changes automatically commit to your Git repository

---

## 💳 Checkout Integration (Snipcart)

### Setup Instructions

1. **Sign up for Snipcart**: Visit [snipcart.com](https://snipcart.com) and create an account
2. **Get your API Key**: Copy your public API key from Snipcart dashboard
3. **Add to HTML**: The checkout button is already integrated in the Cart page
4. **Configure Products**: Products automatically sync with Snipcart

The checkout button in the cart page (`/cart`) is pre-configured with the Snipcart class `snipcart-checkout`.

---

## 🌐 Deployment

### GitHub Pages

```bash
# Build for production
pnpm build

# Deploy to GitHub Pages
# Push the dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

**Update `vite.config.ts`:**
```typescript
export default defineConfig({
  base: '/tab3ah_store/', // if deploying to subdirectory
})
```

### Netlify

1. **Connect Repository**: Push code to GitHub
2. **Create Netlify Site**: Connect your GitHub repo to Netlify
3. **Build Settings**:
   - Build command: `pnpm build`
   - Publish directory: `dist`
4. **Deploy**: Netlify automatically deploys on push
5. **Enable CMS**: Configure GitHub authentication for Netlify CMS

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🎨 Customization

### Colors & Theme

Edit `/client/src/index.css` to customize colors:

```css
:root {
  --primary: oklch(0.55 0.29 262.8); /* Electric Blue */
  --secondary: oklch(0.6 0.25 280); /* Neon Purple */
  --accent: oklch(0.55 0.29 262.8);
}
```

### Logo & Branding

Update the logo in `/client/src/components/Header.tsx`:

```tsx
<span className="text-2xl">🖨️</span> {/* Change emoji or add image */}
<span>Tab3ah</span>
```

### Language Translations

Edit `/client/src/contexts/LanguageContext.tsx` to add/modify translations:

```typescript
const translations: Record<Language, Record<string, string>> = {
  en: {
    'key': 'English text',
  },
  ar: {
    'key': 'النص بالعربية',
  },
};
```

---

## 📊 Performance Optimization

- **Static Generation**: All pages pre-rendered as static HTML
- **Image Optimization**: Use optimized image formats (WebP, AVIF)
- **Lazy Loading**: Product images load on demand
- **Code Splitting**: Routes split automatically for faster loading
- **Caching**: Static assets cached aggressively

---

## 🔒 Security

- **No Backend**: Eliminates server-side vulnerabilities
- **Static Hosting**: Reduced attack surface
- **Snipcart Checkout**: PCI-compliant payment processing
- **Git-Based CMS**: All changes tracked and auditable
- **No User Data**: No customer database or login system

---

## 🧪 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Support

For issues, questions, or feature requests:

1. **GitHub Issues**: Create an issue on the repository
2. **Email**: info@tab3ah.com
3. **Documentation**: Check the `/docs` folder for detailed guides

---

## 🎯 Future Enhancements

- [ ] Advanced product filtering (price range, ratings)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Multi-currency support
- [ ] Social media integration
- [ ] Blog section

---

## 🙏 Acknowledgments

Built with:
- **React 19** - UI framework
- **Tailwind CSS 4** - Styling
- **Wouter** - Routing
- **Snipcart** - E-commerce
- **Netlify CMS** - Content management
- **shadcn/ui** - Component library

---

**Tab3ah Store** — Bringing 3D printing to everyone. 🖨️✨
