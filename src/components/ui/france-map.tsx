import { useState } from 'react';
import { motion } from 'framer-motion';
import { useClubs } from '@/lib/hooks/useApi';
import { Club } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  path: string;
}

const regions: Region[] = [
  {
    id: "hauts-de-france",
    name: "Hauts-de-France",
    path: "M363 115l-4 7-15 4-2 15 7 9-3 11-13 6-7-1-7 8-9-6-10 3-6-5-11 3-6-9 4-13-4-7 8-12 2-18 11-9 16 2 13-4 11 6 15 2 10 8z"
  },
  {
    id: "grand-est",
    name: "Grand Est",
    path: "M469 160l-7 14-10 4-3 11-10 8-12-1-8 7-14-4-8 6-11-5-10 3-9-8-8 5-12-3-4-9 3-11-7-9 2-15 15-4 4-7 6-12 3-15 9-3 13 6 16-6 14 4 11 9 9-4 13 2 7 9-1 15 12 4z"
  },
  {
    id: "normandie",
    name: "Normandie",
    path: "M252 139l-13 8-8-4-11 6-14-4-10 7-15-3-10 8-12-6-6 6-12-3 3-9-9-5 4-7 15-3 12 4 13-5 11 3 9-6 16 2 13-4 11 3 13-4z"
  },
  {
    id: "ile-de-france",
    name: "Île-de-France",
    path: "M330 165l-9 8-12-3-8 7-11-4-9 5-13-3-7 6-12-4 4-8 11-3 6 5 10-3 9 6 7-8 7 1 13-6z"
  },
  {
    id: "bretagne",
    name: "Bretagne",
    path: "M149 191l-9 6-6-6-11 4-8-5-14 3-10-4-7 5-13-3 4-7 12-4 9-9 13 2 8-5 11 3 9-4 12 3-3 9 6 6z"
  },
  {
    id: "pays-de-la-loire",
    name: "Pays de la Loire",
    path: "M259 262l-12 4-7-6-11 3-8-5-13 4-9-7-12 3-8-6-11 4-7-8 9-5 4-11 13 3 7-6 13 3 9-5 11 4 8-7 12 3 9-8 11 5-3 15-6 9z"
  },
  {
    id: "centre-val-de-loire",
    name: "Centre-Val de Loire",
    path: "M330 262l-11 5-8-4-10 6-12-3-9 7-12-4-9 6-12-3 6-9 3-15 8 4 12-3 7-6 13 3 9-5 11 4 8-7 12 3 9-8 11 5-3 15-6 9z"
  },
  {
    id: "bourgogne-franche-comte",
    name: "Bourgogne-Franche-Comté",
    path: "M469 262l-12 5-7-6-11 3-8-5-13 4-9-7-12 3-8-6-11 4-7-8 9-5 4-11 13 3 7-6 13 3 9-5 11 4 8-7 12 3 9-8 11 5-3 15-6 9z"
  },
  {
    id: "nouvelle-aquitaine",
    name: "Nouvelle-Aquitaine",
    path: "M259 382l-12 4-7-6-11 3-8-5-13 4-9-7-12 3-8-6-11 4-7-8 9-5 4-11 13 3 7-6 13 3 9-5 11 4 8-7 12 3 9-8 11 5-3 15-6 9z"
  },
  {
    id: "auvergne-rhone-alpes",
    name: "Auvergne-Rhône-Alpes",
    path: "M469 382l-12 5-7-6-11 3-8-5-13 4-9-7-12 3-8-6-11 4-7-8 9-5 4-11 13 3 7-6 13 3 9-5 11 4 8-7 12 3 9-8 11 5-3 15-6 9z"
  },
  {
    id: "occitanie",
    name: "Occitanie",
    path: "M330 442l-11 5-8-4-10 6-12-3-9 7-12-4-9 6-12-3 6-9 3-15 8 4 12-3 7-6 13 3 9-5 11 4 8-7 12 3 9-8 11 5-3 15-6 9z"
  },
  {
    id: "provence-alpes-cote-dazur",
    name: "Provence-Alpes-Côte d'Azur",
    path: "M469 442l-12 5-7-6-11 3-8-5-13 4-9-7-12 3-8-6-11 4-7-8 9-5 4-11 13 3 7-6 13 3 9-5 11 4 8-7 12 3 9-8 11 5-3 15-6 9z"
  }
];

export function FranceMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { data: clubsData, isLoading, error } = useClubs(1, 100);

  // Regrouper les clubs par region.id
  const clubsByRegion = (clubsData?.data ?? []).reduce<Record<string, Club[]>>((acc, club) => {
    const regionObj = regions.find(r => r.name === club.location.region);
    if (!regionObj) return acc;
    const key = regionObj.id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(club);
    return acc;
  }, {});

  return (
    <div className="relative w-full aspect-[4/3] max-w-4xl mx-auto">
      <TooltipProvider>
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
        >
          <g transform="translate(50, 50)">
            {regions.map(region => {
              const count = clubsByRegion[region.id]?.length ?? 0;
              return (
                <Tooltip key={region.id}>
                  <TooltipTrigger asChild>
                    <motion.path
                      d={region.path}
                      fill={selectedRegion === region.id ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
                      stroke="hsl(var(--border))"
                      strokeWidth={2}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{
                        scale: 1.02,
                        fill: 'hsl(var(--primary))',
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => setSelectedRegion(region.id)}
                      role="button"
                      aria-label={`Région ${region.name}`}
                      className="cursor-pointer transition-colors"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{region.name}</p>
                    <p className="text-sm text-muted-foreground">{count} clubs</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </g>
        </svg>
      </TooltipProvider>

      {selectedRegion && (
        <Card className="absolute top-4 right-4 w-80 p-4 bg-background/95 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              {regions.find(r => r.id === selectedRegion)?.name}
            </h3>
            <Badge variant="secondary">
              {clubsByRegion[selectedRegion]?.length ?? 0} clubs
            </Badge>
          </div>
          <div className="space-y-3">
            {clubsByRegion[selectedRegion]?.map(club => (
              <div key={club.id} className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="font-medium">{club.name}</p>
                  <p className="text-sm text-muted-foreground">{club.location.city}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Chargement des clubs...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-center text-destructive">
            <p>Une erreur est survenue lors du chargement des clubs.</p>
            <p className="text-sm">Veuillez réessayer plus tard.</p>
          </div>
        </div>
      )}
    </div>
  );
}
