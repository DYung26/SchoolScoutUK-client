import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SchoolTypeEnum } from "@/lib/enum";

export interface FilterOptions {
  type?: SchoolTypeEnum;
  maxDistance?: number;
  maxFees?: number;
  minGcseScore?: number;
}

interface Props {
  onFilter: (filters: FilterOptions) => void;
}

export function FilterPanel({ onFilter }: Props) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t('compare.filters')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Select
              value={filters.type}
              onValueChange={(value: SchoolTypeEnum) => 
                setFilters(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t('school.type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">{t('schoolTypes.public')}</SelectItem>
                <SelectItem value="private">{t('schoolTypes.private')}</SelectItem>
                <SelectItem value="grammar">{t('schoolTypes.grammar')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('compare.maxDistance')} ({filters.maxDistance || 0} miles)
            </label>
            <Slider
              value={[filters.maxDistance || 0]}
              onValueChange={([value]) => 
                setFilters(prev => ({ ...prev, maxDistance: value }))
              }
              max={50}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('compare.maxAnnualFees')} (£{filters.maxFees?.toLocaleString() || 0})
            </label>
            <Slider
              value={[filters.maxFees || 0]}
              onValueChange={([value]) => 
                setFilters(prev => ({ ...prev, maxFees: value }))
              }
              max={50000}
              step={1000}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('compare.minGcseScore')} ({filters.minGcseScore || 0}%)
            </label>
            <Slider
              value={[filters.minGcseScore || 0]}
              onValueChange={([value]) => 
                setFilters(prev => ({ ...prev, minGcseScore: value }))
              }
              max={100}
              step={5}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={handleFilter}>
            {t('compare.applyFilters')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
