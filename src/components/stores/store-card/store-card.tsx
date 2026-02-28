import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCentsToCurrency } from '@/lib/utils';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { StoreProps } from '@/core/domain/Store/store.types';

export interface StoreCardProps {
  store: StoreProps;
}

export function StoreCard({ store }: StoreCardProps) {
  const t = useTranslations('components.stores.storeCard');

  const { id, name, monthlyBudgetInCents } = store;

  return (
    <Link href={`/stores/${id}/overview`} className="block group">
      <Card className="transition-all group-hover:border-primary group-hover:shadow-md cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-bold truncate pr-2">
            {name.toUpperCase()}
          </CardTitle>
          <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground tracking-wider">
              {t('monthlyBudget')}
            </span>
            <span className="text-2xl font-bold tracking-tight">
              {formatCentsToCurrency(monthlyBudgetInCents)}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="font-normal text-[10px]">
              {t('overview')}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
