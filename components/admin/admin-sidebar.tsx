"use client";

import Image from "next/image";
import Link from "next/link";

import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { GiMedicinePills } from "react-icons/gi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiTestTubeFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

import { useContext } from "react";
import type React from "react";
import SidebarContext from "./context/SidebarContext";
import { usePathname } from "next/navigation";

const sidebarItems = [
	{
		name: "Dashboard",
		href: "/admin",
		icon: BiSolidDashboard,
	},
	{
		name: "Users",
		href: "/admin/users",
		icon: FaUsers,
	},
	{
		name: "Doctors",
		href: "/admin/doctors",
		icon: FaUserDoctor,
	},
	{
		name: "Medicines",
		href: "/admin/medicines",
		icon: GiMedicinePills,
	},
	{
		name: "Tests",
		href: "/admin/tests",
		icon: RiTestTubeFill,
	},
	{
		name: "Reimbursements",
		href: "/admin/reimburstments",
		icon: RiMoneyDollarCircleFill,
	},
];

const AdminSidebar: React.FC = () => {
	const pathname = usePathname();
	const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

	return (
		<div
			className={`flex h-screen relative gap-8 border-r-2 border-gray-100 ${
				isCollapsed ? "w-20" : "w-64"
			}`}
		>
			<button
				type="button"
				className="absolute right-0 top-20 bg-white border border-gray-300 rounded-full w-6 h-6 flex justify-center items-center transform translate-x-1/2 cursor-pointer"
				onClick={toggleSidebarcollapse}
			>
				{isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
			</button>
			<aside
				className={`h-full bg-white p-4 transition-all duration-300 ease-in-out overflow-hidden ${
					isCollapsed ? "w-20" : "w-64"
				}`}
			>
				<div className="flex items-center justify-center gap-1 pb-2 mb-6 border-b border-gray-300">
					<Image
						width={100}
						height={100}
						className="w-8 h-8 object-contain"
						src="/heartIcon.png"
						alt="Heart Icon"
					/>
					<p className={`text-2xl mt-2 ${isCollapsed ? "hidden" : "block"}`}>
						Medi<span className="text-cyan-400"> ADMIN</span>
					</p>
				</div>
				<ul className="list-none">
					{sidebarItems.map(({ name, href, icon: Icon }) => (
						<li key={name}>
							<Link
								className={`text-sm py-3 px-4 bg-gray-200 rounded-lg mb-4 flex items-center ${
									pathname === href
										? "bg-indigo-400 text-white"
										: "hover:bg-gray-300"
								} ${isCollapsed ? "justify-center" : ""}`}
								href={href}
							>
								<span className="text-lg">
									<Icon size={19} />
								</span>
								<span
									className={`ml-2 ${isCollapsed ? "hidden" : "inline-block"}`}
								>
									{name}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</aside>
		</div>
	);
};

export default AdminSidebar;
