import { Main } from '@/components/home/main';
import { Motivation } from '@/components/home/motivation';
import { Architecture } from '@/components/home/architecture';
import { Footer } from '@/components/home/footer';
import { Stack } from '@/components/home/stack';
import { CICD } from '@/components/home/cicd';

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      <Main />
      <Motivation />
      <Architecture />
      <Stack />
      <CICD />
      <Footer />
    </main>
  );
}
