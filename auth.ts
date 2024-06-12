import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import type { PatientType, UserRole } from "@prisma/client";

var bcrypt = require("bcryptjs");

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			role: UserRole | "null";
			patientType: PatientType;
		} & DefaultSession["user"];
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	secret: process.env.AUTH_SECRET,
	callbacks: {
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole | "null";
			}

			if (token.patientType && session.user) {
				session.user.patientType = token.patientType as PatientType;
			}

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;

			token.role = existingUser.role;
			if (existingUser.role === "PATIENT") {
				token.patientType = existingUser.patientType;
			} else {
				token.patientType = null;
			}

			return token;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	providers: [
		Credentials({
			authorize: async (credentials) => {
				const validatedFields = LoginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);
					const passwordMatch = bcrypt.compare(password, user?.password);

					if (passwordMatch) return user;
				}

				return null;
			},
		}),
	],
});
