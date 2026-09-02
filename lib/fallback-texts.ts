import { Texts } from "./schemas";

/**
 * Minimal fallback texts used only when database is unavailable.
 * This ensures the application can build even if the database is not accessible.
 * In production, texts should always come from the database.
 */
export const FALLBACK_TEXTS: Texts = {
  header: {
    brand: "SUP'RNOVA",
    nav: {
      home: "Accueil",
      events: "Événements",
      partners: "Partenaires",
      card: "Carte BDE",
      team: "L'équipe",
      contact: "Contact",
      stock: "Confiserie"
    },
    ctaBuyCard: "Acheter la carte"
  },
  footer: {
    navigation: "Navigation",
    nav: {
      home: "Accueil",
      events: "Événements",
      partners: "Partenaires",
      team: "Le BDE"
    },
    contact: "Contact",
    social: "Réseaux sociaux",
    legal: {
      mentions: "Mentions légales",
      privacy: "Politique de confidentialité",
      copyright: "© {year} {association}. Tous droits réservés."
    },
    associationTypeBadge: "Association loi 1901",
    schoolLine: "Bureau des Étudiants de Sup de Vinci Rennes"
  },
  home: {
    badgeYearPrefix: "Année",
    title: "BDE SUP'RNOVA",
    subtitle: "Ta vie étudiante à 100% !",
    description: "Soirées • Partenaires • Événements • Équipe",
    ctaViewEvents: "Voir les événements",
    ctaSeeAdvantages: "Découvrir les avantages",
    scrollDownAria: "Défiler vers le bas",
    presentation: {
      title: "Qui sommes-nous ?",
      convivialityTitle: "Convivialité",
      convivialityText: "On crée du lien entre tous les étudiants.",
      eventsTitle: "Événements",
      eventsText: "Des soirées, du sport, de la culture...",
      engagementTitle: "Engagement",
      engagementText: "Une équipe de passionnés à ton service !",
      intro: "Le BDE SUP'RNOVA, c'est LE Bureau des Étudiants qui fait vibrer le campus !"
    },
    upcoming: {
      title: "Événements à venir",
      subtitle: "Prêt à faire la fête ?"
    },
    past: {
      title: "Nos derniers événements",
      subtitle: "Retour en images sur les meilleurs moments !",
      completed: "Terminé",
      moreComing: "Et ce n'est que le début...",
      details: "Voir les détails",
      photos: "Voir les photos"
    },
    card: {
      title: "Carte BDE {year}",
      subtitle: "Ta carte magique pour économiser toute l'année !",
      description: "Plus de {partnersCount} partenaires à Rennes.",
      ctaBuy: "Acheter ma carte",
      ctaSeePartners: "Voir les partenaires",
      badges: [
        "Économies garanties",
        "Accès prioritaire",
        "{partnersCount}+ partenaires"
      ]
    },
    team: {
      title: "L'équipe du BDE",
      hero: "La team SUP'RNOVA {year}",
      heroSubtitle: "Ensemble pour faire vibrer le campus !",
      meet: "Rencontrez les membres du bureau"
    },
    contact: {
      title: "On reste en contact !",
      subtitle: "Une question ? Une idée ? N'hésite pas à nous contacter !",
      email: "Email",
      instagram: {
        title: "Instagram",
        subtitle: "Suis nos actus !"
      },
      discord: {
        title: "Discord",
        subtitle: "Rejoins la communauté !"
      }
    },
    accessibility: {
      menu: "Menu"
    },
    brandAlt: "Logo SUP'RNOVA",
    brandAltBde: "Logo BDE SUP'RNOVA",
    teamImageAlt: "L'équipe du BDE SUP'RNOVA"
  }
};
