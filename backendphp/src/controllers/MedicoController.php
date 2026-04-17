<?php

require_once __DIR__ . '/../models/MedicoModel.php';

class MedicoController
{
    private MedicoModel $model;

    public function __construct(PDO $db)
    {
        $this->model = new MedicoModel($db);
    }

    
    public function processRequest(string $method): void
    {
        switch ($method) {
            case 'GET':
                $this->getMedicos();
                break;
            case 'POST':
                $this->createMedico();
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Método não permitido"]);
                break;
        }
    }

    private function getMedicos(): void
    {
        $result = $this->model->getAll();
        http_response_code(200);
        echo json_encode($result);
    }

    private function createMedico(): void
    {
        
        $data = json_decode(file_get_contents("php://input"), true);

        if (
            !empty($data['nome']) &&
            !empty($data['CRM']) &&
            !empty($data['UFCRM'])
        ) {
            $isCreated = $this->model->create(
                $data['nome'],
                $data['CRM'],
                $data['UFCRM']
            );

            if ($isCreated) {
                http_response_code(201); // 201 Created
                echo json_encode(["message" => "Médico criado com sucesso"]);
            } else {
                http_response_code(503); // 503 Service Unavailable
                echo json_encode(["message" => "Não foi possível criar o médico"]);
            }
        } else {
            http_response_code(400); // 400 Bad Request
            echo json_encode(["message" => "Dados incompletos. Informe nome, CRM e UFCRM."]);
        }
    }
}
