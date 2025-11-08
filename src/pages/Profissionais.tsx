import { useState, useEffect } from 'react';
import { profissionalService } from '../services/profissionalService';
import type { Profissional } from '../types';
import { formatarTelefone, aplicarMascaraTelefone, formatarDataHora } from '../utils/formatters';
import './Profissionais.css';

const Profissionais = () => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProfissional, setEditingProfissional] = useState<Profissional | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    especialidade: '',
    telefone: '',
    email: '',
    ativo: true,
  });
  const [filtroAtivo, setFiltroAtivo] = useState<string>('TODOS');

  useEffect(() => {
    carregarProfissionais();
  }, []);

  const carregarProfissionais = async () => {
    try {
      setLoading(true);
      const data = await profissionalService.listarTodos();
      setProfissionais(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar profissionais');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProfissional) {
        await profissionalService.atualizar(editingProfissional.id!, formData);
      } else {
        await profissionalService.criar(formData);
      }
      await carregarProfissionais();
      resetForm();
    } catch (err) {
      setError('Erro ao salvar profissional');
      console.error(err);
    }
  };

  const handleEdit = (profissional: Profissional) => {
    setEditingProfissional(profissional);
    setFormData({
      nome: profissional.nome,
      especialidade: profissional.especialidade,
      telefone: profissional.telefone || '',
      email: profissional.email || '',
      ativo: profissional.ativo,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este profissional?')) {
      try {
        await profissionalService.deletar(id);
        await carregarProfissionais();
      } catch (err) {
        setError('Erro ao excluir profissional');
        console.error(err);
      }
    }
  };

  const handleToggleAtivo = async (id: number, ativo: boolean) => {
    try {
      await profissionalService.ativarDesativar(id, !ativo);
      await carregarProfissionais();
    } catch (err) {
      setError('Erro ao alterar status do profissional');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', especialidade: '', telefone: '', email: '', ativo: true });
    setEditingProfissional(null);
    setShowForm(false);
  };

  const profissionaisFiltrados = filtroAtivo === 'TODOS' 
    ? profissionais 
    : profissionais.filter(p => p.ativo === (filtroAtivo === 'ATIVOS'));

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="profissionais-container">
      <div className="header">
        <h1>Gerenciamento de Profissionais</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Novo Profissional'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filtros">
        <label htmlFor="filtro-ativo">Filtrar:</label>
        <select 
          id="filtro-ativo"
          value={filtroAtivo} 
          onChange={(e) => setFiltroAtivo(e.target.value)}
          className="filtro-select"
        >
          <option value="TODOS">Todos</option>
          <option value="ATIVOS">Ativos</option>
          <option value="INATIVOS">Inativos</option>
        </select>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{editingProfissional ? 'Editar Profissional' : 'Novo Profissional'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome: *</label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                maxLength={100}
                placeholder="Nome do profissional"
              />
            </div>
            <div className="form-group">
              <label htmlFor="especialidade">Especialidade: *</label>
              <input
                type="text"
                id="especialidade"
                value={formData.especialidade}
                onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
                required
                maxLength={50}
                placeholder="Ex: Barbeiro, Manicure, Cabeleireiro"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="tel"
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: aplicarMascaraTelefone(e.target.value) })}
                  maxLength={15}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  maxLength={100}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.ativo}
                  onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                />
                <span>Profissional ativo</span>
              </label>
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn btn-success">
                {editingProfissional ? 'Atualizar' : 'Salvar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="profissionais-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Criado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {profissionaisFiltrados.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-message">
                  Nenhum profissional encontrado
                </td>
              </tr>
            ) : (
              profissionaisFiltrados.map((profissional) => (
                <tr key={profissional.id} className={!profissional.ativo ? 'profissional-inativo' : ''}>
                  <td>{profissional.id}</td>
                  <td>{profissional.nome}</td>
                  <td>
                    <span className="especialidade-badge">
                      {profissional.especialidade}
                    </span>
                  </td>
                  <td>{profissional.telefone ? formatarTelefone(profissional.telefone) : '-'}</td>
                  <td>{profissional.email || '-'}</td>
                  <td>
                    <button
                      className={`status-badge ${profissional.ativo ? 'status-ativo' : 'status-inativo'}`}
                      onClick={() => handleToggleAtivo(profissional.id!, profissional.ativo)}
                      title={profissional.ativo ? 'Clique para desativar' : 'Clique para ativar'}
                    >
                      {profissional.ativo ? '✓ Ativo' : '✗ Inativo'}
                    </button>
                  </td>
                  <td>{profissional.criadoEm ? formatarDataHora(profissional.criadoEm) : '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-edit" onClick={() => handleEdit(profissional)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(profissional.id!)}>
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

export default Profissionais;
