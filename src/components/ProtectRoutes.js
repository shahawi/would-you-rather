import { Redirect } from 'react-router-dom'
import { BrowserRouter as  Route } from "react-router-dom";
import Login from './Login';



export const ProtectRoutes =  ({ auth, ...props }) => {
    const isAllowed = auth;
    return isAllowed
        ? (<Route {...props} />)
        : (<Redirect to="/Login" component = {Login}/>)
};

export default ProtectRoutes