import Navbar from "@/components/common/common-navbar";
import Image from "next/image";

const PfpUploadPage = ({ params }: any) => {
	const { userId } = params;

	return (
		<div>
			<Navbar />
			<form className="w-[400px] mx-auto mt-12 relative border-2 border-gray-300 border-dashed rounded-lg p-6">
				<input
					type="file"
					accept="image/*"
					name="pfp"
					id="pfp"
					className="absolute inset-0 w-full h-full opacity-0 z-50"
				/>
				<div className="text-center">
					<Image
						className="mx-auto h-12 w-12"
						height={12}
						width={12}
						src="https://www.svgrepo.com/show/357902/image-upload.svg"
						alt="Upload PFP"
					/>

					<h3 className="mt-2 text-sm font-medium text-gray-900">
						<label htmlFor="pfp" className="relative cursor-pointer">
							<span>Drag and drop</span>
							<span className="text-indigo-600"> or browse</span>
							<span>to upload</span>
						</label>
					</h3>
					<p className="mt-1 text-xs text-gray-500">
						PNG, JPG, GIF up to 500KB
					</p>
				</div>
			</form>

			<Image
				className="mx-auto my-20 h-12 w-12"
				height={100}
				width={100}
				src=""
				alt="Uploaded PFP preview"
			/>
		</div>
	);
};

export default PfpUploadPage;
