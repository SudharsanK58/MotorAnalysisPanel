import { Outlet, Navigate } from 'react-router-dom'
const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
const PrivateRoutes = () => {
    
    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/auth-login"/>
    )
}

export default PrivateRoutes