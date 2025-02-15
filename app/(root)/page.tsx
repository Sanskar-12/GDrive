import Dashboard from "@/components/Dashboard";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";

export default async function Home() {
  const [totalSpaceUsed, recentFiles] = await Promise.all([
    getTotalSpaceUsed(),
    getFiles({ types: [], limit: 10 }),
  ]);

  return (
    <Dashboard totalSpaceUsed={totalSpaceUsed} recentFiles={recentFiles} />
  );
}
