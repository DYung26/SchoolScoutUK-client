import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { FilterPanel, type FilterOptions } from "@/components/FilterPanel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import type { School } from "@/lib/types";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Compare() {
  const [location, setLocation] = useLocation();
  const [selectedSchools, setSelectedSchools] = useState<number[]>([]);
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  const { data: allSchools, isError: isAllSchoolsError } = useQuery<School[]>({
    queryKey: ["/api/schools", filterOptions],
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load schools. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const { data: schools, isError: isCompareError } = useQuery<School[]>({
    queryKey: [`/api/schools/compare?ids=${selectedSchools.join(',')}`],
    enabled: selectedSchools.length > 0,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load comparison data. Please try again later.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const schoolIds = params.get('schools');
    if (schoolIds) {
      setSelectedSchools(schoolIds.split(',').map(Number));
    }
  }, [location]);

  const handleAddSchool = (schoolId: string) => {
    if (selectedSchools.length < 3) {
      const newSelectedSchools = [...selectedSchools, parseInt(schoolId)];
      setSelectedSchools(newSelectedSchools);
      setLocation(`/compare?schools=${newSelectedSchools.join(',')}`);
    }
  };

  const handleRemoveSchool = (schoolId: number) => {
    const newSelectedSchools = selectedSchools.filter(id => id !== schoolId);
    setSelectedSchools(newSelectedSchools);
    setLocation(newSelectedSchools.length ? `/compare?schools=${newSelectedSchools.join(',')}` : '/compare');
  };

  if (isAllSchoolsError || isCompareError) {
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

  const handleFilter = (filters: FilterOptions) => {
    setFilterOptions(filters);
  };

  const academicData = schools?.map(school => ({
    name: school.name,
    GCSE: school.examResults?.gcse.passRate || 0,
    'A-Level': school.examResults?.aLevel.passRate || 0,
  }));

  const facilitiesData = schools?.map(school => ({
    name: school.name,
    facilitiesCount: school.facilities?.length || 0,
    specialtiesCount: school.specialties?.length || 0,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('compare.title')}</CardTitle>
            <CardDescription>{t('compare.description')}</CardDescription>

            <div className="mt-4 flex items-center gap-4">
              <Select
                disabled={selectedSchools.length >= 3}
                onValueChange={handleAddSchool}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder={t('compare.selectSchool')} />
                </SelectTrigger>
                <SelectContent>
                  {allSchools
                    ?.filter(school => !selectedSchools.includes(school.id))
                    .map(school => (
                      <SelectItem key={school.id} value={school.id.toString()}>
                        {school.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {t('compare.maxSchools')}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <FilterPanel onFilter={handleFilter} />

            {!schools?.length ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {t('compare.selectToCompare')}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-8 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('compare.academicChart')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full overflow-x-auto">
                        <BarChart
                          width={600}
                          height={300}
                          data={academicData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="GCSE" fill="#8884d8" />
                          <Bar dataKey="A-Level" fill="#82ca9d" />
                        </BarChart>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t('compare.facilitiesChart')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full overflow-x-auto">
                        <RadarChart
                          width={600}
                          height={300}
                          data={facilitiesData}
                        >
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis />
                          <Radar
                            name="Facilities"
                            dataKey="facilitiesCount"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                          />
                          <Radar
                            name="Specialties"
                            dataKey="specialtiesCount"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            fillOpacity={0.6}
                          />
                          <Legend />
                        </RadarChart>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('compare.criteria')}</TableHead>
                        {schools.map(school => (
                          <TableHead key={school.id} className="min-w-[250px]">
                            <div className="flex justify-between items-center">
                              <span>{school.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveSchool(school.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">{t('school.type')}</TableCell>
                        {schools.map(school => (
                          <TableCell key={school.id}>
                            {t(`schoolTypes.${school.type}`)}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('school.location')}</TableCell>
                        {schools.map(school => (
                          <TableCell key={school.id}>
                            {school.city}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('school.ageRange')}</TableCell>
                        {schools.map(school => (
                          <TableCell key={school.id}>
                            {t('school.ages', {
                              min: school.admissionAge.min,
                              max: school.admissionAge.max
                            })}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('school.gcseResults')}</TableCell>
                        {schools.map(school => (
                          <TableCell key={school.id}>
                            {school.examResults ? (
                              <div className="space-y-2">
                                <div className="text-sm">
                                  {formatPercentage(school.examResults.gcse.passRate, i18n.language)}
                                </div>
                                <Progress
                                  value={school.examResults.gcse.passRate}
                                  className="h-2"
                                />
                              </div>
                            ) : (
                              t('school.noResults')
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('school.aLevelResults')}</TableCell>
                        {schools.map(school => (
                          <TableCell key={school.id}>
                            {school.examResults ? (
                              <div className="space-y-2">
                                <div className="text-sm">
                                  {formatPercentage(school.examResults.aLevel.passRate, i18n.language)}
                                </div>
                                <Progress
                                  value={school.examResults.aLevel.passRate}
                                  className="h-2"
                                />
                              </div>
                            ) : (
                              t('school.noResults')
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('school.facilities')}</TableCell>
                        {schools.map(school => (
                          <TableCell key={school.id}>
                            <div className="space-y-1">
                              {school.facilities?.map(facility => (
                                <div key={facility} className="text-sm">
                                  • {facility}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">{t('school.specialties')}</TableCell>
                        {schools.map(school => (
                          <TableCell key={school.id}>
                            <div className="space-y-1">
                              {school.specialties?.map(specialty => (
                                <div key={specialty} className="text-sm">
                                  • {specialty}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                      {schools.some(s => s.fees) && (
                        <TableRow>
                          <TableCell className="font-medium">{t('school.annualFees')}</TableCell>
                          {schools.map(school => (
                            <TableCell key={school.id}>
                              {school.fees ? (
                                formatCurrency(school.fees.annual, 'GBP', i18n.language)
                              ) : (
                                t('school.noFees')
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}