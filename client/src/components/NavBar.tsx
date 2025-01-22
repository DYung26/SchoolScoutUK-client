import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { School, Search, BarChart2 } from "lucide-react";

export function NavBar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <a className="flex items-center px-2 text-navy-900">
                <School className="h-8 w-8 text-primary"/>
                <span className="ml-2 text-xl font-semibold">
                  UK Schools Guide
                </span>
              </a>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/search">
                <a className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </a>
              </Link>
            </Button>
            
            <Button variant="ghost" asChild>
              <Link href="/compare">
                <a className="flex items-center">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Compare
                </a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
