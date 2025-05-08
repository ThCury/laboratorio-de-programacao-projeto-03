import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AlunoPage } from './pages/AlunoPage';
import { EmpresaPage } from './pages/EmpresaPage';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="alunos">
            <Link to="/alunos">Alunos</Link>
          </Menu.Item>
          <Menu.Item key="empresas">
            <Link to="/empresas">Empresas</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<h1>Bem-vindo ao sistema</h1>} />
          <Route path="/alunos" element={<AlunoPage />} />
          <Route path="/empresas" element={<EmpresaPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
