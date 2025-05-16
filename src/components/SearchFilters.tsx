import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { SchoolType } from "@/lib/constants";
import { SearchFilter } from "@/lib/interfaces";

interface Props {
  onFilter: (filters: SearchFilter) => void;
}

export function SearchFilters({ onFilter }: Props) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<SearchFilter>({});

  useEffect(() => {
    handleFilter();
  }, [filters]);

  const handleFilter = () => {
    onFilter(filters);
  };
  const clearFilter = () => {
    onFilter({});
    setFilters({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by keyword..."
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-10 pl-10"
          />
        </div>

        <Select
          value={filters.type || ''}
          onValueChange={(value: any) => setFilters({ ...filters, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="School Type" />
          </SelectTrigger>
          <SelectContent>
            {SchoolType.map((type) => (
              <SelectItem key={type} value={type}>
                {t(`schoolTypes.${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="City"
          value={filters.city || ""}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />

        <Button onClick={clearFilter} className="w-full">
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
