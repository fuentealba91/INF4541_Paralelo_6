<?php
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$json = file_get_contents('php://input');
	
	$params = json_decode($json);
	
	require("conexion.php");
	$con = retornarConexion();
	
	$res = mysqli_query($con,"SELECT * FROM persona WHERE rut = '$params->rut' AND correo = '$params->correo'");
	$resp = mysqli_fetch_array($res);
	
	if($resp != null)
	{
		$result = mysqli_query($con,"UPDATE persona SET clave = '$params->clave' WHERE rut = '$params->rut'");
	}
	else
	{
		$result = 'NO';
	}
	
  	class Result {}

	// GENERA LOS DATOS DE RESPUESTA
	$response = new Result();
	
	if($result == 'OK')
	{
		$response->respuesta = 1;
	}
	elseif($result == 'NO')
	{
		$response->respuesta = 2;
	}
	else
	{
		$response->respuesta = 0;
	}

  	header('Content-Type: application/json');

  	echo json_encode($response); // MUESTRA EL JSON GENERADO
?>