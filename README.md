# Site Web BDE Sup'RNova

Site web officiel du Bureau des Étudiants Sup'RNova de Sup de Co Rennes, développé avec Next.js 14, TypeScript et TailwindCSS.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ ou 20+
- npm, yarn ou pnpm

### Installation

```bash
# Cloner le dépôt
git clone [url-du-repo]
cd BDESIte

# Installer les dépendances (choisir l'un des trois)
pnpm install
# ou
npm install
# ou
yarn install
```

### Développement

```bash
# Lancer le serveur de développement
pnpm dev
# ou
npm run dev
# ou
yarn dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
# Créer le build
pnpm build

# Lancer le serveur de production
pnpm start
```

## 📁 Structure du projet

```
BDESIte/
├── app/                          # Pages Next.js (App Router)
│   ├── page.tsx                  # Page d'accueil
│   ├── bde/                      # Page Le BDE
│   ├── partenaires/              # Page Partenaires
│   ├── evenements/               # Page Événements
│   │   └── [slug]/               # Détail d'un événement
│   ├── carte-bde/                # Page Carte BDE
│   ├── contact/                  # Page Contact
│   ├── mentions-legales/         # Mentions légales
│   ├── politique-confidentialite/# Politique de confidentialité
│   ├── layout.tsx                # Layout racine
│   └── globals.css               # Styles globaux
├── components/                   # Composants React réutilisables
│   ├── Header.tsx                # En-tête du site
│   ├── Footer.tsx                # Pied de page
│   ├── Hero.tsx                  # Bannière principale
│   ├── Button.tsx                # Bouton
│   ├── Badge.tsx                 # Badge
│   ├── Container.tsx             # Conteneur
│   ├── Section.tsx               # Section de page
│   ├── PartnerCard.tsx           # Carte partenaire
│   ├── EventCard.tsx             # Carte événement
│   ├── TeamCard.tsx              # Carte membre d'équipe
│   ├── Filters.tsx               # Composant de filtres
│   └── EmptyState.tsx            # État vide
├── lib/                          # Bibliothèques et utilitaires
│   ├── data.ts                   # Fonctions de chargement des données
│   ├── schemas.ts                # Schémas Zod pour validation
│   ├── utils.ts                  # Fonctions utilitaires
│   └── seo.ts                    # Configuration SEO
├── data/                         # Données JSON (IMPORTANT !)
│   ├── partners.json             # Liste des partenaires
│   ├── events.json               # Liste des événements
│   ├── team.json                 # Membres de l'équipe
│   └── settings.json             # Paramètres généraux
├── public/                       # Fichiers statiques
│   ├── fonts/                    # Polices personnalisées
│   └── images/                   # Images (logos, visuels)
│       ├── partners/             # Logos des partenaires
│       ├── events/               # Visuels des événements
│       └── team/                 # Photos de l'équipe
└── README.md                     # Ce fichier
```

## 📝 Modifier les données

Toutes les données du site sont stockées dans des fichiers JSON dans le dossier `/data`. Aucune base de données n'est nécessaire !

### Ajouter un partenaire

Éditer `/data/partners.json` :

```json
{
  "id": "identifiant-unique",
  "name": "Nom du partenaire",
  "category": "bar",
  "city": "Rennes",
  "logo": "/images/partners/logo.png",
  "advantages": [
    "-10% sur l'addition",
    "Happy hour prolongé"
  ],
  "conditions": "Valable avec la carte BDE",
  "website": "https://example.com",
  "address": "12 Rue Exemple, 35000 Rennes",
  "active": true
}
```

**Catégories disponibles :** `bar`, `restaurant`, `sport`, `culture`, `services`, `shopping`, `autre`

### Ajouter un événement

Éditer `/data/events.json` :

```json
{
  "slug": "mon-evenement-2025",
  "title": "Mon Événement",
  "date": "2025-12-31T20:00:00+01:00",
  "place": "Lieu de l'événement",
  "cover": "/images/events/mon-evenement.jpg",
  "tags": ["soirée", "campus"],
  "description": "Description détaillée de l'événement...",
  "ticketUrl": "https://billetterie.example.com",
  "published": true
}
```

**Important :** Le format de date doit être ISO 8601 avec timezone (ex: `2025-12-31T20:00:00+01:00`)

### Ajouter un membre de l'équipe

Éditer `/data/team.json` :

```json
{
  "name": "Prénom NOM",
  "role": "Poste",
  "photo": "/images/team/prenom.jpg",
  "links": {
    "instagram": "https://instagram.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "email": "prenom.nom@example.com"
  }
}
```

### Modifier les paramètres généraux

Éditer `/data/settings.json` :

