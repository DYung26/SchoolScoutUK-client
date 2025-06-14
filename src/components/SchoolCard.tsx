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
import { Link, useLocation } from "wouter";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { ProgressCircle } from "./ProgressCircle";
import { type School as SchoolInterface } from "@/lib/interfaces";
import { SchoolTypeEnum } from "@/lib/enum";

interface Props {
  school: SchoolInterface & {
    score?: number,
    aiComment?: string
  };
  showActions?: boolean;
}

export function SchoolCard({ school, showActions = true }: Props) {
  const { t, i18n } = useTranslation();
  const [_, navigate] = useLocation();
  const { toast } = useToast();

  const handleCompare = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentSchools = searchParams.get('schools')?.split(',').map(Number) || [];

    if (currentSchools.includes(school.id)) {
      toast({
        description: "This school is already in comparison",
      });
      return;
    }

    if (currentSchools.length >= 3) {
      toast({
        description: t('compare.maxSchools'),
      });
      return;
    }

    const newSchools = [...currentSchools, school.id];
    navigate(`/compare?schools=${newSchools.join(',')}`);
  };

  return (
    <Card className="h-full drop-shadow transition-transform duration-100 hover:drop-shadow-2xl hover:-transalate-y-2 rounded-2xl">
      {school.imageUrl && (
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src={school.imageUrl}
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
              {school.town}
            </CardDescription>
          </div>
          <Badge variant={school.type === SchoolTypeEnum.GRAMMAR_SCHOOLS ? 'default' : 'secondary'
          }>
            {t(`schoolTypes.${school.type}`)}
          </Badge>
          {school.score && (
            <div className="flex items-center justify-between">
              <ProgressCircle value={school.score * 100} />
              <small>{Math.round(school.score * 100)}% Match</small>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span>
              {t('school.ages', { min: school.ageLow, max: school.ageHigh })}
            </span>
          </div>

          {school.aiComment && (
            <blockquote className="text-sm italic text-blue-700 mt-2 border-l-4 pl-2 border-blue-400">
              {school.aiComment}
            </blockquote>
          )}

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

          {showActions && school.schoolId && (
            <div className="flex space-x-2 mt-4">
              <Link to={`/schools/${school.schoolId}`}>
                <div className="flex-1 cursor-pointer">
                  <Button className="w-full">
                    {t('school.details')}
                  </Button>
                </div>
              </Link>
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={handleCompare}
              >
                {t('school.compare')}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
