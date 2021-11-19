<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR
    
    $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE
    
    $nombre = $params->nombre;
    $nombreArchivo = $params->nombreArchivo;
    $archivo = $params->base64textString;
    $archivo = base64_decode($archivo);
    
    //$filePath = $_SERVER['DOCUMENT_ROOT']."/angularPHP/archivos/".$nombreArchivo;
	$filePath = $_SERVER['DOCUMENT_ROOT']."/PHP_BDD/Archivos/FotoTienda/".$nombreArchivo;
    file_put_contents($filePath, $archivo);
    
    $response = 1;
    header('Content-Type: application/json');
    echo json_encode($response);
?>