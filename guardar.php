<?php
$conexion = new mysqli("localhost", "root", "", "sistema_web");

if($conexion->connect_error){
    die("Error de conexión: " . $conexion->connect_error);
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    
    // CASO 1: Formulario de Presupuesto
    if (isset($_POST['tipo_proyecto'])) {
        $nombre = $conexion->real_escape_string($_POST['nombre']);
        $tipo = $conexion->real_escape_string($_POST['tipo_proyecto']);
        $correo = $conexion->real_escape_string($_POST['correo']);
        $mensaje = $conexion->real_escape_string($_POST['mensaje']);

        $sql = "INSERT INTO tb_presupuestos (nombre, tipo_proyecto, correo, mensaje) 
                VALUES ('$nombre', '$tipo', '$correo', '$mensaje')";
    } 
    
    // CASO 2: Formulario de Soporte
    elseif (isset($_POST['id_soporte'])) {
        $nombre = $conexion->real_escape_string($_POST['nombre']);
        $id_proy = $conexion->real_escape_string($_POST['id_soporte']);
        $correo = $conexion->real_escape_string($_POST['correo']);
        $mensaje = $conexion->real_escape_string($_POST['mensaje']);

        $sql = "INSERT INTO tb_soporte (nombre, id_proyecto, correo, mensaje) 
                VALUES ('$nombre', '$id_proy', '$correo', '$mensaje')";
    } 
    
    // CASO 3: Contacto General (El original)
    else {
        $nombre = $conexion->real_escape_string($_POST['nombre']);
        $telefono = $conexion->real_escape_string($_POST['telefono']);
        $correo = $conexion->real_escape_string($_POST['correo']);
        $mensaje = $conexion->real_escape_string($_POST['mensaje']);

        $sql = "INSERT INTO tb_clientes (nombre, telefono, correo, mensaje) 
                VALUES ('$nombre', '$telefono', '$correo', '$mensaje')";
    }

    // Ejecutar la consulta seleccionada
    if ($conexion->query($sql) === TRUE) {
        echo "<script>
                alert('¡Datos guardados correctamente!');
                window.location.href='Contacto.html';
              </script>";
    } else {
        echo "Error: " . $conexion->error;
    }
}
$conexion->close();
?>