```json
{
  "association": "BDE Sup'RNova",
  "year": "2025-2026",
  "email": "bureau@suprennes.me",
  "shopUrl": "https://boutique.suprennes.me",
  "instagram": "https://instagram.com/...",
  "discord": "https://discord.gg/...",
  "facebook": "https://facebook.com/...",
  "linkedin": "https://linkedin.com/company/..."
}
```

## 🖼️ Ajouter des images

### Logos partenaires

1. Placer le logo dans `/public/images/partners/`
2. Format recommandé : PNG avec fond transparent
3. Taille recommandée : 200x200px
4. Référencer dans `partners.json` : `"logo": "/images/partners/nom-fichier.png"`

### Visuels événements

1. Placer l'image dans `/public/images/events/`
2. Format recommandé : JPG ou PNG
3. Ratio recommandé : 16:9 (ex: 1920x1080px)
4. Référencer dans `events.json` : `"cover": "/images/events/nom-fichier.jpg"`

### Photos équipe

1. Placer la photo dans `/public/images/team/`
2. Format recommandé : JPG
3. Taille recommandée : 500x500px (carré)
4. Référencer dans `team.json` : `"photo": "/images/team/prenom.jpg"`

## 🎨 Charte graphique

### Couleurs

- **Rouge principal** : `#CC3533`
- **Jaune principal** : `#f8cf0e`
- **Jaune pâle** : `#ffe492`
- **Noir** : `#000000`
- **Blanc** : `#ffffff`

Utilisation dans Tailwind :
```tsx
<div className="bg-brand-red text-brand-white">...</div>
```

### Gradients

- **Gradient principal** : `bg-grad-primary` (gris → blanc, 135°)
- **Gradient secondaire** : `bg-grad-secondary` (rouge → jaune, 90°)

### Polices

- **Titres** : League Spartan (`font-spartan`)
- **Textes** : Merriweather (`font-merriweather`)
- **CTA** : Chunk Five (`font-chunk`)

## 🚢 Déploiement

### Vercel (recommandé)

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Connecter votre dépôt Git
3. Vercel détecte automatiquement Next.js et configure tout
4. Chaque push sur `main` déclenche un déploiement

### Autres plateformes

Le site peut être déployé sur n'importe quelle plateforme supportant Next.js :
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

**Configuration requise :**
- Build command : `npm run build`
- Output directory : `.next`
- Node version : 18+

## 🔧 Commandes utiles

```bash
# Développement
pnpm dev

# Build de production
pnpm build

# Lancer la prod localement
pnpm start

# Linting
pnpm lint

# Formattage du code
pnpm format
```

## 📱 Fonctionnalités

- ✅ Design responsive (mobile-first)
- ✅ Accessibilité (navigation clavier, ARIA)
- ✅ SEO optimisé (métadonnées, sitemap)
- ✅ Performance optimisée (images, fonts)
- ✅ Animations fluides (Framer Motion)
- ✅ Validation des données (Zod)
- ✅ Mode réduit pour animations (`prefers-reduced-motion`)
- ✅ Pages 404 personnalisées

## 🛠️ Technologies utilisées

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styles** : TailwindCSS
- **Animations** : Framer Motion
- **Validation** : Zod
- **Optimisation images** : next/image
- **Fonts** : next/font (Google Fonts + local)

## 📄 Licence

© 2025 BDE Sup'RNova. Tous droits réservés.

## 🤝 Contribution

Pour toute question ou suggestion :
- Email : bureau@suprennes.me
- Instagram : [@bde_suprrnova](https://instagram.com/bde_suprrnova)

## 🐛 Problèmes connus

### Erreur : Font Chunk Five introuvable

Si vous voyez une erreur concernant `ChunkFive-Regular.woff2`, vous avez deux options :
1. Ajouter la police dans `/public/fonts/`
2. Ou supprimer la référence dans `app/layout.tsx` (les fallbacks Impact/Arial Black seront utilisés)

### Build échoue avec les images

Si le build échoue car des images sont manquantes, ajoutez des placeholders ou commentez temporairement les références dans les fichiers JSON.

### Erreur Windows : Icon Generation (RÉSOLU)

**Problème :** Sur Windows, le serveur de développement peut crasher avec l'erreur :
```
TypeError: Invalid URL - '.\\file:\\C:\\Users\\...\\noto-sans-v27-latin-regular.ttf'
```

**Solution :** Les fichiers `app/icon.tsx` et `app/apple-icon.tsx` incluent maintenant une gestion d'erreur robuste avec fallback automatique. Si la génération dynamique d'icônes échoue (notamment sur Windows à cause de problèmes de chemins de fichiers avec `@vercel/og`), une icône de secours simple sera générée automatiquement. Les icônes statiques sont également configurées dans les métadonnées comme solution de repli.

---

**Développé avec ❤️ par le BDE Sup'RNova**

