import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
	subsets: ["latin"],
	weight: ["400", "600"],
});

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<header
			className={cn(
				font.className,
				"text-xl font-semibold text-gray-300 flex flex-col items-center justify-center",
			)}
		>
			<Image
				src="/MediEase.jpg"
				className="mb-1"
				alt="MediEase Logo"
				height={100}
				width={310}
			/>
			{label}
		</header>
	);
};
