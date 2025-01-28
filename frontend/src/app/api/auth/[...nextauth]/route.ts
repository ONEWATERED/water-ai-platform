import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from 'next-auth';

// Extend the built-in User type
interface CustomUser extends User {
  role?: string;
}

// Extend the built-in session type
declare module 'next-auth' {
  interface Session {
    user: CustomUser;
  }
  interface User {
    role?: string;
  }
}

// Extend the built-in JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your authentication logic here
        // This is a placeholder implementation
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        // In a real application, you would verify these credentials against your database
        const user: CustomUser = {
          id: '1',
          email: credentials.email,
          name: 'Test User',
          role: 'user'
        };

        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
