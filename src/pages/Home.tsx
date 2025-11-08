import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Bem-vindo ao SisReservas</h1>
        <p className="subtitle">Sistema de Gerenciamento de Reservas</p>
        <p className="description">
          Gerencie seus clientes e reservas de forma simples e eficiente
        </p>
      </div>

      <div className="cards-container">
        <div className="card">
          <div className="card-icon">👥</div>
          <h2>Clientes</h2>
          <p>Cadastre e gerencie informações de seus clientes</p>
          <Link to="/clientes" className="card-button">
            Gerenciar Clientes
          </Link>
        </div>

        <div className="card">
          <div className="card-icon">🧑‍🎓</div>
          <h2>Profissionais</h2>
          <p>Gerencie sua equipe de profissionais e especialidades</p>
          <Link to="/profissionais" className="card-button">
            Gerenciar Profissionais
          </Link>
        </div>

        <div className="card">
          <div className="card-icon">📅</div>
          <h2>Reservas</h2>
          <p>Agende e controle suas reservas de forma organizada</p>
          <Link to="/reservas" className="card-button">
            Gerenciar Reservas
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Recursos do Sistema</h2>
        <div className="features-grid">
          <div className="feature">
            <span className="feature-icon">✓</span>
            <h3>Cadastro de Clientes</h3>
            <p>Armazene informações completas dos clientes</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <h3>Equipe Profissional</h3>
            <p>Gerencie profissionais e suas especialidades</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <h3>Agendamento</h3>
            <p>Sistema de reservas por data e horário</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <h3>Status de Reservas</h3>
            <p>Controle o status: Pendente, Confirmada, Cancelada, Concluída</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <h3>Consultas Avançadas</h3>
            <p>Busque por cliente, data, período ou status</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <h3>Controle de Ativos</h3>
            <p>Ative ou desative profissionais conforme necessário</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
