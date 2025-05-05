import GlobalHeader from "@/components/GNB/GlobalHeader";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <GlobalHeader />
            <main>{children}</main>
        </>
    );
}
