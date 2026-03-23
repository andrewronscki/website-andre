import { useState } from 'react';
import ToolsLayout from '@/components/ToolsLayout';
import { generateCPF, validateCPF } from '@/lib/br-ids';

function unmask(v: string) {
  return v.replace(/\D/g, '');
}

function maskCPF(v: string) {
  if (v.length !== 11) return v;
  return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export default function CPFGenerator() {
  const [cpfRaw, setCpfRaw] = useState('');
  const [formatted, setFormatted] = useState(true);

  const gen = () => setCpfRaw(unmask(generateCPF()));
  const isValid = cpfRaw ? validateCPF(cpfRaw) : null;

  const copy = async () => {
    const display = formatted ? maskCPF(cpfRaw) : cpfRaw;
    if (display) await navigator.clipboard.writeText(display);
  };

  return (
    <ToolsLayout>
      <p className="text-sm opacity-60">
        Gera CPFs matematicamente válidos para uso em testes e QA. Não utilize
        em situações reais.
      </p>

      <div className="card bg-base-200 border border-base-300">
        <div className="card-body flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <button type="button" className="btn btn-primary rounded-lg" onClick={gen}>
              Gerar CPF
            </button>
            <button
              type="button"
              className="btn rounded-lg"
              onClick={copy}
              disabled={!cpfRaw}
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
            value={formatted ? maskCPF(cpfRaw) : cpfRaw}
            placeholder="000.000.000-00"
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
