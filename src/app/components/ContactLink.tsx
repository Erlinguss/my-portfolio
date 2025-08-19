"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";
import ContactForm from "./ContactForm";

type Props = {
  className?: string;
  children?: React.ReactNode; 
  href?: string;              
};

export default function ContactLink({
  className,
  children = "Contact",
  href = "#contact",         
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Looks like a normal link, opens modal with JS */}
      <a
        href={href}
        className={className}
        role="button"               
        aria-haspopup="dialog"
        aria-controls="contact-dialog"
        onClick={(e) => {
          // With JS: stop navigation and open the modal
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>

      {open && (
        <ContactModal onClose={() => setOpen(false)} title="Contact">
          <ContactForm />
        </ContactModal>
      )}
    </>
  );
}
