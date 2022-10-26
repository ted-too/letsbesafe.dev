import type { SearchResult } from "../types";
import SearchResultCard from "./search-result";
import { Button } from "./ui-kit/buttons";
import { TextInput } from "./ui-kit/inputs";
import { JSXElement, createSignal } from "solid-js";

type Props = { children?: JSXElement; firstSearch?: null } | { firstSearch?: boolean; children?: null };

export default function SearchForm({ children, firstSearch = false }: Props) {
  const [searchTerm, setSearchTerm] = createSignal("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    window.location.href = `/search/${searchTerm()}`;
  };
  return (
    <>
      {firstSearch ? (
        <p class="text-center sm:text-lg mb-6 mt-[15vh] text-light">
          Download and save your youtube videos in a <br /> format of your choice
        </p>
      ) : (
        <span class="text-center sm:text-lg mb-6 mt-[5vh] text-light">Search for another video</span>
      )}
      <form onSubmit={handleSubmit} class="relative w-full max-w-sm sm:max-w-none">
        <fieldset class="flex flex-col items-center justify-center w-full space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <TextInput
            value={searchTerm()}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            class="w-full sm:w-[50%] lg:w-[40%]"
            placeholder="Search or paste link"
            aria-label="search"
            name="search"
            required
          />
          <Button type="submit" class="text-sm rounded-lg sm:text-base">
            Search
          </Button>
        </fieldset>
      </form>
      <div class="relative w-full transition-opacity max-w-7xl">{children}</div>
    </>
  );
}
