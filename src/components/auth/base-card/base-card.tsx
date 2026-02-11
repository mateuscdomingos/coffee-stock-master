import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { ReactNode } from 'react';

interface BaseCardProps {
  children: ReactNode;
  description: ReactNode;
}

export function BaseCard({ children, description }: BaseCardProps) {
  return (
    <div className="w-full max-w-sm">
      <Card className="mt-4">
        <CardHeader>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
