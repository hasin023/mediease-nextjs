import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/common/common-navbar";
import { getAllMedicines } from "@/data/medicine";
import DeleteMedicine from "@/components/admin/delete-medicine";

const MedicinesPage = async () => {
	const medicines = await getAllMedicines();

	return (
		<div>
			<Navbar />
			<div className="p-6 space-y-3">
				<Button
					size="sm"
					variant="outline"
					className="hover:text-white hover:bg-gray-800"
				>
					<Link href="/admin/add-medicine">Add medicine</Link>
				</Button>
				<Table>
					<TableCaption>Medicines list for IUT Medical Centre</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Manufacturer</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Edit</TableHead>
							<TableHead>Delete</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{medicines?.map((medicine) => (
							<TableRow key={medicine.id}>
								<TableCell>{medicine.medicineName}</TableCell>
								<TableCell>{medicine.manufacturer}</TableCell>
								<TableCell>{medicine.description}</TableCell>
								<TableCell>
									<Button
										size="sm"
										variant="outline"
										className="hover:text-gray-50 hover:bg-gray-800 shadow-md"
									>
										<Link href={`/admin/edit-medicine/${medicine.id}`}>
											<FaEdit />
										</Link>
									</Button>
								</TableCell>

								<TableCell>
									<DeleteMedicine medId={medicine.id}>
										<FaTrash className="cursor-pointer" />
									</DeleteMedicine>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default MedicinesPage;
