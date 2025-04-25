import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trophy, Users, MapPin, Mail, Phone, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">À propos de Pickleball France</h1>
            <p className="text-xl text-muted-foreground">
              Notre mission est de promouvoir et développer le pickleball en France, en créant une communauté dynamique et inclusive.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                title="Notre Mission"
                description="Promouvoir et développer le pickleball sur l'ensemble du territoire français"
                className="mb-6"
              />
              <div className="space-y-4 text-lg">
                <p>
                Lancé en 2023 au sein du club du TSATGD le Pickleball est animé par un groupe de joueurs déterminés à voir ce sport se développer.
                </p>
                <p>
                L’objectif étant de créer un environnement où les joueurs de tous âges et de tous niveaux peuvent se réunir pour pratiquer, apprendre et partager leur amour du pickleball.
                </p>
                <p>
                En collaboration avec les instances sportives, nous travaillons au développement à l’échelle régionale du pickleball, à l'organisation de compétitions et à la formation de nouveaux adeptes.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.prismic.io/fft-site/ZgGpA8cYqOFdyEWy_20240217_PB_DP_0126_web.jpeg?auto=format%2Ccompress&rect=0%2C113%2C1000%2C525&w=2400&h=1260" 
                alt="Joueurs de pickleball" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Pickleball en chiffres"
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background/80 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">25+</h3>
                <p className="text-muted-foreground">Tournois organisés</p>
              </CardContent>
            </Card>

            <Card className="bg-background/80 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">15 000+</h3>
                <p className="text-muted-foreground">Joueurs actifs</p>
              </CardContent>
            </Card>

            <Card className="bg-background/80 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">400+</h3>
                <p className="text-muted-foreground">Clubs qui pratiquent</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Questions fréquentes"
            description="Tout ce que vous devez savoir sur le pickleball et notre organisation"
            className="mb-12"
          />

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Qu'est-ce que le pickleball exactement ?</AccordionTrigger>
                <AccordionContent>
                  Le pickleball est un sport de raquette qui combine des éléments du tennis, du badminton et du tennis de table. Il se joue sur un court de la taille d'un terrain de badminton, avec un filet similaire à celui du tennis mais plus bas. Les joueurs utilisent des raquettes solides pour frapper une balle perforée en plastique par-dessus le filet.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Comment rejoindre un club de pickleball ?</AccordionTrigger>
                <AccordionContent>
                  Pour rejoindre un club, consultez notre section "Clubs" pour trouver celui le plus proche de chez vous. Contactez ensuite directement le club pour connaître les modalités d'inscription, les horaires d'entraînement et les cotisations. La plupart des clubs proposent des séances d'essai gratuites pour les débutants.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Quel équipement faut-il pour jouer au pickleball ?</AccordionTrigger>
                <AccordionContent>
                  L'équipement de base comprend une raquette de pickleball, des balles perforées spécifiques au sport, et des chaussures de sport adaptées aux surfaces intérieures ou extérieures. Pour les débutants, de nombreux clubs proposent du matériel à prêter ou à louer pour les premières séances.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Comment organiser un tournoi avec Pickleball France ?</AccordionTrigger>
                <AccordionContent>
                  Pour organiser un tournoi officiel, contactez-nous via notre formulaire de contact en précisant la date souhaitée, le lieu, le format du tournoi et le niveau des joueurs ciblés. Notre équipe vous accompagnera dans l'organisation et vous fournira les ressources nécessaires pour assurer le succès de votre événement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Le pickleball est-il accessible aux enfants ?</AccordionTrigger>
                <AccordionContent>
                  Absolument ! Le pickleball est un sport intergénérationnel qui convient parfaitement aux enfants dès l'âge de 8 ans. La simplicité des règles, la taille modérée du terrain et le rythme du jeu le rendent accessible aux plus jeunes. De nombreux clubs proposent des séances spécifiques pour les enfants.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Comment devenir instructeur de pickleball certifié ?</AccordionTrigger>
                <AccordionContent>
                  Pickleball France propose régulièrement des formations d'instructeurs. Pour y participer, vous devez avoir une expérience préalable du pickleball et suivre notre programme de certification. Consultez la section événements de notre site ou contactez-nous pour connaître les prochaines dates de formation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Contactez-nous"
            description="Nous sommes à votre disposition pour répondre à toutes vos questions"
            align="center"
            className="mb-12"
          />

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Adresse</h3>
                    <p className="text-muted-foreground mt-1">92 avenue de la République, 39500 TAVAUX, France</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground mt-1">tsatgd@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p className="text-muted-foreground mt-1">+33 </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Heures d'ouverture</h3>
                    <p className="text-muted-foreground mt-1">Du lundi au vendredi, de 9h à 18h</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-secondary rounded-md">
                <h3 className="font-medium mb-2">Note concernant la FFT</h3>
                <p className="text-sm text-muted-foreground">
                  Pickleball France collabore avec diverses organisations sportives pour promouvoir la pratique du pickleball. Nous travaillons ensemble pour développer ce sport dans un esprit d'ouverture et de coopération.
                </p>
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-4">Envoyez-nous un message</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nom</label>
                    <Input id="name" placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Votre email" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                  <Input id="subject" placeholder="Sujet de votre message" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Votre message" rows={5} />
                </div>

                <Button type="submit" className="w-full">Envoyer le message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}