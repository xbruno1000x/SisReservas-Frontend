import api from '../config/api';
import { StatusReserva } from '../types';
import type { Reserva, ReservaForm } from '../types';

export const reservaService = {
  // Listar todas as reservas
  listarTodas: async (): Promise<Reserva[]> => {
    const response = await api.get<Reserva[]>('/reservas');
    return response.data;
  },

  // Buscar reserva por ID
  buscarPorId: async (id: number): Promise<Reserva> => {
    const response = await api.get<Reserva>(`/reservas/${id}`);
    return response.data;
  },

  // Buscar reservas por cliente
  buscarPorCliente: async (clienteId: number): Promise<Reserva[]> => {
    const response = await api.get<Reserva[]>(`/reservas/cliente/${clienteId}`);
    return response.data;
  },

  // Buscar reservas por profissional
  buscarPorProfissional: async (profissionalId: number): Promise<Reserva[]> => {
    const response = await api.get<Reserva[]>(`/reservas/profissional/${profissionalId}`);
    return response.data;
  },

  // Buscar reservas por data
  buscarPorData: async (data: string): Promise<Reserva[]> => {
    const response = await api.get<Reserva[]>(`/reservas/data/${data}`);
    return response.data;
  },

  // Buscar reservas por status
  buscarPorStatus: async (status: StatusReserva): Promise<Reserva[]> => {
    const response = await api.get<Reserva[]>(`/reservas/status/${status}`);
    return response.data;
  },

  // Buscar reservas por período
  buscarPorPeriodo: async (dataInicio: string, dataFim: string): Promise<Reserva[]> => {
    const response = await api.get<Reserva[]>('/reservas/periodo', {
      params: { dataInicio, dataFim },
    });
    return response.data;
  },

  // Criar nova reserva
  criar: async (reservaForm: ReservaForm): Promise<Reserva> => {
    const reservaPayload = {
      cliente: { id: reservaForm.clienteId },
      profissional: { id: reservaForm.profissionalId },
      data: reservaForm.data,
      hora: reservaForm.hora,
      observacoes: reservaForm.observacoes,
    };
    const response = await api.post<Reserva>('/reservas', reservaPayload);
    return response.data;
  },

  // Atualizar reserva
  atualizar: async (id: number, reservaForm: ReservaForm): Promise<Reserva> => {
    const reservaPayload = {
      cliente: { id: reservaForm.clienteId },
      profissional: { id: reservaForm.profissionalId },
      data: reservaForm.data,
      hora: reservaForm.hora,
      observacoes: reservaForm.observacoes,
    };
    const response = await api.put<Reserva>(`/reservas/${id}`, reservaPayload);
    return response.data;
  },

  // Atualizar status da reserva
  atualizarStatus: async (id: number, status: StatusReserva): Promise<Reserva> => {
    const response = await api.patch<Reserva>(`/reservas/${id}/status`, null, {
      params: { status },
    });
    return response.data;
  },

  // Deletar reserva
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/reservas/${id}`);
  },
};
