import React from 'react'
import { Redirect , Route } from 'react-router-dom'
import { AuthContext } from '../App'

// class ProtectedRoute extends React.Component {
const ProtectedRoute = props => {
    // render() {
    const component = props.component;
    const context = React.useContext(AuthContext)
    const isAuthenticated = context.isAuthenticated
    let path = props.path
    console.log('@protectedPath, component: ' + component)
    console.log('@protectedRoute, isAuthenticted: ' + context.state.isAuthenticated)
    let authToken = localStorage.getItem('token');
    console.log('@protectedPath, authToken: ' + authToken)
    console.log('@protectedPath, path: ' + path)

    return (isAuthenticated ?
        <Route path={path} component={component} />
        // <Component />
        :
        <Redirect to={{ pathname: '/login/' }} />
    )
}
// }

export default ProtectedRoute;
