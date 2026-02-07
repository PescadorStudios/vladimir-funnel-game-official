
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronRight, ShieldAlert } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const Experience5_VSL: React.FC<Props> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(p);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-[#050505] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.1)] border border-neutral-800">
        <video 
          ref={videoRef}
          src="https://res.cloudinary.com/dtwegeovt/video/upload/v1770438150/copy_F0CAF9A7-F6FA-4C1C-9EBF-7BAE1568A55B_q2r7t6.mov"
          className="w-full h-full object-cover"
          playsInline
          onPlay={() => {
            setIsPlaying(true);
            setShowOverlay(false);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={onComplete}
        />

        {showOverlay && (
          <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center gap-6">
            <div className="bg-red-600/10 border border-red-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
              <ShieldAlert size={14} className="text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Transmisión Cifrada</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white max-w-xl">
              Lo que el sistema no quiere que <span className="text-red-500 underline decoration-red-900 underline-offset-8">veas.</span>
            </h2>
            <button 
              onClick={togglePlay}
              className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl"
            >
              Iniciar Transmisión <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Custom Controls */}
        {!showOverlay && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-4">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="text-white hover:text-red-500 transition-colors">
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                  </button>
                  <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors">
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  Transmisión <span className="text-red-600 animate-pulse">● En Vivo</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 max-w-2xl text-center space-y-4 animate-pulse">
        <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
          Sintonizando frecuencia de bienestar total...
        </p>
      </div>
    </div>
  );
};
