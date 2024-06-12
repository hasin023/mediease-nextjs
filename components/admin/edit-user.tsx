"use client";

import { useState, useTransition, useEffect } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { update } from "@/actions/update";

export const EditUser = ({ userData }: any) => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: userData,
	});

	useEffect(() => {
		if (form.watch("role") !== "PATIENT") {
			form.setValue("patientType", "null");
		}
	}, [form.watch("role")]);

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			update(userData.id, values).then((data) => {
				setError(data.Error);
				setSuccess(data.Success);
			});
		});
	};

	return (
		<div className="py-8 px-12">
			<Card>
				<CardHeader>
					<CardTitle>Edit User</CardTitle>
					<CardDescription>
						Fill the form to edit the current user
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="space-y-3">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													id="name"
													type="text"
													placeholder="Name"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
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
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="role"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Role</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select user Role" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="PATIENT">Patient</SelectItem>
														<SelectItem value="DOCTOR">Doctor</SelectItem>
														<SelectItem value="ADMIN">Admin</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								{form.watch("role") === "PATIENT" && (
									<FormField
										control={form.control}
										name="patientType"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Patient type</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select patient type" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="STUDENT">Student</SelectItem>
															<SelectItem value="FACULTY">Faculty</SelectItem>
															<SelectItem value="STAFF">Staff</SelectItem>
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage {...field} />
											</FormItem>
										)}
									/>
								)}
							</div>
							<FormError message={error} />
							<FormSuccess message={success} />
							<Button
								disabled={isPending}
								type="submit"
								className="w-full font-semibold"
								variant="default"
							>
								Save
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<Button variant="link">
						<a href="/admin/users">Go back</a>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
