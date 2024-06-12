"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";

import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { StaffPatientSchema } from "@/schemas";
import { updateStaffProfile } from "@/actions/update-staff-profile";

const EditStaffProfile = ({ user, patient, info }: any) => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof StaffPatientSchema>>({
		resolver: zodResolver(StaffPatientSchema),
		defaultValues: {
			...user,
			...patient,
			...info,
		},
	});

	const onSubmit = (values: z.infer<typeof StaffPatientSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			updateStaffProfile(patient.id, values).then((data: any) => {
				setError(data.Error);
				setSuccess(data.Success);
			});
		});
	};

	return (
		<div className="w-full px-24">
			<Card className="shadow-xl">
				<CardHeader>
					<CardTitle>Update Profile</CardTitle>
					<CardDescription>
						Update your profile information here.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="space-y-3">
								<FormLabel>Patient Information</FormLabel>
								<FormField
									control={form.control}
									name="dob"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-[20rem] pl-3 text-center font-normal",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value ? (
																format(field.value, "PPP")
															) : (
																<span>Date of Birth</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<DatePicker
														selected={field.value}
														onChange={field.onChange}
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="gender"
									render={({ field }) => (
										<FormItem>
											<Select onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select gender" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Male">Male</SelectItem>
													<SelectItem value="Female">Female</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													id="phone"
													type="text"
													placeholder="Phone Number"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="bloodGroup"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													id="bloodGroup"
													type="text"
													placeholder="Blood Group"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="address"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													id="address"
													type="text"
													placeholder="Address"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>

								<FormLabel>Staff Information</FormLabel>
								<FormField
									control={form.control}
									name="position"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													id="position"
													type="text"
													placeholder="Position"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="department"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													id="department"
													type="text"
													placeholder="Department"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="hireDate"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-[20rem] pl-3 text-center font-normal",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value ? (
																format(field.value, "PPP")
															) : (
																<span>Date of Joining</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<DatePicker
														selected={field.value}
														onChange={field.onChange}
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormError message={error} />
							<FormSuccess message={success} />

							<Button
								disabled={isPending}
								type="submit"
								className="w-full font-semibold hover:bg-gray-800 hover:text-white"
								variant="outline"
							>
								Update Profile
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<Button variant="link">
						<a href="/profile">Go to Profile &rarr;</a>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default EditStaffProfile;
