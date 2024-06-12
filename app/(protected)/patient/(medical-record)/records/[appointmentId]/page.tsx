import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { FaCalendarWeek } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdSick } from "react-icons/md";

import { getAppointmentById } from "@/data/appointment";
import { getDoctorNameById } from "@/data/doctor";
import { getPatientNameById } from "@/data/patient";

const AppointmentPage = async ({ params }: any) => {
	const { appointmentId } = params;

	const appointment = await getAppointmentById(appointmentId);
	const reimbursementRequest = appointment?.ReimbursementRequest;

	const appointmentDate = new Date(appointment.time);
	const options = {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric",
	};
	const appointmentDateString = appointmentDate.toLocaleDateString(
		"en-US",
		options,
	);
	const appointmentTimeString = appointmentDate.toLocaleTimeString();

	return (
		<div className="p-4 py-10">
			<div className="px-10">
				<Card className="shadow-xl">
					<CardHeader>
						<CardTitle className="flex flex-col gap-1 font-semibold items-center">
							Appointment ID: {appointmentId}
						</CardTitle>
						<CardTitle className="py-2 space-y-1">
							<div className="flex gap-2 items-center">
								<FaUserDoctor className="h-5 w-5" />{" "}
								{getDoctorNameById(appointment?.doctorId)}
							</div>
							<p className="ml-6">{appointment?.doctor.specialization}</p>
						</CardTitle>

						<div className="text-gray-500">
							<div className="text-sm">
								<div className="flex gap-2 items-center">
									<FaCalendarWeek className="text-gray-500" />
									<p>{appointmentDateString}</p>
								</div>
								<div className="flex gap-2 items-center">
									<FaClock className="text-gray-500" />
									<p>{appointmentTimeString}</p>
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent className="font-semibold text-indigo-600">
						<div className="flex gap-1 items-center">
							{getPatientNameById(appointment?.patientId)}{" "}
							<MdSick className="text-gray-500 h-4 w-4" />
						</div>
						<p>
							Reason :{" "}
							<span className="text-gray-700">{appointment?.reason}</span>
						</p>
					</CardContent>
					<CardFooter className="flex justify-between items-center">
						<div>
							<p className="text-sm text-gray-600">
								Status :{" "}
								<span
									className={`font-semibold ${
										appointment?.status === "PENDING"
											? "text-yellow-600"
											: appointment?.status === "CANCELLED"
												? "text-rose-500"
												: appointment?.status === "PRESCRIBED"
													? "text-lime-700"
													: ""
									}`}
								>
									{appointment?.status}
								</span>
							</p>
						</div>

						<div className="flex gap-5 items-center">
							{appointment?.status === "PENDING" ? (
								<p className="text-sm text-rose-600 border-2 px-2 py-1 rounded-md border-rose-600">
									No prescription
								</p>
							) : (
								<Link
									href={`/patient/prescription/${appointment?.Prescription[0]?.id}`}
								>
									<Button
										size="sm"
										variant="outline"
										className="hover:text-white hover:bg-lime-700 border-gray-400"
									>
										View Prescription &rarr;
									</Button>
								</Link>
							)}

							{reimbursementRequest[0]?.status === "PENDING" ? (
								<Button
									disabled
									size="sm"
									variant="outline"
									className="bg-yellow-600 text-white border-yellow-200"
								>
									Reimbursement Requested
								</Button>
							) : reimbursementRequest[0]?.status === "ACCEPTED" ? (
								<Button
									disabled
									size="sm"
									variant="outline"
									className="bg-lime-700 text-white border-lime-300"
								>
									Reimbursement Accepted
								</Button>
							) : reimbursementRequest[0]?.status === "REJECTED" ? (
								<Button
									disabled
									size="sm"
									variant="outline"
									className="bg-rose-400 text-white border-rose-400"
								>
									Reimbursement Rejected
								</Button>
							) : appointment?.status === "PRESCRIBED" ? (
								<Button
									size="sm"
									variant="outline"
									className="hover:bg-teal-700 hover:text-white border-teal-200"
								>
									<Link href={`/patient/reimbursement/${appointmentId}`}>
										Get Reimbursement &rarr;
									</Link>
								</Button>
							) : null}
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default AppointmentPage;
