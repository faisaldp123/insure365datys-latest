import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "919999999999"; // Replace

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=Hello%20Insure365Days,%20I%20need%20help%20with%20insurance.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
    >
      <MessageCircle size={28} />
    </a>
  );
}