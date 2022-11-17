import type { SearchResult } from "../types";
import SearchResultCard from "./search-result";
import clsx from "clsx";
import { Component, For } from "solid-js";

type Props = {
  searchResults: SearchResult[];
  class?: string;
};

const SearchPage: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        "grid items-start grid-cols-1 gap-6 mx-auto mb-16 justify-items-center sm:grid-cols-2 xl:grid-cols-3 sm:max-w-xl xl:max-w-5xl",
        props.class
      )}
    >
      <For each={props.searchResults}>{(result) => <SearchResultCard data={result} />}</For>
    </div>
  );
};

export default SearchPage;
