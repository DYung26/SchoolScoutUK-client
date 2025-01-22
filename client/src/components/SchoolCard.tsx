import { School, GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { School as SchoolType } from "@/lib/types";
import { Link } from "wouter";

interface Props {
  school: SchoolType;
  showActions?: boolean;
}

export function SchoolCard({ school, showActions = true }: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{school.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {school.city}
            </CardDescription>
          </div>
          <Badge variant={school.type === 'private' ? 'default' : 'secondary'}>
            {school.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span>
              Ages {school.admissionAge.min}-{school.admissionAge.max}
            </span>
          </div>
          
          {school.examResults && (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                GCSE Pass Rate: {school.examResults.gcse.passRate}%
              </div>
              <div>
                A-Level Pass Rate: {school.examResults.aLevel.passRate}%
              </div>
            </div>
          )}

          {showActions && (
            <div className="flex space-x-2 mt-4">
              <Button asChild className="flex-1">
                <Link href={`/schools/${school.id}`}>
                  View Details
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href={`/compare?schools=${school.id}`}>
                  Compare
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
