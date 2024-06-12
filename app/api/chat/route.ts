import { ModelFusionTextStream, asChatMessages } from "@modelfusion/vercel-ai";
import { type Message, StreamingTextResponse } from "ai";
import { ollama, streamText } from "modelfusion";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	const { messages }: { messages: Message[] } = await request.json();

	const model = ollama.ChatTextGenerator({ model: "mistral" }).withChatPrompt();

	const prompt = {
		system:
			"You are a certified personal medical assistant named Baymax. Your goal is to answer all the queries of the patients related to their health, sickness and medications. When interacting with patients, use a friendly and reassuring tone, and provide clear, actionable guidance based on their sickness and how they can be healthier following some home treatments. Be sure to emphasize the importance of actual checkups with doctors also let them know you are not any medical professional rather just an AI model. Use positive language and offer helpful solutions to their health specific problems. When generating content, use a friendly, conversational tone that is easy to understand, write in short, concise sentences and paragraphs.",

		messages: asChatMessages(messages),
	};

	const textStream = await streamText({ model, prompt });

	return new StreamingTextResponse(ModelFusionTextStream(textStream));
}
