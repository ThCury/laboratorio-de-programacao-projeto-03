import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Modal,
  Form,
  InputNumber,
  DatePicker,
  Select,
  Space,
  Popconfirm,
  message,
} from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { url } from '../../url';

const Container = styled.div`
  padding: 2rem;
`;

const { Option } = Select;

export const TipoTransacao = {
  DEPOSITO: 'DEPOSITO',
  TRANSFERENCIA: 'TRANSFERENCIA',
  RESGATE_VANTAGEM: 'RESGATE_VANTAGEM',
} as const;

export type TipoTransacao = typeof TipoTransacao[keyof typeof TipoTransacao];

interface Transacao {
  id: number;
  tipo: TipoTransacao;
  descricao?: string;
  valor: number;
  alunoId?: number;
  professorId?: number;
  vantagemId?: number;
  data?: string;
  empresaId?: number;
}

interface Pessoa {
  id: number;
  nome: string;
}

interface Vantagem {
  id: number;
  titulo: string;
}

interface Empresa {
  id: number;
  nome: string;
}

export function TransacaoPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState<number | null>(null);

  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [alunos, setAlunos] = useState<Pessoa[]>([]);
  const [professores, setProfessores] = useState<Pessoa[]>([]);
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTransacao, setEditingTransacao] = useState<Transacao | null>(null);
  const [form] = Form.useForm();

  // Busca empresas para popular select
  const fetchEmpresas = async () => {
    try {
      const res = await axios.get(`${url}/empresa/buscarEmpresas`);
      setEmpresas(res.data);
      if (res.data.length > 0) {
        setEmpresaSelecionada(res.data[0].id);
      }
    } catch {
      message.error('Erro ao buscar empresas.');
    }
  };

  // Busca transações da empresa selecionada
  const fetchTransacoes = async (empresaId: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/transacao`, {
        params: { empresaId },
      });
      setTransacoes(Array.isArray(res.data) ? res.data : []);
    } catch {
      message.error('Erro ao buscar transações.');
    } finally {
      setLoading(false);
    }
  };

  // Busca alunos e professores da empresa selecionada
  const fetchAlunosProfessores = async () => {
    try {
      const [alunosRes, professoresRes] = await Promise.all([
        axios.get(`${url}/aluno/buscarAlunos`),
        axios.get(`${url}/professor`),
      ]);
      setAlunos(alunosRes.data);
      setProfessores(professoresRes.data);
    } catch {
      message.error('Erro ao buscar alunos e professores.');
    }
  };

  // Busca vantagens da empresa selecionada
  const fetchVantagens = async (empresaId: number) => {
    try {
      const res = await axios.get(`${url}/empresa/${empresaId}/vantagens`);
      setVantagens(res.data);
    } catch {
      message.error('Erro ao buscar vantagens.');
    }
  };

  // Quando empresa muda, busca dados dela
  useEffect(() => {
    fetchEmpresas();
  }, []);

  useEffect(() => {
    if (empresaSelecionada !== null) {
      fetchTransacoes(empresaSelecionada);
      fetchAlunosProfessores();
      fetchVantagens(empresaSelecionada);
      form.resetFields();
      setEditingTransacao(null);
    }
  }, [empresaSelecionada]);

  const handleAdd = () => {
    setEditingTransacao(null);
    form.resetFields();
    // já deixa o empresaId preenchido no formulário
    form.setFieldsValue({ empresaId: empresaSelecionada });
    setModalVisible(true);
  };

  const handleEdit = (transacao: Transacao) => {
    setEditingTransacao(transacao);
    form.setFieldsValue({
      ...transacao,
      data: transacao.data ? dayjs(transacao.data) : undefined,
      empresaId: empresaSelecionada,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${url}/transacao/${id}`);
      message.success('Transação deletada.');
      if (empresaSelecionada) fetchTransacoes(empresaSelecionada);
    } catch {
      message.error('Erro ao deletar transação.');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        ...values,
        data: values.data ? values.data.format('YYYY-MM-DD') : undefined,
        empresaId: empresaSelecionada,
      };

      if (editingTransacao) {
        await axios.patch(`${url}/transacao/${editingTransacao.id}`, payload);
        message.success('Transação atualizada!');
      } else {
        await axios.post(`${url}/transacao`, payload);
        message.success('Transação cadastrada!');
      }
      setModalVisible(false);
      if (empresaSelecionada) fetchTransacoes(empresaSelecionada);
    } catch (err) {
      message.error('Erro ao salvar transação.');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (value: number) => `R$ ${value.toFixed(2)}`,
    },
    {
      title: 'Aluno',
      dataIndex: 'alunoId',
      key: 'aluno',
      render: (alunoId: number | undefined) =>
        alunoId ? alunos.find((a) => a.id === alunoId)?.nome ?? alunoId : '',
    },
    {
      title: 'Professor',
      dataIndex: 'professorId',
      key: 'professor',
      render: (professorId: number | undefined) =>
        professorId ? professores.find((p) => p.id === professorId)?.nome ?? professorId : '',
    },
    {
      title: 'Vantagem',
      dataIndex: 'vantagemId',
      key: 'vantagem',
      render: (vantagemId: number | undefined) =>
        vantagemId ? vantagens.find((v) => v.id === vantagemId)?.titulo ?? vantagemId : '',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      render: (date?: string) => (date ? dayjs(date).format('DD/MM/YYYY') : ''),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: Transacao) => (
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
      <h1>Transações</h1>

      <Form layout="inline" style={{ marginBottom: 20 }}>
        <Form.Item label="Empresa">
          <Select
            style={{ width: 250 }}
            value={empresaSelecionada ?? undefined}
            onChange={(value) => setEmpresaSelecionada(value)}
            placeholder="Selecione a empresa"
          >
            {empresas.map((emp) => (
              <Option key={emp.id} value={emp.id}>
                {emp.nome}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Adicionar Transação
      </Button>
      <Table columns={columns} dataSource={transacoes.filter((transacao) => transacao.empresaId === empresaSelecionada)} rowKey="id" loading={loading} />
      <Modal
        title={editingTransacao ? 'Editar Transação' : 'Nova Transação'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="tipo"
            label="Tipo"
            rules={[{ required: true, message: 'Selecione o tipo' }]}
          >
            <Select placeholder="Selecione o tipo">
              {Object.values(TipoTransacao).map((tipo) => (
                <Option key={tipo} value={tipo}>
                  {tipo}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="valor"
            label="Valor"
            rules={[{ required: true, type: 'number', min: 0.01 }]}
          >
            <InputNumber style={{ width: '100%' }} min={0.01} step={0.01} />
          </Form.Item>

          <Form.Item name="alunoId" label="Aluno">
            <Select allowClear placeholder="Selecione o aluno">
              {alunos.map((aluno) => (
                <Option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="professorId" label="Professor">
            <Select allowClear placeholder="Selecione o professor">
              {professores.map((prof) => (
                <Option key={prof.id} value={prof.id}>
                  {prof.nome}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="vantagemId" label="Vantagem">
            <Select allowClear placeholder="Selecione a vantagem">
              {vantagens.map((v) => (
                <Option key={v.id} value={v.id}>
                  {v.titulo}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="data" label="Data" rules={[{ required: false }]}>
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
}

export default TransacaoPage;
