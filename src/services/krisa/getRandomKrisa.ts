import axios, { AxiosResponse } from "axios";
import { KrisaStructure } from "../../types";

const getRandomKrisa = async (): Promise<KrisaStructure> => {
  let { data } = (await axios.get("krisas")) as AxiosResponse<{
    krisas: KrisaStructure[];
  }>;
  const krisasAmount = data.krisas.length;
  const randomNumber = Math.floor(Math.random() * krisasAmount);

  const randomKrisa = data.krisas[randomNumber];
  return randomKrisa;
};

export default getRandomKrisa;
