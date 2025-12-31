import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const FilterSkeleton = () => {
  return (
    <Card className="w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="h-[calc(100vh-130px)]">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Skeleton className="h-5 w-20 mb-2" />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="flex items-center space-x-2 py-1">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Skeleton className="h-5 w-28 mb-2" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Skeleton className="h-5 w-36 mb-2" />

            <div className="space-y-3">
              <Skeleton className="h-2 w-full rounded-full" />
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-4 w-12" />
                ))}
              </div>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-4 w-12" />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default FilterSkeleton;
