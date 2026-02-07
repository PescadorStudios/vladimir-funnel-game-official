
import React, { useState, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, ChevronLeft, CheckCheck, Smile, Paperclip, Camera, Mic } from 'lucide-react';

interface Props {
  messages: string[];
  contactName: string;
  onComplete: () => void;
  buttonLabel: string;
}

export const WhatsAppInterface: React.FC<Props> = ({ messages: initialMessages, contactName, onComplete, buttonLabel }) => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let currentIdx = 0;
    
    const showNextMessage = () => {
      if (currentIdx < initialMessages.length) {
        setIsTyping(true);
        const delay = 1500 + Math.random() * 1000;
        
        setTimeout(() => {
          setDisplayedMessages(prev => [...prev, initialMessages[currentIdx]]);
          setIsTyping(false);
          currentIdx++;
          
          if (currentIdx < initialMessages.length) {
            setTimeout(showNextMessage, 1000);
          } else {
            setTimeout(() => setShowButton(true), 1200);
          }
        }, delay);
      }
    };

    showNextMessage();
  }, [initialMessages]);

  return (
    <div className="fixed inset-0 z-50 bg-[#efeae2] flex flex-col whatsapp-bg animate-in fade-in duration-500">
      {/* Header WhatsApp */}
      <header className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <ChevronLeft size={24} />
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-neutral-300 overflow-hidden border border-white/20">
              <img 
                src="https://res.cloudinary.com/dtwegeovt/image/upload/v1770430080/IMG_7827_wrfl6u.jpg" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#008069]" />
          </div>
          <div>
            <h3 className="font-bold text-base leading-tight">{contactName}</h3>
            <p className="text-[11px] opacity-90">{isTyping ? 'escribiendo...' : 'en línea'}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 opacity-90">
          <Video size={20} fill="currentColor" />
          <Phone size={18} fill="currentColor" />
          <MoreVertical size={20} />
        </div>
      </header>

      {/* Area de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <div className="flex justify-center mb-6">
          <span className="bg-[#d1e4f3] text-[#54656f] text-[11px] font-bold px-3 py-1 rounded-lg uppercase shadow-sm">Hoy</span>
        </div>

        {displayedMessages.map((msg, i) => (
          <div 
            key={i} 
            className="flex flex-col items-start animate-in slide-in-from-left duration-300"
          >
            <div className="relative max-w-[85%] bg-white text-[#111b21] p-3 rounded-2xl rounded-tl-none shadow-sm text-sm font-medium">
              <p>{msg}</p>
              <div className="flex justify-end items-center gap-1 mt-1">
                <span className="text-[10px] text-[#667781] uppercase font-bold">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <CheckCheck size={14} className="text-[#53bdeb]" />
              </div>
              {/* Burbuja tail */}
              <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent" />
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start">
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
             </div>
          </div>
        )}
        
        <div className="h-20" /> {/* Spacer for the bottom button */}
      </div>

      {/* Input de Mensaje (Decorative) */}
      <div className="p-2 flex items-center gap-2 bg-[#f0f2f5] shrink-0">
        <div className="flex items-center gap-4 px-2 text-[#54656f]">
           <Smile size={24} />
           <Paperclip size={24} className="-rotate-45" />
        </div>
        <div className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm text-neutral-400">
           Escribe un mensaje
        </div>
        <div className="flex items-center gap-4 px-2 text-[#54656f]">
           <Camera size={24} />
           <div className="w-11 h-11 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-lg">
             <Mic size={22} fill="currentColor" />
           </div>
        </div>
      </div>

      {/* Botón de Acción Principal (Vladimir CTA) */}
      {showButton && (
        <div className="fixed bottom-24 left-6 right-6 z-50 animate-in zoom-in duration-500">
          <button 
            onClick={onComplete}
            className="w-full bg-[#00a884] hover:bg-[#008f70] text-white py-4 rounded-xl font-bold text-lg shadow-[0_8px_20px_rgba(0,168,132,0.3)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all border-b-4 border-[#005e4d]"
          >
            {buttonLabel}
            <Send size={20} fill="currentColor" className="rotate-45" />
          </button>
        </div>
      )}
    </div>
  );
};
