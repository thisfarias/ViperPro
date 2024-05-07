<?php
session_start();

// Verifica se a solicitação é do tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recupera o valor enviado via POST
    $valor = isset($_POST['valor']) ? floatval($_POST['valor']) : 0.00;

    // Obtém o email da sessão
    $email = isset($_SESSION['email']) ? $_SESSION['email'] : '';

    // Verifica se o email está presente e o valor é válido
    if (!empty($email) && $valor > 0) {
        // Conecta-se ao banco de dados (substitua as configurações com as suas)
        include '../conectarbanco.php';

        $conn = new mysqli('localhost', $config['db_user'], $config['db_pass'], $config['db_name']);

        if ($conn->connect_error) {
            die("Erro na conexão com o banco de dados: " . $conn->connect_error);
        }

        // Obtém o saldo atual do jogador na tabela appconfig
        $saldoQuery = "SELECT saldo FROM appconfig WHERE email = '$email'";
        $saldoResult = $conn->query($saldoQuery);

        if ($saldoResult) {
            if ($saldoResult->num_rows > 0) {
                $row = $saldoResult->fetch_assoc();
                $saldoAtual = $row['saldo'];

                // Calcula o novo saldo após a subtração do valor
                $novoSaldo = $saldoAtual - $valor;

                // Atualiza o saldo na tabela appconfig
                $updateQuery = "UPDATE appconfig SET saldo = $novoSaldo WHERE email = '$email'";
                $updateResult = $conn->query($updateQuery);

                if ($updateResult) {
                    echo "Saldo removido com sucesso. Novo saldo: $novoSaldo";
                } else {
                    echo "Erro ao atualizar o saldo: " . $conn->error;
                }
            } else {
                echo "Nenhum saldo encontrado para o email: $email";
            }
        } else {
            echo "Erro ao obter o saldo: " . $conn->error;
        }

        // Fecha a conexão com o banco de dados
        $conn->close();
    } else {
        echo "Email inválido ou valor não fornecido corretamente.";
    }
} else {
    echo "Acesso não autorizado.";
}
?>
