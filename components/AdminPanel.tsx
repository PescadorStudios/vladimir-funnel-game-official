
import React, { useState, useEffect } from 'react';
import { FunnelStep, UserSession, Lead } from '../types';
import { 
  Users, 
  Activity, 
  ArrowLeft, 
  Clock, 
  ChevronRight, 
  Trash2, 
  Smartphone,
  ClipboardList,
  Calendar,
  Phone,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface Props {
  onExit: () => void;
}

export const AdminPanel: React.FC<Props> = ({ onExit }) => {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'leads'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    const rawSessions = localStorage.getItem('vladimir_sessions') || '[]';
    const rawLeads = localStorage.getItem('vladimir_leads') || '[]';
    setSessions(JSON.parse(rawSessions));
    setLeads(JSON.parse(rawLeads));
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); 
    return () => clearInterval(interval);
  }, []);

  const clearData = () => {
    if (confirm('¿Estás seguro de que quieres borrar todos los datos de analytics y leads? Esta acción es irreversible.')) {
      localStorage.removeItem('vladimir_sessions');
      localStorage.removeItem('vladimir_leads');
      setSessions([]);
      setLeads([]);
      setActiveTab('overview');
    }
  };

  const calculateConversion = (step: FunnelStep) => {
    if (sessions.length === 0) return 0;
    const count = sessions.filter(s => s.stepsReached.includes(step)).length;
    return Math.round((count / sessions.length) * 100);
  };

  const funnelSteps = Object.values(FunnelStep).filter(s => s !== FunnelStep.ADMIN);

  return (
    <div className="fixed inset-0 z-[10000] bg-[#050505] text-neutral-100 overflow-y-auto font-sans selection:bg-blue-500">
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-neutral-800 px-4 md:px-8 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="p-2 hover:bg-neutral-800 rounded-xl transition-all active:scale-90 text-neutral-400 hover:text-white">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none">
              Vladimir <span className="text-red-600">Control</span>
            </h1>
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Panel de Ejecución</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={loadData} 
            className={`p-2 rounded-lg text-neutral-400 hover:text-white transition-all ${isRefreshing ? 'animate-spin text-blue-500' : ''}`}
          >
            <RefreshCw size={18} />
          </button>
          <div className="hidden md:flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Métricas
            </button>
            <button 
              onClick={() => setActiveTab('sessions')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'sessions' ? 'bg-blue-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Tráfico
            </button>
            <button 
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'leads' ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Inscritos ({leads.length})
            </button>
          </div>
          <button onClick={clearData} className="p-2 text-neutral-700 hover:text-red-500 transition-colors ml-2" title="Resetear todo">
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 p-1.5 rounded-2xl flex shadow-2xl">
        <button onClick={() => setActiveTab('overview')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}>Métricas</button>
        <button onClick={() => setActiveTab('sessions')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase ${activeTab === 'sessions' ? 'bg-blue-600 text-white' : 'text-neutral-500'}`}>Tráfico</button>
        <button onClick={() => setActiveTab('leads')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase ${activeTab === 'leads' ? 'bg-red-600 text-white' : 'text-neutral-500'}`}>Leads ({leads.length})</button>
      </div>

      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 pb-32">
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-3xl space-y-1">
                <Users size={20} className="text-neutral-500 mb-2" />
                <div className="text-xs font-bold uppercase text-neutral-500 tracking-widest">Total Tráfico</div>
                <div className="text-4xl font-black">{sessions.length}</div>
              </div>
              
              <button 
                onClick={() => setActiveTab('leads')}
                className="group bg-neutral-900/50 border border-neutral-800 p-6 rounded-3xl space-y-1 text-left hover:border-red-600/50 transition-all active:scale-95"
              >
                <ClipboardList size={20} className="text-red-500 mb-2" />
                <div className="text-xs font-bold uppercase text-neutral-500 tracking-widest">Inscritos Finales</div>
                <div className="text-4xl font-black text-red-600 flex items-center gap-2">
                  {leads.length}
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform opacity-30" />
                </div>
              </button>

              <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-3xl space-y-1">
                <Activity size={20} className="text-blue-500 mb-2" />
                <div className="text-xs font-bold uppercase text-neutral-500 tracking-widest">Conv. Ventas</div>
                <div className="text-4xl font-black">{calculateConversion(FunnelStep.SALES_PAGE)}%</div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-3xl space-y-1">
                <ExternalLink size={20} className="text-green-500 mb-2" />
                <div className="text-xs font-bold uppercase text-neutral-500 tracking-widest">Conv. Leads</div>
                <div className="text-4xl font-black text-green-500">
                  {sessions.length > 0 ? Math.round((leads.length / sessions.length) * 100) : 0}%
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/30 border border-neutral-800 p-8 rounded-[2.5rem] space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-neutral-500">Embudo de Ejecución</h3>
                <span className="text-[10px] bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full font-bold">Datos en vivo</span>
              </div>
              
              <div className="space-y-6">
                {funnelSteps.map((stepName, i) => {
                  const perc = calculateConversion(stepName as FunnelStep);
                  return (
                    <div key={stepName} className="group">
                      <div className="flex justify-between items-end mb-2 px-1">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-neutral-700 w-4">0{i+1}</span>
                          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">{stepName}</span>
                        </div>
                        <span className="text-xs font-mono font-black text-white">{perc}%</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-800/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-1000 ease-out"
                          style={{ width: `${perc}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
