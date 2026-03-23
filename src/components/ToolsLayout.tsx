import Link from 'next/link';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

const tools = [
  { label: 'Gerador de UUID', href: '/tools/uuid-generator' },
  { label: 'Gerador de CPF válido', href: '/tools/cpf-generator' },
  { label: 'Gerador de CNPJ válido', href: '/tools/cnpj-generator' },
  { label: 'JSON → String', href: '/tools/json-to-string' },
  { label: 'String → JSON', href: '/tools/string-to-json' },
  { label: 'Gerador de Senha', href: '/tools/password-generator' },
  { label: 'Leitor de JWT', href: '/tools/jwt-decoder' },
];

const titleMap: Record<string, string> = {
  '/tools': 'Ferramentas para Devs',
  '/tools/uuid-generator': 'Gerador de UUID v4',
  '/tools/cpf-generator': 'Gerador de CPF válido',
  '/tools/cnpj-generator': 'Gerador de CNPJ válido',
  '/tools/json-to-string': 'JSON → String',
  '/tools/string-to-json': 'String → JSON',
  '/tools/password-generator': 'Gerador de Senha',
  '/tools/jwt-decoder': 'Leitor de JWT',
};

function Sidebar({ onClose }: { onClose?: () => void }) {
  const { pathname } = useRouter();
  const active = 'bg-primary text-white';

  return (
    <div className="flex w-72 flex-col h-full border-r border-base-300 bg-base-200 p-4">
      <div className="flex items-center justify-between h-16 border-b border-base-300 mb-4 pb-4">
        <Link
          href="/tools"
          className="flex items-center gap-1"
          onClick={onClose}
        >
          <span className="text-xl font-extrabold text-primary tracking-tight">{'<'}dev</span>
          <span className="text-xl font-extrabold text-base-content tracking-tight">tools{'>'}</span>
        </Link>
        {onClose && (
          <button
            type="button"
            className="btn btn-ghost btn-sm lg:hidden"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <ul className="menu w-full p-0 gap-1">
        <li className="menu-title text-xs uppercase tracking-widest opacity-50">Ferramentas</li>
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              onClick={onClose}
              className={clsx(
                'rounded-lg text-sm',
                pathname === tool.href ? active : 'hover:bg-base-300'
              )}
            >
              {tool.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-base-300">
        <Link href="/" className="text-xs text-base-content opacity-50 hover:opacity-100 transition">
          ← Voltar ao portfólio
        </Link>
      </div>
    </div>
  );
}

export default function ToolsLayout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();
  const title = titleMap[pathname] ?? 'Devtools';
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <div data-theme="devtools" className="min-h-screen flex bg-base-100 text-base-content">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-72 min-h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="relative z-50 flex flex-col w-72 min-h-screen">
            <Sidebar onClose={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="flex items-center h-16 border-b border-base-300 bg-base-200 px-4 gap-3 sticky top-0 z-30">
          <button
            type="button"
            className="btn btn-ghost btn-sm lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">{title}</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 flex flex-col gap-4 max-w-4xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-base-300 px-6 py-4 text-xs opacity-50">
          <p>© {new Date().getFullYear()} André Wronscki · Ferramentas para devs</p>
        </footer>
      </div>
    </div>
  );
}
