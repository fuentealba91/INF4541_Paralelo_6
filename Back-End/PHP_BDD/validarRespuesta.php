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
            $result = 'SI';
		}
		else
		{
			$result = 'NO';
		}
	}
	else
	{
		$result = 'MENOS';
	}

	class Result{}

	$response = new Result();

	if($result == 'SI')
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