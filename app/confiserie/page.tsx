import StockDisplay from '@/components/StockDisplay';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { Footer } from '@/components/Footer';
import { getTexts } from "@/lib/data";
import { Badge } from '@/components/Badge';

export default async function StockPage() {
  const texts = await getTexts();

  return (
    <>
      <Header texts={texts} />
      <main>
        <section className="relative bg-grad-secondary min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-brand-yellow/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-red/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/40 rounded-full blur-2xl" />
          </div>

          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-16 left-[10%] text-8xl transform rotate-12">🍫</div>
            <div className="absolute top-32 right-[15%] text-7xl transform -rotate-6">🥤</div>
            <div className="absolute bottom-20 left-[20%] text-9xl transform rotate-6">🍬</div>
            <div className="absolute bottom-32 right-[25%] text-6xl transform -rotate-12">🧃</div>
            <div className="absolute top-1/2 right-[8%] text-8xl transform rotate-3">🍪</div>
          </div>

          <Container>
            <div className="relative z-10 text-center py-12">
              <Badge variant="yellow" className="text-base px-6 py-2 mb-6 text-brand-black font-bold inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Stock en temps réel
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold font-spartan text-brand-black mb-6 leading-tight">
                Confiserie <span className="text-brand-red">BDE</span>
              </h1>

              <div className="w-24 h-2 bg-brand-black mx-auto mb-8 rounded-full" />

              <p className="text-xl md:text-2xl text-brand-black/80 font-medium max-w-2xl mx-auto leading-relaxed">
                Boissons fraîches, snacks gourmands et douceurs... 
                <br className="hidden md:block" />
                De quoi tenir toute la journée ! 🚀
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg border border-white/50">
                  <span className="text-2xl mr-2">🥤</span>
                  <span className="font-semibold text-brand-black">Boissons</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg border border-white/50">
                  <span className="text-2xl mr-2">🍫</span>
                  <span className="font-semibold text-brand-black">Snacks</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg border border-white/50">
                  <span className="text-2xl mr-2">🥞</span>
                  <span className="font-semibold text-brand-black">Desserts</span>
                </div>
              </div>
            </div>
          </Container>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        <Section className="bg-white relative" id="stock-list">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow to-transparent" />
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-spartan text-brand-black mb-4">
              Nos produits disponibles
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Tous les prix sont affichés. Passez nous voir au local BDE pour faire vos achats !
            </p>
          </div>

          <StockDisplay />

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-brand-pale/30 rounded-2xl px-8 py-5 border-2 border-brand-yellow/30">
              <span className="text-3xl">📍</span>
              <div className="text-left">
                <p className="font-bold text-brand-black font-spartan">Local BDE</p>
                <p className="text-sm text-gray-600">Campus Sup de Vinci Rennes</p>
              </div>
            </div>
          </div>
        </Section>

        <section className="bg-gradient-to-br from-brand-black to-gray-900 py-16">
          <Container>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold font-spartan text-white mb-4">
                Une suggestion ? Un produit manque ?
              </h3>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                Dis-nous ce que tu aimerais voir dans notre confiserie et on fera de notre mieux pour te satisfaire !
              </p>
              <a
                href="https://www.instagram.com/bde_sup_rnova/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Contacte-nous sur Instagram
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
