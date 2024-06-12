"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { FaPrint } from "react-icons/fa";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GrDocumentTest } from "react-icons/gr";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

const PrescriptionDetails = ({ prescription }: any) => {
	const pdfRef = useRef<HTMLInputElement>(null);

	const handleExportClick = () => {
		const input = pdfRef.current;

		const fileName =
			prescription.patient.user.name + "_" + prescription.appointmentId;

		if (input) {
			html2canvas(input).then((canvas) => {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new jsPDF("p", "mm", "a4", true);
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();
				const imageWidth = canvas.width;
				const imageHeight = canvas.height;
				const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
				const imgX = (pdfWidth - imageWidth * ratio) / 2;
				const imgY = 30;
				pdf.addImage(
					imgData,
					"PNG",
					imgX,
					imgY,
					imageWidth * ratio,
					imageHeight * ratio,
				);
				pdf.save(fileName + ".pdf");
			});
		}
	};

	return (
		<Card className="rounded-none">
			<div ref={pdfRef}>
				<CardHeader>
					<h2 className="text-2xl font-bold text-gray-900 text-center">
						Prescription Details
					</h2>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-1 gap-6 mb-6">
						<Card className="shadow-lg">
							<CardHeader>
								<div className="flex items-center gap-2">
									<FaRegUserCircle size={23} />
									<CardTitle>Basic Information</CardTitle>
								</div>
								<hr className="h-px mb-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
							</CardHeader>
							<CardContent className="flex items-start justify-between">
								{prescription.patient && (
									<div className="space-y-1">
										<p>
											<strong>Name:</strong> {prescription.patient.user.name}
										</p>
										<p>
											<strong>Date of Birth:</strong> {""}
											{new Date(prescription.patient.dob).toLocaleDateString(
												"en-US",
												{
													weekday: "long",
													year: "numeric",
													month: "long",
													day: "numeric",
												},
											)}
										</p>
										<p>
											<strong>Gender:</strong> {prescription.patient.gender}
										</p>
										<p>
											<strong>Blood Group:</strong>{" "}
											{prescription.patient.bloodGroup}
										</p>
									</div>
								)}
								<div className="space-y-1">
									<p>
										<strong>Prescription ID:</strong> {prescription.id}
									</p>
									<p>
										<strong>Diagnosis:</strong> {prescription.diagnosis}
									</p>
									<p>
										<strong>Treatment:</strong> {prescription.treatment}
									</p>
									<p>
										<strong>Notes:</strong> {prescription.notes}
									</p>
								</div>
								<p>
									<strong>Appointment Date:</strong>{" "}
									{new Date(prescription.appointment.time).toLocaleDateString(
										"en-US",
										{
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										},
									)}
								</p>
							</CardContent>
						</Card>
						<Card className="shadow-lg">
							<CardHeader>
								<div className="flex items-center gap-2">
									<AiOutlineMedicineBox size={23} />
									<CardTitle>Prescribed Medicines</CardTitle>
								</div>
								<hr className="h-px mb-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
							</CardHeader>
							<CardContent className="space-y-2">
								{prescription.prescribedMedicines.map(
									(med: any, index: number) => (
										<div key={index} className="border-b-2 mb-2 py-2 space-y-1">
											<p>
												<strong>Medicine:</strong> {med.medicine.medicineName} (
												{med.medicine.manufacturer})
											</p>
											<p>
												<strong>Dosage:</strong> {med.doseAmount}
											</p>
											<p>
												<strong>Frequency:</strong> {med.frequencyPerDay} times
												a day
											</p>
											<p>
												<strong>Total Duration:</strong> {med.durationInDays}{" "}
												days
											</p>
										</div>
									),
								)}
							</CardContent>
						</Card>
						<Card className="shadow-lg">
							<CardHeader>
								<div className="flex items-center gap-2">
									<GrDocumentTest size={23} />
									<CardTitle>Prescribed Tests</CardTitle>
								</div>
								<hr className="h-px mb-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
							</CardHeader>
							<CardContent className="space-y-2">
								{prescription.prescribedTests.map(
									(test: any, index: number) => (
										<div key={index} className="border-b-2 py-2 space-y-1">
											<p>
												<strong>Test:</strong> {test.test.testName}
											</p>
											<p>
												<strong>Details:</strong> {test.test.details}
											</p>
										</div>
									),
								)}
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</div>

			<CardFooter>
				<div className="flex justify-between w-full">
					<Link
						href="/doctor/appointments"
						className="block mb-4 text-gray-600 hover:text-gray-900"
					>
						&larr; Back to Appointments
					</Link>
					<Button
						onClick={handleExportClick}
						variant="ghost"
						size="icon"
						className="hover:text-green-700"
					>
						<FaPrint size={20} />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default PrescriptionDetails;
