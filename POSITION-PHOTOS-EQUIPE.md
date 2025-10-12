# 📸 Positionnement des photos d'équipe

## ✨ Nouvelle fonctionnalité

Tu peux maintenant **contrôler la position** de chaque photo de profil dans les cartes de l'équipe !

## 🎯 Pourquoi ?

Certaines photos ne sont pas parfaitement centrées. Par exemple :
- Le visage est trop en haut → Il faut centrer vers le bas
- Le visage est sur le côté → Il faut centrer à gauche ou à droite
- Photo en plan américain → Il faut centrer vers le haut

## 📝 Comment l'utiliser

Dans `data/team.json`, ajoute le champ `photoPosition` :

### Exemple 1 : Centrer en haut (par défaut pour toutes les images)
```json
{
  "name": "Mathis BRUEL",
  "role": "Président",
  "photo": "/images/team/mathis.jpg",
  "photoPosition": "top",
  "links": {
    "instagram": "https://instagram.com/mathis_bruel"
  }
}
```

### Exemple 2 : Centrer au milieu (comportement normal)
```json
{
  "name": "Solenn COULON",
  "role": "Trésorière",
  "photo": "/images/team/solenn.jpg",
  "photoPosition": "center",
  "links": {
    "instagram": "https://instagram.com/solenn_cln"
  }
}
```

### Exemple 3 : Centrer en bas
```json
{
  "name": "Lucas MARTIN",
  "role": "Vice-Président",
  "photo": "/images/team/lucas.jpg",
  "photoPosition": "bottom",
  "links": {
    "linkedin": "https://linkedin.com/in/lucas-martin"
  }
}
```

## 🎨 Toutes les positions disponibles

### Positions simples
- **`"top"`** : Centré horizontalement, aligné en haut
- **`"center"`** : Centré (défaut si rien n'est spécifié)
- **`"bottom"`** : Centré horizontalement, aligné en bas
- **`"left"`** : Centré verticalement, aligné à gauche
- **`"right"`** : Centré verticalement, aligné à droite

### Positions combinées (pour les cas complexes)
- **`"top-left"`** : Coin supérieur gauche
- **`"top-right"`** : Coin supérieur droit
- **`"bottom-left"`** : Coin inférieur gauche
- **`"bottom-right"`** : Coin inférieur droit

## 🖼️ Exemples visuels

### Photo avec visage trop en haut
```
Photo originale : 
┌─────────┐
│  😊     │ ← Visage en haut
│         │
│         │
└─────────┘
```

**Solution** : `"photoPosition": "top"`
```
Résultat dans le cercle :
    ┌───┐
    │😊 │ ← Parfait !
    └───┘
```

### Photo avec visage trop en bas
```
Photo originale : 
┌─────────┐
│         │
│         │
│  😊     │ ← Visage en bas
└─────────┘
```

**Solution** : `"photoPosition": "bottom"`
```
Résultat dans le cercle :
    ┌───┐
    │😊 │ ← Parfait !
    └───┘
```

### Photo avec visage sur le côté gauche
```
Photo originale : 
┌─────────┐
│ 😊      │ ← Visage à gauche
│         │
└─────────┘
```

**Solution** : `"photoPosition": "left"`
```
Résultat dans le cercle :
    ┌───┐
    │😊 │ ← Parfait !
    └───┘
```

## 🔧 Configuration actuelle recommandée

Si tu veux que **toutes les photos** soient centrées en haut (comme tu le mentionnes), ajoute `"photoPosition": "top"` à chaque membre :

```json
[
  {
    "name": "Mathis BRUEL",
    "role": "Président",
    "photo": "/images/team/mathis.jpg",
    "photoPosition": "top",
    "links": { ... }
  },
  {
    "name": "Solenn COULON",
    "role": "Trésorière",
    "photo": "/images/team/solenn.jpg",
    "photoPosition": "top",
    "links": { ... }
  },
  {
    "name": "Lucas MARTIN",
    "role": "Vice-Président",
    "photo": "/images/team/lucas.jpg",
    "photoPosition": "top",
    "links": { ... }
  }
]
```

## ✅ Compatibilité

- **Optionnel** : Si tu ne mets pas `photoPosition`, ça sera centré (comme avant)
- **Rétrocompatible** : Tous les membres existants fonctionnent sans modification
- **Flexible** : Tu peux avoir des positions différentes pour chaque membre

## 🎯 Conseils

1. **Teste différentes positions** : Essaie plusieurs valeurs pour voir ce qui marche le mieux
2. **Privilégie les positions simples** : `top`, `center`, `bottom` suffisent dans 90% des cas
3. **Photos carrées** : Si possible, prends des photos carrées (1:1) pour un meilleur rendu
4. **Visage centré** : Idéalement, le visage doit être au centre de la photo originale

## 🚀 Exemple complet

```json
[
  {
    "name": "Mathis BRUEL",
    "role": "Président",
    "photo": "/images/team/mathis.jpg",
    "photoPosition": "top",
    "links": {
      "instagram": "https://instagram.com/mathis_bruel",
      "linkedin": "https://linkedin.com/in/mathis-bruel"
    }
  },
  {
    "name": "Solenn COULON",
    "role": "Trésorière",
    "photo": "/images/team/solenn.jpg",
    "photoPosition": "center",
    "links": {
      "instagram": "https://instagram.com/solenn_cln"
    }
  },
  {
    "name": "Lucas MARTIN",
    "role": "Vice-Président",
    "photo": "/images/team/lucas.jpg",
    "photoPosition": "top",
    "links": {
      "instagram": "https://instagram.com/lucas.mtn",
      "linkedin": "https://linkedin.com/in/lucas-martin"
    }
  }
]
```

---

**Positionnement configuré ! 📸✨**

