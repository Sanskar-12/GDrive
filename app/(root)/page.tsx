import { getTotalSpaceUsed } from "@/lib/actions/file.actions";

export default async function Home() {
  const totalSpaceUsed = await getTotalSpaceUsed();

  console.log(totalSpaceUsed);

  return (
    <div className="flex-center h-screen">
      <div className="h1">StoreIt</div>
    </div>
  );
}
