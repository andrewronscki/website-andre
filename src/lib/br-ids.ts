// Geração e validação de CPF/CNPJ — executa no client, sem libs externas.

function dvCPF(nums: number[]): number {
  const calc = (arr: number[], multStart: number) => {
    const s = arr.reduce((acc, n, i) => acc + n * (multStart - i), 0);
    const r = s % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const d1 = calc(nums.slice(0, 9), 10);
  const d2 = calc([...nums.slice(0, 9), d1], 11);
  return parseInt(`${d1}${d2}`, 10);
}

export function generateCPF(): string {
  const base = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  const d1d2 = dvCPF(base);
  const d1 = Math.floor(d1d2 / 10);
  const d2 = d1d2 % 10;
  const out = [...base, d1, d2].join("");
  return out.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function validateCPF(cpf: string): boolean {
  const n = cpf.replace(/\D/g, "");
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  const nums = n.split("").map(Number);
  const d1d2 = dvCPF(nums);
  return nums[9] === Math.floor(d1d2 / 10) && nums[10] === d1d2 % 10;
}

function dvCNPJ(nums: number[]): number[] {
  const calc = (arr: number[], mult: number[]) => {
    const s = arr.reduce((acc, n, i) => acc + n * mult[i], 0);
    const r = s % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const m1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const m2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d1 = calc(nums.slice(0, 12), m1);
  const d2 = calc([...nums.slice(0, 12), d1], m2);
  return [d1, d2];
}

export function generateCNPJ(): string {
  const base = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
  const [d1, d2] = dvCNPJ(base);
  const out = [...base, d1, d2].join("");
  return out.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function validateCNPJ(cnpj: string): boolean {
  const n = cnpj.replace(/\D/g, "");
  if (n.length !== 14 || /^(\d)\1{13}$/.test(n)) return false;
  const nums = n.split("").map(Number);
  const [d1, d2] = dvCNPJ(nums);
  return nums[12] === d1 && nums[13] === d2;
}
