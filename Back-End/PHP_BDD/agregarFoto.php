<?php
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$json = file_get_contents('php://input');
	
	$params = json_decode($json);
	
	require("conexion.php");
	$con = retornarConexion();

	$res = mysqli_query($con,"SELECT * FROM foto WHERE foto = '$params->foto' AND idGaleria = '$params->id_galeria'");
	$resp = mysqli_fetch_array($res);

	if($resp == null)
	{
		$result = mysqli_query($con,"INSERT INTO foto (foto, idGaleria) VALUES ('$params->foto','$params->id_galeria')");

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
	else if($result == 'NO')
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