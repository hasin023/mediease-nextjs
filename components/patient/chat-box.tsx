"use client";

import { Button } from "@/components/ui/button";
import { FaStop } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useChat } from "ai/react";

const ChatBox = () => {
	const { messages, input, handleInputChange, handleSubmit, stop } = useChat();

	return (
		<div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-3 sm:pt-4 sm:pb-6 dark:bg-neutral-900 dark:border-neutral-700">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative shadow-xl border-2 rounded-md border-gray-100">
					<textarea
						className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
						placeholder="Ask me anything..."
						value={input}
						onChange={handleInputChange}
					/>

					<div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white dark:bg-neutral-900">
						<form
							className="flex items-center justify-between"
							onSubmit={handleSubmit}
						>
							<Button
								onClick={stop}
								type="button"
								variant="outline"
								size="sm"
								className="flex items-center gap-1 hover:bg-red-800 hover:text-white"
							>
								<FaStop />
								Stop generating
							</Button>

							<p className="text-xs text-red-400 font-semibold">
								The bot can make mistakes. Please consider checking important
								information.
							</p>

							<div className="flex gap-1">
								<Button
									type="submit"
									variant="outline"
									size="icon"
									className="flex items-center gap-1 hover:bg-lime-800 hover:text-white"
								>
									<IoIosSend size={19} />
								</Button>
							</div>
						</form>
					</div>
				</div>
				<div className="border-2 border-gray-100 p-4 rounded-md mt-6 shadow-xl">
					{messages.length === 0 && (
						<div className="text-center text-sm text-gray-500">
							No messages yet. Start by asking something to the chatbot.
						</div>
					)}

					{messages.map((message) => (
						<div
							key={message.id}
							className={`whitespace-pre-wrap px-4 py-2 rounded-sm mt-2 ${
								message.role === "user"
									? "text-gray-900 bg-slate-100"
									: "bg-teal-50 text-teal-700"
							}`}
						>
							<strong>{`${message.role}`}</strong> =&gt; {message.content}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ChatBox;
