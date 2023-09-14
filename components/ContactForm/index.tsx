"use client";

import React from "react";

export const ContactForm = ({ className }: { className?: string }) => {
  return (
    <form onSubmit={() => event?.preventDefault()} className={className}>
      <input type="text" placeholder="Nombre..." required />
      <input type="email" placeholder="Email..." required />
      <textarea
        name="message"
        cols={30}
        rows={6}
        placeholder="Mensaje..."
        required
      />
      <button
        type="submit"
        className="bg-primary-bg-dark text-primary-text-dark dark:bg-primary-bg dark:text-primary-text"
      >
        Enviar
      </button>
    </form>
  );
};
