import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import Navbar from "@/components/common/common-navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllReimburstments } from "@/data/reimburstment";
import { getPatientNameById } from "@/data/patient";
import { getDoctorNameById } from "@/data/doctor";

const ReimburstmentPage = async () => {
	const reimburstments = await getAllReimburstments();

	console.log(reimburstments);

	return (
		<div>
			<Navbar />
			<div className="p-6 space-y-3">
				<Table>
					<TableCaption>Reimbursement list for IUT Medical Centre</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Appointment ID</TableHead>
							<TableHead>Patient</TableHead>
							<TableHead>Doctor</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Documents</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{reimburstments?.map((reimburstment) => (
							<TableRow key={reimburstment.id}>
								<TableCell>{reimburstment.id}</TableCell>
								<TableCell>
									{getPatientNameById(reimburstment.patientId)}
								</TableCell>
								<TableCell>
									{getDoctorNameById(reimburstment.Appointment.doctorId)}
								</TableCell>
								<TableCell>{reimburstment.amount}</TableCell>
								{reimburstment.status === "PENDING" ? (
									<TableCell className="text-yellow-500 font-bold">
										{reimburstment.status}
									</TableCell>
								) : reimburstment.status === "ACCEPTED" ? (
									<TableCell className="text-green-500 font-bold">
										{reimburstment.status}
									</TableCell>
								) : (
									<TableCell className="text-red-500 font-bold">
										{reimburstment.status}
									</TableCell>
								)}
								<TableCell>
									<Button
										size="sm"
										variant="outline"
										className="hover:bg-rose-700 hover:text-white"
									>
										<Link href={`/admin/docs/${reimburstment.appointmentId}`}>
											View Docs
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ReimburstmentPage;
