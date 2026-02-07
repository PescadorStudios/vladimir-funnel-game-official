
import React, { useState, useEffect, useRef } from 'react';
import { Play, Activity, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  onComplete: () => void;
  onSkipToSales: () => void;
}

export const Experience0_Welcome: React.FC<Props> = ({ onComplete, onSkipToSales }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [introStep, setIntroStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch(err => {
          console.error("Error al reproducir video con audio:", err);
          videoRef.current?.play();
        });
      }
    }, 50);
  };

  useEffect(() => {
    if (videoFinished) {
      const timers = [
        setTimeout(() => setIntroStep(1), 2000),
        setTimeout(() => setIntroStep(2), 4000),
        setTimeout(() => setIntroStep(3), 6000),
        setTimeout(() => onComplete(), 8500),
      ];
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [videoFinished, onComplete]);

  if (!isPlaying) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
        </div>
        <div className="relative z-10 max-w-md w-full flex flex-col items-center justify-between h-full py-12">
          <div className="w-full space-y-4">
            <h1 className="text-5xl md:text-6xl font-black uppercase text-white leading-none">Garantizando tu <span className="text-red-600">bienestar</span></h1>
          </div>
          <button onClick={handleStart} className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-lg"><Play className="text-white fill-white" size={32} /></button>
        </div>
      </div>
    );
  }

  if (!videoFinished) {
    return (
      <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
        <video ref={videoRef} src="https://res.cloudinary.com/dtwegeovt/video/upload/v1770429768/copy_8D64D716-A45D-4F7F-A943-E40FB1319F55_c0bcld.mov" playsInline className="w-full h-full object-contain" onEnded={() => setVideoFinished(true)} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="relative z-10 w-full max-w-lg text-center">
        <h2 className="text-6xl font-black uppercase text-white leading-none">Vladimir <br/> <span className="text-blue-600 italic">Ejecuta.</span></h2>
      </div>
    </div>
  );
};
