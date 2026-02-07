
import React from 'react';
import { FunnelStep } from './types';
import { Experience0_Welcome } from './components/Experience0_Welcome';
import { Experience6_InstaLogin } from './components/Experience6_InstaLogin';
import { Experience7_Feed } from './components/Experience7_Feed';

const App: React.FC = () => {
  const [step, setStep] = React.useState<FunnelStep>(FunnelStep.WELCOME);
  return (
    <div className="min-h-screen bg-black">
      {step === FunnelStep.WELCOME && <Experience0_Welcome onComplete={() => setStep(FunnelStep.INSTA_LOGIN)} onSkipToSales={() => {}} />}
      {step === FunnelStep.INSTA_LOGIN && <Experience6_InstaLogin onComplete={() => setStep(FunnelStep.FEED)} />}
      {step === FunnelStep.FEED && <Experience7_Feed onComplete={() => {}} />}
    </div>
  );
};
export default App;
