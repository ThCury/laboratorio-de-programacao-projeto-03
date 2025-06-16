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

interface Professor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  disciplina: string;
}

export function ProfessorPage() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [form] = Form.useForm();

  // Buscar professores
  const fetchProfessores = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/professor`);
      setProfessores(res.data);
    } catch (error) {
      message.error('Erro ao buscar professores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

  // Abrir modal de cadastro
  const handleAdd = () => {
    setEditingProfessor(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Editar
  const handleEdit = (professor: Professor) => {
    setEditingProfessor(professor);
    form.setFieldsValue(professor);
    setModalVisible(true);
  };

  // Excluir
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${url}/professor/${id}`);
      message.success('Professor deletado.');
      fetchProfessores();
    } catch {
      message.error('Erro ao deletar professor.');
    }
  };

  // Salvar ou atualizar
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingProfessor) {
        await axios.patch(`${url}/professor/${editingProfessor.id}`, {...values, instituicaoId: Number(values.instituicaoId), saldo: Number(values.saldo)});
        message.success('Professor atualizado!');
      } else {
        await axios.post(`${url}/professor`, {...values, instituicaoId: Number(values.instituicaoId), saldo: Number(values.saldo)});
        message.success('Professor cadastrado!');
      }
      setModalVisible(false);
      fetchProfessores();
    } catch (err) {
      message.error('Erro ao salvar professor.');
    }
  };

  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Disciplina', dataIndex: 'disciplina', key: 'disciplina' },
    { title: 'Saldo', dataIndex: 'saldo', key: 'saldo' },
    { title: 'CPF', dataIndex: 'CPF', key: 'CPF' },
    { title: 'Departamento', dataIndex: 'departamento', key: 'departamento' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: Professor) => (
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
      <h1>Gerenciar Professores</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Adicionar Professor
      </Button>
      <Table
        columns={columns}
        dataSource={professores}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editingProfessor ? 'Editar Professor' : 'Cadastrar Professor'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="CPF" label="CPF" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="saldo" label="Saldo" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="departamento" label="Departamento" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="instituicaoId"
            label="Instituição ID"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
}

export default ProfessorPage;
