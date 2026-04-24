<?php

class MedicoModel
{
    private PDO $conn;
    private string $table_name = "medicos";

    public function __construct(PDO $db)
    {
        $this->conn = $db;
    }

    /**
     * Retorna todos os registros da tabela medicos
     *
     * @return array
     */
    public function getAll(): array
    {
        $query = "SELECT id, nome, CRM, UFCRM FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }

    /**
     * Cria um novo médico
     *
     * @param string $nome
     * @param string $crm
     * @param string $ufcrm
     * @return bool
     */
    public function create(string $nome, string $crm, string $ufcrm): bool
    {
        $query = "INSERT INTO " . $this->table_name . " (nome, CRM, UFCRM) VALUES (:nome, :crm, :ufcrm)";
        $stmt = $this->conn->prepare($query);

        $nome = htmlspecialchars(strip_tags($nome));
        $crm = htmlspecialchars(strip_tags($crm));
        $ufcrm = htmlspecialchars(strip_tags($ufcrm));

        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":crm", $crm);
        $stmt->bindParam(":ufcrm", $ufcrm);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    
    public function update(int $id, string $nome, string $crm, string $ufcrm): bool
    {
        $query = "UPDATE " . $this->table_name . " SET nome = :nome, CRM = :crm, UFCRM = :ufcrm WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $nome = htmlspecialchars(strip_tags($nome));
        $crm = htmlspecialchars(strip_tags($crm));
        $ufcrm = htmlspecialchars(strip_tags($ufcrm));

        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":crm", $crm);
        $stmt->bindParam(":ufcrm", $ufcrm);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    
    public function delete(int $id): bool
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
