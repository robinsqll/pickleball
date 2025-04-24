import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { TournamentCard } from "@/components/ui/tournament-card";
import { CallToAction } from "@/components/ui/call-to-action";
import { tournaments } from "@/data/tournaments";
import { Shield, Award, Users, TrendingUp } from "lucide-react";

export default function Home() {
  // Get the featured tournament or the first available one
    const featuredTournaments = tournaments
      .filter((t) => t.featured)
      .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/17299530/pexels-photo-17299530/free-photo-of-ping-pong-paddle-and-ball-next-to-net.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
          Bienvenue au <span className="text-primary-foreground">TSATGD PICKLEBALL</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mb-8">
            La référence pour le développement du pickleball en France. Découvrez ce sport passionnant, trouvez des clubs et participez à des tournois.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <a href="#discover">Découvrir le Pickleball</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/30" asChild>
              <a href="/tournaments">Voir les tournois</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="discover" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Qu'est-ce que le Pickleball ?"
            description="Un sport de raquette qui combine des éléments du tennis, du badminton et du tennis de table"
            align="center"
            className="mb-12"
          />

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-lg">
                Le pickleball est un sport de raquette qui se joue sur un court similaire à celui du badminton, avec un filet comparable à celui du tennis, mais plus bas. Les joueurs utilisent des raquettes en bois ou en matériaux composites pour frapper une balle perforée en plastique.
              </p>
              <p className="text-lg">
                Ce sport rapide et accessible est idéal pour tous les âges et niveaux de compétence. Il est particulièrement apprécié pour sa courbe d'apprentissage rapide et son aspect social.
              </p>
              <p className="text-lg">
                Le pickleball connaît une croissance phénoménale en France, avec de plus en plus de clubs et de tournois organisés chaque année.
              </p>

              <CallToAction href="/about" variant="outline">
                En savoir plus
              </CallToAction>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/17299534/pexels-photo-17299534/free-photo-of-ball-and-paddle-on-court.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Joueurs de pickleball" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Objectifs"
            description="Développer et promouvoir le pickleball"
            align="center"
            className="mb-12"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Promouvoir</h3>
                <p className="text-muted-foreground">
                  Faire connaître le pickleball au grand public
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Rassembler</h3>
                <p className="text-muted-foreground">
                  Unir les clubs et les joueurs autour d'une communauté
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Compétitions</h3>
                <p className="text-muted-foreground">
                  Organiser des tournois de qualité pour tous les niveaux
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Développer</h3>
                <p className="text-muted-foreground">
                  Soutenir la création de nouveaux clubs et infrastructures
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Tournois à la une"
            description="Ne manquez pas nos événements à venir"
            className="mb-12"
          />

          {/* Grille 3 colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl">
            {featuredTournaments.map((t) => (
              <TournamentCard key={t.id} {...t} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <CallToAction href="/tournaments" size="lg">
              Voir tous les tournois
            </CallToAction>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez la communauté Pickleball en France</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Que vous soyez débutant ou joueur expérimenté, rejoignez-nous pour partager votre passion pour le pickleball
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/clubs">Trouver un club</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-primary-foreground/5 border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
              <a href="/about#contact">Nous contacter</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}