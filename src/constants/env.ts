import {getEnvValue} from "../helpers/common/get-env";

const isProduction = import.meta.env.PROD;

export const ENV = {
  base_url: isProduction ? getEnvValue("SITE") : "http://localhost:4321",
} as const;
