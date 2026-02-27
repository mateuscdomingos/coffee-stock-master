import NextAuth from 'next-auth';
import authConfig from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { AuthUserUseCaseFactory } from './infra/factories/AuthUserUseCaseFactory';
import { loginSchema } from './lib/schemas/auth';

const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;

        const loginUseCase = AuthUserUseCaseFactory.makeAuthUserUseCase();
        const logger = AuthUserUseCaseFactory.makeLogger();

        try {
          const user = await loginUseCase.execute({ email, password });

          if (user) {
            logger.info(NextAuth.name, 'User authenticated:', user.email);
            return { id: user.id, name: user.name, email: user.email };
          }
        } catch (error) {
          logger.error(NextAuth.name, 'Auth error:', error);
          return null;
        }

        return null;
      },
    }),
  ],
});

export { handlers, auth, signIn, signOut };
