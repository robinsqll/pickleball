import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardFooter } from './card';
import { Button } from './button';
import { MapPin, Calendar, Users } from 'lucide-react';
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
}: TournamentCardProps) {
  const isFull = spotsAvailable === 0;
  const spotsPercentage = ((maxParticipants - spotsAvailable) / maxParticipants) * 100;

  return (
    <Card className={featured ? 'border-primary' : ''}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {featured && (
            <Badge className="mb-2">À la une</Badge>
          )}
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{location.city}, {location.region}</span>
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
          <a href={registrationUrl}>
            {isFull ? 'Complet' : "S'inscrire"}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}