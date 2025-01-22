import { School, GraduationCap, MapPin } from "lucide-react";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface Props {
  school: SchoolType;
  showActions?: boolean;
}

export function SchoolCard({ school, showActions = true }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <Card className="h-full">
      {school.imageUrl && (
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src={school.imageUrl.startsWith('http') ? school.imageUrl : `/assets/schools/${school.imageUrl}`}
            alt={school.name}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </AspectRatio>
      )}
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
            {t(`schoolTypes.${school.type}`)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span>
              {t('school.ages', { min: school.admissionAge.min, max: school.admissionAge.max })}
            </span>
          </div>

          {school.examResults && (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">GCSE: </span>
                {formatPercentage(school.examResults.gcse.passRate, i18n.language)}
              </div>
              <div>
                <span className="text-muted-foreground">A-Level: </span>
                {formatPercentage(school.examResults.aLevel.passRate, i18n.language)}
              </div>
            </div>
          )}

          {school.fees && (
            <div className="text-sm text-muted-foreground">
              {t('school.annualFee')}: {formatCurrency(school.fees.annual, 'GBP', i18n.language)}
            </div>
          )}

          {showActions && (
            <div className="flex space-x-2 mt-4">
              <Button asChild className="flex-1">
                <Link href={`/schools/${school.id}`}>
                  {t('school.details')}
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href={`/compare?schools=${school.id}`}>
                  {t('school.compare')}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}