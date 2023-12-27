import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"

export const Films = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if( !localStorage.getItem('usuarios')){
            navigate('/')
        }
    } , [])

    return(
        <>
            <h2>Films</h2>
        </>
    )
}