<?php
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$json = file_get_contents('php://input');
	
	$params = json_decode($json);
	
	require("conexion.php");
	$con = retornarConexion();

	$r = mysqli_query($con,"SELECT * FROM persona WHERE correo = '$params->correo'");
	$re = mysqli_fetch_array($r);

	if($re != NULL)
	{
		$res = mysqli_query($con,"SELECT * FROM persona WHERE correo = '$params->correo' AND pregunta_secreta = '$params->preguntaSecreta'");
		$resp = mysqli_fetch_array($res);

		if($resp != NULL)
		{
			$encriptada = md5($params->clave);
			$result = mysqli_query($con,"UPDATE persona SET clave = '$encriptada' WHERE correo = '$params->correo'");
		}
		else
		{
			$result = 'PREGUNTA';
		}
	}
	else
	{
		$result = 'NO';
	}

	class Result{}

	$response = new Result();

	if($result == 'OK')
	{
		$response->respuesta = 1;
	}
	elseif($result == 'NO')
	{
		$response->respuesta = 2;
	}
	elseif($result == 'PREGUNTA')
	{
		$response->respuesta = 3;
	}
	else
	{
		$response->resputa = 4;
	}

  	header('Content-Type: application/json');

  	echo json_encode($response); // MUESTRA EL JSON GENERADO
?>