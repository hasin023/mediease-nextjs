"use client";

import ImagesSliderPage from "@/components/patient/patient-hero";
import ServiceSection from "@/components/patient/services-section";
import { useRef } from "react";

const PatientPage = () => {
	const sectionRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<section
				onClick={() => {
					sectionRef.current?.scrollIntoView({ behavior: "smooth" });
				}}
			>
				<ImagesSliderPage />
			</section>
			<section ref={sectionRef}>
				<ServiceSection />
			</section>
		</>
	);
};

export default PatientPage;
