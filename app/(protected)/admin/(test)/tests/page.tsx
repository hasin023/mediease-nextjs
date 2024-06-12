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
import { getAllTests } from "@/data/test";
import DeleteTest from "@/components/admin/delete-test";

const TestsPage = async () => {
	const tests = await getAllTests();

	return (
		<div>
			<Navbar />
			<div className="p-6 space-y-3">
				<Button
					size="sm"
					variant="outline"
					className="hover:text-white hover:bg-gray-800"
				>
					<Link href="/admin/add-test">Add test</Link>
				</Button>
				<Table>
					<TableCaption>Tests list for IUT Medical Centre</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Details</TableHead>
							<TableHead>Edit</TableHead>
							<TableHead>Delete</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tests?.map((test) => (
							<TableRow key={test.id}>
								<TableCell>{test.testName}</TableCell>
								<TableCell>{test.details}</TableCell>
								<TableCell>
									<Button
										size="sm"
										variant="outline"
										className="hover:text-gray-50 hover:bg-gray-800 shadow-md"
									>
										<Link href={`/admin/edit-test/${test.id}`}>
											<FaEdit />
										</Link>
									</Button>
								</TableCell>

								<TableCell>
									<DeleteTest testId={test.id}>
										<FaTrash className="cursor-pointer" />
									</DeleteTest>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default TestsPage;
