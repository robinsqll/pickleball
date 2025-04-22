import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import PickleballLogo from '../ui/PickleballLogo';

const routes = [
  { name: 'Accueil', path: '/' },
  { name: 'Tournois', path: '/tournaments' },
  { name: 'Clubs', path: '/clubs' },
  { name: 'Actualités', path: '/news' },
  { name: 'À propos', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm dark:bg-background/95'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <PickleballLogo className="h-8 w-8" />
          <span className="font-bold text-xl">Pickleball FFT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === route.path
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground'
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary p-2',
                  location.pathname === route.path
                    ? 'text-primary font-semibold bg-accent rounded-md'
                    : 'text-muted-foreground'
                )}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}