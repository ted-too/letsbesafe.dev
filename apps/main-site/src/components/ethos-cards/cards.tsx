import { FreeAlways, NoAds, NoDataSharing, NoTracking } from "./illustrations";
import type { Component } from "solid-js";

const content = [
  {
    title: "No ads",
    subtitle: "Like ever",
    illustration: <NoAds />,
  },
  {
    title: "No tracking",
    subtitle: "Even your history",
    illustration: <NoTracking />,
  },
  {
    title: "No data sharing",
    subtitle: "We’d never sell your data",
    illustration: <NoDataSharing />,
  },
  {
    title: "Free always",
    subtitle: "You could donate if you like",
    illustration: <FreeAlways />,
  },
];

const EthosCards: Component = () =>
  content.map(({ title, subtitle, illustration }) => (
    <div class="max-w-[17.75rem] h-[22.75rem] w-full flex flex-col items-center text-center justify-between p-8 bg-base shadow-lg border border-primary dark:shadow-none">
      <div class="flex flex-col">
        <h3 class="text-3xl font-semibold">{title}</h3>
        <span class="text-xl whitespace-nowrap font-light text-secondary">{subtitle}</span>
      </div>
      {illustration}
    </div>
  ));

export default EthosCards;
