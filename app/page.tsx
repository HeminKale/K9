import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TabsProvider } from "@/components/TabsProvider";
import { TabsContent } from "@/components/ui/tabs";
import { sectionComponents, tabGroups } from "@/lib/tabConfig";

export default function Home() {
  return (
    <TabsProvider>
      <Navbar />
      <main className="flex-1">
        {tabGroups.map((group) => (
          <TabsContent key={group.id} value={group.id} keepMounted>
            {group.sections.map((sectionId) => {
              const SectionComponent = sectionComponents[sectionId];
              return <SectionComponent key={sectionId} />;
            })}
          </TabsContent>
        ))}
      </main>
      <Footer />
    </TabsProvider>
  );
}
