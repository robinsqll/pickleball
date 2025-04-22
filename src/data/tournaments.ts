export const tournaments = [
  {
    id: "t1",
    title: "Tournoi National de Pickleball - Paris",
    date: new Date("2025-03-15"),
    location: {
      city: "Paris",
      region: "Île-de-France"
    },
    level: "Open" as const,
    registrationUrl: "#",
    featured: true,
    spotsAvailable: 24,
    maxParticipants: 64
  },
  {
    id: "t2",
    title: "Championnat Régional - Lyon",
    date: new Date("2025-04-02"),
    location: {
      city: "Lyon",
      region: "Auvergne-Rhône-Alpes"
    },
    level: "Intermédiaire" as const,
    registrationUrl: "#",
    spotsAvailable: 16,
    maxParticipants: 32
  },
  {
    id: "t3",
    title: "Tournoi Débutant - Bordeaux",
    date: new Date("2025-04-10"),
    location: {
      city: "Bordeaux",
      region: "Nouvelle-Aquitaine"
    },
    level: "Débutant" as const,
    registrationUrl: "#",
    spotsAvailable: 20,
    maxParticipants: 24
  },
  {
    id: "t2",
    title: "Championnat Alain - Lyon",
    date: new Date("2025-04-02"),
    location: {
      city: "Lyon",
      region: "Auvergne-Rhône-Alpes"
    },
    level: "Intermédiaire" as const,
    registrationUrl: "#",
    spotsAvailable: 16,
    maxParticipants: 32
  },
  {
    id: "t4",
    title: "Coupe de France de Pickleball",
    date: new Date("2025-05-22"),
    location: {
      city: "Marseille",
      region: "Provence-Alpes-Côte d'Azur"
    },
    level: "Pro" as const,
    registrationUrl: "#",
    spotsAvailable: 0,
    maxParticipants: 32
  },
  {
    id: "t5",
    title: "Challenge Mixte - Nantes",
    date: new Date("2025-06-05"),
    location: {
      city: "Nantes",
      region: "Pays de la Loire"
    },
    level: "Avancé" as const,
    registrationUrl: "#",
    spotsAvailable: 8,
    maxParticipants: 16
  },
  {
    id: "t6",
    title: "Tournoi International - Strasbourg",
    date: new Date("2025-07-12"),
    location: {
      city: "Strasbourg",
      region: "Grand Est"
    },
    level: "Open" as const,
    registrationUrl: "#",
    spotsAvailable: 32,
    maxParticipants: 64
  }
];