import { useState } from 'react';
import ToolsLayout from '@/components/ToolsLayout';

export default function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [useSymbols, setUseSymbols] = useState(true);
  const [pwd, setPwd] = useState('');

  const gen = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = lower.toUpperCase();
    const digits = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';
    const pool = lower + upper + digits + (useSymbols ? symbols : '');
    const arr = Array.from(crypto.getRandomValues(new Uint32Array(len))).map(
      (n) => pool[n % pool.length]
    );
    setPwd(arr.join(''));
  };

  return (
    <ToolsLayout>
      <p className="text-sm opacity-60">
        Geração criptograficamente segura usando{' '}
        <code className="font-mono text-primary">crypto.getRandomValues</code>.
        Nenhum dado sai do seu navegador.
      </p>

      <div className="card bg-base-200 border border-base-300">
        <div className="card-body flex flex-col gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label htmlFor="pwd-len" className="label">
                Tamanho
              </label>
              <input
                id="pwd-len"
                className="input input-bordered w-24"
                type="number"
                min={6}
                max={128}
                value={len}
                onChange={(e) => setLen(Number(e.target.value))}
              />
            </div>
            <label className="label cursor-pointer gap-2">
              <span>Incluir símbolos</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={useSymbols}
                onChange={() => setUseSymbols(!useSymbols)}
              />
            </label>
            <button type="button" className="btn btn-primary rounded-lg" onClick={gen}>
              Gerar
            </button>
            <button
              type="button"
              className="btn rounded-lg"
              onClick={() => pwd && navigator.clipboard.writeText(pwd)}
              disabled={!pwd}
            >
              Copiar
            </button>
          </div>
          <input
            className="input input-bordered font-mono text-sm w-full"
            readOnly
            value={pwd}
            placeholder="A senha gerada aparecerá aqui..."
          />
        </div>
      </div>
    </ToolsLayout>
  );
}
