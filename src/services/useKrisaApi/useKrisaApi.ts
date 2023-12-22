// import "dotenv/config";
import axios, { AxiosResponse } from "axios";
import { KrisaStructure } from "../../types";
import logger from "../../logger/logger.js";

const krisaApiUrl = process.env.KRISA_API;

axios.defaults.baseURL = krisaApiUrl;

const log = logger("api:");

const useKrisaApi = () => {
  const getKrisas = async (): Promise<KrisaStructure[] | void> => {
    try {
      const {
        data: { krisas },
      } = (await axios.get("krisas")) as AxiosResponse<{
        krisas: KrisaStructure[];
      }>;
      return krisas;
    } catch (error) {
      log.error("Error getting krisas from API");
    }
  };

  return { getKrisas };
};

export default useKrisaApi;
