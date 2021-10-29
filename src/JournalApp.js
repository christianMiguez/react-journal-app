import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store'; 
import { AppRouter } from './routers/AppRouter';

export const JournalApp = () => {
    return (
        // provider es un componente que provee de un contexto de datos. Éste contexto de datos es el que se usa para acceder a los datos de la aplicación que estan en el store de redux 
		<Provider store={ store }>
            {
                // aqui se usa el componente AppRouter para que se renderice la aplicación
            }
			<AppRouter />
        </Provider>
    )
}
