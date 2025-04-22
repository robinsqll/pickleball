import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardFooter } from './card';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: Date;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  imageSrc: string;
}

export function NewsCard({
  id,
  title,
  excerpt,
  date,
  author,
  category,
  imageSrc,
}: NewsCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-full h-full"
        />
        <Badge
          className="absolute top-4 left-4"
          variant="secondary"
        >
          {category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <p className="text-xs text-muted-foreground">
              {format(date, 'dd MMMM yyyy', { locale: fr })}
            </p>
          </div>
        </div>
        <a
          href={`/news/${id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Lire la suite
        </a>
      </CardFooter>
    </Card>
  );
}