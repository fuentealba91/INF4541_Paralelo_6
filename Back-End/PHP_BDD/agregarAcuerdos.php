<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $con = retornarConexion(); // CREA LA CONEXION
  
  $archivo = $params->archivo;

  if($archivo != null && $archivo != "")
  {
    $result = mysqli_query($con, "UPDATE reunion SET fecha='$params->fecha', puntosTratar='$params->puntos', acuerdos='$params->acuerdos', 
    archivo='$params->archivo' WHERE idReunion = $params->id");
  }
  else
  {
    $result = mysqli_query($con, "UPDATE reunion SET fecha='$params->fecha', puntosTratar='$params->puntos', acuerdos='$params->acuerdos' 
    WHERE idReunion = $params->id");
  }
  
  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  
  if($result == 'OK')
  {
    $response->resultado = 1;
  }
  else if($result == 'NO')
  {
    $response->resultado = 2;
  }
  else
  {
	$response->resultado = 0;
  }

  header('Content-Type: application/json');

  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>