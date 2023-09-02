import { useTranslation } from "@/app/i18n";
import { Header } from "./sections/Header";
import { Navbar } from "./sections/Header/components/Navbar";

export default async function Home({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng);
  return (
    <main className="w-screen h-screen home-primary-bg px-40">
      <Header>
        <Navbar lng={lng} />
        <div className="flex">
          <h1 className="w-2/5">
            {t("open-1")}
            <span className="lol">{" " + t("open-special") + " "}</span>
            {t("open-2")}
          </h1>
        </div>
      </Header>
    </main>
  );
}
