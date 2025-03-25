import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions:AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Call your backend API for authentication
        const res = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();
        if (!res.ok || !user) {
          throw new Error(user?.message || 'Invalid credentials');
        }

        return user; // Return user object for session
      },
    }),
  ],
  pages: {
    signIn: '/login',  // Redirect to login page if not authenticated
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  secret: process.env.JWT_SECRET, // Ensure you have a secret for encryption
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
