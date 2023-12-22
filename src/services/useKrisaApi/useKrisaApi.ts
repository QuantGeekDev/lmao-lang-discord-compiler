// import "dotenv/config";
import axios, { AxiosResponse } from "axios";
import { KrisaStructure } from "../../types";

const krisaApiUrl = process.env.KRISA_API;

axios.defaults.baseURL = krisaApiUrl;

const useKrisaApi = () => {
  const getKrisas = async (): Promise<KrisaStructure[]> => {
    const {
      data: { krisas },
    } = (await axios.get("krisas")) as AxiosResponse<{
      krisas: KrisaStructure[];
    }>;
    return krisas;
  };

  return { getKrisas };
};

export default useKrisaApi;
