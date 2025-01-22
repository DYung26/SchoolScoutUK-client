import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { School, Search, BarChart2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from "./LanguageSelector";

export function NavBar() {
  const { t } = useTranslation();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <a className="flex items-center px-2 text-navy-900">
                <School className="h-8 w-8 text-primary"/>
                <span className="ml-2 text-xl font-semibold">
                  {t('nav.title')}
                </span>
              </a>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/search">
                <a className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  {t('nav.search')}
                </a>
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link href="/compare">
                <a className="flex items-center">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  {t('nav.compare')}
                </a>
              </Link>
            </Button>

            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}