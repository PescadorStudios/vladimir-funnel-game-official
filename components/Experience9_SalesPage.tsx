
import React, { useState } from 'react';
import { Lead } from '../types';
import { 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  CheckCircle2, 
  ShieldAlert, 
  Lock,
  MessageSquare,
  Sparkles,
  Trophy,
  Activity,
  UserCheck
} from 'lucide-react';

export const Experience9_SalesPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    setIsSubmitting(true);
    
    const newLead: Lead = {
      id: Math.random().toString(36).substring(7),
      name,
      phone,
      timestamp: Date.now()
    };

    // Guardar localmente
    const rawLeads = localStorage.getItem('vladimir_leads') || '[]';
    const leads = JSON.parse(rawLeads);
    leads.push(newLead);
    localStorage.setItem('vladimir_leads', JSON.stringify(leads));

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Redirigir a WhatsApp real
      const message = `Hola Vladimir, ya vi la ejecución. Mi nombre es ${name} y quiero ser parte del bienestar total.`;
      const whatsappUrl = `https://wa.me/573132049681?text=${encodeURIComponent(message)}`;
      setTimeout(() => window.location.href = whatsappUrl, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white">
      {/* SECCIÓN 1: HERO IMPACTO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-1000">
            <ShieldCheck size={16} className="text-red-600" />
            <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-neutral-300">Bienvenido a la Ley del Bienestar</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none animate-in fade-in zoom-in duration-700">
            Vladimir no promete. <br/>
            <span className="text-red-600 italic underline decoration-white/10 underline-offset-8">Vladimir Ejecuta.</span>
          </h1>

          <p className="text-lg md:text-2xl text-neutral-400 font-medium max-w-2xl mx-auto leading-tight px-4 animate-in fade-in duration-1000 delay-500">
            Has visto los quices, has cruzado las leyes y has accedido a la transmisión cifrada. <br className="hidden md:block"/>
            Ya sabes que la solución no es política. Es <span className="text-white font-bold">ejecución pura.</span>
          </p>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-700">
            <a href="#registro" className="group bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95">
              Tomar el Control <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Acceso disponible para ciudadanos conscientes
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: BENEFICIOS (FACTS) */}
      <section className="py-24 bg-[#050505] border-y border-neutral-900 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900/30 p-10 rounded-[2.5rem] border border-neutral-800 space-y-6 hover:border-red-600/30 transition-colors group">
              <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                <Zap size={28} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Ejecución <br/>Inmediata</h3>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed">Sin esperas legislativas. Vladimir activa los mecanismos de bienestar en tiempo real, desde el minuto cero.</p>
            </div>

            <div className="bg-neutral-900/30 p-10 rounded-[2.5rem] border border-neutral-800 space-y-6 hover:border-blue-600/30 transition-colors group">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Bienestar <br/>Blindado</h3>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed">Protegemos lo que ya te pertenece por ley. Un sistema robusto que no depende de voluntades externas.</p>
            </div>

            <div className="bg-neutral-900/30 p-10 rounded-[2.5rem] border border-neutral-800 space-y-6 hover:border-red-600/30 transition-colors group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Activity size={28} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Mecanismo <br/>Transparente</h3>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed">Cada paso es auditable. Cada registro es un hecho. Tú monitorizas el bienestar que hoy recibes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: PRUEBA SOCIAL / ESTATUS */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <div className="text-blue-500 text-sm font-black uppercase tracking-[0.3em]">Status: Verificado</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              El 94% de los ciudadanos <span className="text-blue-500">ya sabían</span> lo que tú acabas de confirmar.
            </h2>
            <p className="text-neutral-400 text-xl font-medium leading-relaxed">
              No eres el único que detectó el fallo del sistema. Miles ya han cruzado al lado de la ejecución. La Ley del Bienestar no espera por elecciones.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-1">
                <div className="text-3xl font-black flex items-center gap-2">12k+ <UserCheck className="text-green-500" size={24}/></div>
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Registros Hoy</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black flex items-center gap-2">98% <Trophy className="text-yellow-500" size={24}/></div>
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Efectividad Real</div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] animate-pulse rounded-full" />
            <div className="relative bg-neutral-900/80 backdrop-blur-3xl border border-neutral-800 p-8 rounded-[3rem] shadow-2xl space-y-6 rotate-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-black italic">V</div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest">Ejecución Interna</div>
                    <div className="text-[10px] text-neutral-500 font-medium">Actualizado: hace 1 min.</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                      <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                      <div className="text-xs font-bold text-neutral-300">Punto de bienestar #{i*120} ejecutado satisfactoriamente.</div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: REGISTRO FINAL (CONVERSIÓN) */}
      <section id="registro" className="py-24 px-6 md:pb-40">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0c0c0c] border border-neutral-800 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative z-10 space-y-10">
              <div className="text-center space-y-4">
                <div className="inline-block bg-red-600/10 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-red-600/20 mb-2">Pase 100% Personalizado</div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Únete a la Ejecución</h2>
                <p className="text-neutral-500 text-sm font-medium">Ingresa tu información verificada para recibir el Plan de Bienestar Total vía canal privado.</p>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                   <div className="group space-y-2">
                      <label className="text-[10px] font-black uppercase text-neutral-600 tracking-widest ml-4 transition-colors group-focus-within:text-red-600">Nombre Completo</label>
                      <input 
                        type="text" 
                        placeholder="Ej: Juan Pérez"
                        className="w-full bg-black border border-neutral-800 px-6 py-5 rounded-3xl text-sm focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-700 text-white font-bold"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                   </div>
                   <div className="group space-y-2">
                      <label className="text-[10px] font-black uppercase text-neutral-600 tracking-widest ml-4 transition-colors group-focus-within:text-red-600">WhatsApp de contacto</label>
                      <input 
                        type="tel" 
                        placeholder="Ej: +57 321..."
                        className="w-full bg-black border border-neutral-800 px-6 py-5 rounded-3xl text-sm focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-700 text-white font-bold"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                   </div>

                   <button 
                    disabled={isSubmitting}
                    className="w-full group bg-red-600 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-900/30 overflow-hidden relative"
                   >
                     {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     ) : (
                        <>
                          <Zap size={18} fill="currentColor" />
                          Activar Mi Plan de Bienestar
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                     )}
                   </button>
                </form>
              ) : (
                <div className="text-center py-12 animate-in zoom-in duration-700">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">Registro Exitoso</h3>
                  <p className="text-neutral-500 font-medium">Redirigiendo a tu canal seguro de WhatsApp...</p>
                </div>
              )}

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 opacity-40">
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <Lock size={12} /> Cifrado de Punto a Punto
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles size={12} /> Datos Protegidos
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <MessageSquare size={12} /> Contacto Directo
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINI FOOTER */}
      <footer className="py-12 border-t border-neutral-900 px-6 text-center text-[10px] text-neutral-700 font-black uppercase tracking-[0.4em]">
        Vladimir Protocol © 2024 • Ejecutamos el bienestar que mereces.
      </footer>
    </div>
  );
};
