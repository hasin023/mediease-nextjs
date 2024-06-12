import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

const Navbar = async () => {
	const session = await auth();

	let pfpBorder = "";

	if (session?.user?.role === "PATIENT") {
		pfpBorder = "border-blue-500";
	} else if (session?.user?.role === "DOCTOR") {
		pfpBorder = "border-green-500";
	} else if (session?.user?.role === "ADMIN") {
		pfpBorder = "border-pink-500";
	}

	return (
		<nav className="flex justify-between px-5 py-2 items-center shadow-md bg-white border-b-2">
			<Link href="/">
				<Image
					src="/navbarLogo.jpg"
					alt="MediEase Logo"
					width={140}
					height={100}
				/>
			</Link>
			<div className="flex gap-1 items-center">
				<form
					className="px-4"
					action={async () => {
						"use server";

						await signOut();
					}}
				>
					<Button type="submit" variant="default" size="sm">
						Sign Out
					</Button>
				</form>
				<Link href="/profile" className={`${pfpBorder} border-4 rounded-full`}>
					<Avatar>
						<AvatarImage src="#" />
						<AvatarFallback>DP</AvatarFallback>
					</Avatar>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
