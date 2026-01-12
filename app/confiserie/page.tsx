import StockDisplay from '@/components/StockDisplay';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { Footer } from '@/components/Footer';

export default function StockPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-grad-secondary min-h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl animate-pulse">📦</div>
            <div className="absolute bottom-10 right-10 text-9xl animate-bounce delay-100">🛒</div>
          </div>

          <Container>
            <div className="relative z-10 text-center">
              <h1 className="text-5xl md:text-7xl font-bold font-spartan text-brand-black mb-6 leading-tight">
                Confiserie BDE
              </h1>
              <div className="w-24 h-2 bg-brand-black mx-auto mb-8 rounded-full"></div>
              <p className="text-xl md:text-2xl text-brand-black/80 font-medium max-w-2xl mx-auto">
                Retrouvez ici la disponibilité de nos snacks et boissons en temps réel ! ⚡
              </p>
            </div>
          </Container>
        </section>

        {/* Content Section */}
        <Section className="bg-white" id="stock-list">
           <StockDisplay />
        </Section>
      </main>
      <Footer />
    </>
  );
}
