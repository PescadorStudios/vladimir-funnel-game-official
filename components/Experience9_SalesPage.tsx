
import React, { useState, useEffect } from 'react';
import { Shield, Target, Activity, CheckCircle, HelpCircle, ArrowRight, X, User, Phone as PhoneIcon, Users } from 'lucide-react';
import { Lead } from '../types';

const WHATSAPP_LINK = "https://chat.whatsapp.com/Iw5BGzTwmAx7syn2VMe0wp";

export const Experience9_SalesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const loadLeads = () => {
      const stored = JSON.parse(localStorage.getItem('vladimir_leads') || '[]');
      setRecentLeads(stored.slice(-5).reverse());
    };
    loadLeads();
    window.addEventListener('storage', loadLeads);
    return () => window.removeEventListener('storage', loadLeads);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    const newLead: Lead = { id: Math.random().toString(36).substring(7), name: formData.name, phone: formData.phone, timestamp: Date.now() };
    const existingLeads: Lead[] = JSON.parse(localStorage.getItem('vladimir_leads') || '[]');
    localStorage.setItem('vladimir_leads', JSON.stringify([...existingLeads, newLead]));
    setTimeout(() => { window.open(WHATSAPP_LINK, '_blank'); setIsSubmitting(false); setIsModalOpen(false); setFormData({ name: '', phone: '' }); }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24">
      <section className="bg-red-600 text-white pt-24 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">El problema nunca fue la ley. <br/><span className="text-blue-900">Fue que nadie la ejecutó.</span></h1>
      </section>
      <section className="py-32 px-6 bg-neutral-950 text-white text-center">
        <button onClick={() => setIsModalOpen(true)} className="group bg-red-600 text-white font-black text-2xl uppercase py-6 px-12 rounded-2xl flex items-center justify-center gap-4 mx-auto active:scale-95">Entrar a la comunidad <ArrowRight /></button>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-8 animate-in zoom-in-95">
            <h3 className="text-2xl font-black uppercase text-white mb-8">Registro de Ejecución</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input required type="text" placeholder="Nombre Completo" className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 px-4 text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input required type="tel" placeholder="Tu número de teléfono" className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 px-4 text-white" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white font-black text-lg py-4 rounded-xl">{isSubmitting ? 'Cargando...' : 'Activar Acceso'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
