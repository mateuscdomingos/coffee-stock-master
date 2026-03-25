export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container mx-auto px-4 p-6">{children}</main>;
}
