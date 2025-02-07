import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";

const Page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";

  const files = await getFiles();

  console.log(files);

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0 MB</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
