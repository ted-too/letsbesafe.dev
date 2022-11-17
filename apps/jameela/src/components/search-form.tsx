import { Component, JSX, Show, createSignal, mergeProps } from "solid-js";
import { Button } from "ui/kit/buttons";
import { TextInput } from "ui/kit/inputs";

interface Props {
  children?: JSX.Element;
  firstSearch?: boolean;
}

const SearchForm: Component<Props> = (_props) => {
  const props = mergeProps({ firstSearch: false, children: null }, _props);
  const [searchTerm, setSearchTerm] = createSignal("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    window.location.href = `/search/${searchTerm()}`;
  };
  return (
    <>
      <Show
        when={props.firstSearch}
        fallback={<span class="text-center sm:text-lg mb-6 mt-[5vh] text-secondary">Search for another video</span>}
      >
        <p class="text-center sm:text-lg mb-6 mt-[15vh] text-secondary">
          Download and save your youtube videos in a <br /> format of your choice
        </p>
      </Show>
      <form onSubmit={handleSubmit} class="relative w-full max-w-sm sm:max-w-none">
        <div class="flex flex-col items-center justify-center w-full space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <TextInput
            name="search"
            placeholder="Search or paste link"
            class="w-full sm:w-[50%] lg:w-[40%] rounded"
            value={searchTerm()}
            onInput={(e) => setSearchTerm(e.currentTarget.value)}
            required
          />
          <Button type="submit" class="text-sm rounded sm:text-base" size="lg">
            Search
          </Button>
        </div>
      </form>
      <Show when={!props.firstSearch}>
        <div class="relative w-full transition-opacity max-w-7xl">{props.children}</div>
      </Show>
    </>
  );
};

export default SearchForm;
