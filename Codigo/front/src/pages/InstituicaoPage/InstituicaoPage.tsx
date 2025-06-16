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

interface Instituicao {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
}

export function InstituicaoPage() {
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingInstituicao, setEditingInstituicao] = useState<Instituicao | null>(null);
  const [form] = Form.useForm();

  // Buscar instituições
  const fetchInstituicoes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/instituicao`);
      setInstituicoes(res.data);
    } catch (error) {
      message.error('Erro ao buscar instituições.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstituicoes();
  }, []);

  // Abrir modal de cadastro
  const handleAdd = () => {
    setEditingInstituicao(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Editar
  const handleEdit = (instituicao: Instituicao) => {
    setEditingInstituicao(instituicao);
    form.setFieldsValue(instituicao);
    setModalVisible(true);
  };

  // Excluir
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${url}/instituicao/${id}`);
      message.success('Instituição deletada.');
      fetchInstituicoes();
    } catch {
      message.error('Erro ao deletar instituição.');
    }
  };

  // Salvar ou atualizar
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingInstituicao) {
        await axios.patch(`${url}/instituicao/${editingInstituicao.id}`, values);
        message.success('Instituição atualizada!');
      } else {
        await axios.post(`${url}/instituicao`, values);
        message.success('Instituição cadastrada!');
      }
      setModalVisible(false);
      fetchInstituicoes();
    } catch (err) {
      message.error('Erro ao salvar instituição.');
    }
  };

  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Endereço', dataIndex: 'endereco', key: 'endereco' },
    { title: 'Telefone', dataIndex: 'telefone', key: 'telefone' },
    { title: 'CNPJ', dataIndex: 'CNPJ', key: 'CNPJ' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: Instituicao) => (
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
      <h1>Gerenciar Instituições</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Adicionar Instituição
      </Button>
      <Table
        columns={columns}
        dataSource={instituicoes}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editingInstituicao ? 'Editar Instituição' : 'Cadastrar Instituição'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="endereco" label="Endereço" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="telefone" label="Telefone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="CNPJ" label="CNPJ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
}

export default InstituicaoPage;
