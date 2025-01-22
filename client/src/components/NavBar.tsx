import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { School, Search, BarChart2, Target, Menu } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from "./LanguageSelector";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function NavBar() {
  const { t } = useTranslation();
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/" || location === "/search";
    }
    const normalizedPath = path.endsWith("/") ? path : path + "/";
    return location.startsWith(path) || (path === "/schools" && location.startsWith("/schools/"));
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col gap-4 py-4">
                  {/* Mobile Navigation Links */}
                  <Link href="/match">
                    <Button 
                      variant={isActive("/match") ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                    >
                      <Target className="mr-2 h-4 w-4" />
                      {t('nav.match')}
                    </Button>
                  </Link>
                  <Link href="/search">
                    <Button 
                      variant={isActive("/search") ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {t('nav.search')}
                    </Button>
                  </Link>
                  <Link href="/compare">
                    <Button 
                      variant={isActive("/compare") ? "secondary" : "ghost"} 
                      className="w-full justify-start"
                    >
                      <BarChart2 className="mr-2 h-4 w-4" />
                      {t('nav.compare')}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/">
              <div className="flex items-center px-2 text-navy-900">
                <School className="h-8 w-8 text-primary"/>
                <span className={cn(
                  "ml-2 text-xl font-semibold",
                  isActive("/") && "text-primary"
                )}>
                  {t('nav.title')}
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex lg:ml-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={cn(
                        isActive("/schools") && "bg-accent text-accent-foreground"
                      )}
                    >
                      Schools
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <Link href="/search">
                            <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                              <School className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {t('nav.schools')}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {t('nav.schoolsDescription')}
                              </p>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex lg:space-x-4">
              <Link href="/match">
                <Button 
                  variant={isActive("/match") ? "secondary" : "ghost"} 
                  className="flex items-center"
                >
                  <Target className="mr-2 h-4 w-4" />
                  <span>{t('nav.match')}</span>
                </Button>
              </Link>

              <Link href="/search">
                <Button 
                  variant={isActive("/search") ? "secondary" : "ghost"} 
                  className="flex items-center"
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{t('nav.search')}</span>
                </Button>
              </Link>

              <Link href="/compare">
                <Button 
                  variant={isActive("/compare") ? "secondary" : "ghost"} 
                  className="flex items-center"
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  <span>{t('nav.compare')}</span>
                </Button>
              </Link>
            </div>

            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}