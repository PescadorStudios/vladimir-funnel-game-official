
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const videoData = [
  { id: 1, url: "https://res.cloudinary.com/dtwegeovt/video/upload/v1770434181/copy_7CDDBBD5-ACCB-4C8C-9684-154EAE50E1D6_d3kmr0.mov", caption: "Garantizando tu bienestar. La ejecución es ahora." },
  { id: 2, url: "https://res.cloudinary.com/dtwegeovt/video/upload/v1770434180/copy_5DEF6A3A-01F7-4B27-AFA4-01CBC0BFED21_e1pvex.mov", caption: "Antes se prometía, hoy se ejecuta. Vladimir responde." },
  { id: 3, url: "https://res.cloudinary.com/dtwegeovt/video/upload/v1770434181/copy_C248C514-642B-4C58-927F-CF83211B38CA_yykqfg.mov", caption: "El bienestar no es un eslogan, es un derecho que vamos a ejecutar." }
];

export const Experience7_Feed: React.FC<Props> = ({ onComplete }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIdx(index);
          const video = videoRefs.current[index];
          if (video) video.play().catch(() => {});
        } else {
          const index = Number(entry.target.getAttribute('data-index'));
          videoRefs.current[index]?.pause();
        }
      });
    }, { threshold: 0.6 });
    containerRef.current?.querySelectorAll('.video-snap-item').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div ref={containerRef} className="w-full max-w-[450px] h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {videoData.map((v, i) => (
          <div key={v.id} data-index={i} className="video-snap-item relative h-screen snap-start">
            <video ref={el => videoRefs.current[i] = el} src={v.url} className="w-full h-full object-cover" loop playsInline muted={isMuted} />
            <div className="absolute bottom-20 left-0 p-6 text-white bg-gradient-to-t from-black">
              <p className="font-bold">{v.caption}</p>
              {i === videoData.length - 1 && <button onClick={onComplete} className="mt-4 bg-red-600 px-6 py-2 rounded">Finalizar</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
