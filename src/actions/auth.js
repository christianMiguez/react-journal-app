import { getAuth, signInWithPopup,signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import {startLoading, stopLoading} from './ui';
import Swal from 'sweetalert2'
import { noteLogout } from './notes';

// aqui lo que se hace es que se crea una funcion que recibe una accion
export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) => {
		// se dispara el loading en el ui 
		dispatch(startLoading())
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(({user}) => {
				console.log(user)
				dispatch(login(user.uid, user.displayName))
				dispatch(stopLoading())


		}).catch((error) => {
			console.log({error})
			Swal.fire('Error', error.code, 'error')
			dispatch(stopLoading())
		})

    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
	return (dispatch) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then( async ({user}) => {
				 await updateProfile(auth.currentUser, {displayName: name})

				 dispatch(
					login(user.uid, user.displayName)
				)

			}).catch(e => {
				console.log(e)
			})
	}
}
 
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}
// aqui se crea la funcion que se dispara cuando el usuario se loguea, especificado en el types. solo necesita un parametro que es el uid del usuario y el nombre del usuario 
export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName
	}
})

export const startLogout = () => {
	return (dispatch) => {
		const auth = getAuth();
		signOut(auth).then(() => {
			dispatch(logout())
			dispatch(noteLogout())
		}).catch((error) => {
			console.log('ERROR')
		});

		
	}
}

export const logout = () => ({
	// el type es el que se dispara en el reducer y el payload es lo que se envia al reducer 
	type: types.logout
})