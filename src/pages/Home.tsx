import { SearchFilters } from "@/components/SearchFilters";
import { SchoolCard } from "@/components/SchoolCard";
import { useQuery } from "@tanstack/react-query";
import { School as SchoolIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "wouter";
import { School, SearchFilter } from "@/lib/interfaces";

export default function Home() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryString = searchParams.toString();
  const endpoint = `/api/schools${queryString ? `?${queryString}` : ""}`;

  const { data, isLoading } = useQuery<{ data: { schools: School[] } }>({
    queryKey: [endpoint],
  });
  const schools = data?.data?.schools;
  console.log("$$$$", schools);

  const handleFilter = (filters: SearchFilter) => {
    // Construct query string from filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
      else params.delete(key);
    });

    // Re-fetch with new filters
    // window.location.search = params.toString();
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-12 rounded-xl drop-shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SchoolIcon className="mx-auto h-12 w-12 mb-1" />
            <h1 className="text-4xl font-bold">
              {t('home.title')}
            </h1>
            <p className="mt-3 text-lg">
              {t('home.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters onFilter={handleFilter} />

        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-lg shadow animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools?.map((school) => (
              <SchoolCard key={school.schoolId} school={school} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
