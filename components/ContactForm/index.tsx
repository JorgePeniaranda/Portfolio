"use client";

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
      <input
        type="text"
        name="name"
        placeholder="Nombre..."
        className="border-secondary-dark dark:border-secondary text-gray-color focus:text-secondary dark:hover:text-secondary-dark focus:placeholder:text-secondary dark:focus:placeholder:text-secondary-dark"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email..."
        className="border-secondary-dark dark:border-secondary text-gray-color focus:text-secondary dark:hover:text-secondary-dark focus:placeholder:text-secondary dark:focus:placeholder:text-secondary-dark"
        required
      />
      <textarea
        name="message"
        cols={30}
        rows={6}
        placeholder="Mensaje..."
        className="border-secondary-dark dark:border-secondary text-gray-color focus:text-secondary dark:hover:text-secondary-dark focus:placeholder:text-secondary dark:focus:placeholder:text-secondary-dark"
        required
      />
      <button
        type="submit"
        className="bg-primary-dark select-none text-secondary-dark dark:bg-primary dark:text-secondary"
      >
        Enviar
      </button>
    </form>
  );
};
