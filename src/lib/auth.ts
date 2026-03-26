import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Resend } from 'resend';

import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: process.env.AUTH_EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          throw new Error('Missing RESEND_API_KEY');
        }

        const resend = new Resend(apiKey);

        await resend.emails.send({
          from: provider.from as string,
          to: identifier,
          subject: 'Sign in to WorkHop',
          text: `Sign in to WorkHop\n\n${url}\n\nIf you did not request this email, you can ignore it.`,
        });
      },
    }),
  ],
  session: {
    strategy: 'database',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        (session.user as { id?: string }).id = user.id;
      }
      return session;
    },
  },
};

export const nextAuthHandler = NextAuth(authOptions);
