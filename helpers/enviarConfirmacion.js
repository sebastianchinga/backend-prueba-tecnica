import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const confirmarCuenta = async (datos) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { nombre, email, token } = datos

    const info = await transporter.sendMail({
        from: `Administrador de Tareas`,
        to: `${nombre} - ${email}`,
        subject: "Confirma tu cuenta",
        html: `
            <p>Hola ${nombre}, para confirmar tu cuenta sigue el siguiente enlace:</p>
            <a href="${process.env.URL_FRONTEND}/confirmar-cuenta/${token}">Confirmar Cuenta</a>
            <p>Si no creaste esta cuenta, ignora este mensaje</p>
        `, // HTML body
    });

    console.log("Message sent:", info.messageId);
}

export default confirmarCuenta