import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: 'flex' }}>
    <Sidebar />
    <main style={{ flexGrow: 1, marginLeft: '100px' }}> 
        {children}
    </main>
</div>
  );
}
