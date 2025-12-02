"use client";

import { Tab, Tabs } from "@/components/Tabs";
import HiraganaList from "./HiraganaList";
import KatakanaList from "./KatakanaList";

const Stage0 = () => {
  return (
    <Tabs>
      <Tab label={"Hiragana"} className="px-12">
        <HiraganaList />
      </Tab>
      <Tab label={"Katakana"} className="px-12">
        <KatakanaList />
      </Tab>
    </Tabs>
  );
};
export default Stage0;
