"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, Suspense, useState } from "react";

type Props = {
  all: React.ReactNode;
  thebest_thebeth: React.ReactNode;
  taiban: React.ReactNode;
};

const TAB_NAMES = {
  ALL: "ALL",
  THEBEST_THEBETH: "thebest_thebeth",
  TAIBAN: "taiban",
} as const;

type TAB_NAMES = (typeof TAB_NAMES)[keyof typeof TAB_NAMES];

const isTabName = (value: any): value is TAB_NAMES => {
  return Object.values(TAB_NAMES).includes(value);
};

const getTabName = (value: any): TAB_NAMES => {
  return isTabName(value) ? value : TAB_NAMES.ALL;
};

export const CategoryTabs = ({ all, thebest_thebeth, taiban }: Props) => {
  const CategoryTabsContent = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("category");
    const [selected, setSelected] = useState<TAB_NAMES>(getTabName(search));

    const router = useRouter();
    const pathname = usePathname();
    const handleSelectionChange = (key: Key) => {
      const tabName = getTabName(key);
      setSelected(tabName);
      router.replace(`${pathname}?category=${tabName}`);
    };

    return (
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
        classNames={{
          base: "w-full ",
          tabList: "w-full bg-opacity-80",
          panel: "p-0",
          tabContent:
            "group-data-[selected=true]:text-white/95 text-xs font-bold",
          cursor: "dark:bg-opacity-80",
        }}
      >
        <Tab key={TAB_NAMES.ALL} title="ALL">
          {all}
        </Tab>
        <Tab key={TAB_NAMES.THEBEST_THEBETH} title="ザ・ベストザベス">
          {thebest_thebeth}
        </Tab>
        <Tab key={TAB_NAMES.TAIBAN} title="対バン">
          {taiban}
        </Tab>
      </Tabs>
    );
  };

  return (
    <Suspense>
      <CategoryTabsContent />
    </Suspense>
  );
};
