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
import { getDoctorAvailabilityByDoctorId } from "@/data/doctor";

const DoctorAvailability = async ({ params }: any) => {
	const { doctorId } = params;
	const doctorAvailability = await getDoctorAvailabilityByDoctorId(doctorId);

	return (
		<div>
			<Navbar />
			<div className="p-6 space-y-3">
				<Button
					size="sm"
					variant="outline"
					className="hover:bg-gray-800 hover:text-white"
				>
					<Link href={`/admin/doctor-availability/add/${doctorId}`}>
						Add Doctor Availability
					</Link>
				</Button>
				<Table>
					<TableCaption>Doctors list for IUT Medical Centre</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Weekday</TableHead>
							<TableHead>Start Time</TableHead>
							<TableHead>End Time</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{doctorAvailability?.map((doctoravailability) => (
							<TableRow key={doctoravailability.id}>
								<TableCell>{doctoravailability.weekday}</TableCell>
								<TableCell>
									{new Date(doctoravailability.startTime).toLocaleTimeString(
										[],
										{ hour: "2-digit", minute: "2-digit" },
									)}
								</TableCell>
								<TableCell>
									{new Date(doctoravailability.endTime).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default DoctorAvailability;
