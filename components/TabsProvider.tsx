"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { Tabs } from "@/components/ui/tabs";
import { tabGroups } from "@/lib/tabConfig";

type TabsContextValue = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export function useActiveTab() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("useActiveTab must be used within a TabsProvider");
  }
  return ctx;
}

export function TabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>(tabGroups[0].id);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as string)}
        className="gap-0"
      >
        {children}
      </Tabs>
    </TabsContext.Provider>
  );
}
