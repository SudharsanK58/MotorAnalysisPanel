import { Outlet, Navigate } from 'react-router-dom'
var isLoggedIn = sessionStorage.getItem("isLoggedIn");
const PrivateRoutes = () => {
    
    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/auth-login"/>
    )
}

export default PrivateRoutes