// /pages/tournaments.tsx

import { useState, useMemo } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { TournamentCard, TournamentCardProps } from "@/components/ui/tournament-card";
import { tournaments } from "@/data/tournaments";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";

type Region = TournamentCardProps["location"]["region"];
type Level = TournamentCardProps["level"];

export default function Tournaments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<Level | "all">("all");

  const regions = useMemo(() => {
    const unique = new Set<Region>();
    tournaments.forEach((t) => unique.add(t.location.region));
    return Array.from(unique).sort();
  }, []);

  const levels = useMemo(() => {
    const unique = new Set<Level>();
    tournaments.forEach((t) => unique.add(t.level));
    return Array.from(unique).sort();
  }, []);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter((t) => {
      const matchesSearch =
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        selectedRegion === "all" || t.location.region === selectedRegion;

      const matchesLevel =
        selectedLevel === "all" || t.level === selectedLevel;

      return matchesSearch && matchesRegion && matchesLevel;
    });
  }, [searchQuery, selectedRegion, selectedLevel]);

  const sortedTournaments = useMemo(() => {
    return [...filteredTournaments].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [filteredTournaments]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <SectionHeader
          title="Tournois de Pickleball"
          description="Découvrez les tournois à venir et inscrivez-vous pour participer"
          className="mb-10"
        />

        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Label htmlFor="search" className="mb-2 block">
              Recherche
            </Label>
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
            <Label htmlFor="region-filter" className="mb-2 block">
              Région
            </Label>
            <Select
              value={selectedRegion}
              onValueChange={(val) => setSelectedRegion(val as Region | "all")}
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
            <Label htmlFor="level-filter" className="mb-2 block">
              Niveau
            </Label>
            <Select
              value={selectedLevel}
              onValueChange={(val) => setSelectedLevel(val as Level | "all")}
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

        {/* Indicateur de filtres actifs */}
        {(selectedRegion !== "all" ||
          selectedLevel !== "all" ||
          searchQuery) && (
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Filtres actifs:
              {selectedRegion !== "all" && (
                <span className="ml-1">Région: {selectedRegion}</span>
              )}
              {selectedLevel !== "all" && (
                <span className="ml-1">
                  {selectedRegion !== "all" ? " | " : ""}Niveau: {selectedLevel}
                </span>
              )}
              {searchQuery && (
                <span className="ml-1">
                  {(selectedRegion !== "all" ||
                    selectedLevel !== "all")
                    ? " | "
                    : ""}Recherche: "{searchQuery}"
                </span>
              )}
            </p>
          </div>
        )}

        {/* Cartes de tournois */}
        {sortedTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTournaments.map((t) => (
              <TournamentCard
                key={t.id}
                {...t}
                imageUrl={t.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              Aucun tournoi ne correspond à vos critères.
            </p>
            <p className="mt-2">Essayez de modifier vos filtres.</p>
          </div>
        )}

        {/* Note Calendrier */}
        <div className="mt-16 p-6 bg-muted rounded-lg text-center">
          <h3 className="text-xl font-medium mb-2">Calendrier des tournois</h3>
          <p className="text-muted-foreground">
            Un calendrier complet des tournois sera bientôt disponible. Revenez
            prochainement pour consulter cette fonctionnalité.
          </p>
        </div>
      </div>
    </div>
  );
}
