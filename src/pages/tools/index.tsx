import Link from 'next/link';
import ToolsLayout from '@/components/ToolsLayout';

const tools = [
  {
    title: 'Gerador de UUID',
    description: 'Gere UUID v4 instantaneamente, em lote.',
    href: '/tools/uuid-generator',
    icon: '🔑',
  },
  {
    title: 'Gerador de CPF válido',
    description: 'Crie CPFs válidos para testes (com dígitos verificadores).',
    href: '/tools/cpf-generator',
    icon: '🪪',
  },
  {
    title: 'Gerador de CNPJ válido',
    description: 'Crie CNPJs válidos para QA (com dígitos verificadores).',
    href: '/tools/cnpj-generator',
    icon: '🏢',
  },
  {
    title: 'JSON → String',
    description: 'Escape e serialize JSON para string de uma linha.',
    href: '/tools/json-to-string',
    icon: '📦',
  },
  {
    title: 'String → JSON',
    description: 'Parse de string escapada de volta para JSON formatado.',
    href: '/tools/string-to-json',
    icon: '🔓',
  },
  {
    title: 'Gerador de Senha',
    description: 'Senhas fortes com tamanho e símbolos configuráveis.',
    href: '/tools/password-generator',
    icon: '🔐',
  },
  {
    title: 'Leitor de JWT',
    description: 'Decodifique header e payload de tokens JWT localmente.',
    href: '/tools/jwt-decoder',
    icon: '🔍',
  },
];

export default function ToolsHome() {
  return (
    <ToolsLayout>
      <p className="text-base-content opacity-70 text-sm">
        Utilitários rápidos para o dia a dia de desenvolvimento. Tudo roda
        localmente no seu navegador — sem envio de dados, sem cadastro.
      </p>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="card bg-base-200 border border-base-300 hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="card-body p-5">
              <div className="text-3xl mb-2">{tool.icon}</div>
              <h3 className="card-title text-base group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm opacity-60">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </ToolsLayout>
  );
}
