
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FunnelStep, UserSession } from './types';
import { Experience0_Welcome } from './components/Experience0_Welcome';
import { Experience1_Call } from './components/Experience1_Call';
import { Experience2_Scanner } from './components/Experience2_Scanner';
import { Experience3_Quiz } from './components/Experience3_Quiz';
import { WhatsAppInterface } from './components/WhatsAppInterface';
import { Experience5_VSL } from './components/Experience5_VSL';
import { Experience6_InstaLogin } from './components/Experience6_InstaLogin';
import { Experience7_Feed } from './components/Experience7_Feed';
import { Experience9_SalesPage } from './components/Experience9_SalesPage';
import { AdminPanel } from './components/AdminPanel';
import { Settings, ChevronRight, X, BarChart3 } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<FunnelStep>(FunnelStep.WELCOME);
  const [showDevPanel, setShowDevPanel] = useState(false);
  const [debugEnabled, setDebugEnabled] = useState(() => localStorage.getItem('vladimir_debug_mode') === 'true');
  const sessionId = useRef<string>(Math.random().toString(36).substring(7));
  const clickCount = useRef<number>(0);
  const lastClickTime = useRef<number>(0);

  useEffect(() => {
    const handleWindowClick = () => {
      const now = Date.now();
      if (now - lastClickTime.current > 1500) clickCount.current = 0;
      clickCount.current += 1;
      lastClickTime.current = now;
      if (clickCount.current >= 5) {
        setDebugEnabled(prev => {
          const newState = !prev;
          localStorage.setItem('vladimir_debug_mode', newState.toString());
          return newState;
        });
        clickCount.current = 0;
      }
    };
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const nextStep = useCallback(() => {
    const steps = Object.values(FunnelStep).filter(s => s !== FunnelStep.ADMIN);
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1]);
  }, [step]);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative selection:bg-red-500">
      <div className="h-full">
        {step === FunnelStep.WELCOME && <Experience0_Welcome onComplete={nextStep} onSkipToSales={() => setStep(FunnelStep.SALES_PAGE)} />}
        {step === FunnelStep.CALL && <Experience1_Call onComplete={nextStep} />}
        {step === FunnelStep.WHATSAPP_INTRO && <WhatsAppInterface contactName="Camila" messages={["Hola.", "Te vi atento.", "Quiero mostrarte algo que nadie está viendo.", "Inicia el escaneo cuando estés listo."]} onComplete={nextStep} buttonLabel="Iniciar Escaneo" />}
        {step === FunnelStep.SCANNER && <Experience2_Scanner onComplete={nextStep} />}
        {step === FunnelStep.QUIZ && <Experience3_Quiz onComplete={nextStep} />}
        {step === FunnelStep.WHATSAPP_AUTH && <WhatsAppInterface contactName="Camila" messages={["Gracias por responder.", "No estás aquí por curiosidad.", "Estás aquí porque ya entendiste algo...", "Voy a habilitarte acceso a una transmisión cifrada."]} onComplete={nextStep} buttonLabel="Ver Transmisión Cifrada" />}
        {step === FunnelStep.VSL && <Experience5_VSL onComplete={nextStep} />}
        {step === FunnelStep.WHATSAPP_CONTINUITY && <WhatsAppInterface contactName="Camila" messages={["Ahora ya viste por qué el sistema no falló solo.", "Lo que sigue no es para convencerte.", "Es para que confirmes."]} onComplete={nextStep} buttonLabel="Acceder al Archivo Privado" />}
        {step === FunnelStep.INSTA_LOGIN && <Experience6_InstaLogin onComplete={nextStep} />}
        {step === FunnelStep.FEED && <Experience7_Feed onComplete={nextStep} />}
        {step === FunnelStep.WHATSAPP_OBJECTIONS && <WhatsAppInterface contactName="Camila" messages={["No necesitas creer en personas.", "Solo en mecanismos que se ejecutan.", "Vladimir está para tu bienestar."]} onComplete={nextStep} buttonLabel="Ver Plan de Ejecución Completo" />}
        {step === FunnelStep.SALES_PAGE && <Experience9_SalesPage />}
        {step === FunnelStep.ADMIN && <AdminPanel onExit={() => setStep(FunnelStep.WELCOME)} />}
      </div>
    </div>
  );
};
export default App;
