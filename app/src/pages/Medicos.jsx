import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { apiPhp } from '../services/api';

const Medicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    CRM: '',
    UFCRM: ''
  });

  const fetchMedicos = async () => {
    try {
      setLoading(true);
      const response = await apiPhp.get('/medicos');
      setMedicos(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar a lista de médicos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    
    // Bloqueia qualquer caractere que não seja número no CRM
    if (name === 'CRM') {
      value = value.replace(/\D/g, "");
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({ nome: '', CRM: '', UFCRM: '' });
    setIsFormOpen(!isFormOpen);
  };

  const handleEdit = (medico) => {
    setEditingId(medico.id);
    setFormData({
      nome: medico.nome,
      CRM: medico.CRM,
      UFCRM: medico.UFCRM
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      try {
        await apiPhp.delete(`/medicos/${id}`);
        fetchMedicos();
      } catch (err) {
        console.error(err);
        alert('Erro ao excluir o médico.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiPhp.put(`/medicos/${editingId}`, formData);
      } else {
        await apiPhp.post('/medicos', formData);
      }
      
      setFormData({ nome: '', CRM: '', UFCRM: '' });
      setIsFormOpen(false);
      setEditingId(null);
      fetchMedicos(); // Atualiza a lista após salvar
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar o médico.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Médicos</h1>
          <p>Gerenciamento do corpo clínico</p>
        </div>
        {!isFormOpen && (
          <button 
            className="btn btn-primary"
            onClick={handleNew}
          >
            Novo Médico
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="panel" style={{ marginBottom: '2rem' }}>
          <h3>{editingId ? 'Editar Médico' : 'Cadastrar Novo Médico'}</h3>
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
                <label>CRM</label>
                <input 
                  type="text" 
                  name="CRM" 
                  className="input-control" 
                  value={formData.CRM} 
                  onChange={handleInputChange} 
                  maxLength={10}
                  required 
                />
              </div>
              <div className="input-group">
                <label>UF do CRM</label>
                <select 
                  name="UFCRM" 
                  className="input-control" 
                  value={formData.UFCRM} 
                  onChange={handleInputChange}
                  required 
                >
                  <option value="">Selecione...</option>
                  <option value="AC">Acre (AC)</option>
                  <option value="AL">Alagoas (AL)</option>
                  <option value="AP">Amapá (AP)</option>
                  <option value="AM">Amazonas (AM)</option>
                  <option value="BA">Bahia (BA)</option>
                  <option value="CE">Ceará (CE)</option>
                  <option value="DF">Distrito Federal (DF)</option>
                  <option value="ES">Espírito Santo (ES)</option>
                  <option value="GO">Goiás (GO)</option>
                  <option value="MA">Maranhão (MA)</option>
                  <option value="MT">Mato Grosso (MT)</option>
                  <option value="MS">Mato Grosso do Sul (MS)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                  <option value="PA">Pará (PA)</option>
                  <option value="PB">Paraíba (PB)</option>
                  <option value="PR">Paraná (PR)</option>
                  <option value="PE">Pernambuco (PE)</option>
                  <option value="PI">Piauí (PI)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="RN">Rio Grande do Norte (RN)</option>
                  <option value="RS">Rio Grande do Sul (RS)</option>
                  <option value="RO">Rondônia (RO)</option>
                  <option value="RR">Roraima (RR)</option>
                  <option value="SC">Santa Catarina (SC)</option>
                  <option value="SP">São Paulo (SP)</option>
                  <option value="SE">Sergipe (SE)</option>
                  <option value="TO">Tocantins (TO)</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Salvar Alterações' : 'Salvar Médico'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="panel table-container">
        {loading ? (
          <p>Carregando médicos...</p>
        ) : error ? (
          <p style={{ color: 'var(--danger)' }}>{error}</p>
        ) : medicos.length === 0 ? (
          <p>Nenhum médico cadastrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CRM</th>
                <th>UF</th>
                <th style={{ textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {medicos.map((medico) => (
                <tr key={medico.id}>
                  <td>{medico.nome}</td>
                  <td>{medico.CRM}</td>
                  <td>{medico.UFCRM}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleEdit(medico)} 
                        className="btn btn-secondary" 
                        style={{ padding: '0.25rem 0.5rem' }}
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(medico.id)} 
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

export default Medicos;
