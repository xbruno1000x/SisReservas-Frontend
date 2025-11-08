import { useState, useEffect } from 'react';
import { reservaService } from '../services/reservaService';
import { clienteService } from '../services/clienteService';
import { profissionalService } from '../services/profissionalService';
import { StatusReserva } from '../types';
import type { Reserva, Cliente, Profissional, ReservaForm } from '../types';
import { formatarData } from '../utils/formatters';
import './Reservas.css';

const Reservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingReserva, setEditingReserva] = useState<Reserva | null>(null);
  const [formData, setFormData] = useState<ReservaForm>({
    clienteId: 0,
    profissionalId: 0,
    data: '',
    hora: '',
    observacoes: '',
  });
  const [filtroStatus, setFiltroStatus] = useState<string>('TODAS');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [reservasData, clientesData, profissionaisData] = await Promise.all([
        reservaService.listarTodas(),
        clienteService.listarTodos(),
        profissionalService.listarAtivos(),
      ]);
      setReservas(reservasData);
      setClientes(clientesData);
      setProfissionais(profissionaisData);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingReserva) {
        await reservaService.atualizar(editingReserva.id!, formData);
      } else {
        await reservaService.criar(formData);
      }
      await carregarDados();
      resetForm();
    } catch (err) {
      setError('Erro ao salvar reserva');
      console.error(err);
    }
  };

  const handleEdit = (reserva: Reserva) => {
    setEditingReserva(reserva);
    setFormData({
      clienteId: reserva.cliente.id!,
      profissionalId: reserva.profissional.id!,
      data: reserva.data,
      hora: reserva.hora,
      observacoes: reserva.observacoes || '',
    });
    setShowForm(true);
    // Scroll suave até o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta reserva?')) {
      try {
        await reservaService.deletar(id);
        await carregarDados();
      } catch (err) {
        setError('Erro ao excluir reserva');
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id: number, novoStatus: StatusReserva) => {
    try {
      await reservaService.atualizarStatus(id, novoStatus);
      await carregarDados();
    } catch (err) {
      setError('Erro ao atualizar status');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({ clienteId: 0, profissionalId: 0, data: '', hora: '', observacoes: '' });
    setEditingReserva(null);
    setShowForm(false);
  };

  const reservasFiltradas = filtroStatus === 'TODAS' 
    ? reservas 
    : reservas.filter(r => r.status === filtroStatus);

  const getStatusClass = (status: StatusReserva) => {
    switch (status) {
      case StatusReserva.PENDENTE:
        return 'status-pendente';
      case StatusReserva.CONFIRMADA:
        return 'status-confirmada';
      case StatusReserva.CANCELADA:
        return 'status-cancelada';
      case StatusReserva.CONCLUIDA:
        return 'status-concluida';
      default:
        return '';
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="reservas-container">
      <div className="header">
        <h1>Gerenciamento de Reservas</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Nova Reserva'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filtros">
        <label htmlFor="filtro-status">Filtrar por Status:</label>
        <select 
          id="filtro-status"
          value={filtroStatus} 
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="filtro-select"
        >
          <option value="TODAS">Todas</option>
          <option value="PENDENTE">Pendente</option>
          <option value="CONFIRMADA">Confirmada</option>
          <option value="CANCELADA">Cancelada</option>
          <option value="CONCLUIDA">Concluída</option>
        </select>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{editingReserva ? 'Editar Reserva' : 'Nova Reserva'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cliente">Cliente:</label>
              <select
                id="cliente"
                value={formData.clienteId}
                onChange={(e) => setFormData({ ...formData, clienteId: Number(e.target.value) })}
                required
              >
                <option value="0">Selecione um cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome} - {cliente.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="profissional">Profissional:</label>
              <select
                id="profissional"
                value={formData.profissionalId}
                onChange={(e) => setFormData({ ...formData, profissionalId: Number(e.target.value) })}
                required
              >
                <option value="0">Selecione um profissional</option>
                {profissionais.map((profissional) => (
                  <option key={profissional.id} value={profissional.id}>
                    {profissional.nome} - {profissional.especialidade}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="data">Data:</label>
                <input
                  type="date"
                  id="data"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="hora">Hora:</label>
                <input
                  type="time"
                  id="hora"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="observacoes">Observações:</label>
              <textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                maxLength={500}
                rows={4}
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn btn-success">
                {editingReserva ? 'Atualizar' : 'Salvar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="reservas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Profissional</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Status</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-message">
                  Nenhuma reserva encontrada
                </td>
              </tr>
            ) : (
              reservasFiltradas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.cliente.nome}</td>
                  <td>
                    <span className="profissional-info">
                      {reserva.profissional.nome}
                      <span className="especialidade-badge">{reserva.profissional.especialidade}</span>
                    </span>
                  </td>
                  <td>{formatarData(reserva.data)}</td>
                  <td>{reserva.hora}</td>
                  <td>
                    <select
                      value={reserva.status}
                      onChange={(e) => handleStatusChange(reserva.id!, e.target.value as StatusReserva)}
                      className={`status-select ${getStatusClass(reserva.status)}`}
                    >
                      <option value="PENDENTE">Pendente</option>
                      <option value="CONFIRMADA">Confirmada</option>
                      <option value="CANCELADA">Cancelada</option>
                      <option value="CONCLUIDA">Concluída</option>
                    </select>
                  </td>
                  <td className="observacoes-cell">{reserva.observacoes || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-edit" onClick={() => handleEdit(reserva)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(reserva.id!)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservas;
