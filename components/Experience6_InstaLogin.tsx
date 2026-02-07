
import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, ChevronRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const Experience6_InstaLogin: React.FC<Props> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(onComplete, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 bg-gradient-to-b from-neutral-900 to-black">
      <div className="w-full max-w-sm space-y-8">
        {/* Mock Instagram Logo/Identity */}
        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-yellow-500 via-red-600 to-purple-800 p-[2px] shadow-2xl">
            <div className="w-full h-full bg-black rounded-[1.95rem] flex items-center justify-center">
              <Lock size={32} className="text-white" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase italic">Vladimir <span className="text-red-600">Private</span></h2>
            <p className="text-neutral-500 text-xs font-bold tracking-widest uppercase mt-1">Acceso al Archivo de Ejecución</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in duration-1000 delay-300">
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Nombre de usuario o teléfono"
              className="w-full bg-neutral-900 border border-neutral-800 px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-600 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Contraseña del sistema"
                className="w-full bg-neutral-900 border border-neutral-800 px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-600 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-300 transition-colors"
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={status !== 'idle'}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${
              status === 'success' 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20 active:scale-[0.98]'
            }`}
          >
            {status === 'idle' && (
              <>Ingresar al Archivo <ChevronRight size={18} /></>
            )}
            {status === 'loading' && (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {status === 'success' && (
              <>Acceso Concedido <ShieldCheck size={18} /></>
            )}
          </button>
        </form>

        <div className="pt-8 text-center space-y-6 opacity-30">
          <div className="flex items-center justify-center gap-4 text-neutral-500">
             <div className="h-[1px] flex-1 bg-neutral-800" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cifrado Militar</span>
             <div className="h-[1px] flex-1 bg-neutral-800" />
          </div>
          <p className="text-[9px] text-neutral-600 uppercase font-bold max-w-xs mx-auto leading-relaxed">
            Este terminal es propiedad del mecanismo de bienestar de Vladimir. El acceso no autorizado será monitoreado.
          </p>
        </div>
      </div>
    </div>
  );
};
