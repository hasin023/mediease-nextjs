"use client";

import { RxCrossCircled } from "react-icons/rx";
import { CiCirclePlus } from "react-icons/ci";

import { useState, useTransition } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	PrescriptionSchema,
	PrescribedMedicineSchema,
	PrescribedTestSchema,
} from "@/schemas";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { addPrescription } from "@/actions/add-prescription";

const PrescribeForm = ({ appointment, medicinesList, testsList }: any) => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof PrescriptionSchema>>({
		resolver: zodResolver(PrescriptionSchema),
		defaultValues: {
			appointmentId: appointment.id,
			diagnosis: "",
			treatment: "",
			notes: "",
			prescribedMedicines: [],
			prescribedTests: [],
		},
	});

	const { control, register } = form;

	const {
		fields: testsFields,
		append: appendTest,
		remove: removeTest,
	} = useFieldArray({
		control,
		name: "prescribedTests",
	});

	const {
		fields: medicinesFields,
		append: appendMedicine,
		remove: removeMedicine,
	} = useFieldArray({
		control,
		name: "prescribedMedicines",
	});

	const onSubmit = (values: z.infer<typeof PrescriptionSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			addPrescription(values).then((data) => {
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
					<CardTitle>Prescription</CardTitle>
					<CardDescription>
						Fill the form to prescribe for the appointment{" "}
						<span className="font-semibold">{appointment.id}</span>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="space-y-3">
								<FormField
									control={form.control}
									name="diagnosis"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Diagnosis</FormLabel>
											<FormControl>
												<Input
													{...field}
													id="diagnosis"
													type="text"
													placeholder="Diagnosis"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="treatment"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Treatment</FormLabel>
											<FormControl>
												<Input
													{...field}
													id="treatment"
													type="text"
													placeholder="Treatment"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="notes"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Notes</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Add any additional notes"
													className="resize-none"
													{...field}
												/>
											</FormControl>
											<FormMessage {...field} />
										</FormItem>
									)}
								/>
								<div className="space-y-3">
									{/* Medicines */}
									<div className="flex flex-col gap-3">
										<FormLabel>Medicines</FormLabel>
										{medicinesFields.map((field, index) => (
											<div key={field.id} className="flex items-center gap-2">
												<FormField
													control={control}
													{...register(
														`prescribedMedicines.${index}.medicineId`,
														{
															resolve: zodResolver(
																PrescribedMedicineSchema.shape.medicineId,
															),
														},
													)}
													render={({ field }) => (
														<FormItem className="w-1/6">
															<FormControl>
																<Controller
																	control={control}
																	name={`prescribedMedicines.${index}.medicineId`}
																	render={({ field }) => (
																		<Select
																			{...field}
																			onValueChange={field.onChange}
																			defaultValue={field.value}
																		>
																			<FormControl>
																				<SelectTrigger>
																					<SelectValue placeholder="Select Medicine" />
																				</SelectTrigger>
																			</FormControl>
																			<SelectContent>
																				{medicinesList.map((medicine: any) => (
																					<SelectItem
																						key={medicine.id}
																						value={medicine.id}
																					>
																						{medicine.medicineName}
																					</SelectItem>
																				))}
																			</SelectContent>
																		</Select>
																	)}
																/>
															</FormControl>
															<FormMessage {...field} />
														</FormItem>
													)}
												/>
												<FormField
													control={control}
													{...register(
														`prescribedMedicines.${index}.doseAmount`,
														{
															resolve: zodResolver(
																PrescribedMedicineSchema.shape.doseAmount,
															),
														},
													)}
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Input
																	{...field}
																	id={`prescribedMedicines.${index}.doseAmount`}
																	type="text"
																	placeholder="Dose Amount"
																	disabled={isPending}
																/>
															</FormControl>
															<FormMessage {...field} />
														</FormItem>
													)}
												/>
												<FormField
													control={control}
													{...register(
														`prescribedMedicines.${index}.frequencyPerDay`,
														{
															resolve: zodResolver(
																PrescribedMedicineSchema.shape.frequencyPerDay,
															),
														},
													)}
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Input
																	{...field}
																	id={`prescribedMedicines.${index}.frequencyPerDay`}
																	type="number"
																	placeholder="Frequency Per Day"
																	disabled={isPending}
																/>
															</FormControl>
															<FormMessage {...field} />
														</FormItem>
													)}
												/>
												<FormField
													control={control}
													{...register(
														`prescribedMedicines.${index}.durationInDays`,
														{
															resolve: zodResolver(
																PrescribedMedicineSchema.shape.durationInDays,
															),
														},
													)}
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Input
																	{...field}
																	id={`prescribedMedicines.${index}.durationInDays`}
																	type="number"
																	placeholder="Duration in Days"
																	disabled={isPending}
																/>
															</FormControl>
															<FormMessage {...field} />
														</FormItem>
													)}
												/>
												<Button
													className="hover:text-red-600 hover:bg-white"
													type="button"
													variant="ghost"
													size="icon"
													onClick={() => removeMedicine(index)}
												>
													<RxCrossCircled size={23} />
												</Button>
											</div>
										))}
										<Button
											className="hover:text-green-600 hover:bg-white"
											type="button"
											variant="ghost"
											size="icon"
											onClick={() =>
												appendMedicine({
													medicineId: "",
													doseAmount: "",
													frequencyPerDay: "",
													durationInDays: "",
												})
											}
										>
											<CiCirclePlus size={27} />
										</Button>
									</div>

									{/* Tests */}
									<div className="flex flex-col gap-3">
										<FormLabel>Tests</FormLabel>
										{testsFields.map((field, index) => (
											<div key={field.id} className="flex items-center gap-3">
												<FormField
													control={control}
													{...register(`prescribedTests.${index}.testId`, {
														resolve: zodResolver(
															PrescribedTestSchema.shape.testId,
														),
													})}
													render={({ field }) => (
														<FormItem className="w-1/6">
															<FormControl>
																<Controller
																	control={control}
																	name={`prescribedTests.${index}.testId`}
																	render={({ field }) => (
																		<Select
																			{...field}
																			onValueChange={field.onChange}
																			defaultValue={field.value}
																		>
																			<FormControl>
																				<SelectTrigger>
																					<SelectValue placeholder="Select Test" />
																				</SelectTrigger>
																			</FormControl>
																			<SelectContent>
																				{testsList.map((test: any) => (
																					<SelectItem
																						key={test.id}
																						value={test.id}
																					>
																						{test.testName}
																					</SelectItem>
																				))}
																			</SelectContent>
																		</Select>
																	)}
																/>
															</FormControl>
															<FormMessage {...field} />
														</FormItem>
													)}
												/>
												<Button
													className="hover:text-red-600 hover:bg-white"
													type="button"
													variant="ghost"
													size="icon"
													onClick={() => removeTest(index)}
												>
													<RxCrossCircled size={23} />
												</Button>
											</div>
										))}
										<Button
											className="hover:text-green-600 hover:bg-white"
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => appendTest({ testId: "" })}
										>
											<CiCirclePlus size={27} />
										</Button>
									</div>
								</div>
							</div>
							<FormError message={error} />
							<FormSuccess message={success} />
							<Button
								disabled={isPending}
								type="submit"
								className="w-full font-semibold shadow-md active:translate-y-[0.12rem] duration-300 hover:text-white hover:bg-gray-900"
								variant="outline"
							>
								Prescribe
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<Button variant="link">
						<a href="/doctor/appointments">Go back</a>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default PrescribeForm;
