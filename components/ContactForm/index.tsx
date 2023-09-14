"use client";

import React from "react";
import emailjs from "@emailjs/browser";

export const ContactForm = ({ className }: { className?: string }) => {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_v055els",
        "template_jlv215d",
        e.currentTarget,
        "5N89hdd9Q-Tpjh0fF"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <form onSubmit={sendEmail} className={className}>
      <input type="text" name="name" placeholder="Nombre..." required />
      <input type="email" name="email" placeholder="Email..." required />
      <textarea
        name="message"
        cols={30}
        rows={6}
        placeholder="Mensaje..."
        required
      />
      <button
        type="submit"
        className="bg-primary-bg-dark select-none text-primary-text-dark dark:bg-primary-bg dark:text-primary-text"
      >
        Enviar
      </button>
    </form>
  );
};
