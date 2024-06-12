import { AcceptRequest, RejectRequest } from "@/actions/reimburstment-actions";
import Navbar from "@/components/common/common-navbar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { getAppointmentById } from "@/data/appointment";
import { getDoctorNameById } from "@/data/doctor";
import { getPatientNameById } from "@/data/patient";
import Image from "next/image";

const AppointmentDocsPage = async ({ params }: any) => {
	const { appointmentId } = params;

	const appointment = await getAppointmentById(appointmentId);

	return (
		<div className="space-y-8">
			<Navbar />
			<div className="px-10">
				<Card className="shadow-xl">
					<CardHeader>
						<CardTitle className="flex flex-col gap-1 font-semibold">
							Appointment ID: {appointmentId}
							<p>
								Appointment Time:{" "}
								{appointment?.time.toLocaleDateString("en-US", {
									weekday: "short",
									day: "2-digit",
									month: "short",
									year: "numeric",
								})}
							</p>
						</CardTitle>
						<div className="text-sm text-gray-600 py-2 space-y-[-0.2rem]">
							<p>Doctor: {getDoctorNameById(appointment?.doctorId)}</p>
							<p>Patient: {getPatientNameById(appointment?.patientId)}</p>
						</div>
					</CardHeader>
					<CardContent className="font-semibold text-indigo-400">
						Submitted Documents
						<div className="flex gap-5 mt-4">
							<Image
								className="rounded-md shadow-lg"
								src={`/reimburstment/billing/${appointment?.ReimbursementRequest[0].billImgUrl}`}
								width={200}
								height={200}
								alt="Bill"
							/>
							<Image
								className="rounded-md shadow-lg"
								src={`/reimburstment/referral/${appointment?.ReimbursementRequest[0].referralImgUrl}`}
								width={200}
								height={200}
								alt="Referral"
							/>
							<Image
								className="rounded-md shadow-lg"
								src={`/reimburstment/prescription/${appointment?.ReimbursementRequest[0].prescriptionImgUrl}`}
								width={200}
								height={200}
								alt="Prescription"
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end items-center">
						{appointment?.ReimbursementRequest[0].status === "PENDING" ? (
							<>
								<form
									className="px-4"
									action={async () => {
										"use server";

										await RejectRequest(
											appointment?.ReimbursementRequest[0].id,
										);
									}}
								>
									<Button
										type="submit"
										variant="outline"
										size="sm"
										className="hover:bg-rose-700 hover:text-white"
									>
										Reject
									</Button>
								</form>
								<form
									className="px-4"
									action={async () => {
										"use server";

										await AcceptRequest(
											appointment?.ReimbursementRequest[0].id,
										);
									}}
								>
									<Button
										type="submit"
										variant="outline"
										size="sm"
										className="hover:bg-lime-700 hover:text-white"
									>
										Accept
									</Button>
								</form>
							</>
						) : appointment?.ReimbursementRequest[0].status === "ACCEPTED" ? (
							<p className="text-lime-600 font-semibold border-2 border-lime-300 rounded-md px-2 py-1">
								{appointment?.ReimbursementRequest[0].status}
							</p>
						) : (
							<p className="text-rose-600 font-semibold border-2 border-rose-400 rounded-md px-2 py-1">
								{appointment?.ReimbursementRequest[0].status}
							</p>
						)}

						{}
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default AppointmentDocsPage;
