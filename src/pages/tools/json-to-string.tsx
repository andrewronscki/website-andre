import { useState } from 'react';
import ToolsLayout from '@/components/ToolsLayout';

export default function JsonToString() {
  const [input, setInput] = useState('{\n  "hello": "world"\n}');
  const [output, setOutput] = useState('');

  const run = () => {
    try {
      const obj = JSON.parse(input);
      const jsonAsString = JSON.stringify(obj);
      setOutput(JSON.stringify(jsonAsString));
    } catch (e: unknown) {
      if (e instanceof Error) setOutput(`Erro: ${e.message}`);
      else setOutput('Erro desconhecido');
    }
  };

  return (
    <ToolsLayout>
      <p className="text-sm opacity-60">
        Converte um objeto JSON em uma string escapada (uma linha), útil para
        variáveis de ambiente e payloads.
      </p>

      <div className="flex flex-col gap-3">
        <div>
          <label className="label text-xs opacity-50 uppercase tracking-wider">
            JSON de entrada
          </label>
          <textarea
            className="textarea textarea-bordered h-48 font-mono text-sm w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{ "chave": "valor" }'
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-primary rounded-lg"
            onClick={run}
          >
            Converter
          </button>
          <button
            type="button"
            className="btn rounded-lg"
            onClick={() => output && navigator.clipboard.writeText(output)}
            disabled={!output}
          >
            Copiar resultado
          </button>
        </div>

        <div>
          <label className="label text-xs opacity-50 uppercase tracking-wider">
            String de saída
          </label>
          <textarea
            className="textarea textarea-bordered h-48 font-mono text-sm w-full"
            readOnly
            value={output}
            placeholder="O resultado aparecerá aqui..."
          />
        </div>
      </div>
    </ToolsLayout>
  );
}
