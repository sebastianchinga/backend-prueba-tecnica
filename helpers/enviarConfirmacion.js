// import nodemailer from 'nodemailer';
import { Resend } from "resend";
import dotenv from 'dotenv';
dotenv.config();

const confirmarCuenta = async (datos) => {

    const { nombre, email, token } = datos // Extrayendo los datos

    const resend = new Resend(process.env.EMAIL_PASS);

    try {
        const { data } = await resend.emails.send({
            from: 'Administrador de Tareas <zonacoderscontacto@zonacoders.com>',
            to: [email],
            subject: 'Confirma tu cuenta',
            html: `
                <p>Hola ${nombre}, para confirmar tu cuenta sigue el siguiente enlace:</p>
                <a href="${process.env.URL_FRONTEND}/confirmar-cuenta/${token}">Confirmar Cuenta</a>
                <p>Si no creaste esta cuenta, ignora este mensaje</p>
            `,
        });
        console.log(`Mensaje ${data.id} enviado`);
        
    } catch (error) {
        console.log(error);
    }

}

export default confirmarCuenta