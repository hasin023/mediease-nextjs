import Link from "next/link";

const UploadImageButton = ({ user }: any) => {
	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button className="flex p-1 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white absolute">
			<Link href={`profile/upload-pfp/${user.id}`}>
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
					/>
				</svg>
			</Link>
		</button>
	);
};

export default UploadImageButton;
