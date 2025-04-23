// /data/tournaments.ts

export interface TournamentData {
  id: string;
  title: string;
  date: Date;
  location: {
    city: string;
    region: string;
  };
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Open" | "Pro";
  registrationUrl: string;
  featured?: boolean;
  spotsAvailable: number;
  maxParticipants: number;
  imageUrl: string;
}

export const tournaments: TournamentData[] = [
  {
    id: "t1",
    title: "Open de France - K500",
    date: new Date("2025-06-20"),
    location: {
      city: "Aix-en-Provence",
      region: "Provence-Alpes-Côte d'Azur",
    },
    level: "Open",
    registrationUrl: "#",
    featured: true,
    spotsAvailable: 24,
    maxParticipants: 64,
    imageUrl: "https://images.prismic.io/fft-site/Z-KCRndAxsiBv3ES_FF25-058_PICKLEBALL_Open_De_France-De%CC%81clinaisons_580x333px.jpg?auto=format,compress&rect=0,0,580,333&w=580&h=333",
  },
  {
    id: "t2",
    title: "Championnat Régional - Lyon",
    date: new Date("2025-04-02"),
    location: {
      city: "Lyon",
      region: "Auvergne-Rhône-Alpes",
    },
    level: "Intermédiaire",
    registrationUrl: "#",
    featured: true,
    spotsAvailable: 16,
    maxParticipants: 32,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkrcJ-f7H2A_Zl9DT6w-O2kJd2p3LdamvCZbp45Evwt4wjZbN_hEmUNzMNBAnAc7F3un8&usqp=CAU",
  },
  {
    id: "t3",
    title: "Open de Paques - Paris",
    date: new Date("2025-04-10"),
    location: {
      city: "Paris",
      region: "Île-de-France",
    },
    level: "Débutant",
    registrationUrl: "#",
    featured: true,
    spotsAvailable: 20,
    maxParticipants: 24,
    imageUrl: "https://klhkpm8h.tinifycdn.com/resizes/2025/02/07/19/42/10/4bc26e65-b727-496c-b643-07135bef818a.jpg",
  },
  {
    id: "t7",  // anciennement duplicate "t2"
    title: "Championnat Alain - Lyon",
    date: new Date("2025-04-02"),
    location: {
      city: "Lyon",
      region: "Auvergne-Rhône-Alpes",
    },
    level: "Intermédiaire",
    registrationUrl: "#",
    spotsAvailable: 16,
    maxParticipants: 32,
    imageUrl: "https://via.placeholder.com/150?text=Lyon+Alain",
  },
  {
    id: "t4",
    title: "Coupe de France de Pickleball",
    date: new Date("2025-05-22"),
    location: {
      city: "Marseille",
      region: "Provence-Alpes-Côte d'Azur",
    },
    level: "Pro",
    registrationUrl: "#",
    spotsAvailable: 0,
    maxParticipants: 32,
    imageUrl: "https://via.placeholder.com/150?text=Marseille",
  },
  {
    id: "t5",
    title: "Challenge Mixte - Nantes",
    date: new Date("2025-06-05"),
    location: {
      city: "Nantes",
      region: "Pays de la Loire",
    },
    level: "Avancé",
    registrationUrl: "#",
    spotsAvailable: 8,
    maxParticipants: 16,
    imageUrl: "https://via.placeholder.com/150?text=Nantes",
  },
  {
    id: "t6",
    title: "Tournoi International - Strasbourg",
    date: new Date("2025-07-12"),
    location: {
      city: "Strasbourg",
      region: "Grand Est",
    },
    level: "Open",
    registrationUrl: "#",
    spotsAvailable: 32,
    maxParticipants: 64,
    imageUrl: "https://via.placeholder.com/150?text=Strasbourg",
  },
];
