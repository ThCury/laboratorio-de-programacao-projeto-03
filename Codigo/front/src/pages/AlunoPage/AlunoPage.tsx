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

interface Aluno {
  id: number;
  nome: string;
  email: string;
  CPF: string;
  RG: string;
  endereco: string;
  curso: string;
  instituicaoId: number;
  saldo: number;
}

export function AlunoPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);
  const [form] = Form.useForm();

  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/aluno/buscarAlunos`);
      setAlunos(res.data);
    } catch (error) {
      message.error('Erro ao buscar alunos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleAdd = () => {
    setEditingAluno(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (aluno: Aluno) => {
    setEditingAluno(aluno);
    form.setFieldsValue(aluno);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${url}/aluno/deletarAluno/${id}`);
      message.success('Aluno deletado.');
      fetchAlunos();
    } catch {
      message.error('Erro ao deletar aluno.');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingAluno) {
        await axios.put(`${url}/aluno/atualizarAluno/${editingAluno.id}`, {
          ...values,
          instituicaoId: Number(values.instituicaoId),
        });
        message.success('Aluno atualizado!');
      } else {
        await axios.post(`${url}/aluno/cadastro`, {
          ...values,
          instituicaoId: Number(values.instituicaoId),
        });
        message.success('Aluno cadastrado!');
      }
      setModalVisible(false);
      fetchAlunos();
    } catch (err) {
      message.error('Erro ao salvar aluno.');
    }
  };

  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'CPF', dataIndex: 'CPF', key: 'CPF' },
    { title: 'RG', dataIndex: 'RG', key: 'RG' },
    { title: 'Endereço', dataIndex: 'endereco', key: 'endereco' },
    { title: 'Curso', dataIndex: 'curso', key: 'curso' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: Aluno) => (
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
      <h1>Gerenciar Alunos</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Adicionar Aluno
      </Button>
      <Table
        columns={columns}
        dataSource={alunos ?? []}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editingAluno ? 'Editar Aluno' : 'Cadastrar Aluno'}
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
          <Form.Item name="CPF" label="CPF" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="RG" label="RG" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="endereco" label="Endereço" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="curso" label="Curso" rules={[{ required: true }]}>
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
};

export default AlunoPage;
