import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

// PrivateRoute lo que hace es que si el usuario esta autenticado, entonces se le deja pasar, si no, se redirige al login y ...rest se le pasa al componente que se va a renderizar para que se le pueda pasar el resto de props 
export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    
    return (
        // Route es un componente que se encarga de renderizar el componente que se le pasa como prop. 
        <Route { ...rest }
            component={ (props) => (
                ( isAuthenticated )
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/auth/login" /> )
            )}
        
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
