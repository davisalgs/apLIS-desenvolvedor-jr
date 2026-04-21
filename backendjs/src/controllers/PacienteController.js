const PacienteModel = require('../models/PacienteModel');

class PacienteController {
    static async index(req, res) {
        try {
            const pacientes = await PacienteModel.findAll();
            res.status(200).json(pacientes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar pacientes.' });
        }
    }

    static async show(req, res) {
        try {
            const { id } = req.params;
            const paciente = await PacienteModel.findById(id);

            if (!paciente) {
                return res.status(404).json({ message: 'Paciente não encontrado.' });
            }

            res.status(200).json(paciente);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar o paciente.' });
        }
    }

    static async store(req, res) {
        try {
            const { nome, dataNascimento, carteirinha, cpf } = req.body;

            if (!nome || !dataNascimento || !carteirinha || !cpf) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const novoPacienteId = await PacienteModel.create({ nome, dataNascimento, carteirinha, cpf });
            res.status(201).json({ message: 'Paciente criado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar paciente.' });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, dataNascimento, carteirinha, cpf } = req.body;

            const linhasAfetadas = await PacienteModel.update(id, { nome, dataNascimento, carteirinha, cpf });

            if (linhasAfetadas === 0) {
                return res.status(404).json({ message: 'Paciente não encontrado para atualização.' });
            }

            res.status(200).json({ message: 'Paciente atualizado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar paciente.' });
        }
    }

    static async destroy(req, res) {
        try {
            const { id } = req.params;
            const linhasAfetadas = await PacienteModel.delete(id);

            if (linhasAfetadas === 0) {
                return res.status(404).json({ message: 'Paciente não encontrado para exclusão.' });
            }

            res.status(200).json({ message: 'Paciente deletado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar paciente.' });
        }
    }
}

module.exports = PacienteController;
