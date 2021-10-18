import React from 'react';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { useSelector } from 'react-redux';
import { NothingSelected } from './NothingSelected';


export const JournalScreen = () => {

	const {active} = useSelector(state => state.notes)
    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            
            <Sidebar />


            <main>

				{ /**si la nota tiene algo, osea es diferente de null ternario*/
					(active) 
					? (<NoteScreen />)
					: ( <NothingSelected />)
				}

            </main>


        </div>
    )
}
