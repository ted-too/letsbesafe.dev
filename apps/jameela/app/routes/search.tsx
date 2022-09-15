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
  return (
    <>
      <SearchForm
        children={
          <div className="grid items-start grid-cols-1 gap-6 mx-auto mt-6 mb-16 justify-items-center sm:grid-cols-2 xl:grid-cols-3 sm:max-w-xl xl:max-w-5xl">
            {results &&
              results.map(({ id, thumbnail, title }) => (
                <Link
                  to={`/video?src=yt&id=${id}`}
                  className="flex flex-col space-y-4 transition-all rounded-md w-80 sm:w-64 xl:w-80 focus-ring"
                  key={id}
                >
                  <YTImage src={thumbnail.url || "/no-image.png"} />
                  <span className="text-lg font-semibold text-normal line-clamp-3">{title}</span>
                </Link>
              ))}
          </div>
        }
      />
    </>
  );
}

export { ErrorBoundary };
