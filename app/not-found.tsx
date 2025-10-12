import Link from "next/link";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
            <h1 className="text-9xl font-bold font-spartan text-brand-red mb-4">404</h1>
            <h2 className="text-3xl font-bold font-spartan mb-4">Page introuvable</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>
            <Button variant="primary" href="/">
              Retour à l&apos;accueil
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

