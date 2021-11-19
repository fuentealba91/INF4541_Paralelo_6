<?php 
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

    $json = file_get_contents('php://input');

    $params = json_decode($json);

    require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

    $con = retornarConexion(); // CREA LA CONEXION

    $clave = $params->clave;

    if($clave != null && $clave != "")
    {
        // REALIZA LA QUERY A LA DB
        $encriptada = md5($params->clave);
        $result = mysqli_query($con, "UPDATE persona SET rut = '$params->rut', nombre = '$params->nombre', segundo_nombre = '$params->sNombre',
        a_paterno = '$params->aPaterno', a_materno = '$params->aMaterno', correo = '$params->correo', telefono = '$params->telefono', 
        comuna = '$params->comuna',direccion = '$params->direccion', f_nacimiento = '$params->fNacimiento', sexo = '$params->sexo', 
        pregunta_secreta = '$params->preguntaSecreta', clave = '$encriptada' WHERE id_persona = '$params->id'");
    }
    else
    {
        // REALIZA LA QUERY A LA DB
        $result = mysqli_query($con, "UPDATE persona SET rut = '$params->rut', nombre = '$params->nombre', segundo_nombre = '$params->sNombre',
        a_paterno = '$params->aPaterno', a_materno = '$params->aMaterno', correo = '$params->correo', telefono = '$params->telefono', 
        comuna = '$params->comuna',direccion = '$params->direccion', f_nacimiento = '$params->fNacimiento', sexo = '$params->sexo', pregunta_secreta = '$params->preguntaSecreta'
        WHERE id_persona = '$params->id'");
    }

    // REALIZA LA QUERY A LA DB
    
    
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