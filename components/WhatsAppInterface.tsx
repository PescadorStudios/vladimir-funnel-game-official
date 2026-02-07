
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, MoreVertical, Phone, Video, Send, User, CheckCheck } from 'lucide-react';

interface Props {
  contactName: string;
  messages: string[];
  onComplete: () => void;
  buttonLabel?: string;
}

export const WhatsAppInterface: React.FC<Props> = ({ contactName, messages, onComplete, buttonLabel = "Continuar" }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount < messages.length) {
      setIsTyping(true);
      const timeout = setTimeout(() => { setVisibleCount(prev => prev + 1); setIsTyping(false); }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount, messages.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-100 whatsapp-bg">
      <div className="bg-[#075e54] text-white px-3 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <ChevronLeft />
          <div className="w-10 h-10 rounded-full bg-neutral-300 flex items-center justify-center overflow-hidden"><User className="text-neutral-500" /></div>
          <div><span className="font-bold text-base">{contactName}</span></div>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <div key={i} className="bg-white p-2.5 rounded-lg max-w-[85%]">{msg}</div>
        ))}
      </div>
      <div className="p-3 bg-neutral-100 flex items-center gap-2">
        {visibleCount === messages.length ? (
          <button onClick={onComplete} className="flex-1 bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg">{buttonLabel}</button>
        ) : (
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-neutral-400">Lectura única activada...</div>
        )}
      </div>
    </div>
  );
};
