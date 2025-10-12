# 📸 Nouvelle Section : Événements Passés

## ✨ Ce qui a été ajouté

Une nouvelle section affichant les **3 derniers événements terminés** avec un style totalement différent des événements à venir.

### Position
Entre la section "Événements à venir" et la section "Carte BDE"

### Style différencié 🎨

#### Événements à venir :
- ✅ Fond gris clair
- ✅ Couleurs vives (rouge/jaune BDE)
- ✅ Badge coloré
- ✅ Style énergique et dynamique

#### Événements passés (NOUVEAU) :
- 📸 Titre en gris : "📸 Nos derniers événements"
- 🎬 Sous-titre : "Retour en images sur les meilleurs moments !"
- 🎨 **Images en noir et blanc** (grayscale)
- ✨ **Au hover → couleurs** + zoom (effet wow!)
- 🏷️ Badge "✓ Terminé" en gris foncé
- 📅 Date en gris
- 🎯 Style sobre et nostalgique
- 🔗 Lien "Voir les détails" discret

### Effets visuels 🎭

1. **Image par défaut :**
   - Noir et blanc (grayscale)
   - Overlay noir à 40%
   - Badge "✓ Terminé" bien visible

2. **Au hover :**
   - Image reprend ses couleurs
   - Overlay s'éclaircit (20%)
   - Zoom x1.1 sur l'image
   - Carte monte légèrement (scale 1.03)
   - Ombre plus prononcée

3. **Animations :**
   - Apparition au scroll (comme les autres sections)
   - Stagger effect (0.1s de délai entre chaque carte)
   - Transitions fluides (500ms pour le grayscale)

### Contenu affiché

Pour chaque événement passé :
- 📷 Photo (en noir et blanc → couleur au hover)
- 🏷️ Badge "✓ Terminé"
- 📅 Date complète en français
- 📝 Titre
- 🏷️ Tags (max 3)
- 📄 Description (2 lignes max)
- 🔗 Lien "Voir les détails →"

### Message de fin

Un petit message sympa à la fin :
> "Et ce n'est que le début... Plein d'autres souvenirs à venir ! 🚀"

## 🎯 Logique

```typescript
const pastEvents = getPastEvents().slice(0, 3);
```

- Récupère tous les événements passés
- Les trie par date (plus récents en premier)
- Ne garde que les 3 premiers
- Affiche la section seulement si `pastEvents.length > 0`

## 🎨 Palette de couleurs (différente)

Alors que les événements à venir utilisent :
- Rouge BDE (#CC3533)
- Jaune BDE (#f8cf0e)

Les événements passés utilisent :
- Gris foncé (#374151, #4B5563)
- Gris clair (#E5E7EB, #F3F4F6)
- Blanc (#FFFFFF)
- Noir pour les overlays

## 📱 Responsive

- **Mobile** : 1 colonne
- **Tablette** : 3 colonnes (même sur tablette)
- **Desktop** : 3 colonnes

## ⚡ Performance

- Images chargées avec `<img>` standard (pas de next/image pour éviter la complexité)
- Transitions GPU (grayscale, scale, transform)
- Lazy loading au scroll (viewport once)

## 🚀 Test

Le serveur tourne sur **http://localhost:3001**

Pour voir la section :
1. Va sur l'accueil
2. Scroll après la section "Événements à venir"
3. Tu verras "📸 Nos derniers événements"
4. Les images sont en noir et blanc
5. **Passe la souris dessus** → Les couleurs reviennent ! ✨

**Note** : Pour le moment, il n'y a pas d'événements passés dans `events.json`. La section n'apparaîtra que quand il y aura au moins 1 événement passé (date < aujourd'hui).

Pour tester, tu peux modifier la date d'un événement dans `data/events.json` pour qu'elle soit dans le passé, par exemple :
```json
"date": "2024-10-09T20:30:00+02:00"
```

---

**Section ajoutée avec succès ! 📸✨**

