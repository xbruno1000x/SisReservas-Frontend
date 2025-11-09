import { useState, useEffect } from 'react';
import { clienteService } from '../services/clienteService';
import type { Cliente } from '../types';
import { formatarTelefone, aplicarMascaraTelefone, formatarDataHora } from '../utils/formatters';
import './Clientes.css';

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [filtro, setFiltro] = useState<string>('');
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
  });

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const data = await clienteService.listarTodos();
      setClientes(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const buscarComFiltro = async () => {
    if (!filtro.trim()) {
      await carregarClientes();
      return;
    }
    
    try {
      setLoading(true);
      const data = await clienteService.buscarPorFiltro(filtro);
      setClientes(data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      buscarComFiltro();
    }, 500); // Debounce de 500ms
    
    return () => clearTimeout(timer);
  }, [filtro]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        await clienteService.atualizar(editingCliente.id!, formData);
      } else {
        await clienteService.criar(formData);
      }
      await carregarClientes();
      resetForm();
    } catch (err) {
      setError('Erro ao salvar cliente');
      console.error(err);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email,
    });
    setShowForm(true);
    // Scroll suave até o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await clienteService.deletar(id);
        await carregarClientes();
      } catch (err) {
        setError('Erro ao excluir cliente');
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', telefone: '', email: '' });
    setEditingCliente(null);
    setShowForm(false);
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="clientes-container">
      <div className="header">
        <h1>Gerenciamento de Clientes</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Novo Cliente'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filtros">
        <div className="form-group">
          <label htmlFor="filtro-busca">Buscar:</label>
          <input
            type="text"
            id="filtro-busca"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Digite nome, email ou telefone..."
            className="filtro-input"
          />
        </div>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{editingCliente ? 'Editar Cliente' : 'Novo Cliente'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                maxLength={100}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="tel"
                id="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: aplicarMascaraTelefone(e.target.value) })}
                required
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
                required
                maxLength={100}
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn btn-success">
                {editingCliente ? 'Atualizar' : 'Salvar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Criado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-message">
                  Nenhum cliente cadastrado
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{formatarTelefone(cliente.telefone)}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.criadoEm ? formatarDataHora(cliente.criadoEm) : '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-edit" onClick={() => handleEdit(cliente)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(cliente.id!)}>
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

export default Clientes;
