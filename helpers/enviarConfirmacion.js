import nodemailer from 'nodemailer';

const confirmarCuenta = async (datos) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "734a381f345758",
            pass: "c7e8819700e904"
        }
    });
    const { nombre, email, token } = datos

    const info = await transporter.sendMail({
        from: `Administrador de Tareas`,
        to: `${nombre} - ${email}`,
        subject: "Confirma tu cuenta",
        html: `
            <p>Hola ${nombre}, para confirmar tu cuenta sigue el siguiente enlace:</p>
            <a href="http://localhost:5173/confirmar-cuenta/${token}">Confirmar Cuenta</a>
            <p>Si no creaste esta cuenta, ignora este mensaje</p>
        `, // HTML body
    });

    console.log("Message sent:", info.messageId);
}

export default confirmarCuenta