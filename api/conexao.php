<?php 

$servidor = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'crud';

try {
    $con = new mysqli($servidor,$usuario,$senha,$banco);
} catch (Exception $e) {
    echo 'Erro ao conectar com o banco!';
}
?>