import { z } from 'zod';

export const newStoreSchema = z.object({
  name: z.string().min(3, 'minNameLength'),
  monthlyBudgetInCents: z.number().min(1, 'minBudget'),
});

export type StoreInput = z.infer<typeof newStoreSchema>;
