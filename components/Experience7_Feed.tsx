
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, User, ShieldCheck, CheckCircle2, ShoppingCart } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const posts = [
  {
    id: 1,
    user: "Vladimir_Bienestar",
    verified: true,
    image: "https://res.cloudinary.com/dtwegeovt/image/upload/v1770438349/IMG_7838_rv6rts.jpg",
    likes: "12,482",
    caption: "La ejecución no es una promesa, es un hecho. Transformando la realidad desde el primer día. #VladimirEjecuta #LaLeyDelBienestar",
    comments: "348",
    time: "HACE 2 HORAS"
  },
  {
    id: 2,
    user: "Vladimir_Oficial",
    verified: true,
    image: "https://res.cloudinary.com/dtwegeovt/image/upload/v1770438349/IMG_7839_zffs75.jpg",
    likes: "45,901",
    caption: "Mientras otros hablan, nosotros garantizamos tu tranquilidad. El mecanismo ya está en marcha. #HechosReales #BienestarCiudadano",
    comments: "1,200",
    time: "HACE 5 HORAS"
  },
  {
    id: 3,
    user: "Ejecucion_Total",
    verified: false,
    image: "https://res.cloudinary.com/dtwegeovt/image/upload/v1770438349/IMG_7837_yckh46.jpg",
    likes: "8,230",
    caption: "¿Estás listo para el cambio que se siente? Vladimir te protege. El bienestar es hoy.",
    comments: "156",
    time: "HACE 1 DÍA"
  }
];

export const Experience7_Feed: React.FC<Props> = ({ onComplete }) => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    // Mostrar el botón de salida después de un tiempo para obligar al scroll
    const timer = setTimeout(() => setShowExit(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (id: number) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col overflow-hidden">
      {/* Header Estilo Red Social */}
      <header className="px-5 py-4 border-b border-neutral-900 bg-black/80 backdrop-blur-md flex items-center justify-between shrink-0">
        <h2 className="text-xl font-black italic tracking-tighter text-white uppercase italic">Vladimir <span className="text-red-600">Feed</span></h2>
        <div className="flex items-center gap-4">
          <ShieldCheck size={22} className="text-blue-500 animate-pulse" />
          <User size={22} className="text-neutral-500" />
        </div>
      </header>

      {/* Feed Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-neutral-950">
        <div className="max-w-md mx-auto space-y-2 py-4">
          {posts.map((post) => (
            <article key={post.id} className="bg-black border-y border-neutral-900 md:border md:rounded-xl md:mb-6">
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 to-red-600 p-[2px]">
                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center p-0.5">
                       <img src={post.image} className="w-full h-full rounded-full object-cover grayscale" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">{post.user}</span>
                    {post.verified && <CheckCircle2 size={12} className="text-blue-500 fill-blue-500" />}
                  </div>
                </div>
                <MoreHorizontal size={18} className="text-neutral-600" />
              </div>

              <div className="aspect-square bg-neutral-900 overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleLike(post.id)}>
                      <Heart 
                        size={24} 
                        className={`transition-colors ${likedPosts.includes(post.id) ? 'text-red-600 fill-red-600' : 'text-white'}`} 
                      />
                    </button>
                    <MessageCircle size={24} className="text-white" />
                    <Send size={24} className="text-white" />
                  </div>
                  <Bookmark size={24} className="text-white" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-white mb-1 block">{post.likes} Me gusta</span>
                  <p className="text-xs text-neutral-200 leading-relaxed">
                    <span className="font-bold mr-2">{post.user}</span>
                    {post.caption}
                  </p>
                  <button className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pt-1">Ver los {post.comments} comentarios</button>
                </div>
                <div className="text-[10px] text-neutral-600 font-bold uppercase">{post.time}</div>
              </div>
            </article>
          ))}
          
          <div className="py-20 px-8 text-center space-y-4">
             <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={24} className="text-red-600" />
             </div>
             <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-xs mx-auto">Has visto el archivo de ejecución de hoy. El bienestar se mantiene bajo guardia.</p>
          </div>
        </div>
      </div>

      {/* Footer / Call to Action */}
      <footer className="p-6 border-t border-neutral-900 bg-black/95 backdrop-blur-xl shrink-0">
        <button 
          onClick={onComplete}
          className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-2xl ${
            showExit 
            ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95' 
            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-50'
          }`}
          disabled={!showExit}
        >
          {showExit ? (
            <>Quiero Acceso al Plan Total <ShoppingCart size={18} /></>
          ) : (
            <>Analizando Ejecución...</>
          )}
        </button>
      </footer>
    </div>
  );
};
