import { useState } from 'react';
import ToolsLayout from '@/components/ToolsLayout';

function b64urlToStr(b64url: string) {
  try {
    const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(
      b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), '=')
    );
    return decodeURIComponent(escape(json));
  } catch {
    return '';
  }
}

export default function JWTDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState<string | null>(null);

  const decode = () => {
    setError(null);
    const parts = token.split('.');
    if (parts.length < 2) {
      setError('Token JWT inválido — esperado formato: header.payload.signature');
      return;
    }
    const h = b64urlToStr(parts[0]);
    const p = b64urlToStr(parts[1]);
    try {
      setHeader(JSON.stringify(JSON.parse(h), null, 2));
    } catch {
      setHeader(h);
    }
    try {
      setPayload(JSON.stringify(JSON.parse(p), null, 2));
    } catch {
      setPayload(p);
    }
  };

  return (
    <ToolsLayout>
      <p className="text-sm opacity-60">
        Decodifica o header e payload de um token JWT localmente.{' '}
        <strong>Não valida a assinatura.</strong> Nenhum dado é enviado.
      </p>

      <div className="flex flex-col gap-3">
        <div>
          <label className="label text-xs opacity-50 uppercase tracking-wider">
            Token JWT
          </label>
          <textarea
            className="textarea textarea-bordered h-32 font-mono text-sm w-full"
            placeholder="Cole aqui seu token JWT (eyJ...)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-primary rounded-lg"
            onClick={decode}
          >
            Decodificar
          </button>
          <button
            type="button"
            className="btn rounded-lg"
            onClick={() => payload && navigator.clipboard.writeText(payload)}
            disabled={!payload}
          >
            Copiar payload
          </button>
        </div>

        {error && (
          <div className="alert alert-error text-sm">{error}</div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label text-xs opacity-50 uppercase tracking-wider">
              Header
            </label>
            <textarea
              className="textarea textarea-bordered h-52 font-mono text-sm w-full"
              readOnly
              value={header}
              placeholder="{ ... }"
            />
          </div>
          <div>
            <label className="label text-xs opacity-50 uppercase tracking-wider">
              Payload
            </label>
            <textarea
              className="textarea textarea-bordered h-52 font-mono text-sm w-full"
              readOnly
              value={payload}
              placeholder="{ ... }"
            />
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
