import { krisaFortuneStructure } from "../../types";
import useOpenAiApi from "../openai/useOpenAiApi.js";

const { getCompletion } = useOpenAiApi();

const getKrisaRating = (): krisaFortuneStructure => {
  const randomNumber = Math.random();
  if (randomNumber > 0.9) {
    return { rating: "Krisa Krisa" };
  }
  if (randomNumber > 0.5) {
    return { rating: "Yes" };
  }
  return { rating: "No" };
};

const generateKrisaFortune = async (question: string): Promise<string> => {
  const krisaRating = getKrisaRating();
  const answer = await getCompletion(question);

  if (!answer) {
    return "Error getting answer from krisa";
  }
  return answer;
};

export default generateKrisaFortune;
