import { useState } from "react";
import { School, Plus, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { School as SchoolType } from "@/lib/types";

interface SchoolSelectorProps {
  schools: SchoolType[];
  selectedSchools: number[];
  onSelectSchool: (schoolId: number) => void;
  className?: string;
}

export function SchoolSelector({ 
  schools, 
  selectedSchools, 
  onSelectSchool, 
  className 
}: SchoolSelectorProps) {
  const { t } = useTranslation();
  const maxSchools = 3;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <School className="h-5 w-5" />
          {t('compare.selectSchools')} 
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({selectedSchools.length}/{maxSchools} {t('compare.selected')})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schools.map((school) => {
              const isSelected = selectedSchools.includes(school.id);
              const canSelect = selectedSchools.length < maxSchools || isSelected;

              return (
                <Card 
                  key={school.id} 
                  className={`
                    relative cursor-pointer transition-all
                    ${isSelected ? 'border-primary' : 'hover:border-muted-foreground'}
                    ${!canSelect && 'opacity-50 cursor-not-allowed'}
                  `}
                  onClick={() => canSelect && onSelectSchool(school.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium mb-1">{school.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {school.city}
                        </p>
                        <div className="mt-2 text-sm">
                          <p>{t(`schoolTypes.${school.type}`)}</p>
                          {school.admissionAge && (
                            <p className="text-muted-foreground">
                              {t('school.ages', {
                                min: school.admissionAge.min,
                                max: school.admissionAge.max
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        size="icon"
                        className="shrink-0"
                        disabled={!canSelect}
                      >
                        {isSelected ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}