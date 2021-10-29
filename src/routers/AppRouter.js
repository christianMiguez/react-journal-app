import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { JournalScreen } from '../components/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

// exportamos el componente que es una funcion que se encarga de renderizar el componente Router
export const AppRouter = () => {

	// useDispatch nos permite acceder al dispatch de nuestro store. El dispatch es una funcion que nos permite ejecutar acciones. Estas acciones son las que se encargan de cambiar el estado de nuestro store.
	// No se puede acceder a los estados del store directamente, sino que se debe acceder a traves de una accion.
	const dispatch = useDispatch()

	// isLoggedIn es un estado que se actualiza cuando el usuario se loguea o desloguea. 
	const [checking, setChecking] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	// useEffect es una funcion que se ejecuta cuando el componente se monta
	useEffect(() => {
		// obtenemos el estado de autenticacion, este viene de firebase y es una promesa.
		const auth = getAuth();

		// crea observable
		// onAuthStateChanged es una funcion que se ejecuta cuando el usuario se loguea o desloguea.
		onAuthStateChanged(auth, async(user) => {
			// aqui verifica si el usuario esta logueado
			if (user?.uid) {
				// dispatch es una funcion que se ejecuta en el store para cambiar el estado. en este caso cambia el estado de autenticacion a true
				dispatch(login(user.uid, user.displayName))
				
				setIsLoggedIn(true)

				// dispatch es una funcion que se ejecuta en el store y le pasamos una accion que es la que queremos ejecutar en el store (startLoadingNotes) 
				dispatch(startLoadingNotes(user.uid))
			} else {
				setIsLoggedIn(false)
			}
			// cuando termina de ejecutarse la promesa, setChecking es una funcion que cambia el estado de checking a false
			setChecking(false)
		})
		
		
	}, 
	// es un array de dependencias, si no se pone nada, se ejecuta solo una vez y si se pone algo, se ejecuta cada vez que cambia algo en ese array 
	[dispatch, setChecking])

	// si el usuario no esta logueado, redireccionamos al login y si esta logueado redireccionamos al journal
	if (checking) {
		return (
			<h1>Espere...</h1>
		)
	}

    return (
		// BrowserRouter es un componente que permite navegar entre distintas rutas
        <Router>
            <div>
                <Switch>
					{// aqui se puede poner un componente que se ejecuta cuando el usuario no esta logueado.
					// si el usuario esta logueado, se ejecuta el componente PrivateRoute
					 }
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
						isAuthenticated={isLoggedIn}

                    />

                    <PrivateRoute 
                        exact
						isAuthenticated={isLoggedIn}
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
