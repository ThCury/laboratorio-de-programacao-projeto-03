import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Popconfirm,
  message,
} from 'antd';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { url } from '../../url';

const Container = styled.div`
  padding: 2rem;
`;

interface Vantagem {
  id: number;
  titulo: string;
  descricao: string;
  custo: number;
  empresaId: number;
}

export function VantagemPage() {
  const { empresaId } = useParams<{ empresaId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { nome } = location.state || { nome: 'Empresa desconhecida' };  

  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVantagem, setEditingVantagem] = useState<Vantagem | null>(null);
  const [form] = Form.useForm();

  // Buscar vantagens da empresa
  const fetchVantagens = async () => {
    if (!empresaId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${url}/empresa/${empresaId}/vantagens`);
      setVantagens(res.data);
    } catch (error) {
      message.error('Erro ao buscar vantagens.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!empresaId) {
      message.error('ID da empresa não informado.');
      navigate('/empresa'); // volta para página de empresas
      return;
    }
    fetchVantagens();
  }, [empresaId]);

  // Abrir modal cadastro
  const handleAdd = () => {
    setEditingVantagem(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Editar vantagem
  const handleEdit = (vantagem: Vantagem) => {
    setEditingVantagem(vantagem);
    form.setFieldsValue(vantagem);
    setModalVisible(true);
  };

  // Excluir vantagem
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${url}/vantagem/${id}`);
      message.success('Vantagem deletada.');
      fetchVantagens();
    } catch {
      message.error('Erro ao deletar vantagem.');
    }
  };

  // Salvar ou atualizar vantagem
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!empresaId) {
        message.error('ID da empresa não informado.');
        return;
      }

      if (editingVantagem) {
        await axios.patch(`${url}/vantagem/${editingVantagem.id}`, values);
        message.success('Vantagem atualizada!');
      } else {
        await axios.post(`${url}/empresa/${empresaId}/adicionarVantagem`, values);
        message.success('Vantagem cadastrada!');
      }

      setModalVisible(false);
      fetchVantagens();
    } catch (err) {
      message.error('Erro ao salvar vantagem.');
    }
  };

  const columns = [
    { title: 'Título', dataIndex: 'titulo', key: 'titulo' },
    { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
    {
      title: 'Custo',
      dataIndex: 'custo',
      key: 'custo',
      render: (value: number) => `R$ ${value.toFixed(2)}`,
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: Vantagem) => (
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
      <h1>Vantagens da Empresa {nome}</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Adicionar Vantagem
      </Button>
      <Table
        columns={columns}
        dataSource={vantagens}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title={editingVantagem ? 'Editar Vantagem' : 'Cadastrar Vantagem'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="titulo" label="Título" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="descricao" label="Descrição" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="custo" label="Custo" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber
              style={{ width: '100%' }}
              min={0}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
}

export default VantagemPage;
