import { useState } from 'react';

// este hook por defecto es una función donde recibe un objeto con las propiedades que queremos que tenga el formulario
export const useForm = ( initialState = {} ) => {
    
    // el estado del formulario.
    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {

        setValues( newFormState );
    }

    
    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    // retornamos el estado del formulario y la función para actualizarlo
    return [ values, handleInputChange, reset ];

}