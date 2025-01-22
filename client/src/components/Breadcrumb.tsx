import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  className?: string;
}

export function Breadcrumb({ className }: BreadcrumbProps) {
  const [location] = useLocation();
  const { t } = useTranslation();

  const pathSegments = location.split("/").filter(Boolean);
  
  // Convert path segments to readable names using i18n
  const getSegmentName = (segment: string) => {
    return t(`breadcrumb.${segment}`, { defaultValue: segment });
  };

  return (
    <nav
      className={cn(
        "flex items-center space-x-1.5 text-sm text-muted-foreground",
        className
      )}
      aria-label="Breadcrumb"
    >
      <Link href="/">
        <a className="flex items-center hover:text-foreground">
          <Home className="h-4 w-4" />
          <span className="sr-only">{t('breadcrumb.home')}</span>
        </a>
      </Link>
      
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="ml-1.5 font-medium text-foreground">
                {getSegmentName(segment)}
              </span>
            ) : (
              <Link href={path}>
                <a className="ml-1.5 hover:text-foreground">
                  {getSegmentName(segment)}
                </a>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
