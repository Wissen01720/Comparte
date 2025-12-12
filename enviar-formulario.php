<?php
// Configuración de encabezados
header('Content-Type: application/json; charset=utf-8');

// Permitir CORS si es necesario
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// Configuración del destinatario
$destinatario = 'eduardodelcastillo@latinoamericacomparte.com';

// Verificar que sea una petición POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    echo json_encode([
        'success' => false, 
        'message' => 'Método no permitido.'
    ]);
    exit;
}

// Función para sanitizar datos
function sanitizar($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Obtener y sanitizar datos del formulario
$nombre = isset($_POST['nombre']) ? sanitizar($_POST['nombre']) : '';
$apellido = isset($_POST['apellido']) ? sanitizar($_POST['apellido']) : '';
$telefono = isset($_POST['telefono']) ? sanitizar($_POST['telefono']) : '';
$pais = isset($_POST['pais']) ? sanitizar($_POST['pais']) : '';
$email = isset($_POST['email']) ? sanitizar($_POST['email']) : '';
$mensaje = isset($_POST['mensaje']) ? sanitizar($_POST['mensaje']) : '';
$nombreEmpresa = isset($_POST['nombreEmpresa']) ? sanitizar($_POST['nombreEmpresa']) : '';
$cargo = isset($_POST['cargo']) ? sanitizar($_POST['cargo']) : '';

// Validar campos requeridos
if (empty($nombre) || empty($email) || empty($mensaje)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Por favor completa todos los campos requeridos (Nombre, Email y Mensaje).'
    ]);
    exit;
}

// Validar formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Por favor ingresa un correo electrónico válido.'
    ]);
    exit;
}

// Protección anti-spam básica
$spam_check = false;
$spam_words = array('viagra', 'cialis', 'porn', 'xxx', 'casino');
foreach ($spam_words as $word) {
    if (stripos($mensaje, $word) !== false) {
        $spam_check = true;
        break;
    }
}

if ($spam_check) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Tu mensaje ha sido marcado como spam.'
    ]);
    exit;
}

// Construir el asunto del correo
$asunto = "Nuevo contacto desde Latinoamérica Comparte - " . $nombre;

// Construir el cuerpo del mensaje en HTML
$nombreCompleto = trim($nombre . ' ' . $apellido);
$cuerpoHTML = '<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje de contacto</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .email-body {
            padding: 30px 20px;
        }
        .field-group {
            margin-bottom: 20px;
            border-left: 3px solid #667eea;
            padding-left: 15px;
        }
        .field-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #667eea;
            font-weight: 600;
            margin-bottom: 5px;
            letter-spacing: 0.5px;
        }
        .field-value {
            font-size: 16px;
            color: #333;
            word-wrap: break-word;
        }
        .message-box {
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 15px;
            margin-top: 10px;
            border: 1px solid #e9ecef;
        }
        .email-footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
            border-top: 1px solid #e9ecef;
        }
        .divider {
            height: 1px;
            background-color: #e9ecef;
            margin: 20px 0;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            .email-body {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>📧 Nuevo Mensaje de Contacto</h1>
        </div>
        
        <div class="email-body">
            <p style="font-size: 16px; color: #333; margin-bottom: 25px;">
                Has recibido un nuevo mensaje desde el formulario de contacto del sitio web.
            </p>
            
            <div class="field-group">
                <div class="field-label">Nombre Completo</div>
                <div class="field-value">' . htmlspecialchars($nombreCompleto) . '</div>
            </div>
            
            <div class="field-group">
                <div class="field-label">Correo Electrónico</div>
                <div class="field-value">
                    <a href="mailto:' . htmlspecialchars($email) . '" style="color: #667eea; text-decoration: none;">
                        ' . htmlspecialchars($email) . '
                    </a>
                </div>
            </div>';

if (!empty($telefono)) {
    $cuerpoHTML .= '
            <div class="field-group">
                <div class="field-label">Teléfono</div>
                <div class="field-value">' . htmlspecialchars($telefono) . '</div>
            </div>';
}

if (!empty($pais)) {
    $cuerpoHTML .= '
            <div class="field-group">
                <div class="field-label">País</div>
                <div class="field-value">' . htmlspecialchars($pais) . '</div>
            </div>';
}

if (!empty($nombreEmpresa)) {
    $cuerpoHTML .= '
            <div class="field-group">
                <div class="field-label">Empresa</div>
                <div class="field-value">' . htmlspecialchars($nombreEmpresa) . '</div>
            </div>';
}

if (!empty($cargo)) {
    $cuerpoHTML .= '
            <div class="field-group">
                <div class="field-label">Cargo</div>
                <div class="field-value">' . htmlspecialchars($cargo) . '</div>
            </div>';
}

$cuerpoHTML .= '
            <div class="divider"></div>
            
            <div class="field-group">
                <div class="field-label">Mensaje</div>
                <div class="message-box">
                    ' . nl2br(htmlspecialchars($mensaje)) . '
                </div>
            </div>
        </div>
        
        <div class="email-footer">
            <p style="margin: 0;">
                Este correo fue enviado automáticamente desde el formulario de contacto de<br>
                <strong>latinoamericacomparte.com</strong>
            </p>
            <p style="margin: 10px 0 0 0; font-size: 11px;">
                Fecha: ' . date('d/m/Y H:i:s') . '
            </p>
        </div>
    </div>
</body>
</html>';

// Crear versión de texto plano
$cuerpoTexto = "NUEVO MENSAJE DE CONTACTO\n";
$cuerpoTexto .= "========================================\n\n";
$cuerpoTexto .= "Nombre: " . $nombreCompleto . "\n";
$cuerpoTexto .= "Email: " . $email . "\n";
if (!empty($telefono)) $cuerpoTexto .= "Teléfono: " . $telefono . "\n";
if (!empty($pais)) $cuerpoTexto .= "País: " . $pais . "\n";
if (!empty($nombreEmpresa)) $cuerpoTexto .= "Empresa: " . $nombreEmpresa . "\n";
if (!empty($cargo)) $cuerpoTexto .= "Cargo: " . $cargo . "\n";
$cuerpoTexto .= "\nMensaje:\n" . $mensaje . "\n\n";
$cuerpoTexto .= "========================================\n";
$cuerpoTexto .= "Enviado desde: latinoamericacomparte.com\n";
$cuerpoTexto .= "Fecha: " . date('d/m/Y H:i:s');

// Configurar headers del email
$boundary = md5(time());

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
$headers .= "From: Latinoamérica Comparte <noreply@latinoamericacomparte.com>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "X-Priority: 3\r\n";

// Construir el cuerpo con ambas versiones
$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $cuerpoTexto . "\r\n";
$body .= "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $cuerpoHTML . "\r\n";
$body .= "--{$boundary}--";

// Intentar enviar el correo
$enviado = mail($destinatario, $asunto, $body, $headers);

if ($enviado) {
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => '¡Gracias por contactarnos! Tu mensaje ha sido enviado exitosamente. Pronto nos pondremos en contacto contigo.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Lo sentimos, hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos directamente.'
    ]);
}
?>
