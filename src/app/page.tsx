import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to Coffee Stock</h1>
      <Link href="/register" className="text-blue-500 underline">
        Register
      </Link>
    </main>
  );
}
