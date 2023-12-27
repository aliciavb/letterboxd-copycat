import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"

export const Login = () => {

    const { VITE_URL_API } = import.meta.env

    //revisar no dejar useRefs vacios??
    const navigate = useNavigate()
    const name = useRef('')
    const pass = useRef('')

    //comprueba si hay usuarios en localStorage y entra a films 
    useEffect(()=>{
        if(localStorage.getItem('usuarios')){
            navigate('/films')
        }
    }, [])

    const formHandler = (e) => {
        e.preventDefault()

        let nuevo = {
            name : name.current.value,
            pass : pass.current.value
        }

        let options = {
            method : 'post',
            body   : JSON.stringify(nuevo),
            headers : {
                "Content-type" : "application/json"
            }
        }
        fetch( VITE_URL_API , options)
        .then( res => res.json())
        .then( data => {
            if( data ){
                localStorage.setItem('usuarios', JSON.stringify(data))
                navigate('/films')
            }
        })
        .catch( err => console.log( err ))
    }

    return(
        <>
            <h2>Login</h2>

            <form onSubmit={ formHandler }>
                <input type="text"     name="name" ref={ name } placeholder="username"/>
                <input type="password" name="pass" ref={ pass } placeholder="password"/>
                <input type="submit" value="Iniciar sesión" />
            </form>
        </>
    )
}