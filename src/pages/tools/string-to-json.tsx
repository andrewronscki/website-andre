import { useState } from 'react';
import ToolsLayout from '@/components/ToolsLayout';

export default function StringToJson() {
  const [input, setInput] = useState('"{\\"hello\\": \\"world\\"}"');
  const [output, setOutput] = useState('');

  const run = () => {
    try {
      const str = JSON.parse(input);
      const obj = JSON.parse(str);
      setOutput(JSON.stringify(obj, null, 2));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setOutput(`Erro: ${message}`);
    }
  };

  return (
    <ToolsLayout>
      <p className="text-sm opacity-60">
        Converte uma string JSON escapada de volta para JSON formatado e
        legível, com validação e mensagem de erro clara.
      </p>

      <div className="flex flex-col gap-3">
        <div>
          <label className="label text-xs opacity-50 uppercase tracking-wider">
            String de entrada
          </label>
          <textarea
            className="textarea textarea-bordered h-48 font-mono text-sm w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='"{\\"chave\\": \\"valor\\"}"'
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
            JSON formatado
          </label>
          <textarea
            className="textarea textarea-bordered h-48 font-mono text-sm w-full"
            readOnly
            value={output}
            placeholder="O JSON formatado aparecerá aqui..."
          />
        </div>
      </div>
    </ToolsLayout>
  );
}
