"use client";

import { useState, useTransition } from "react";

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
	FormDescription,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const weekdays = [
	{ id: 1, name: "Monday" },
	{ id: 2, name: "Tuesday" },
	{ id: 3, name: "Wednesday" },
	{ id: 4, name: "Thursday" },
	{ id: 5, name: "Friday" },
	{ id: 6, name: "Saturday" },
	{ id: 7, name: "Sunday" },
];

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DoctorAvailabilitySchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { addAvailability } from "@/actions/add-availability";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";

const DoctorAvailabilityForm = ({ doctorId }: any) => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof DoctorAvailabilitySchema>>({
		resolver: zodResolver(DoctorAvailabilitySchema),
		defaultValues: {
			doctorId: doctorId,
		},
	});

	const onSubmit = (values: z.infer<typeof DoctorAvailabilitySchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			addAvailability(values).then((data) => {
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
					<CardTitle>Doctor Availability</CardTitle>
					<CardDescription>
						Add a new availability for the doctor
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="space-y-3">
								<FormField
									control={form.control}
									name="doctorId"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													id="doctorId"
													type="text"
													placeholder="Doctor ID"
													disabled
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="weekday"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Select
													onValueChange={(value) => {
														field.onChange(value);
													}}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select Weekday" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{weekdays.map((weekday: any) => (
															<SelectItem key={weekday.id} value={weekday.name}>
																{weekday.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="startTime"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Starting Time</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-[240px] pl-3 text-left font-normal",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value ? (
																format(field.value, "h:mm aa")
															) : (
																<span>Pick a time</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<DatePicker
														selected={field.value}
														onChange={field.onChange}
														showTimeSelect
														showTimeSelectOnly
														timeIntervals={15}
														timeCaption="Time"
														dateFormat="h:mm aa"
													/>
												</PopoverContent>
											</Popover>
											<FormDescription>
												Select the starting time for the availability
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="endTime"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Ending Time</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-[240px] pl-3 text-left font-normal",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value ? (
																format(field.value, "h:mm aa")
															) : (
																<span>Pick a time</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<DatePicker
														selected={field.value}
														onChange={field.onChange}
														showTimeSelect
														showTimeSelectOnly
														timeIntervals={15}
														timeCaption="Time"
														dateFormat="h:mm aa"
													/>
												</PopoverContent>
											</Popover>
											<FormDescription>
												Select the ending time for the availability
											</FormDescription>
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
								className="w-full font-semibold shadow-md active:translate-y-[0.12rem] duration-300 hover:text-white hover:bg-gray-900"
								variant="outline"
							>
								Add Availability
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<Button variant="link">
						<a href={`/admin/doctor-availability/${doctorId}`}>Go back</a>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default DoctorAvailabilityForm;
