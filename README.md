# Site Web BDE Sup'RNova

Site web officiel du Bureau des Étudiants Sup'RNova de Sup de Vinci Rennes, développé avec Next.js 14, TypeScript, TailwindCSS, PostgreSQL et MinIO.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ ou 20+
- npm, yarn ou pnpm
- Docker & Docker Compose (pour la production)
- PostgreSQL (local ou Docker)
- MinIO (optionnel, pour le stockage d'images)

### Installation

```bash
# Cloner le dépôt
git clone [url-du-repo]
cd BDESIte

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push

# Seeder la base de données (optionnel)
npx tsx prisma/seed-settings.ts
npx tsx prisma/seed-team.ts
npx tsx prisma/seed-stock.ts
npx tsx prisma/seed-events.ts
npx tsx prisma/seed-partners.ts
```

### Variables d'environnement

Créer un fichier `.env` avec :

```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/bdesite"
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=bdesite
DB_HOST=localhost

# Authentification
AUTH_SECRET="votre-secret-auth-genere"
AUTH_TRUST_HOST=true
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="motdepasse-admin"

# MinIO (stockage images)
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
MINIO_BUCKET_NAME=bdesite
MINIO_ENDPOINT=localhost
NEXT_PUBLIC_MINIO_URL=http://localhost:9002
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
# Créer le build
npm run build

# Lancer le serveur de production
npm start
```

## 🐳 Déploiement Docker

### Configuration

1. Créer un fichier `.env` sur le serveur avec toutes les variables d'environnement
2. Lancer les conteneurs :

```bash
docker compose up -d --build
```

### Migration automatique

Au premier démarrage, le conteneur exécute automatiquement :
- Les migrations Prisma
- L'upload des images vers MinIO
- L'import des données JSON vers la base de données
- La création de l'utilisateur admin

### Migration manuelle

Pour migrer manuellement les données depuis les fichiers JSON :

```bash
# Dans le conteneur
docker compose exec app npm run migrate:prod

# Ou localement
npm run migrate:prod
```

### Services Docker

| Service | Port | Description |
|---------|------|-------------|
| `app` | 3000 | Application Next.js |
| `db` | 5433 | PostgreSQL |
| `minio` | 9002 (API), 9001 (Console) | Stockage S3 |

### Commandes utiles

```bash
# Voir les logs
docker compose logs -f app

# Redémarrer l'application
docker compose restart app

# Reconstruire après modifications
docker compose up -d --build

# Arrêter tous les services
docker compose down

# Supprimer les volumes (attention: perte de données)
docker compose down -v
```

## 📁 Structure du projet

```
BDESIte/
├── app/                          # Pages Next.js (App Router)
│   ├── page.tsx                  # Page d'accueil
│   ├── admin/                    # Interface d'administration
│   │   ├── page.tsx              # Dashboard admin
│   │   ├── stock/                # Gestion du stock confiserie
│   │   ├── team/                 # Gestion de l'équipe
│   │   ├── settings/             # Paramètres du site
│   │   ├── events/               # Gestion des événements
│   │   └── partners/             # Gestion des partenaires
│   ├── confiserie/               # Page boutique confiserie
│   ├── partenaires/              # Page Partenaires
│   ├── evenements/               # Page Événements
│   │   └── [slug]/               # Détail d'un événement
│   ├── carte-bde/                # Page Carte BDE
│   ├── login/                    # Page de connexion admin
│   └── layout.tsx                # Layout racine
├── components/                   # Composants React
│   ├── admin/                    # Composants admin
│   │   ├── ProductForm.tsx       # Formulaire produit
│   │   ├── TeamMemberForm.tsx    # Formulaire membre équipe
│   │   ├── SettingsForm.tsx      # Formulaire paramètres
│   │   └── DeleteButton.tsx      # Bouton suppression
│   ├── Header.tsx                # En-tête du site
│   ├── Footer.tsx                # Pied de page
│   ├── StockDisplay.tsx          # Affichage stock confiserie
│   ├── OptimizedImage.tsx        # Image avec blur placeholder
│   ├── EventCard.tsx             # Carte événement
│   ├── TeamCard.tsx              # Carte membre d'équipe
│   └── PartnerCard.tsx           # Carte partenaire
├── lib/                          # Bibliothèques et utilitaires
│   ├── prisma.ts                 # Client Prisma
│   ├── minio.ts                  # Client MinIO
│   ├── data.ts                   # Fonctions de chargement des données
│   ├── actions-stock.ts          # Server actions stock
│   ├── actions-team.ts           # Server actions équipe
│   ├── actions-settings.ts       # Server actions paramètres
│   ├── actions-events.ts         # Server actions événements
│   ├── actions-partners.ts       # Server actions partenaires
│   ├── blur-placeholders.ts      # Placeholders flou pour images
│   └── image-url.ts              # Utilitaire URLs images
├── prisma/                       # Configuration Prisma
│   ├── schema.prisma             # Schéma de la base de données
│   ├── seed-*.ts                 # Scripts de seeding
│   └── migrations/               # Migrations SQL
├── data/                         # Données JSON (fallback)
│   ├── partners.json             # Partenaires (fallback)
│   ├── events.json               # Événements (fallback)
│   ├── team.json                 # Équipe (fallback)
│   ├── stock.json                # Stock (fallback)
│   └── settings.json             # Paramètres (fallback)
├── public/                       # Fichiers statiques
│   ├── fonts/                    # Polices personnalisées
│   └── images/                   # Images locales
├── scripts/                      # Scripts utilitaires
│   ├── optimize-images.ts        # Optimisation images
│   └── generate-blur-placeholders.ts # Génération blur
├── docker-compose.yml            # Configuration Docker
├── Dockerfile                    # Image Docker
└── docker-entrypoint.sh          # Script d'entrée Docker
```

## 🔐 Interface d'administration

Accéder à `/admin` et se connecter avec les identifiants définis dans `.env`.

### Fonctionnalités admin

| Section | Description |
|---------|-------------|
| **Stock** | Gérer les produits de la confiserie (nom, prix, quantité, image) |
| **Équipe** | Gérer les membres du BDE (photo, rôle, réseaux sociaux) |
| **Événements** | Créer et modifier les événements |
| **Partenaires** | Gérer les partenaires et leurs avantages |
| **Paramètres** | Modifier les informations générales du site |

### Upload d'images

Les images uploadées via l'admin sont stockées sur MinIO (S3-compatible). Assurez-vous que MinIO est configuré et accessible.

## 🗄️ Base de données

### Modèles Prisma

- **Product** : Produits de la confiserie
- **TeamMember** : Membres de l'équipe
- **Event** : Événements
- **Partner** : Partenaires
- **Settings** : Paramètres du site
- **User** : Utilisateurs admin

### Commandes Prisma

```bash
# Générer le client
npx prisma generate

# Appliquer le schéma à la DB
npx prisma db push

# Ouvrir Prisma Studio
npx prisma studio

# Créer une migration
npx prisma migrate dev --name nom_migration

# Appliquer les migrations en prod
npx prisma migrate deploy
```

## 🖼️ Optimisation des images

### Images optimisées automatiquement

- Conversion automatique en WebP/AVIF
- Redimensionnement responsive
- Placeholders flou pendant le chargement
- Mise en cache agressive

### Scripts d'optimisation

```bash
# Optimiser toutes les images du dossier public
npx tsx scripts/optimize-images.ts

# Générer les placeholders flou
npx tsx scripts/generate-blur-placeholders.ts
```

### Recommandations

| Type | Format | Taille max | Ratio |
|------|--------|------------|-------|
| Événements | JPG/PNG | 500 Ko | 16:9 |
| Équipe | JPG | 200 Ko | 1:1 |
| Partenaires | PNG | 100 Ko | 1:1 |
| Produits | PNG | 100 Ko | 1:1 |

## 🎨 Charte graphique

### Couleurs

- **Rouge principal** : `#CC3533`
- **Jaune principal** : `#f8cf0e`
- **Jaune pâle** : `#ffe492`
- **Noir** : `#000000`
- **Blanc** : `#ffffff`

### Polices

- **Titres** : League Spartan (`font-spartan`)
- **Textes** : Merriweather (`font-merriweather`)
- **CTA** : Chunk Five (`font-chunk`)

## 📱 Fonctionnalités

- ✅ Interface d'administration complète
- ✅ Stockage d'images sur MinIO (S3)
- ✅ Base de données PostgreSQL
- ✅ Authentification sécurisée (NextAuth.js)
- ✅ Design responsive (mobile-first)
- ✅ Images optimisées avec blur placeholders
- ✅ SEO optimisé (métadonnées, sitemap)
- ✅ Animations fluides (Framer Motion)
- ✅ Validation des données (Zod)
- ✅ Déploiement Docker

## 🛠️ Technologies utilisées

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styles** : TailwindCSS
- **Base de données** : PostgreSQL + Prisma
- **Stockage** : MinIO (S3-compatible)
- **Authentification** : NextAuth.js v5
- **Animations** : Framer Motion
- **Validation** : Zod + React Hook Form
- **Optimisation images** : next/image + sharp

## 🔧 Commandes utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Lancer la prod localement
npm start

# Linting
npm run lint

# Formattage du code
npm run format

# Prisma Studio
npx prisma studio
```

## 🐛 Dépannage

### Erreur Docker : sysctl permission denied

```bash
sudo sysctl -w net.ipv4.ip_unprivileged_port_start=0
```

### Erreur : Database connection failed

Vérifier que PostgreSQL est accessible et que `DATABASE_URL` est correct.

### Images non affichées depuis MinIO

1. Vérifier que le bucket existe et est public
2. Vérifier `NEXT_PUBLIC_MINIO_URL` dans `.env`
3. Vérifier les règles CORS sur MinIO

### Build échoue avec les images

Lancer le script d'optimisation :
```bash
npx tsx scripts/optimize-images.ts
```

## 📄 Licence

© 2025-2026 BDE Sup'RNova. Tous droits réservés.

## 🤝 Contact

- Email : bureau@suprennes.me
- Instagram : [@bde_suprrnova](https://instagram.com/bde_suprrnova)

---

**Développé avec ❤️ par le BDE Sup'RNova**
