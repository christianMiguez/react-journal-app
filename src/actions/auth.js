import { getAuth, signInWithPopup,signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import {startLoading, stopLoading} from './ui';
import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) => {
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
		}).catch((error) => {
			console.log('ERROR')
		});

		
	}
}

export const logout = () => ({
	type: types.logout
})