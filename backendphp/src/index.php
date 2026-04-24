<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/MedicoController.php';


$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];


$uriParts = explode('/', trim($uri, '/'));

if (isset($uriParts[0]) && $uriParts[0] === 'api' && isset($uriParts[1]) && $uriParts[1] === 'v1' && isset($uriParts[2]) && $uriParts[2] === 'medicos') {
    
    $id = null;
    if (isset($uriParts[3])) {
        $id = (int) $uriParts[3];
    }

    $database = new Database();
    $db = $database->getConnection();

    if ($db) {
        $controller = new MedicoController($db);
        $controller->processRequest($method, $id);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Falha na conexão com o banco de dados."]);
    }

} else {
    http_response_code(404);
    echo json_encode(["message" => "Página Não Encontrada"]);
}
