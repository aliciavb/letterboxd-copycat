import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { Header } from "../components/Header/Header"

export const Films = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if( !localStorage.getItem('usuarios')){
            navigate('/')
        }
    } , [])

    return(
        <div className='Films'>
            <Header />
            <h2>Films</h2>
        </div>
    )
}