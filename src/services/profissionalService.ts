import api from '../config/api';
import type { Profissional } from '../types';

export const profissionalService = {
  // Listar todos os profissionais
  listarTodos: async (): Promise<Profissional[]> => {
    const response = await api.get<Profissional[]>('/profissionais');
    return response.data;
  },

  // Listar apenas profissionais ativos
  listarAtivos: async (): Promise<Profissional[]> => {
    const response = await api.get<Profissional[]>('/profissionais/ativos');
    return response.data;
  },

  // Buscar profissional por ID
  buscarPorId: async (id: number): Promise<Profissional> => {
    const response = await api.get<Profissional>(`/profissionais/${id}`);
    return response.data;
  },

  // Buscar profissional por email
  buscarPorEmail: async (email: string): Promise<Profissional> => {
    const response = await api.get<Profissional>(`/profissionais/email/${email}`);
    return response.data;
  },

  // Buscar por especialidade
  buscarPorEspecialidade: async (especialidade: string): Promise<Profissional[]> => {
    const response = await api.get<Profissional[]>(`/profissionais/especialidade/${especialidade}`);
    return response.data;
  },
  
  // Buscar com filtros combinados
  buscarComFiltros: async (especialidade?: string, filtro?: string): Promise<Profissional[]> => {
    const response = await api.get<Profissional[]>('/profissionais/buscar', {
      params: { especialidade, filtro }
    });
    return response.data;
  },

  // Criar novo profissional
  criar: async (profissional: Omit<Profissional, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Profissional> => {
    const response = await api.post<Profissional>('/profissionais', profissional);
    return response.data;
  },

  // Atualizar profissional
  atualizar: async (id: number, profissional: Omit<Profissional, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<Profissional> => {
    const response = await api.put<Profissional>(`/profissionais/${id}`, profissional);
    return response.data;
  },

  // Ativar/Desativar profissional
  ativarDesativar: async (id: number, ativo: boolean): Promise<Profissional> => {
    const response = await api.patch<Profissional>(`/profissionais/${id}/ativo`, null, {
      params: { ativo },
    });
    return response.data;
  },

  // Deletar profissional
  deletar: async (id: number): Promise<void> => {
    await api.delete(`/profissionais/${id}`);
  },
};
