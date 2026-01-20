"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="min-h-screen flex items-center justify-center bg-grad-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src="/images/assets/Logo couleur.png"
              alt="Logo BDE"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 font-spartan">
            Administration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connectez-vous pour gérer le site
          </p>
        </div>
        
        <form action={dispatch} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="username"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent sm:text-sm transition-all duration-200"
                placeholder="admin@bde.fr"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent sm:text-sm transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a href="/" className="font-medium text-brand-red hover:text-brand-red/80 transition-colors">
                Retour au site
              </a>
            </div>
          </div>

          <div>
            <LoginButton />
          </div>
          
          <div
            className="flex h-8 items-end space-x-1 justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <p className="text-sm text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      className="w-full flex justify-center py-3 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5" 
      aria-disabled={pending}
    >
      {pending ? "Connexion..." : "Se connecter"}
    </Button>
  );
}
