//Purpose:Matching skeleton while data loads;uses the shimmer utility

import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-3 shadow-soft">
      <div className="rounded-xl aspect-square bg-muted shimmer mb-3"></div>
      <div className="h-3 w-3/4 bg-muted rounded mb-2" />
      <div className="h-3 w-1/2 bg-muted rounded" />
      <div className="h-7 w-20 bg-muted rounded-full mt-3 ml-auto" />
    </div>
  );
}
