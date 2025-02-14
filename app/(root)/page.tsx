import Chart from "@/components/Chart";
import { getTotalSpaceUsed } from "@/lib/actions/file.actions";

export default async function Home() {
  const totalSpaceUsed = await getTotalSpaceUsed();

  return (
    <div className="dashboard-container">
      {/* Charts and Files Summary */}
      <section>
        <Chart used={totalSpaceUsed.used} />
      </section>

      {/* Recent Files Uploaded */}
      <section></section>
    </div>
  );
}
