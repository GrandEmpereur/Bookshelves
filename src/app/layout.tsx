import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body style={{ display: 'flex' }}>
      <Sidebar />
      </body>
    </html>
  );
}
