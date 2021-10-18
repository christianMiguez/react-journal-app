import { collection, getDocs } from "@firebase/firestore"
import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
	const notesSnap = await getDocs(collection(db, `${uid}/journal/notes/`));
	const notes = []
 
	//itero sobre notes de FIRESTORE, AWESOME.
	notesSnap.forEach( snapHijo => {
		
		notes.push({
			id:snapHijo.id,
			...snapHijo.data()
		})
	})
	return notes

}

// export const loadNotes = async(uid) => {
//   notesSnap.forEach(snapHijo => {
//    notes.push({
//      id:snapHijo.id,
//      ...snapHijo.data()
//    })
//   })
//   return notes
// }