import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { School, BarChart2 as CompareIcon, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface School {
  id: number;
  name: string;
  address: string;
  rating: number;
  type: string;
  faith: string;
  size: number;
  fees: number;
}

export function ComparePanel() {
  const { t } = useTranslation();
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);

  const { data: schools = [], isLoading } = useQuery<School[]>({
    queryKey: ["/api/schools"],
  });

  const addSchool = (school: School) => {
    if (selectedSchools.length < 3 && !selectedSchools.find(s => s.id === school.id)) {
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  const removeSchool = (schoolId: number) => {
    setSelectedSchools(selectedSchools.filter(s => s.id !== schoolId));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-5 w-5" />
            {t('compare.availableSchools')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {schools.map((school) => (
                <div
                  key={school.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-medium">{school.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {school.address}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSchool(school)}
                    disabled={selectedSchools.length >= 3 || selectedSchools.some(s => s.id === school.id)}
                  >
                    <CompareIcon className="mr-2 h-4 w-4" />
                    {t('compare.add')}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}