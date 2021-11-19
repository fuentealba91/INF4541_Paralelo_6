<?php 
	header('Access-Control-Allow-Origin: *'); 
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	global $datos; 

	require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB


	$conexion = retornarConexion(); // CREA LA CONEXION

	// REALIZA LA QUERY A LA DB
	$registros = mysqli_query($conexion,"SELECT CASE
    WHEN p.id_Persona = (SELECT presidente FROM directiva) THEN 'presidente'
    WHEN p.id_Persona = (SELECT secretario FROM directiva) THEN 'secretario'
    WHEN p.id_Persona = (SELECT tesorero FROM directiva) THEN 'tesorero'
    WHEN p.id_Persona = (SELECT directivo FROM directiva) THEN 'directivo'
    WHEN p.id_Persona = (SELECT directivoDesignado FROM directiva) THEN 'dirDesignado'
    END AS 'cargo', p.id_Persona, p.nombre, p.a_paterno, 
    (SELECT personalidadJuridica FROM directiva WHERE personalidadJuridica = (SELECT MAX(personalidadJuridica) FROM directiva)) AS 'FECHA' FROM persona p 
    WHERE (p.id_Persona = (SELECT presidente FROM directiva)
    OR p.id_Persona = (SELECT secretario FROM directiva)
    OR p.id_Persona = (SELECT tesorero FROM directiva)
    OR p.id_Persona = (SELECT directivo FROM directiva)
    OR p.id_Persona = (SELECT directivoDesignado FROM directiva))");

	// RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
	while ($resultado = mysqli_fetch_array($registros))  
	{
	$datos[] = $resultado;
	}

	$json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS

	header('Content-Type: application/json'); //envía el encabezado http json al navegador para informarle qué tipo de datos espera.

	echo $json; // MUESTRA EL JSON GENERADO AL EJECUTAR DIRECTAMENTE EL LOCALHOST DE XAMPP
?>