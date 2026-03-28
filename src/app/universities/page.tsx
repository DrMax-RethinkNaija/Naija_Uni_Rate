import { Suspense } from "react";
import UniversitiesClient from "./UniversitiesClient";

export const metadata = {
  title: "Browse Universities - RateMyNaijaLecturer",
};

export default function UniversitiesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="h-8 w-48 bg-dark-800 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-dark-800 border border-dark-700 rounded-xl p-4 h-32 animate-pulse"
              />
            ))}
          </div>
        </div>
      }
    >
      <UniversitiesClient />
    </Suspense>
  );
}
