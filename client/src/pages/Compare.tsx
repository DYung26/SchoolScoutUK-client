import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { School } from "@/lib/types";

export default function Compare() {
  const [location] = useLocation();
  const [selectedSchools, setSelectedSchools] = useState<number[]>([]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const schools = params.get('schools');
    if (schools) {
      setSelectedSchools(schools.split(',').map(Number));
    }
  }, [location]);

  const { data: schools } = useQuery<School[]>({
    queryKey: ["/api/schools"],
    enabled: selectedSchools.length > 0,
  });

  const compareSchools = schools?.filter(s => selectedSchools.includes(s.id)) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>School Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Criteria</TableHead>
                  {compareSchools.map(school => (
                    <TableHead key={school.id}>{school.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Type</TableCell>
                  {compareSchools.map(school => (
                    <TableCell key={school.id}>{school.type}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Location</TableCell>
                  {compareSchools.map(school => (
                    <TableCell key={school.id}>{school.city}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Age Range</TableCell>
                  {compareSchools.map(school => (
                    <TableCell key={school.id}>
                      {school.admissionAge.min}-{school.admissionAge.max}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">GCSE Pass Rate</TableCell>
                  {compareSchools.map(school => (
                    <TableCell key={school.id}>
                      {school.examResults?.gcse.passRate}%
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">A-Level Pass Rate</TableCell>
                  {compareSchools.map(school => (
                    <TableCell key={school.id}>
                      {school.examResults?.aLevel.passRate}%
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Facilities</TableCell>
                  {compareSchools.map(school => (
                    <TableCell key={school.id}>
                      {school.facilities.join(", ")}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Specialties</TableCell>
                  {compareSchools.map(school => (
                    <TableCell key={school.id}>
                      {school.specialties.join(", ")}
                    </TableCell>
                  ))}
                </TableRow>
                {compareSchools.some(s => s.fees) && (
                  <TableRow>
                    <TableCell className="font-medium">Annual Fees</TableCell>
                    {compareSchools.map(school => (
                      <TableCell key={school.id}>
                        {school.fees ? `£${school.fees.annual.toLocaleString()}` : "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
