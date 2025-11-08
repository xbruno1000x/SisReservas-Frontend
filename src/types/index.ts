// Tipos para Cliente
export interface Cliente {
  id?: number;
  nome: string;
  telefone: string;
  email: string;
  criadoEm?: string;
}

// Tipos para Profissional
export interface Profissional {
  id?: number;
  nome: string;
  especialidade: string;
  telefone?: string;
  email?: string;
  ativo: boolean;
  criadoEm?: string;
  atualizadoEm?: string;
}

// Tipos para Reserva - usando const objeto ao invés de enum
export const StatusReserva = {
  PENDENTE: 'PENDENTE',
  CONFIRMADA: 'CONFIRMADA',
  CANCELADA: 'CANCELADA',
  CONCLUIDA: 'CONCLUIDA'
} as const;

export type StatusReserva = typeof StatusReserva[keyof typeof StatusReserva];

export interface Reserva {
  id?: number;
  cliente: Cliente;
  profissional: Profissional;
  data: string; // formato: YYYY-MM-DD
  hora: string; // formato: HH:mm
  observacoes?: string;
  status: StatusReserva;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface ReservaForm {
  clienteId: number;
  profissionalId: number;
  data: string;
  hora: string;
  observacoes?: string;
}
