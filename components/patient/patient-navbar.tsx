"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/utils/cn";

export function PatientNavbar() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<Navbar className="top-0" />
		</div>
	);
}

function Navbar({ className }: { className?: string }) {
	const [active, setActive] = useState<string | null>(null);
	return (
		<div
			className={cn("fixed top-10 inset-x-0 max-w-lg mx-auto z-50", className)}
		>
			<Menu setActive={setActive}>
				<MenuItem setActive={setActive} active={active} item="Appointment">
					<div className="flex flex-col space-y-4 text-sm">
						<HoveredLink href="/patient/records">View Appointments</HoveredLink>
						<HoveredLink href="/patient/doctors">View Doctors</HoveredLink>
						<HoveredLink href="/patient/appointment">
							Book Appointment
						</HoveredLink>
					</div>
				</MenuItem>
				<MenuItem setActive={setActive} active={active} item="Prescription">
					<div className="flex flex-col space-y-4 text-sm">
						<HoveredLink href="/patient/prescriptions">
							View Prescriptions
						</HoveredLink>
					</div>
				</MenuItem>
				<MenuItem setActive={setActive} active={active} item="Reimbursement">
					<div className="flex flex-col space-y-4 text-sm">
						<HoveredLink href="/patient/expenses">View Expenses</HoveredLink>
					</div>
				</MenuItem>
			</Menu>
		</div>
	);
}
