import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardFooter } from './card';
import { Button } from './button';
import { MapPin, Calendar, Users, X } from 'lucide-react';
import { Badge } from './badge';
import { Progress } from './progress';

export interface TournamentCardProps {
  id: string;
  title: string;
  date: Date;
  location: {
    city: string;
    region: string;
  };
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Pro' | 'Open';
  registrationUrl: string;
  featured?: boolean;
  spotsAvailable: number;
  maxParticipants: number;
  imageUrl?: string;
}

export function TournamentCard({
  title,
  date,
  location,
  level,
  registrationUrl,
  featured,
  spotsAvailable,
  maxParticipants,
  imageUrl,
}: TournamentCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isFull = spotsAvailable === 0;
  const spotsPercentage = ((maxParticipants - spotsAvailable) / maxParticipants) * 100;

  return (
    <>
      <Card className={featured ? 'border-primary' : ''}>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Vignette cliquable */}
            {imageUrl && (
              <div
                className="mb-4 cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={imageUrl}
                  alt={`${title} miniature`}
                  className="w-full h-36 object-cover rounded-lg"
                />
              </div>
            )}

            {featured && <Badge className="mb-2">À la une</Badge>}

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{title}</h3>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {location.city}, {location.region}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{level}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{format(date, 'dd MMMM yyyy', { locale: fr })}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{spotsAvailable} places disponibles</span>
                </div>
                <span className="text-muted-foreground">
                  {maxParticipants - spotsAvailable}/{maxParticipants}
                </span>
              </div>
              <Progress value={spotsPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button className="w-full" disabled={isFull} asChild>
            <a href={registrationUrl}>{isFull ? 'Complet' : "S'inscrire"}</a>
          </Button>
        </CardFooter>
      </Card>

      {/* Lightbox overlay */}
      {lightboxOpen && imageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={imageUrl}
              alt={`${title} agrandi`}
              className="max-h-[80vh] max-w-[80vw] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
