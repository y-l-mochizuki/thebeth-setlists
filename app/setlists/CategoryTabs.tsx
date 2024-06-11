"use client";
import { Tab, Tabs } from "@nextui-org/react";

type Props = {
  all: React.ReactNode;
  thebest_thebeth: React.ReactNode;
  taiban: React.ReactNode;
};

export const CategoryTabs = ({ all, thebest_thebeth, taiban }: Props) => {
  return (
    <Tabs
      aria-label="Options"
      classNames={{
        base: "w-full ",
        tabList: "w-full bg-opacity-80",
        panel: "p-0",
        tabContent:
          "group-data-[selected=true]:text-white/95 text-xs font-bold",
        cursor: "dark:bg-opacity-80",
      }}
    >
      <Tab key="ALL" title="ALL">
        {all}
      </Tab>
      <Tab key="thebest_thebeth" title="ザ・ベストザベス">
        {thebest_thebeth}
      </Tab>
      <Tab key="taiban" title="対バン">
        {taiban}
      </Tab>
    </Tabs>
  );
};
