import { CheckCircle, Users, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-accent/10 to-secondary/10 dark:from-accent/5 dark:to-secondary/5 py-16">
          <div className="container">
            <h1 className="text-4xl font-bold gradient-text mb-4">{t('about.title')}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('about.description')}
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Tab3ah was founded with a vision to revolutionize the 3D printing industry by making premium printing services accessible to everyone. We believe that innovation should be affordable and that everyone deserves the ability to bring their ideas to life.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our team of passionate engineers and designers work tirelessly to deliver exceptional quality and customer service. We invest in the latest technology and continuously improve our processes to ensure you receive the best possible products.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're a hobbyist, professional, or business, Tab3ah is your trusted partner in 3D printing excellence.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-xl p-12 flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="text-6xl mb-4">🖨️</div>
                <p className="text-xl font-semibold">Tab3ah</p>
                <p className="text-muted-foreground">Modern 3D Printing Solutions</p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-xl">
                <CheckCircle className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. Every product is carefully inspected and tested to meet our high standards.
                </p>
              </div>

              <div className="glass p-8 rounded-xl">
                <Users className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We listen to your feedback and continuously improve our services.
                </p>
              </div>

              <div className="glass p-8 rounded-xl">
                <Zap className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We stay at the forefront of 3D printing technology to deliver cutting-edge solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-gradient-to-r from-accent to-secondary rounded-xl px-8 md:px-16 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">500+</p>
                <p className="text-white/80">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">2000+</p>
                <p className="text-white/80">Products Printed</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">98%</p>
                <p className="text-white/80">Satisfaction Rate</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">24/7</p>
                <p className="text-white/80">Support Available</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-accent hover:underline cursor-pointer">info@tab3ah.com</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-accent hover:underline cursor-pointer">+966 XX XXX XXXX</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-muted-foreground">Saudi Arabia</p>
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
