import Chart from "@/components/Chart";
import { getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Dashboard = async () => {
  const totalSpaceUsed = await getTotalSpaceUsed();

  const usageSummary = getUsageSummary(totalSpaceUsed);

  return (
    <div className="dashboard-container">
      {/* Charts and Files Summary */}
      <section>
        <Chart used={totalSpaceUsed.used} />

        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="Image"
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size)}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </section>

      {/* Recent Files Uploaded */}
      <section></section>
    </div>
  );
};

export default Dashboard;
