import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";
import YTImage from "~/components/image";
import SearchForm, { ErrorBoundary } from "~/components/search-form";
import { Result, getVideos } from "~/utils/search.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const type = url.searchParams.get("type");
  invariant(query, "Expected query string");
  invariant(type, "Expected search type");
  const results = await getVideos(query);
  return json(results);
};

export default function SearchPage() {
  const results = useLoaderData<Result[]>();
  const { state } = useTransition();
  return (
    <>
      <SearchForm
        children={
          <div className="grid grid-cols-3 gap-6 mt-6 max-w-5xl mx-auto mb-16">
            {results &&
              results.map(({ id, thumbnail, title }) => (
                <Link
                  to={`/video?src=yt&id=${id}`}
                  className="flex flex-col space-y-4 w-80 rounded-md transition-all focus-ring"
                  key={id}
                >
                  <YTImage src={thumbnail.url || "/no-image.png"} />
                  <span className="text-lg text-normal font-semibold line-clamp-3">{title}</span>
                </Link>
              ))}
          </div>
        }
      />
    </>
  );
}

export { ErrorBoundary };
