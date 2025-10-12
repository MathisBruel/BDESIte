# ✅ Gestion du ticketUrl optionnel

## 🎯 Résumé

Le site gère **parfaitement** les événements avec ou sans `ticketUrl` !

## 📍 Où est utilisé ticketUrl ?

### 1. EventCard Component
**Fichier** : `components/EventCard.tsx` (ligne 62-66)

```tsx
{event.ticketUrl && !isPast && (
  <Button href={event.ticketUrl} variant="primary" className="flex-1">
    Billetterie
  </Button>
)}
```

**Comportement** :
- ✅ Si `ticketUrl` existe ET événement futur → Affiche le bouton "Billetterie"
- ✅ Si pas de `ticketUrl` → Pas de bouton (pas d'erreur)
- ✅ Si événement passé → Pas de bouton non plus

### 2. Page de détail d'événement
**Fichier** : `app/evenements/[slug]/page.tsx` (ligne 90-103)

```tsx
{event.ticketUrl && !isPast && (
  <div className="bg-grad-secondary p-6 rounded-xl text-center">
    <h3 className="text-2xl font-bold font-spartan text-white mb-4">
      Réservez votre place !
    </h3>
    <Button
      href={event.ticketUrl}
      variant="cta"
      className="bg-white text-brand-red hover:bg-white/90"
    >
      Accéder à la billetterie
    </Button>
  </div>
)}
```

**Comportement** :
- ✅ Si `ticketUrl` existe ET événement futur → Affiche le bloc billetterie complet
- ✅ Si pas de `ticketUrl` → Pas de bloc (pas d'erreur)
- ✅ Si événement passé → Pas de bloc non plus

### 3. Section événements passés
**Fichier** : `app/page.tsx` (nouvelle section)

Pas d'utilisation de `ticketUrl` → Uniquement un bouton "Voir les détails"

## 🎨 Exemples d'événements

### Événement AVEC billetterie
```json
{
  "slug": "gala-2026",
  "title": "Gala de Printemps",
  "date": "2026-03-27T19:00:00+01:00",
  "ticketUrl": "https://billetterie.suprennes.me/gala-2026",
  ...
}
```

**Affichage** :
- Carte événement → 2 boutons : "Voir détails" + "Billetterie"
- Page détail → Bloc billetterie coloré affiché

### Événement SANS billetterie
```json
{
  "slug": "afterwork-novembre",
  "title": "Afterwork Étudiant",
  "date": "2025-11-14T18:30:00+01:00",
  ...
}
```

**Affichage** :
- Carte événement → 1 seul bouton : "Voir détails"
- Page détail → Pas de bloc billetterie

## ✨ Avantages

1. **Pas d'erreur** : Les conditions empêchent les erreurs JavaScript
2. **Flexible** : Fonctionne avec ou sans billetterie
3. **Propre** : L'absence de billetterie ne laisse pas d'espace vide
4. **Logique** : Les événements passés ne montrent jamais la billetterie

## 🔧 Validation Zod

Dans `lib/schemas.ts`, le champ est bien défini comme optionnel :

```typescript
ticketUrl: z.string().url().optional()
```

Cela signifie :
- ✅ Peut être présent (doit être une URL valide)
- ✅ Peut être absent
- ✅ TypeScript le type comme `string | undefined`

## 🎯 Recommandations

Pour ajouter un événement SANS billetterie :
1. Ne pas mettre le champ `ticketUrl` du tout
2. Ou mettre `"ticketUrl": null` (non recommandé)
3. Ou simplement ne pas inclure la propriété

**Exemple minimal** :
```json
{
  "slug": "mon-evenement",
  "title": "Mon Événement",
  "date": "2025-12-31T20:00:00+01:00",
  "place": "Rennes",
  "tags": ["soirée"],
  "description": "Description...",
  "published": true
}
```

---

**Tout fonctionne parfaitement ! ✅**

