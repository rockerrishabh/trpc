import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'
// NextAuth options
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // ...add more providers here
  ],

  session: {
    strategy: 'database',
  },

  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      session.user.role = user.role
      return session
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in', // Error code passed in query string as ?error=
    newUser: '/dashboard/profile', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
}

export default NextAuth(authOptions)
