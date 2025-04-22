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
  /** Niveau moyen – facultatif si inconnu */
  level?: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';
  /** Nombre de membres – facultatif */
  memberCount?: number;
  /** URL du site – facultatif */
  website?: string;
  /** Adresse mail de contact – facultatif */
  contactEmail?: string;
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
          {/* Titre + localisation */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{name}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {location.city}, {location.region}
              </span>
            </div>
          </div>

          {/* Niveau + nombre de membres (si disponibles) */}
          <div className="flex items-center space-x-2">
            {level && <Badge variant="secondary">{level}</Badge>}
            {memberCount !== undefined && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>
                  {memberCount.toLocaleString()}&nbsp;membre
                  {memberCount > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Boutons de pied de carte */}
      <CardFooter className="p-6 pt-0 flex flex-col space-y-2">
        {contactEmail && (
          <Button className="w-full" variant="outline" asChild>
            <a href={`mailto:${contactEmail}`}>
              <Mail className="h-4 w-4 mr-2" />
              Contacter
            </a>
          </Button>
        )}

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
