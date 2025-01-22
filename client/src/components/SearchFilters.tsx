import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SearchFilters } from "@/lib/types";

interface Props {
  onFilter: (filters: SearchFilters) => void;
}

export function SearchFilters({ onFilter }: Props) {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            placeholder="Search schools..."
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <Select
          value={filters.type}
          onValueChange={(value: any) => setFilters({ ...filters, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="School Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="grammar">Grammar</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="City"
          value={filters.city || ""}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />

        <Button onClick={handleFilter} className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
