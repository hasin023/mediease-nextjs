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

import Navbar from "@/components/common/common-navbar";
import { getAllUsers } from "@/data/user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteUser from "@/components/admin/delete-user";

const UsersPage = async () => {
	const users = await getAllUsers();

	return (
		<div>
			<Navbar />
			<div className="p-6 space-y-3">
				<Button
					size="sm"
					variant="outline"
					className="hover:text-white hover:bg-gray-800"
				>
					<Link href="/admin/add-user">Add User</Link>
				</Button>
				<Table>
					<TableCaption>Users list for IUT Medical Centre</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>PatientType</TableHead>
							<TableHead>Edit</TableHead>
							<TableHead>Delete</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users?.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>{user.patientType}</TableCell>
								<TableCell>
									<Button
										size="sm"
										variant="outline"
										className="hover:text-gray-50 hover:bg-gray-800 shadow-md"
									>
										<Link href={`/admin/edit-user/${user.id}`}>
											<FaEdit />
										</Link>
									</Button>
								</TableCell>
								{user?.role !== "ADMIN" && (
									<TableCell>
										<DeleteUser userId={user.id}>
											<FaTrash className="cursor-pointer" />
										</DeleteUser>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default UsersPage;
