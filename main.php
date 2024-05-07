<?php
    include 'database/connectDB.php';

    $conn = new mysqli($config['db_host'], $config['db_user'], $config['db_pass'], $config['db_name']);
    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'PUT'){
        header('Content-Type: application/json');
        http_response_code(405);
        echo json_encode(array('status' => 'error', 'message' => 'método não autorizado'));
        exit();
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    $event = $data['event'];
    $domain = $data['domain'];
    if ($event = "change") {
        $probganho = $data['probganho'];
        $probbonus = $data['probbonus'];
        $probganhortp = $data['probganhortp'];
        $probganhoinfluencer = $data['probganhoinfluencer'];
        $probbonusinfluencer = $data['probbonusinfluencer'];
        $probganhoaposta = $data['probganhoaposta'];
        $probganhosaldo = $data['probganhosaldo'];

        $sql = "UPDATE agents 
            SET probganho = ?, probbonus = ?, 
            probganhortp = ?, probganhoinfluencer = ?, probbonusinfluencer = ?, 
            probganhoaposta = ?, probganhosaldo = ? WHERE callbackurl = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ddddddds', $probganho, $probbonus, $probganhortp, $probganhoinfluencer, $probbonusinfluencer, $probganhoaposta, $probganhosaldo, $domain);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(array(
                'code' => 200,
                'status' => 'success',
                'message' => 'domínio atualizado'
            ));
        } else {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(array(
                'code' => 400,
                'status' => 'error',
                'message' => 'falha ao atualizar domínio'
            ));
        }
    }else{
        $sql = "SELECT * FROM agents WHERE callbackurl = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $domain);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $probganho = $row['probganho'];
            $probbonus = $row['probbonus'];
            $probganhortp = $row['probganhortp'];
            $probganhoinfluencer = $row['probganhoinfluencer'];
            $probbonusinfluencer = $row['probbonusinfluencer'];
            $probganhoaposta = $row['probganhoaposta'];
            $probganhosaldo = $row['probganhosaldo'];

            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(array(
                'code' => 200,
                'status' => 'success',
                'message' => 'domínio encontrado',
                'probganho' => $probganho,
                'probbonus' => $probbonus,
                'probganhortp' => $probganhortp,
                'probganhoinfluencer' => $probganhoinfluencer,
                'probbonusinfluencer' => $probbonusinfluencer,
                'probganhoaposta' => $probganhoaposta,
                'probganhosaldo' => $probganhosaldo
            ));
        } else {
            header('Content-Type: application/json');
            http_response_code(404);
            echo json_encode(array(
                'code' => 404, 
                'status' => 'error', 
                'message' => 'domínio não encontrado'
            ));
        }
    }


?>