import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from 'antd';
import styled from 'styled-components';
import { url } from '../../url';

const Container = styled.div`
  padding: 2rem;
`;

interface Empresa {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
}

export function EmpresaPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [form] = Form.useForm();

  // Função para buscar empresas
  const fetchEmpresas = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/empresa/buscarEmpresas`);
      setEmpresas(res.data);
    } catch (error) {
      message.error('Erro ao buscar empresas.');
    } finally {
      setLoading(false);
    }
  };

  // Carregar as empresas quando o componente for montado
  useEffect(() => {
    fetchEmpresas();
  }, []);

  // Função para abrir o modal de adição
  const handleAdd = () => {
    setEditingEmpresa(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Função para editar empresa
  const handleEdit = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    form.setFieldsValue(empresa);
    setModalVisible(true);
  };

  // Função para excluir empresa
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${url}/empresa/deletarEmpresa/${id}`);
      message.success('Empresa deletada.');
      fetchEmpresas();
    } catch {
      message.error('Erro ao deletar empresa.');
    }
  };

  // Função para salvar ou atualizar empresa
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingEmpresa) {
        await axios.put(`${url}/empresa/editarEmpresa/${editingEmpresa.id}`, values);
        message.success('Empresa atualizada!');
      } else {
        await axios.post(`${url}/empresa/cadastro`, values);
        message.success('Empresa cadastrada!');
      }
      setModalVisible(false);
      fetchEmpresas();
    } catch (err) {
      message.error('Erro ao salvar empresa.');
    }
  };

  // Definindo as colunas da tabela
  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'CNPJ', dataIndex: 'cnpj', key: 'cnpj' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: Empresa) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Excluir</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <h1>Gerenciar Empresas</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Adicionar Empresa
      </Button>
      <Table
        columns={columns}
        dataSource={empresas}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editingEmpresa ? 'Editar Empresa' : 'Cadastrar Empresa'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cnpj" label="CNPJ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
}

export default EmpresaPage;
