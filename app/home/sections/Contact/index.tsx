import React from "react";
import { ContactForm } from "@/components/ContactForm";
import { Nature } from "@/public/svg";
import styles from "./style.module.css";

export default function Contact() {
  return (
    <section className="flex flex-wrap-reverse justify-around pt-36 pb-32 items-center">
      <div className="w-1/2 min-width-svgSize flex items-center justify-center p-3">
        <Nature className="w-4/6" />
      </div>
      <div className="flex flex-col  w-1/2">
        <h2 className="text-5xl font-bold underline underline-offset-4">
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
