import { KrisaStructure } from "../../types";
import useKrisaApi from "../useKrisaApi/useKrisaApi.js";

const { getKrisas } = useKrisaApi();

const getRandomKrisa = async (): Promise<KrisaStructure> => {
  const krisas = await getKrisas();
  const krisasAmount = krisas.length;
  const randomNumber = Math.floor(Math.random() * krisasAmount);

  const randomKrisa = krisas[randomNumber];
  return randomKrisa;
};

export default getRandomKrisa;
