# 🚀 Démarrage rapide - Site BDE Sup'RNova

## ✅ Projet créé avec succès !

Le site web complet du BDE Sup'RNova est maintenant prêt à être utilisé.

## 📦 Installation

```bash
cd /home/bruelmathis/Documents/BDESIte

# Installer les dépendances (déjà fait)
npm install

# Lancer en développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🎯 Ce qui a été créé

### Pages disponibles
- ✅ **Page d'accueil** (`/`) - Hero, présentation, événements à venir, newsletter
- ✅ **Le BDE** (`/bde`) - Mission, valeurs, équipe
- ✅ **Partenaires** (`/partenaires`) - Liste filtrée des partenaires avec avantages
- ✅ **Événements** (`/evenements`) - Liste des événements à venir et passés
- ✅ **Détail événement** (`/evenements/[slug]`) - Page détaillée pour chaque événement
- ✅ **Carte BDE** (`/carte-bde`) - Présentation de la carte et avantages
- ✅ **Contact** (`/contact`) - Formulaire de contact et coordonnées
- ✅ **Mentions légales** (`/mentions-legales`)
- ✅ **Politique de confidentialité** (`/politique-confidentialite`)
- ✅ **Page 404** personnalisée

### Composants créés
- Header avec navigation responsive
- Footer avec réseaux sociaux
- Hero animé (Framer Motion)
- Cartes partenaires, événements, équipe
- Système de filtres
- Boutons personnalisés selon la charte
- Badges
- États vides

### Données JSON
- ✅ `data/partners.json` - 10 partenaires exemples (bars, restos, sport, culture...)
- ✅ `data/events.json` - 8 événements exemples
- ✅ `data/team.json` - 6 membres de l'équipe
- ✅ `data/settings.json` - Paramètres globaux (email, réseaux, boutique...)

### Configuration
- ✅ Tailwind avec couleurs BDE (rouge #CC3533, jaune #f8cf0e)
- ✅ Gradients personnalisés (principal et secondaire)
- ✅ Fonts Google (League Spartan + Merriweather)
- ✅ TypeScript strict
- ✅ Validation Zod
- ✅ SEO optimisé
- ✅ Responsive mobile-first
- ✅ Accessibilité (ARIA, navigation clavier)

## 🎨 Modifier les données

### Ajouter un partenaire
Éditer `data/partners.json` :
```json
{
  "id": "nouveau-partenaire",
  "name": "Nom du partenaire",
  "category": "bar",
  "city": "Rennes",
  "advantages": ["-10% sur l'addition"],
  "active": true
}
```

### Ajouter un événement
Éditer `data/events.json` :
```json
{
  "slug": "nouvel-evenement",
  "title": "Mon Événement",
  "date": "2025-12-31T20:00:00+01:00",
  "place": "Rennes",
  "tags": ["soirée"],
  "description": "Description...",
  "published": true
}
```

### Modifier l'équipe
Éditer `data/team.json` pour ajouter/modifier des membres.

### Changer les paramètres
Éditer `data/settings.json` pour modifier email, réseaux sociaux, URL boutique, etc.

## 🖼️ Ajouter des images

Les images doivent être placées dans :
- `public/images/partners/` - Logos partenaires (PNG transparent, 200x200px)
- `public/images/events/` - Visuels événements (JPG/PNG, ratio 16:9)
- `public/images/team/` - Photos équipe (JPG, 500x500px)

**Important** : Pour le moment, les images dans les JSON sont des chemins d'exemple. Ajoutez vos vraies images ou commentez les références dans les JSON.

## 🚢 Déployer

### Sur Vercel (recommandé)
1. Push le code sur GitHub/GitLab/Bitbucket
2. Connecter le repo sur [vercel.com](https://vercel.com)
3. Vercel détecte automatiquement Next.js
4. Deploy !

### Localement
```bash
npm run build
npm start
```

## ⚠️ Points d'attention

### Font Chunk Five
La font Chunk Five n'est pas incluse (fichier manquant). Le système utilise automatiquement Impact en fallback pour les CTA. Si vous souhaitez utiliser Chunk Five :
1. Télécharger la font
2. La placer dans `public/fonts/ChunkFive-Regular.woff2`
3. Décommenter la configuration dans `app/layout.tsx`

### Images manquantes
Les JSON contiennent des références à des images qui n'existent pas encore. Options :
- Ajouter vos vraies images
- Ou commenter/supprimer les propriétés `logo`, `cover`, `photo` dans les JSON

### Formulaire de contact
Le formulaire de contact est un exemple non connecté. Pour le rendre fonctionnel :
- Utiliser un service comme Formspree, SendGrid, ou Resend
- Ou créer une API Route Next.js

## 📝 Commandes utiles

```bash
npm run dev      # Développement
npm run build    # Build production
npm start        # Serveur production
npm run lint     # Linter
```

## 🎓 Structure du code

```
BDESIte/
├── app/           # Pages Next.js (App Router)
├── components/    # Composants React
├── lib/           # Utilitaires et données
├── data/          # Fichiers JSON (à éditer)
├── public/        # Images et assets statiques
└── README.md      # Documentation complète
```

## 📖 Documentation complète

Voir `README.md` pour la documentation détaillée :
- Architecture complète
- Tous les schémas JSON
- Guide de personnalisation
- Déploiement avancé
- Troubleshooting

## ✨ Fonctionnalités

- ✅ 19 pages générées statiquement
- ✅ Filtres dynamiques (partenaires)
- ✅ Toggle événements à venir/passés
- ✅ Design moderne et responsive
- ✅ Animations fluides
- ✅ Performance optimisée (First Load JS < 150kB)
- ✅ SEO ready

## 🤝 Support

Pour toute question : bureau@suprennes.me

---

**Bon développement ! 🎉**

