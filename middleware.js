import createMiddleware from "next-intl/middleware";
import { lenguagesSupported } from "./consts";

export default createMiddleware({
  locales: lenguagesSupported,

  defaultLocale: "es",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
