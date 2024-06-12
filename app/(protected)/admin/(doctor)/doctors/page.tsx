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
import { getAllDoctors } from "@/data/doctor";

const DoctorsPage = async () => {
	const doctors = await getAllDoctors();

	return (
		<div>
			<Navbar />
			<div className="p-6 space-y-3">
				<Table>
					<TableCaption>Doctors list for IUT Medical Centre</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Specialization</TableHead>
							<TableHead>Availability</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{doctors?.map((doctor) => (
							<TableRow key={doctor.id}>
								<TableCell>{doctor.user.name}</TableCell>
								<TableCell>{doctor.user.email}</TableCell>
								<TableCell>{doctor.specialization}</TableCell>
								<TableCell>
									<Button
										size="sm"
										variant="outline"
										className="hover:bg-lime-700 hover:text-white"
									>
										<Link href={`/admin/doctor-availability/${doctor.id}`}>
											View Availability &rarr;
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

export default DoctorsPage;
