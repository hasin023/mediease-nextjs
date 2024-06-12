"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { reimbursementRequestSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
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
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { requestReimburstment } from "@/actions/request-Reimburstment";

const RequestForm = ({ appointment, reimburstment }: any) => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof reimbursementRequestSchema>>({
		resolver: zodResolver(reimbursementRequestSchema),
		defaultValues: {
			patientId: appointment.patientId,
			appointmentId: appointment.id,
			amount: 0,
			billImgUrl: "",
			referralImgUrl: "",
			prescriptionImgUrl: "",
			status: "PENDING",
			submittedAt: new Date(),
		},
	});

	const onSubmit = (values: z.infer<typeof reimbursementRequestSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			requestReimburstment(values).then((data) => {
				setError(data.Error);
				setSuccess(data.Success);
			});
		});

		form.reset();
	};

	return (
		<div className="py-8 px-12">
			<Card>
				<CardHeader>
					<CardTitle>Request Reimburstment</CardTitle>
					<CardDescription>
						Fill the form to request for Reimburstment of Appointment{" "}
						<span className="font-semibold">{appointment.id}</span>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="space-y-3">
								<FormField
									control={form.control}
									name="appointmentId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Appointment ID</FormLabel>
											<FormControl>
												<Input
													{...field}
													id="appointmentId"
													type="text"
													placeholder="Appointment ID"
													disabled={true}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="patientId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Patient ID</FormLabel>
											<FormControl>
												<Input
													{...field}
													id="patientId"
													type="text"
													placeholder="Patient ID"
													disabled={true}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Due Amount</FormLabel>
											<FormControl>
												<Input
													{...field}
													id="amount"
													type="number"
													placeholder="Due Amount"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="billImgUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Billing Receipt</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="cursor-pointer"
													id="billImgUrl"
													type="file"
													placeholder="Billing Receipt"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="referralImgUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Referral Document</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="cursor-pointer"
													id="referralImgUrl"
													type="file"
													placeholder="Referral Document"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="prescriptionImgUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Prescription Image</FormLabel>
											<FormControl>
												<Input
													{...field}
													className="cursor-pointer"
													id="prescriptionImgUrl"
													type="file"
													placeholder="Prescription Image"
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
								className="w-full font-semibold shadow-md active:translate-y-[0.12rem] duration-300 hover:text-white hover:bg-gray-900"
								variant="outline"
							>
								Request
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<Button variant="link">
						<a href="/patient/expenses">Go back</a>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default RequestForm;
