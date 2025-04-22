import { useState, useMemo } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { ClubCard, ClubCardProps } from "@/components/ui/club-card";
import { FranceMap } from "@/components/ui/france-map";
import { clubs } from "@/data/clubs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, List } from "lucide-react";

type Region = ClubCardProps["location"]["region"];
type Level = ClubCardProps["level"];

export default function Clubs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<string | "all">("all");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Get unique regions from clubs
  const regions = useMemo(() => {
    const uniqueRegions = new Set<Region>();
    clubs.forEach((club) => {
      uniqueRegions.add(club.location.region);
    });
    return Array.from(uniqueRegions).sort();
  }, []);

  // Get unique levels from clubs
  const levels = useMemo(() => {
    const uniqueLevels = new Set<Level>();
    clubs.forEach((club) => {
      if (club.level) uniqueLevels.add(club.level);
    });
    return Array.from(uniqueLevels).sort();
  }, []);

  // Filter clubs based on search query and filters
  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch = 
        searchQuery === "" || 
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.location.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = 
        selectedRegion === "all" || 
        club.location.region === selectedRegion;

      const matchesLevel = 
        selectedLevel === "all" || 
        club.level === selectedLevel;

      return matchesSearch && matchesRegion && matchesLevel;
    });
  }, [searchQuery, selectedRegion, selectedLevel]);

  // Sort clubs alphabetically by name
  const sortedClubs = useMemo(() => {
    return [...filteredClubs].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredClubs]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <SectionHeader
          title="Clubs de Pickleball en France"
          description="Trouvez un club près de chez vous et rejoignez la communauté pickleball"
          className="mb-10"
        />

        {/* View mode tabs */}
        <div className="mb-8">
          <Tabs defaultValue="list" onValueChange={(value) => setViewMode(value as "list" | "map")}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" />
                Liste des clubs
              </TabsTrigger>
              <TabsTrigger value="map">
                <MapPin className="h-4 w-4 mr-2" />
                Carte interactive
              </TabsTrigger>
            </TabsList>
            
            {/* Filters - shown in both tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="relative">
                <Label htmlFor="search" className="mb-2 block">Recherche</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Rechercher un club..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="region-filter" className="mb-2 block">Région</Label>
                <Select
                  value={selectedRegion}
                  onValueChange={setSelectedRegion}
                >
                  <SelectTrigger id="region-filter" className="w-full">
                    <SelectValue placeholder="Toutes les régions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les régions</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level-filter" className="mb-2 block">Niveau</Label>
                <Select
                  value={selectedLevel}
                  onValueChange={setSelectedLevel}
                >
                  <SelectTrigger id="level-filter" className="w-full">
                    <SelectValue placeholder="Tous les niveaux" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters indicator */}
            {(selectedRegion !== "all" || selectedLevel !== "all" || searchQuery) && (
              <div className="flex items-center gap-2 my-6">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Filtres actifs: 
                  {selectedRegion !== "all" && <span className="ml-1">Région: {selectedRegion}</span>}
                  {selectedLevel !== "all" && <span className="ml-1">{selectedRegion !== "all" ? " | " : ""}Niveau: {selectedLevel}</span>}
                  {searchQuery && <span className="ml-1">{(selectedRegion !== "all" || selectedLevel !== "all") ? " | " : ""}Recherche: "{searchQuery}"</span>}
                </p>
              </div>
            )}
            
            <TabsContent value="list" className="mt-6">
              {sortedClubs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedClubs.map((club) => (
                    <ClubCard key={club.id} {...club} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground">Aucun club ne correspond à vos critères.</p>
                  <p className="mt-2">Essayez de modifier vos filtres.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="map" className="mt-6">
              <FranceMap />
              
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">Clubs sur la carte</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedClubs.slice(0, 6).map((club) => (
                    <div key={club.id} className="flex items-start p-4 border rounded-lg">
                      <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{club.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {club.location.city}, {club.location.region}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {sortedClubs.length > 6 && (
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    Et {sortedClubs.length - 6} autres clubs...
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Information about creating a club */}
        <div className="mt-16 p-6 bg-muted rounded-lg">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-medium mb-2 text-center">Vous souhaitez créer un club ?</h3>
            <p className="text-muted-foreground text-center mb-6">
              Nous vous accompagnons dans la création de votre club de pickleball. 
              Contactez-nous pour obtenir plus d'informations et des ressources.
            </p>
            <div className="text-center">
              <a 
                href="/about#contact" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}