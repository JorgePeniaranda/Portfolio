import React from 'react'
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser';
import style from "./style.module.css"

interface Props {
    SERVICE_ID: string
    TEMPLATE_ID: string
    PUBLIC_KEY: string
}

export default function ContactForm({SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY}: Props) {
    const [submitStatus, setSubmitStatus] = React.useState<boolean>(false)
    const [form, setForm] = React.useState({
        name: '',
        email: '',
        message: '',
    })

    const handleType = (e: React.ChangeEvent<HTMLSpanElement>) => {
        const { id, innerText } = e.target
        setForm({ ...form, [id]: innerText })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (submitStatus){
            return Swal.fire({
                title: 'Ya has enviado un mensaje',
                text: '¡Espera a que te responda!',
                icon: 'info',
                confirmButtonText: 'Cerrar'
            })
        }

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target.form, PUBLIC_KEY)
        .then(() => {
            Swal.fire({
                title: 'Enviado',
                text: '¡El mensaje ha sido enviado con éxito!',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
            setSubmitStatus(true)
        }, () => {
            Swal.fire({
                title: 'Error!',
                text: 'El mensaje no pudo ser enviado, pero tranquilo, fue un error interno.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
        });
    }

    return (
        <form className={style.form}>
            <p>
                ¡Hola, Jorge! Soy 
                <span data-placeholder="[Nombre]" id="name" onInput={handleType} contentEditable/>
                y mi correo es
                <span data-placeholder="[Correo]" id="email" onInput={handleType} contentEditable/>
                . Me gustaría que me contactaras para
                <span data-placeholder="[Mensaje]" id="message" onInput={handleType} contentEditable/>
            </p>
            <input type="hidden" name="name" value={form.name}/>
            <input type="hidden" name="email" value={form.email}/>
            <input type="hidden" name="message" value={form.message}/>
            <button type='submit' onClick={handleSubmit}>Enviar</button>
        </form>
    )
}
