import api from '../config/api';
import type { Cliente } from '../types';

export const clienteService = {
  // Listar todos os clientes
  listarTodos: async (): Promise<Cliente[]> => {
    const response = await api.get<Cliente[]>('/clientes');
    return response.data;
  },

  // Buscar cliente por ID
  buscarPorId: async (id: number): Promise<Cliente> => {
    const response = await api.get<Cliente>(`/clientes/${id}`);
    return response.data;
  },

  // Buscar cliente por email
  buscarPorEmail: async (email: string): Promise<Cliente> => {
    const response = await api.get<Cliente>(`/clientes/email/${email}`);
    return response.data;
  },

  // Criar novo cliente
  criar: async (cliente: Omit<Cliente, 'id' | 'criadoEm'>): Promise<Cliente> => {
    const response = await api.post<Cliente>('/clientes', cliente);
    return response.data;
  },

  // Atualizar cliente
  atualizar: async (id: number, cliente: Omit<Cliente, 'id' | 'criadoEm'>): Promise<Cliente> => {
    const response = await api.put<Cliente>(`/clientes/${id}`, cliente);
    return response.data;
  },

  // Deletar cliente
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/clientes/${id}`);
  },
};
