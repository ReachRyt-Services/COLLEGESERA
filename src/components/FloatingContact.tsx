import { MessageCircle, PhoneCall } from "lucide-react";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 flex flex-col gap-2.5 sm:gap-3 z-40 print:hidden pointer-events-auto">
      <a
        href="tel:+916374715327"
        className="w-11 h-11 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 group"
        aria-label="Call Support"
      >
        <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>
      <a
        href="https://wa.me/916374715327"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 sm:w-14 sm:h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-105 active:scale-95 transition-all duration-200 group"
        aria-label="WhatsApp Support"
      >
        <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
};

export default FloatingContact;
