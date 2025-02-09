const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite que Express analice el cuerpo de las solicitudes como JSON

app.post('/enviar-correo', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    // Configura el transportador de Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Reemplaza con tu servidor SMTP
      port: 587, // Reemplaza con el puerto de tu servidor SMTP
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: 'bonialeart@gmail.com', // Reemplaza con tu dirección de correo electrónico
        pass: 'grqa qstp fzdh fduy' // Reemplaza con tu contraseña o una contraseña de aplicación (ver abajo)
      },
    });

    // Define el mensaje de correo electrónico
    const mailOptions = {
      from: 'tu_correo@gmail.com', // Reemplaza con tu dirección de correo electrónico
      to: 'bonialeart@gmail.com', // Reemplaza con la dirección de correo electrónico del destinatario
      subject: 'Nuevo mensaje de contacto desde tu sitio web',
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);

    console.log('Correo electrónico enviado');
    res.status(200).send('Correo electrónico enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).send('Error al enviar el correo electrónico');
  }
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});