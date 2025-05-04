import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Globe,
  Building,
  Award,
  Star
} from "lucide-react";
import { ReviewForm } from "@/components/ReviewForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { School } from "@/lib/interfaces";

export default function SchoolProfile() {
  const { t } = useTranslation();
  const { id } = useParams();
  console.log("Params:", useParams());
  const { data, isLoading } = useQuery<{ data: { school: School } }>({
    // { reviews: Review[] } & School
    queryKey: [`/api/schools/${id}`],
  });
  console.log(data);
  const school = data?.data?.school;
  console.log(school);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-64 bg-white rounded-lg shadow animate-pulse" />
        </div>
      </div>
    );
  }

  if (!school) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold">{school.name}</h1>
          <div className="flex items-center mt-4 space-x-4">
            <Badge variant="secondary">{school.type}</Badge>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {school.address} {school.town}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t("school.about")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{school.description}</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>{t("school.ages", { min: school.ageLow, max: school.ageHigh })}</span>
                </div>

                {school.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5" />
                    <span>{school.phone}</span>
                  </div>
                )}

                {school.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>{school.email}</span>
                  </div>
                )}

                {school.website && (
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {t("school.details")}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("school.examResults")}</CardTitle>
              </CardHeader>
              <CardContent>
                {school.examResults ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">GCSE Pass Rate</div>
                      <div className="text-2xl font-bold">{school.examResults.gcse.passRate}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">A-Level Pass Rate</div>
                      <div className="text-2xl font-bold">{school.examResults.aLevel.passRate}%</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">{t("school.noResults")}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("school.facilities")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {school.facilities.map((facility) => (
                    <Badge key={facility} variant="outline">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/*<Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t("reviews.title")}</CardTitle>
              <CardDescription>
                {school.reviews.length} {t("reviews.title").toLowerCase()}
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>{t("reviews.writeReview")}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("reviews.writeReview")}</DialogTitle>
                  <DialogDescription>
                    Share your experience to help other parents make informed decisions
                  </DialogDescription>
                </DialogHeader>
                <ReviewForm schoolId={school.id} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {school.reviews.length > 0 ? (
              <div className="space-y-4">
                {school.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">
                        {review.author || t("reviews.anonymous")}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">{t("reviews.noReviews")}</p>
            )}
          </CardContent>
        </Card>*/}
      </div>
    </div>
  );
}
