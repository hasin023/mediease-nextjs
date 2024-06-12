import { getInfoAction } from "@/actions/get-info";
import { getPatientAction } from "@/actions/get-patient";
import { getUserAction } from "@/actions/get-user";
import { auth } from "@/auth";
import Navbar from "@/components/common/common-navbar";
import EditFacultyProfile from "@/components/patient/edit-profile/edit-faculty-profile";
import EditStaffProfile from "@/components/patient/edit-profile/edit-staff-profile";
import EditStudentProfile from "@/components/patient/edit-profile/edit-student-profile";
import { redirect } from "next/navigation";

interface EditProfileProps {
	params: {
		userId: string;
	};
}

const EditProfilePage = async ({ params }: EditProfileProps) => {
	const session = await auth();

	if (!session) {
		redirect("/auth/login");
	}

	const { userId } = params;
	const {
		success: userSuccess,
		user,
		error: userError,
	} = await getUserAction(userId);
	const {
		success: patientSuccess,
		patient,
		error: patientError,
	} = await getPatientAction(userId);

	const {
		success: infoSuccess,
		info,
		error: infoError,
	} = await getInfoAction(patient?.id, user?.patientType);

	if (!userSuccess) {
		console.error(userError);
		return <div>Error fetching user data</div>;
	}

	if (!patientSuccess) {
		console.error(patientError);
		return <div>Error fetching patient data</div>;
	}

	if (!infoSuccess) {
		console.error(infoError);
		return <div>Error fetching info data</div>;
	}

	return (
		<div>
			<Navbar />
			<div className="py-6 flex justify-center items-center">
				{user?.patientType === "STUDENT" ? (
					<EditStudentProfile user={user} patient={patient} info={info} />
				) : user?.patientType === "FACULTY" ? (
					<EditFacultyProfile user={user} patient={patient} info={info} />
				) : (
					<EditStaffProfile user={user} patient={patient} info={info} />
				)}
			</div>
		</div>
	);
};

export default EditProfilePage;
