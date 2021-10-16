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

export const AppRouter = () => {

	const dispatch = useDispatch()

	const [checking, setChecking] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const auth = getAuth();

		// crea observable
		onAuthStateChanged(auth, (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName))
				setIsLoggedIn(true)
			} else {
				setIsLoggedIn(false)
			}
			setChecking(false)
		})
		
	}, [dispatch, setChecking])

	if (checking) {
		return (
			<h1>Espere...</h1>
		)
	}

    return (
        <Router>
            <div>
                <Switch>
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
