const db = require('../config/database');

class PacienteModel {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM pacientes');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM pacientes WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(paciente) {
        const { nome, dataNascimento, carteirinha, cpf } = paciente;
        const [result] = await db.query(
            'INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)',
            [nome, dataNascimento, carteirinha, cpf]
        );
        return result.insertId;
    }

    static async update(id, paciente) {
        const { nome, dataNascimento, carteirinha, cpf } = paciente;
        const [result] = await db.query(
            'UPDATE pacientes SET nome = ?, dataNascimento = ?, carteirinha = ?, cpf = ? WHERE id = ?',
            [nome, dataNascimento, carteirinha, cpf, id]
        );
        return result.affectedRows;
    }


    static async delete(id) {
        const [result] = await db.query('DELETE FROM pacientes WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = PacienteModel;
