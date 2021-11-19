<?php
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$json = file_get_contents('php://input');
	
	$params = json_decode($json);
	
	require("conexion.php");
	$con = retornarConexion();

	// $encriptada = base64_encode($params->clave);
	$encriptada = md5($params->clave);
	// $encriptada = sha1($params->clave);
	// $encriptada = password_hash($params->clave, PASSWORD_DEFAULT);

	
	$result = mysqli_query($con,"INSERT INTO persona (rut, nombre, segundo_nombre, a_paterno, a_materno, correo, telefono, f_nacimiento, comuna, direccion, sexo, clave, pregunta_secreta) 
	VALUES ('$params->rut','$params->nombre','$params->sNombre','$params->aPaterno','$params->aMaterno','$params->correo','$params->telefono','$params->fNacimiento','$params->comuna','$params->direccion'
	,'$params->sexo','$encriptada','$params->preguntaSecreta')");
	
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