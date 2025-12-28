import { SearchParams } from "nuqs/server";
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="sticky top-24">Sidebar</div>
        </div>

        <div className="lg:w-3/4">Products</div>
      </div>
    </div>
  );
}
