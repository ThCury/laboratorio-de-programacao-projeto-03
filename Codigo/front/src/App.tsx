import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AlunoPage } from './pages/AlunoPage';
import { EmpresaPage } from './pages/EmpresaPage';
import { InstituicaoPage } from './pages/InstituicaoPage';
import { ProfessorPage } from './pages/ProfessorPage';
import { VantagemPage } from './pages/VantagemPage';
import { TransacaoPage } from './pages/TransacaoPage';  // import da página de transações

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal" selectable={false}>
          <Menu.Item key="alunos">
            <Link to="/alunos">Alunos</Link>
          </Menu.Item>
          <Menu.Item key="empresas">
            <Link to="/empresas">Empresas</Link>
          </Menu.Item>
          <Menu.Item key="instituicao">
            <Link to="/instituicao">Instituição</Link>
          </Menu.Item>
          <Menu.Item key="professores">
            <Link to="/professores">Professores</Link>
          </Menu.Item>
          <Menu.Item key="transacoes">
            <Link to="/transacoes">Transações</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<TransacaoPage />} />
          <Route path="/alunos" element={<AlunoPage />} />
          <Route path="/empresas" element={<EmpresaPage />} />
          <Route path="/empresas/:empresaId/vantagens" element={<VantagemPage />} />
          <Route path="/instituicao" element={<InstituicaoPage />} />
          <Route path="/professores" element={<ProfessorPage />} />
          <Route path="/transacoes" element={<TransacaoPage />} /> 
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
