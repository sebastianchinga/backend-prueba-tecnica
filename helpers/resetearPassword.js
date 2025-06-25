import nodemailer from 'nodemailer';

const resetearPassword = async (datos) => {
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
        subject: "Resetea tu Password",
        html: `
            <p>Hola ${nombre}, para recuperar tu cuenta sigue el siguiente enlace:</p>
            <a href="">Resetear Password</a>
            <p>Si no creaste esta cuenta, ignora este mensaje</p>
        `, // HTML body
    });

    console.log("Message sent:", info.messageId);
}

export default resetearPassword;