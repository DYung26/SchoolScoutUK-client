import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { School as SchoolIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SchoolSelector } from "@/components/SchoolSelector";
import type { School } from "@/lib/types";

export default function Compare() {
  const [location, setLocation] = useLocation();
  const [selectedSchools, setSelectedSchools] = useState<number[]>([]);
  const { t } = useTranslation();

  const { data: schools = [], isError: isAllSchoolsError } = useQuery<School[]>({
    queryKey: ["/api/schools"],
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const schoolIds = params.get('schools');
    if (schoolIds) {
      setSelectedSchools(schoolIds.split(',').map(Number));
    }
  }, [location]);

  const handleSelectSchool = (schoolId: number) => {
    let newSelectedSchools: number[];
    if (selectedSchools.includes(schoolId)) {
      newSelectedSchools = selectedSchools.filter(id => id !== schoolId);
    } else if (selectedSchools.length < 3) {
      newSelectedSchools = [...selectedSchools, schoolId];
    } else {
      return; // Already at max schools
    }
    setSelectedSchools(newSelectedSchools);
    setLocation(newSelectedSchools.length ? `/compare?schools=${newSelectedSchools.join(',')}` : '/compare');
  };

  if (isAllSchoolsError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('compare.title')}</CardTitle>
              <CardDescription>{t('compare.error')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.reload()}>
                {t('common.retry')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SchoolIcon className="h-6 w-6" />
              <div>
                <CardTitle>{t('compare.title')}</CardTitle>
                <CardDescription>{t('compare.description')}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SchoolSelector
              schools={schools}
              selectedSchools={selectedSchools}
              onSelectSchool={handleSelectSchool}
            />
          </CardContent>
        </Card>

        {selectedSchools.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('compare.comparisonResults')}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Comparison results will be added in the next iteration */}
              <div className="text-center py-8 text-muted-foreground">
                {t('compare.selectingSchools')}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}