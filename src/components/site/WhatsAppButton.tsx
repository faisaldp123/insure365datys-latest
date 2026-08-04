import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppButton() {
  const phoneNumber = "9870220211"; // Replace

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=Hello%20Insure365Days,%20I%20need%20help%20with%20insurance.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-background transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5a] sm:bottom-6 sm:right-6"
    >
      <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
