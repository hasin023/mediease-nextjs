import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";
import * as React from "react";

import { auth } from "@/auth";

export default async function Home() {
	const session = await auth();

	const userRole = session?.user?.role;
	let dashBoardUrl = "";

	if (userRole === "ADMIN") {
		dashBoardUrl = "/admin";
	} else if (userRole === "DOCTOR") {
		dashBoardUrl = "/doctor";
	} else if (userRole === "PATIENT") {
		dashBoardUrl = "/patient";
	}

	return (
		<div
			className="h-full flex items-start justify-center -z-40 bg-cover bg-center min-h-screen bg-no-repeat"
			style={{ backgroundImage: `url('/LandingPagePic.jpg')` }}
		>
			<div className="p-2 px-4 mt-2">
				<nav className="border-b-2  border-gray-300 px-2 rounded-md">
					<div className="flex justify-between  pt-0">
						<Image
							src="/MediEase.jpg"
							alt="MediEase Logo"
							width={220}
							height={60}
						/>
						<div className="flex gap-3 justify-end items-start">
							<Button
								className="hover:bg-rose-700 shadow-md hover:border-rose-500 hover:text-white"
								size="sm"
								variant="outline"
							>
								<Link href="#about-section">About</Link>
							</Button>

							{session ? (
								<Link href={dashBoardUrl}>
									<Button
										className="hover:bg-lime-700 shadow-md hover:border-lime-400 hover:text-white"
										size="sm"
										variant="outline"
									>
										Dashboard
									</Button>
								</Link>
							) : (
								<LoginButton>
									<Button
										className="hover:bg-indigo-700 shadow-md hover:border-indigo-400 hover:text-white"
										size="sm"
										variant="outline"
									>
										Login
									</Button>
								</LoginButton>
							)}
						</div>
					</div>
					<h1 className="text-white text-left mt-1 text-xs pl-10 ">
						Your Health, Our Priority
					</h1>
				</nav>
				<h3 className="text-center text-white text-6xl font-semibold mt-72">
					Welcome to IUT Medical Centre
				</h3>

				<section id="about-section" className="mb-20">
					<div className="mt-[25rem]">
						<h1 className="text-left text-3xl mb-4 px-4 text-blue-500 ">
							University Medical Centre
						</h1>

						<p className="px-4 mb-4 text-[1rem]">
							IUT has a Medical Center at the North- West corner of the campus.
							It has five well equipped observation beds, Mini operation Room,
							Medicine store, waiting area, and a pathological laboratory
							currently launched. It provides normal Medicare to the students,
							faculties, staff, and the family members. Necessary medicines are
							also available in the store. There are three doctors, two nurses
							doing the duties round the clock 24/7. In case of emergency, the
							doctor on duty can be contacted on the Medical Centre Hotline: +88
							01844 056056.
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}
