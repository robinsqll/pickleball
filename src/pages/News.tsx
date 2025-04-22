import { useState, useMemo } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { NewsCard } from "@/components/ui/news-card";
import { news } from "@/data/news";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories from news
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    news.forEach((article) => {
      uniqueCategories.add(article.category);
    });
    return Array.from(uniqueCategories).sort();
  }, []);

  // Filter news based on search query and category
  const filteredNews = useMemo(() => {
    return news.filter((article) => {
      const matchesSearch = 
        searchQuery === "" || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === "all" || 
        article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Sort news by date (most recent first)
  const sortedNews = useMemo(() => {
    return [...filteredNews].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [filteredNews]);

  // Featured article is the most recent one
  const featuredArticle = news[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <SectionHeader
          title="Actualités"
          description="Restez informé des dernières nouvelles du pickleball en France"
          className="mb-10"
        />

        {/* Featured Article */}
        <div className="mb-16">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 bg-secondary/20">
              <div className="h-full">
                <img 
                  src={featuredArticle.imageSrc} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 items-center mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {featuredArticle.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(featuredArticle.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{featuredArticle.title}</h2>
                <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center mb-6">
                  <img
                    src={featuredArticle.author.avatar}
                    alt={featuredArticle.author.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{featuredArticle.author.name}</p>
                  </div>
                </div>
                <a 
                  href={`/news/${featuredArticle.id}`} 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 self-start"
                >
                  Lire l'article
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <Label htmlFor="search" className="mb-2 block">Recherche</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category-filter" className="mb-2 block">Catégorie</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger id="category-filter" className="w-full">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filters indicator */}
        {(selectedCategory !== "all" || searchQuery) && (
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Filtres actifs: 
              {selectedCategory !== "all" && <span className="ml-1">Catégorie: {selectedCategory}</span>}
              {searchQuery && <span className="ml-1">{selectedCategory !== "all" ? " | " : ""}Recherche: "{searchQuery}"</span>}
            </p>
          </div>
        )}

        {/* News cards - exclude the featured article */}
        {sortedNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedNews
              .filter(article => article.id !== featuredArticle.id)
              .map((article) => (
                <NewsCard key={article.id} {...article} />
              ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Aucun article ne correspond à vos critères.</p>
            <p className="mt-2">Essayez de modifier vos filtres.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 py-12 px-6 bg-secondary/30 rounded-xl text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Abonnez-vous à notre newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Recevez les dernières actualités et informations sur le pickleball en France directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input placeholder="Votre adresse email" type="email" className="flex-grow" />
              <button 
                type="button" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}