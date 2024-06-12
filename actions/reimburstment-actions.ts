"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const RejectRequest = async (reimburstmentId: any) => {
	try {
		await db.reimbursementRequest.update({
			where: { id: reimburstmentId },
			data: {
				status: "REJECTED",
			},
		});

		redirect("/admin/reimburstments");
	} catch (error) {
		return { success: false, error: "Failed to reject request" };
	}
};

export const AcceptRequest = async (reimburstmentId: any) => {
	try {
		await db.reimbursementRequest.update({
			where: { id: reimburstmentId },
			data: {
				status: "ACCEPTED",
			},
		});

		redirect("/admin/reimburstments");
	} catch (error) {
		return { success: false, error: "Failed to accept request" };
	}
};
