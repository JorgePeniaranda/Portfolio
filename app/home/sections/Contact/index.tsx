import React from "react";
import { ContactForm } from "@/components/ContactForm";
import { Nature } from "@/public/svg";
import styles from "./style.module.css";

export default function Contact() {
  return (
    <section className="flex flex-wrap-reverse justify-around pt-36 pb-32 items-center">
      <div className="w-[55%] min-width-svgSize flex items-center justify-center max-md:w-[90%] max-md:mt-16 pb-16">
        <Nature className="w-4/6 pr-10 max-md:w-full" />
      </div>
      <div className="flex flex-col w-[45%]  max-md:w-[90%] max-md:items-center max-md:text-center">
        <h2 className="text-5xl font-bold select-none underline underline-offset-4">
          Contact
        </h2>
        <p className="mt-2 tracking-wider text-xl">
          Si deseas ponerte en contacto conmigo o tienes alguna pregunta, no
          dudes en enviarme un mensaje. Estoy aquí para ayudarte y escuchar tus
          ideas.
        </p>
        <ContactForm className={styles.formStyle} />
      </div>
    </section>
  );
}
