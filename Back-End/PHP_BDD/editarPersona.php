<?php 
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

    $json = file_get_contents('php://input');

    $params = json_decode($json);

    require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

    $con = retornarConexion(); // CREA LA CONEXION

    $foto = $params->foto;

    if($foto != null && $foto != "")
    {
        // REALIZA LA QUERY A LA DB
        $result = mysqli_query($con, "UPDATE persona SET foto = '$params->foto', apodo = '$params->apodo', rut = '$params->rut', nombre = '$params->nombre',
        segundo_nombre = '$params->sNombre', a_paterno = '$params->aPaterno', a_materno = '$params->aMaterno', correo = '$params->correo',
        telefono = '$params->telefono', comuna = '$params->comuna',direccion = '$params->direccion', tel_emergencia = '$params->tEmergencia'
        WHERE id_persona = '$params->id'");
    }
    else
    {
        // REALIZA LA QUERY A LA DB
        $result = mysqli_query($con, "UPDATE persona SET apodo = '$params->apodo', rut = '$params->rut', nombre = '$params->nombre',
        segundo_nombre = '$params->sNombre', a_paterno = '$params->aPaterno', a_materno = '$params->aMaterno', correo = '$params->correo',
        telefono = '$params->telefono', comuna = '$params->comuna',direccion = '$params->direccion', tel_emergencia = '$params->tEmergencia'
        WHERE id_persona = '$params->id'");
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