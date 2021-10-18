import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

	const dispatch = useDispatch()
	const {active} = useSelector(state => state.notes)

	const handleSave = () => {
		dispatch(startSaveNote(active))
	}
	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click()
	}
	const handleFileChange = (e) => {
		const file = e.target.files[0]
		if ( file) {
			dispatch(startUploading(file))
		} else {

		}
	}
	
    return (
        <div className="notes__appbar animate__animated animate__fadeIn animate__faster">
            <span>28 de agosto 2020</span>

			<input type="file" style={{ display: 'none'}} onChange={handleFileChange} id="fileSelector" name="file"/>

            <div>
                <button className="btn" onClick={handlePictureClick}>
                    Picture
                </button>

                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
