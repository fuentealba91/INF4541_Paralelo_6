<?php
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$json = file_get_contents('php://input');
	
	$params = json_decode($json);
	
	require("conexion.php");
	$con = retornarConexion();
	
	$result = mysqli_query($con,"INSERT INTO contacto (nombre,correo,telefono,asunto,mensaje,fecha,estado) VALUES ('$params->nombre','$params->correo','$params->telefono',
	'$params->asunto','$params->mensaje',curdate(),true)");
	
  	class Result {}

	// GENERA LOS DATOS DE RESPUESTA
	$response = new Result();
	
	if($result == 'OK')
	{
		$response->respuesta = 1;
	}
	else
	{
		$response->respuesta = 0;
	}

  	header('Content-Type: application/json');

  	echo json_encode($response); // MUESTRA EL JSON GENERADO
?>