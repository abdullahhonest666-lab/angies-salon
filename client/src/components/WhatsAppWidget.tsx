import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SALON_INFO } from '../data/staticContent';

export const WhatsAppWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    "Hello Angie's Salon! I would like to inquire about appointments and bridal packages at your DHA Phase 5 Karachi branch."
  );
  const waUrl = `https://wa.me/${SALON_INFO.whatsappRaw}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip greeting */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#1E1E24] px-4 py-2.5 rounded-2xl shadow-lg border border-[#F8E1E7] text-xs max-w-xs animate-in fade-in duration-300">
          <div>
            <p className="font-semibold text-[#9A4E65]">Angie's Concierge</p>
            <p className="text-[#686064]">Have a question? Chat with us on WhatsApp!</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Angie's Salon"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
};
