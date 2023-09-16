import { useTranslation } from "@/app/i18n";
import { ContactForm } from "@/components/ContactForm";
import { Nature } from "@/public/svg";
import styles from "./style.module.css";

export default async function Contact({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng);

  return (
    <section className="flex flex-wrap-reverse justify-around pt-36 pb-32 items-center">
      <figure className="flex items-center pb-16 mt-16 justify-center w-[90%] md:w-[55%] md:mt-0">
        <figcaption className="text-center hidden">
          {t("contact-figure")}
        </figcaption>
        <Nature className="w-full md:w-4/6 pr-0 md:pr-10" />
      </figure>
      <article className="flex flex-col items-center text-center w-[90%] md:w-[45%] md:items-start md:text-start">
        <h2 className="text-5xl font-bold select-none underline underline-offset-4">
          {t("contact-title")}
        </h2>
        <p className="mt-2 tracking-wider text-xl">{t("contact-text")}</p>
        <ContactForm
          namePlaceHolder={t("contact-Name-placeholder")}
          emailPlaceHolder={t("contact-Email-placeholder")}
          messagePlaceHolder={t("contact-Message-placeholder")}
          sendPlaceHolder={t("contact-Send-placeholder")}
          className={styles.formStyle}
        />
      </article>
    </section>
  );
}
