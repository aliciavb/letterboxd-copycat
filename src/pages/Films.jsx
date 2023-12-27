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
        <div className='Films'>
            <h2>Films</h2>
        </div>
    )
}