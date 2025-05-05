import GlobalHeader from "@/components/GNB/GlobalHeader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalHeader />
      <main className="pt-[70px]" />
      {children}
    </>
  );
}
