import { useState, useMemo } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { TournamentCard, TournamentCardProps } from "@/components/ui/tournament-card";
import { tournaments } from "@/data/tournaments";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";

type Region = TournamentCardProps["location"]["region"];
type Level = TournamentCardProps["level"];

export default function Tournaments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  // Get unique regions from tournaments
  const regions = useMemo(() => {
    const uniqueRegions = new Set<Region>();
    tournaments.forEach((tournament) => {
      uniqueRegions.add(tournament.location.region);
    });
    return Array.from(uniqueRegions).sort();
  }, []);

  // Get unique levels from tournaments
  const levels = useMemo(() => {
    const uniqueLevels = new Set<Level>();
    tournaments.forEach((tournament) => {
      uniqueLevels.add(tournament.level);
    });
    return Array.from(uniqueLevels).sort();
  }, []);

  // Filter tournaments based on search query and filters
  const filteredTournaments = useMemo(() => {
    return tournaments.filter((tournament) => {
      const matchesSearch = 
        searchQuery === "" || 
        tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.location.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = 
        selectedRegion === "all" || 
        tournament.location.region === selectedRegion;

      const matchesLevel = 
        selectedLevel === "all" || 
        tournament.level === selectedLevel;

      return matchesSearch && matchesRegion && matchesLevel;
    });
  }, [searchQuery, selectedRegion, selectedLevel]);

  // Sort tournaments by date (most recent first)
  const sortedTournaments = useMemo(() => {
    return [...filteredTournaments].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [filteredTournaments]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <SectionHeader
          title="Tournois de Pickleball"
          description="Découvrez les tournois à venir et inscrivez-vous pour participer"
          className="mb-10"
        />

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Label htmlFor="search" className="mb-2 block">Recherche</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Rechercher un tournoi..."
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
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Filtres actifs: 
              {selectedRegion !== "all" && <span className="ml-1">Région: {selectedRegion}</span>}
              {selectedLevel !== "all" && <span className="ml-1">{selectedRegion !== "all" ? " | " : ""}Niveau: {selectedLevel}</span>}
              {searchQuery && <span className="ml-1">{(selectedRegion !== "all" || selectedLevel !== "all") ? " | " : ""}Recherche: "{searchQuery}"</span>}
            </p>
          </div>
        )}

        {/* Tournament cards */}
        {sortedTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} {...tournament} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Aucun tournoi ne correspond à vos critères.</p>
            <p className="mt-2">Essayez de modifier vos filtres.</p>
          </div>
        )}

        {/* Future Calendar integration note */}
        <div className="mt-16 p-6 bg-muted rounded-lg text-center">
          <h3 className="text-xl font-medium mb-2">Calendrier des tournois</h3>
          <p className="text-muted-foreground">
            Un calendrier complet des tournois sera bientôt disponible. Revenez prochainement pour consulter cette fonctionnalité.
          </p>
        </div>
      </div>
    </div>
  );
}