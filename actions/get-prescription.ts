"use server";

import { getPrescriptionById } from "@/data/prescription";

export const getPrescriptionAction = async (prescriptionId: string) => {
	try {
		const prescription = await getPrescriptionById(prescriptionId);
		return { success: true, prescription };
	} catch (error) {
		console.error("Error fetching prescription:", error);
		return { success: false, error: "Failed to fetch prescription" };
	}
};
