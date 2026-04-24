import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { apiNode } from '../services/api';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    carteirinha: '',
    cpf: ''
  });

  const fetchPacientes = async () => {
    try {
      setLoading(true);
      const response = await apiNode.get('/pacientes');
      setPacientes(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar a lista de pacientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    
    if (name === 'cpf') {
      // Remove tudo o que não é dígito
      value = value.replace(/\D/g, "");
      if (value.length > 11) value = value.substring(0, 11);
      // Coloca ponto entre o terceiro e o quarto dígitos
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      // Coloca ponto entre o sexto e o sétimo dígitos
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      // Coloca um hífen entre o nono e o décimo dígitos
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({ nome: '', dataNascimento: '', carteirinha: '', cpf: '' });
    setIsFormOpen(!isFormOpen);
  };

  const handleEdit = (paciente) => {
    setEditingId(paciente.id);
    // Extrai apenas a data para o input type="date"
    const dataFormatada = paciente.dataNascimento.split('T')[0];
    setFormData({
      nome: paciente.nome,
      dataNascimento: dataFormatada,
      carteirinha: paciente.carteirinha,
      cpf: paciente.cpf
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await apiNode.delete(`/pacientes/${id}`);
        fetchPacientes();
      } catch (err) {
        console.error(err);
        alert('Erro ao excluir o paciente.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiNode.put(`/pacientes/${editingId}`, formData);
      } else {
        await apiNode.post('/pacientes', formData);
      }
      
      setFormData({ nome: '', dataNascimento: '', carteirinha: '', cpf: '' });
      setIsFormOpen(false);
      setEditingId(null);
      fetchPacientes(); // Atualiza a lista após salvar
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar o paciente.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Pacientes</h1>
          <p>Gerenciamento de pacientes cadastrados</p>
        </div>
        {!isFormOpen && (
          <button 
            className="btn btn-primary"
            onClick={handleNew}
          >
            Novo Paciente
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="panel" style={{ marginBottom: '2rem' }}>
          <h3>{editingId ? 'Editar Paciente' : 'Cadastrar Novo Paciente'}</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  name="nome" 
                  className="input-control" 
                  value={formData.nome} 
                  onChange={handleInputChange} 
                  maxLength={255}
                  required 
                />
              </div>
              <div className="input-group">
                <label>Data de Nascimento</label>
                <input 
                  type="date" 
                  name="dataNascimento" 
                  className="input-control" 
                  value={formData.dataNascimento} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <label>Carteirinha</label>
                <input 
                  type="text" 
                  name="carteirinha" 
                  className="input-control" 
                  value={formData.carteirinha} 
                  onChange={handleInputChange} 
                  maxLength={50}
                  required 
                />
              </div>
              <div className="input-group">
                <label>CPF</label>
                <input 
                  type="text" 
                  name="cpf" 
                  className="input-control" 
                  value={formData.cpf} 
                  onChange={handleInputChange} 
                  maxLength={14}
                  placeholder="000.000.000-00"
                  required 
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Salvar Alterações' : 'Salvar Paciente'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="panel table-container">
        {loading ? (
          <p>Carregando pacientes...</p>
        ) : error ? (
          <p style={{ color: 'var(--danger)' }}>{error}</p>
        ) : pacientes.length === 0 ? (
          <p>Nenhum paciente cadastrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>Carteirinha</th>
                <th>CPF</th>
                <th style={{ textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td>{paciente.nome}</td>
                  <td>{new Date(paciente.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                  <td>{paciente.carteirinha}</td>
                  <td>{paciente.cpf}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleEdit(paciente)} 
                        className="btn btn-secondary" 
                        style={{ padding: '0.25rem 0.5rem' }}
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(paciente.id)} 
                        className="btn btn-danger" 
                        style={{ padding: '0.25rem 0.5rem' }}
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Pacientes;
