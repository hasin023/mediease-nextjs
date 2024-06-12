import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

import { FaCalendarWeek } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { getUserById } from "@/data/user";
import { getPrescriptionByAppointmentId } from "@/data/prescription";
import { CancelAppointment } from "@/actions/appointment-actions";

const AppointmentCard: React.FC<{ appointment: any }> = async ({
	appointment,
}) => {
	const user = await getUserById(appointment.doctor.userId);

	const prescription = await getPrescriptionByAppointmentId(appointment.id);

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
		<Card className="mb-4 shadow-xl w-[83.5rem]">
			<CardHeader>
				<CardTitle>{user?.name}</CardTitle>
				<CardDescription>{appointment.doctor.specialization}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
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
				<div className="flex gap-3 items-center">
					<Button
						size="sm"
						variant="outline"
						className="hover:bg-indigo-600 hover:text-white border-gray-400"
					>
						<Link href={`/patient/records/${appointment.id}`}>
							View Appointment &rarr;
						</Link>
					</Button>
					{appointment.status === "PENDING" ? (
						<div className="flex items-center gap-4">
							<form
								className="px-4"
								action={async () => {
									"use server";

									await CancelAppointment(appointment?.id);
								}}
							>
								<Button
									type="submit"
									variant="outline"
									size="sm"
									className="hover:bg-rose-700 hover:text-white border-gray-400"
								>
									Cancel Appointment &#x2715;
								</Button>
							</form>
							<p className="text-sm text-rose-600 border-2 px-2 py-1 rounded-md border-rose-600">
								No prescription
							</p>
						</div>
					) : appointment.status === "CANCELLED" ? (
						<div className="flex items-center gap-4">
							<p className="text-sm text-rose-600 border-2 px-2 py-1 rounded-md border-rose-600">
								Appointment Cancelled
							</p>
						</div>
					) : appointment.status === "PRESCRIBED" ? (
						<Link href={`/patient/prescription/${prescription?.id}`}>
							<Button
								size="sm"
								variant="outline"
								className="hover:text-white hover:bg-lime-700 border-gray-400"
							>
								View Prescription &rarr;
							</Button>
						</Link>
					) : null}
				</div>
			</CardContent>
			<CardFooter>
				<p className="text-sm text-gray-600">
					Status :{" "}
					<span
						className={`font-semibold ${
							appointment.status === "PENDING"
								? "text-yellow-600"
								: appointment.status === "CANCELLED"
									? "text-rose-600"
									: appointment.status === "PRESCRIBED"
										? "text-lime-700"
										: ""
						}`}
					>
						{appointment.status}
					</span>
				</p>
			</CardFooter>
		</Card>
	);
};

export default AppointmentCard;
