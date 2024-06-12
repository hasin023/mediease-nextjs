import { auth } from "@/auth";
import Navbar from "@/components/common/common-navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FaUserEdit } from "react-icons/fa";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
	getFacultyInfo,
	getPatientByUserId,
	getPatientDueAmount,
	getStaffInfo,
	getStudentInfo,
} from "@/data/patient";

import PrescriptionCard from "@/components/patient/prescription-card";
import { getPatientSpecificPrescriptions } from "@/data/prescription";
import UploadImageButton from "@/components/patient/edit-profile/upload-image-button";

const ProfilePage = async () => {
	const session = await auth();
	const user = session?.user;

	if (!session) {
		redirect("/auth/login");
	}

	const patient = await getPatientByUserId(session.user.id);
	const prescriptions = await getPatientSpecificPrescriptions(patient?.id);

	const dueAmount = await getPatientDueAmount(patient?.id);
	const totalDue = dueAmount?.reduce((acc, curr) => acc + curr.amount, 0);

	const sortedPrescriptions = prescriptions
		?.sort(
			(a, b) =>
				new Date(b.appointment.time).getTime() -
				new Date(a.appointment.time).getTime(),
		)
		.slice(0, 2);

	let pfpColor = "";
	let bgColor = "";

	let patientInfo = null;
	let studedntInfo = null;
	let facultyInfo = null;
	let staffInfo = null;

	if (session.user.role === "ADMIN") {
		pfpColor = "bg-pink-500";
		bgColor = "bg-gradient-to-bl from-pink-500 to-rose-300";
	} else if (session.user.role === "PATIENT") {
		pfpColor = "bg-blue-500";
		bgColor = "bg-gradient-to-bl from-blue-500 to-cyan-300";
		patientInfo = await getPatientByUserId(session.user.id);
	} else if (session.user.role === "DOCTOR") {
		pfpColor = "bg-green-500";
		bgColor = "bg-gradient-to-bl from-green-500 to-lime-300";
	}

	if (session.user.patientType === "STUDENT" && patientInfo) {
		studedntInfo = await getStudentInfo(patientInfo.id);
	} else if (session.user.patientType === "FACULTY" && patientInfo) {
		facultyInfo = await getFacultyInfo(patientInfo.id);
	} else if (session.user.patientType === "STAFF" && patientInfo) {
		staffInfo = await getStaffInfo(patientInfo.id);
	}

	return (
		<>
			<Navbar />
			<div className="flex gap-28 items-center justify-center mt-10">
				<div className="flex flex-col justify-center items-center">
					<div className="relative flex flex-col items-center rounded-[20px] w-[490px] mx-auto p-4 bg-white bg-clip-border shadow-2xl dark:!bg-navy-800 dark:text-white dark:!shadow-none mb-6 mt-12">
						<div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
							<div
								className={`${bgColor} h-32 w-[27rem] rounded-lg flex items-center justify-center`}
							>
								<div
									className={`absolute -bottom-11 flex h-[87px] w-[87px] rounded-full items-end justify-end border-[4px] border-white ${pfpColor} dark:!border-navy-700`}
								>
									<UploadImageButton user={user} />
								</div>
							</div>
						</div>
						<div className="mt-16 flex flex-col items-center">
							<h4 className="text-xl font-bold text-navy-700 dark:text-white">
								{session?.user.name}
							</h4>
							<p className="text-base font-normal text-gray-600">
								{session?.user.email}
							</p>
						</div>
						<div className="mt-6 mb-3 flex gap-14 md:!gap-14">
							<div className="flex flex-col items-center justify-center">
								<p className="text-2xl font-bold text-navy-700 dark:text-white">
									{session?.user.role}
								</p>
								<p className="text-sm font-normal text-gray-600">Role</p>
							</div>
							{session?.user.role === "PATIENT" && (
								<>
									<div className="flex flex-col items-center justify-center">
										<p className="text-2xl font-bold text-navy-700 dark:text-white">
											{session.user?.patientType}
										</p>
										<p className="text-sm font-normal text-gray-600">Type</p>
									</div>

									<div className="flex flex-col items-center justify-center">
										<p className="text-2xl font-bold text-navy-700 dark:text-white">
											{totalDue} BDT
										</p>
										<p className="text-sm font-normal text-gray-600">
											Due Amount
										</p>
									</div>
								</>
							)}
						</div>
					</div>

					<div className="flex gap-2 justify-center items-center">
						{session?.user.role === "ADMIN" && (
							<Link href="/admin">
								<Button
									variant="outline"
									className="hover:bg-gray-800 hover:text-white"
								>
									Admin Dashboard &rarr;
								</Button>
							</Link>
						)}

						{session?.user.role === "DOCTOR" && (
							<Button
								variant="outline"
								className="hover:bg-gray-800 hover:text-white"
							>
								<Link href="/doctor">Doctor Dashboard &rarr;</Link>
							</Button>
						)}

						{session?.user.role === "PATIENT" && (
							<Button
								variant="outline"
								className="hover:bg-gray-800 hover:text-white"
							>
								<Link href="/patient">Patient Dashboard &rarr;</Link>
							</Button>
						)}

						{session?.user.role === "PATIENT" && (
							<Button
								size="icon"
								variant="outline"
								className="hover:text-gray-50 hover:bg-gray-800 shadow-md"
							>
								<Link href={`/profile/edit-profile/${session.user.id}`}>
									<FaUserEdit size={20} />
								</Link>
							</Button>
						)}
					</div>
				</div>

				{session?.user.role === "PATIENT" && (
					<Tabs
						defaultValue="personal"
						className="w-[33rem] shadow-2xl bg-gray-100"
					>
						<TabsList className="grid w-full grid-cols-3 bg-slate-800 text-white">
							<TabsTrigger value="personal">Personal</TabsTrigger>
							<TabsTrigger value="university">University</TabsTrigger>
							<TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
						</TabsList>
						<TabsContent value="personal">
							<Card>
								<CardHeader>
									<CardTitle>Personal Information</CardTitle>
									<CardDescription>
										Personal information of the patient.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-2">
									<div className="space-y-1">
										{session.user.name && (
											<p className="border-2 py-1 px-2 text-sm rounded-md">
												<strong>Name :</strong>{" "}
												<span className="text-blue-600">
													{session.user.name}
												</span>
											</p>
										)}
									</div>
									<div className="space-y-1">
										{session.user.email && (
											<p className="border-2 py-1 px-2 text-sm rounded-md">
												<strong>Email :</strong>{" "}
												<span className="text-blue-600">
													{session.user.email}
												</span>
											</p>
										)}
									</div>
									<div className="space-y-1">
										<p className="border-2 py-1 px-2 text-sm rounded-md">
											<strong>Date of birth :</strong>{" "}
											<span className="text-blue-600">
												{patientInfo?.dob
													? new Date(patientInfo.dob).toLocaleDateString(
															"en-GB",
															{
																year: "numeric",
																month: "long",
																day: "numeric",
															},
														)
													: "Add your Date of Birth"}
											</span>
										</p>
									</div>
									<div className="space-y-1">
										<p className="border-2 py-1 px-2 text-sm rounded-md">
											<strong>Gender :</strong>{" "}
											<span className="text-blue-600">
												{patientInfo?.gender
													? patientInfo.gender
													: "Add your Gender"}
											</span>
										</p>
									</div>
									<div className="space-y-1">
										<p className="border-2 py-1 px-2 text-sm rounded-md">
											<strong>Phone Number :</strong>{" "}
											<span className="text-blue-600">
												{patientInfo?.phone
													? patientInfo.phone
													: "Add your phone number"}
											</span>
										</p>
									</div>
									<div className="space-y-1">
										<p className="border-2 py-1 px-2 text-sm rounded-md">
											<strong>Blood Group :</strong>{" "}
											<span className="text-blue-600">
												{patientInfo?.bloodGroup
													? patientInfo.bloodGroup
													: "Add your blood group"}
											</span>
										</p>
									</div>
									<div className="space-y-1">
										<p className="border-2 py-1 px-2 text-sm rounded-md">
											<strong>Address :</strong>{" "}
											<span className="text-blue-600">
												{patientInfo?.address
													? patientInfo.address
													: "Add your address"}
											</span>
										</p>
									</div>
								</CardContent>
								<CardFooter>
									<p className="text-sm text-gray-600">
										Personal information may change with time.
									</p>
								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value="university">
							<Card>
								<CardHeader>
									<CardTitle>University Information</CardTitle>
									<CardDescription>
										Information about the patient&apos;s university.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-2">
									<div className="space-y-1">
										<p className="border-2 py-1 px-2 text-sm rounded-md text-blue-600">
											<strong className="text-black">Department :</strong>{" "}
											{session.user.patientType === "STUDENT" &&
											studedntInfo?.department ? (
												<>
													<span className="text-blue-600">
														{studedntInfo.department}
													</span>
												</>
											) : session.user.patientType === "FACULTY" &&
												facultyInfo?.department ? (
												<>
													<span className="text-blue-600">
														{facultyInfo.department}
													</span>
												</>
											) : session.user.patientType === "STAFF" &&
												staffInfo?.department ? (
												<>
													<span className="text-blue-600">
														{staffInfo.department}
													</span>
												</>
											) : (
												"Add your department"
											)}
										</p>
									</div>
									{session.user.patientType === "STUDENT" && (
										<div className="space-y-1">
											<p className="border-2 py-1 px-2 text-sm rounded-md text-blue-600">
												<strong className="text-black">Program :</strong>{" "}
												{studedntInfo?.program ? (
													<>
														<span className="text-blue-600">
															{studedntInfo.program}
														</span>
													</>
												) : (
													"Add your program"
												)}
											</p>
										</div>
									)}
									<div className="space-y-1">
										<p className="border-2 py-1 px-2 text-sm rounded-md">
											{session.user.patientType === "STUDENT" &&
											studedntInfo?.currentSemester ? (
												<>
													<strong>Current Semester :</strong>{" "}
													<span className="text-blue-600">
														{studedntInfo.currentSemester}
													</span>
												</>
											) : session.user.patientType === "STUDENT" ? (
												"Add your current semester"
											) : session.user.patientType === "FACULTY" &&
												facultyInfo?.position ? (
												<>
													<strong>Position:</strong>{" "}
													<span className="text-blue-600">
														{facultyInfo.position}
													</span>
												</>
											) : session.user.patientType === "FACULTY" ? (
												"Add your position"
											) : session.user.patientType === "STAFF" && staffInfo ? (
												<>
													<strong>Position:</strong>{" "}
													<span className="text-blue-600">
														{staffInfo.position}
													</span>
												</>
											) : session.user.patientType === "STAFF" ? (
												"Add your position"
											) : null}
										</p>
									</div>
									<div className="space-y-1">
										<p className="border-2 py-1 px-2 text-sm rounded-md">
											{session.user.patientType === "STUDENT" &&
											studedntInfo?.originCountry ? (
												<>
													<strong>Origin Country :</strong>{" "}
													<span className="text-blue-600">
														{studedntInfo.originCountry}
													</span>
												</>
											) : session.user.patientType === "STUDENT" ? (
												"Add your origin country"
											) : session.user.patientType === "FACULTY" &&
												facultyInfo?.hireDate ? (
												<>
													<strong>Joining :</strong>{" "}
													<span className="text-blue-600">
														{new Date(facultyInfo.hireDate).toLocaleDateString(
															"en-GB",
															{
																year: "numeric",
																month: "long",
																day: "numeric",
															},
														)}
													</span>
												</>
											) : session.user.patientType === "FACULTY" ? (
												"Add your joining date"
											) : session.user.patientType === "STAFF" &&
												staffInfo?.hireDate ? (
												<>
													<strong>Joining :</strong>{" "}
													<span className="text-blue-600">
														{new Date(staffInfo.hireDate).toLocaleDateString(
															"en-GB",
															{
																year: "numeric",
																month: "long",
																day: "numeric",
															},
														)}
													</span>
												</>
											) : session.user.patientType === "STAFF" ? (
												"Add your joining date"
											) : null}
										</p>
									</div>
								</CardContent>
								<CardFooter className="text-sm text-gray-600">
									Information varies based on the patient type.
								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value="prescriptions">
							<Card>
								<CardHeader>
									<CardTitle>Recent Prescriptions</CardTitle>
									<CardDescription>
										View your recent prescriptions here.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-2">
									<div className="space-y-1">
										{sortedPrescriptions?.length === 0 && (
											<p className="text-sm text-gray-600 border-2 p-2 rounded-md">
												No prescriptions available yet.
											</p>
										)}

										{sortedPrescriptions?.map((prescription) => (
											<PrescriptionCard
												key={prescription.id}
												prescription={prescription}
											/>
										))}
									</div>
								</CardContent>
								<CardFooter>
									<Link href="/patient/prescriptions">
										<Button>All Prescriptions &rarr;</Button>
									</Link>
								</CardFooter>
							</Card>
						</TabsContent>
					</Tabs>
				)}
			</div>
		</>
	);
};

export default ProfilePage;
