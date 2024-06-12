import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
import React from "react";
import { redirect } from "next/navigation";

const LoginPage = async () => {
	const session = await auth();

	if (session) {
		redirect("/profile");
	}

	return <LoginForm />;
};

export default LoginPage;
