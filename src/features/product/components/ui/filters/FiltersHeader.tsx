"use client";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FiltersHeader() {
  const { clearFilters, getActiveFilterCount } = useProductFilters();
  const activeFilterCount = getActiveFilterCount();

  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </CardTitle>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>
    </CardHeader>
  );
}
