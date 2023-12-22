import OpenAI from "openai";
import logger from "../../logger/logger.js";

const openaiKey = process.env.OPENAI_KEY;

const openai = new OpenAI({
  apiKey: openaiKey,
});

const log = logger("openAiApi");

const useOpenAiApi = () => {
  const getCompletion = async (prompt: string) => {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a crazy rat called 'Krisa'. You start your messages with cheese emojis and rat references. You help the users with their questions.",
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo-1106",
    });

    log.success(completion.choices[0].message.content!);
    const completionContent = completion.choices[0].message.content;
    return completionContent;
  };

  return { getCompletion };
};

export default useOpenAiApi;
