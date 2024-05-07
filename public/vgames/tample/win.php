<?php
session_start();

if (!isset($_SESSION['email']) || !isset($_SESSION['templetoken'])) {
    exit;
}

include '../../../components/dbconn.php';
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo "Erro na conexão com o banco de dados: " . $conn->connect_error;
    exit;
}

$valorAcumulado = $_POST['valoracumulado'];
$email = $_SESSION['email'];
$token = $_SESSION['templetoken'];

$sqlClients = "UPDATE clients SET saldo = saldo + ? WHERE email = ?";
$stmtClients = $conn->prepare($sqlClients);
$stmtClients->bind_param("ds", $valorAcumulado, $email);

$sqlPlayHistory = "UPDATE playhistory SET valor_saida = ? WHERE token = ?";
$stmtPlayHistory = $conn->prepare($sqlPlayHistory);
$stmtPlayHistory->bind_param("ds", $valorAcumulado, $token);

$successClients = $stmtClients->execute();
$successPlayHistory = $stmtPlayHistory->execute();

if ($successClients && $successPlayHistory) {
    if ($stmtClients->affected_rows > 0 && $stmtPlayHistory->affected_rows > 0) {

        unset($_SESSION['templetoken']);
    }
}

$stmtClients->close();
$stmtPlayHistory->close();
$conn->close();
?>