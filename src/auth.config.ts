import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/schemas/auth';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (validated.success) return validated.data;
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
