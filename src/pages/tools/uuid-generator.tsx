import { useState } from 'react';
import ToolsLayout from '@/components/ToolsLayout';

export default function UUIDGenerator() {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(1);

  const gen = () => {
    const list = Array.from({ length: count }, () => crypto.randomUUID());
    setValue(list.join('\n'));
  };

  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
  };

  return (
    <ToolsLayout>
      <p className="text-sm opacity-60">
        Gere UUIDs v4 usando a Web Crypto API do navegador. Nenhum dado é
        enviado para servidores.
      </p>

      <div className="card bg-base-200 border border-base-300">
        <div className="card-body flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <label className="label" htmlFor="uuid-count">
              Quantidade
            </label>
            <input
              id="uuid-count"
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={(e) =>
                setCount(Math.min(1000, Math.max(1, Number(e.target.value))))
              }
              className="input input-bordered w-28"
            />
            <button type="button" className="btn btn-primary rounded-lg" onClick={gen}>
              Gerar
            </button>
            <button
              type="button"
              className="btn rounded-lg"
              onClick={copy}
              disabled={!value}
            >
              Copiar
            </button>
          </div>
          <textarea
            className="textarea textarea-bordered h-64 font-mono text-sm"
            readOnly
            value={value}
            placeholder="Os UUIDs gerados aparecerão aqui..."
          />
        </div>
      </div>
    </ToolsLayout>
  );
}
