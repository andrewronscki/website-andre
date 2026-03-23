import { useState } from 'react';
import ToolsLayout from '@/components/ToolsLayout';
import { generateCNPJ, validateCNPJ } from '@/lib/br-ids';

function unmask(v: string) {
  return v.replace(/\D/g, '');
}

function maskCNPJ(v: string) {
  if (v.length !== 14) return v;
  return v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export default function CNPJGenerator() {
  const [cnpjRaw, setCnpjRaw] = useState('');
  const [formatted, setFormatted] = useState(true);

  const gen = () => setCnpjRaw(unmask(generateCNPJ()));
  const isValid = cnpjRaw ? validateCNPJ(cnpjRaw) : null;

  const copy = async () => {
    const display = formatted ? maskCNPJ(cnpjRaw) : cnpjRaw;
    if (display) await navigator.clipboard.writeText(display);
  };

  return (
    <ToolsLayout>
      <p className="text-sm opacity-60">
        Gera CNPJs matematicamente válidos para uso em testes e QA. Não utilize
        em situações reais.
      </p>

      <div className="card bg-base-200 border border-base-300">
        <div className="card-body flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <button type="button" className="btn btn-primary rounded-lg" onClick={gen}>
              Gerar CNPJ
            </button>
            <button
              type="button"
              className="btn rounded-lg"
              onClick={copy}
              disabled={!cnpjRaw}
            >
              Copiar
            </button>
            <label className="label cursor-pointer gap-2">
              <span>Formatado</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={formatted}
                onChange={() => setFormatted(!formatted)}
              />
            </label>
          </div>

          <input
            className="input input-bordered font-mono text-sm w-full"
            readOnly
            value={formatted ? maskCNPJ(cnpjRaw) : cnpjRaw}
            placeholder="00.000.000/0000-00"
          />

          {isValid !== null && (
            <div className={`badge badge-lg ${isValid ? 'badge-success' : 'badge-error'}`}>
              {isValid ? '✓ Válido' : '✗ Inválido'}
            </div>
          )}

          <p className="text-xs opacity-50">
            Gerado para <strong>testes</strong>. Não utilize dados reais sem
            consentimento.
          </p>
        </div>
      </div>
    </ToolsLayout>
  );
}
