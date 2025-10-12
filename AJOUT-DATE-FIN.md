# 📅 Ajout de la date de fin pour les événements

## ✨ Nouvelle fonctionnalité

Les événements peuvent maintenant avoir une **date de fin** en plus de la date de début !

## 🎯 Cas d'usage

### Événements sur plusieurs jours
Exemple : Week-end ski, voyage, séminaire...
```json
{
  "slug": "weekend-ski-2026",
  "title": "Week-end Ski aux Arcs",
  "date": "2026-01-23T08:00:00+01:00",
  "endDate": "2026-01-25T18:00:00+01:00",
  ...
}
```

**Affichage** : "Du 23 janv. au 25 janvier 2026"

### Événements sur une journée mais avec horaire de fin
Exemple : Tournoi sportif, journée portes ouvertes...
```json
{
  "slug": "tournoi-foot",
  "title": "Tournoi de Foot",
  "date": "2025-11-08T14:00:00+01:00",
  "endDate": "2025-11-08T18:00:00+01:00",
  ...
}
```

**Affichage** : "vendredi 8 novembre 2025 • 14:00 - 18:00"

### Événements ponctuels (comme avant)
Exemple : Soirée, conférence...
```json
{
  "slug": "soiree-integration",
  "title": "Soirée d'intégration",
  "date": "2025-10-09T20:30:00+02:00",
  ...
}
```

**Affichage** : "mercredi 9 octobre 2025 • 20:30"

## 📝 Modifications apportées

### 1. Schéma Zod mis à jour
**Fichier** : `lib/schemas.ts`

```typescript
export const EventSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  endDate: z.string().optional(), // ← NOUVEAU !
  place: z.string(),
  ...
});
```

Le champ `endDate` est **optionnel**, donc tous les événements existants fonctionnent toujours !

### 2. Nouvelle fonction utilitaire
**Fichier** : `lib/utils.ts`

```typescript
export function formatDateTimeRange(startDate: string | Date, endDate?: string | Date): string
```

Cette fonction :
- Si pas de `endDate` → Affiche juste la date de début
- Si `endDate` le même jour → Affiche "Date de HH:MM à HH:MM"
- Si `endDate` un autre jour → Affiche "Du ... au ..."

### 3. EventCard mis à jour
**Fichier** : `components/EventCard.tsx`

Affichage intelligent :
- **Même jour** : "8 novembre 2025 • 14:00 - 18:00"
- **Plusieurs jours** : "Du 23 janv. au 25 janv."
- **Sans date de fin** : "9 octobre 2025 • 20:30" (comme avant)

### 4. Page de détail mise à jour
**Fichier** : `app/evenements/[slug]/page.tsx`

La section "Date" affiche maintenant :
- La plage de dates si `endDate` existe
- Juste la date de début sinon

### 5. Section événements passés mise à jour
**Fichier** : `app/page.tsx`

Les cartes des événements passés affichent aussi les plages de dates.

## 🎨 Exemples d'affichage

### Dans les cartes d'événements

**Événement d'une soirée** :
```
📅 vendredi 8 novembre 2025 • 20:00
```

**Événement avec heure de fin** :
```
📅 vendredi 8 novembre 2025 • 14:00 - 18:00
```

**Événement sur plusieurs jours** :
```
📅 Du 23 janv. au 25 janv.
```

### Dans la page de détail

**Section Date** :
```
📅 Date
   Du vendredi 23 janvier 2026 à 08:00
   au dimanche 25 janvier 2026 à 18:00
```

Ou pour un événement simple :
```
📅 Date
   mercredi 9 octobre 2025 à 20:30
```

## 📋 Comment utiliser

### Ajouter une date de fin à un événement existant

**Avant** :
```json
{
  "slug": "tournoi-foot",
  "title": "Tournoi de Foot",
  "date": "2025-11-08T14:00:00+01:00",
  ...
}
```

**Après** :
```json
{
  "slug": "tournoi-foot",
  "title": "Tournoi de Foot",
  "date": "2025-11-08T14:00:00+01:00",
  "endDate": "2025-11-08T18:00:00+01:00",
  ...
}
```

### Créer un événement sur plusieurs jours

```json
{
  "slug": "weekend-integration",
  "title": "Week-end d'intégration",
  "date": "2025-10-10T09:00:00+02:00",
  "endDate": "2025-10-12T17:00:00+02:00",
  "place": "La Baule",
  "cover": "/images/events/weekend.jpg",
  "tags": ["voyage", "intégration"],
  "description": "3 jours d'activités à la mer !",
  "published": true
}
```

## ✅ Compatibilité

- ✅ **Rétrocompatible** : Tous les événements sans `endDate` fonctionnent
- ✅ **Optionnel** : Pas besoin d'ajouter `endDate` à tous les événements
- ✅ **Flexible** : Fonctionne pour les horaires ET les jours multiples
- ✅ **Format cohérent** : Format ISO 8601 comme pour `date`

## 🚀 Exemple complet

```json
{
  "slug": "gala-integration",
  "title": "Gala d'intégration",
  "date": "2025-10-15T19:00:00+02:00",
  "endDate": "2025-10-16T02:00:00+02:00",
  "place": "Couvent des Jacobins, Rennes",
  "cover": "/images/events/gala.jpg",
  "tags": ["soirée", "gala", "prestigieux"],
  "description": "La soirée la plus prestigieuse de l'année !",
  "ticketUrl": "https://billetterie.suprennes.me/gala",
  "published": true
}
```

**Affichage** : "Du 15 octobre à 19:00 au 16 octobre à 02:00"

---

**Fonctionnalité ajoutée ! 📅✨**

