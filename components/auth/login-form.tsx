"use client";

import { useState, useTransition } from "react";

import { CardWrapper } from "./card-wrapper";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { login } from "@/actions/login";
import Link from "next/link";

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			login(values).then((data) => {
				setError(data.Error);
				setSuccess(data.Success);
			});
		});
	};

	return (
		<div>
			<CardWrapper
				headerLabel="Welcome Back"
				backButtonHref="/"
				backButtonLabel="Go Back"
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-5">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												id="email"
												type="email"
												placeholder="Email"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage {...field} />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												id="password"
												type="password"
												placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
												disabled={isPending}
											/>
										</FormControl>
										<Button
											size="sm"
											variant="link"
											className="px-0 font-normal"
										>
											<Link className="text-white" href="/auth/reset">
												Forgot Password?
											</Link>
										</Button>
										<FormMessage {...field} />
									</FormItem>
								)}
							/>
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button
							disabled={isPending}
							type="submit"
							className="w-full font-semibold text-gray-800 hover:bg-gray-800 hover:border-gray-800 hover:text-white"
							variant="outline"
						>
							Login
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</div>
	);
};
