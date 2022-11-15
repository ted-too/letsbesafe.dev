import type { SearchResult } from "../types";
import SearchForm from "./search-form";
import SearchResultCard from "./search-result";
import { createSignal } from "solid-js";

type Props = {
  searchResults: SearchResult[];
};

export default function SearchPage({ searchResults }: Props) {
  return (
    <SearchForm>
      <div class="grid items-start grid-cols-1 gap-6 mx-auto mt-6 mb-16 justify-items-center sm:grid-cols-2 xl:grid-cols-3 sm:max-w-xl xl:max-w-5xl">
        {searchResults.map((result) => (
          <SearchResultCard type="YT" data={result} />
        ))}
      </div>
    </SearchForm>
  );
}
