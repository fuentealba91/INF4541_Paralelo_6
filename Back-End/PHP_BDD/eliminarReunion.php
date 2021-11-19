<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $con = retornarConexion(); // CREA LA CONEXION
  
  $res = mysqli_query($con, "DELETE FROM persona_reunion WHERE reunion=$_GET[id]");

  if($res == 'OK')
  {
    // REALIZA LA QUERY A LA DB
    $result = mysqli_query($con, "DELETE FROM reunion WHERE idReunion=$_GET[id]");
  }
  else
  {
    $result == 'NO';
  }

  class Result {}
  $response = new Result();
  // GENERA LOS DATOS DE RESPUESTA
  if($result == 'OK')
  {
    $response->resultado = 1;
  }
  else
  {
    $response->resultado = 0;
  }

  header('Content-Type: application/json');

  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>