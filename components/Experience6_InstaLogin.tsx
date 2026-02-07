
import React from 'react';
import { Instagram } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export const Experience6_InstaLogin: React.FC<Props> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xs flex flex-col items-center gap-8">
        <h1 className="text-4xl font-serif italic text-neutral-800">Instagram</h1>
        <div className="w-full space-y-3">
          <input type="text" placeholder="Usuario, teléfono o correo" defaultValue="EJECUTOR_8M" className="w-full p-3 bg-neutral-50 border rounded text-sm outline-none" readOnly />
          <input type="password" placeholder="Contraseña" defaultValue="BIENESTAR_REAL" className="w-full p-3 bg-neutral-50 border rounded text-sm outline-none" readOnly />
          <button onClick={onComplete} className="w-full py-2 bg-[#0095f6] text-white font-bold rounded text-sm">Entrar al archivo privado</button>
        </div>
      </div>
    </div>
  );
};
