<?php
session_start();

if (!isset($_SESSION['email']) || !isset($_SESSION['dinotoken'])) {
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
$token = $_SESSION['dinotoken'];

$sqlClients = "UPDATE clients SET saldo = saldo + ? WHERE email = ?";
$stmtClients = $conn->prepare($sqlClients);
$stmtClients->bind_param("ds", $valorAcumulado, $email);
$successClients = $stmtClients->execute();


$sqlPlayHistory = "UPDATE playhistory SET valor_saida = ?, status = 'Concluído' WHERE token = ?";
$stmtPlayHistory = $conn->prepare($sqlPlayHistory);
$stmtPlayHistory->bind_param("ds", $valorAcumulado, $token);
$successPlayHistory = $stmtPlayHistory->execute();


$sqlSelectEntrada = "SELECT entrada FROM playhistory WHERE token = ?";
$stmtSelectEntrada = $conn->prepare($sqlSelectEntrada);
$stmtSelectEntrada->bind_param("s", $token);
$stmtSelectEntrada->execute();
$stmtSelectEntrada->bind_result($entrada);
$stmtSelectEntrada->fetch();
$stmtSelectEntrada->close();

if ($successClients && $successPlayHistory) {
    if ($stmtClients->affected_rows > 0 && $stmtPlayHistory->affected_rows > 0) {
        unset($_SESSION['dinotoken']);

        $lucro = $entrada - $valorAcumulado;

        $sqlAddLucro = "UPDATE playhistory SET lucro = ? WHERE token = ?";
        $stmtAddLucro = $conn->prepare($sqlAddLucro);
        $stmtAddLucro->bind_param("ds", $lucro, $token);
        $stmtAddLucro->execute();
        $stmtAddLucro->close();
    }
}
$stmtPlayHistory->close();
$stmtClients->close();
$conn->close();
?>
