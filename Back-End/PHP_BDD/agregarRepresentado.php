<?php
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$json = file_get_contents('php://input');
	
	$params = json_decode($json);
	
	require("conexion.php");
	$con = retornarConexion();

	$encriptada = md5($params->clave);
	
	$result = mysqli_query($con,"INSERT INTO persona (rut, nombre, segundo_nombre, a_paterno, a_materno, correo, telefono, f_nacimiento, comuna, direccion, sexo, clave, pregunta_secreta,id_apoderado) 
	VALUES ('$params->rut','$params->nombre','$params->sNombre','$params->aPaterno','$params->aMaterno','$params->correo','$params->telefono','$params->fNacimiento','$params->comuna','$params->direccion'
	,'$params->sexo','$encriptada','$params->preguntaSecreta','$params->idApoderado')");
	
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