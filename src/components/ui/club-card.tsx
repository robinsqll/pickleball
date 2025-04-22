import { Card, CardContent, CardFooter } from './card';
import { Button } from './button';
import { MapPin, Users, ExternalLink, Mail } from 'lucide-react';
import { Badge } from './badge';

export interface ClubCardProps {
  id: string;
  name: string;
  location: {
    city: string;
    region: string;
  };
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';
  memberCount: number;
  website?: string;
  contactEmail: string;
}

export function ClubCard({
  name,
  location,
  level,
  memberCount,
  website,
  contactEmail,
}: ClubCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{name}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{location.city}, {location.region}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{level}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>{memberCount} membres</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col space-y-2">
        <Button className="w-full" variant="outline" asChild>
          <a href={`mailto:${contactEmail}`}>
            <Mail className="h-4 w-4 mr-2" />
            Contacter
          </a>
        </Button>
        {website && (
          <Button className="w-full" variant="secondary" asChild>
            <a href={website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Site web
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}