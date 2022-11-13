import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/')
    }
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        
        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/register')
        }
    }, [])
    return (
        <div>
            Home Page

            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}