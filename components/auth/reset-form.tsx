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

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { reset } from "@/actions/reset";

export const ResetForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (values: z.infer<typeof ResetSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			reset(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};

	return (
		<div>
			<CardWrapper
				headerLabel="Forgot your password?"
				backButtonHref="/auth/login"
				backButtonLabel="Back to Login"
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
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button
							disabled={isPending}
							type="submit"
							className="w-full font-semibold text-gray-800"
							variant="outline"
						>
							Send reset email
						</Button>
					</form>
				</Form>
			</CardWrapper>
		</div>
	);
};
