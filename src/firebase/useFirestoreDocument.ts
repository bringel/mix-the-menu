import { useEffect, useState } from 'react';
import firebase from '../firebase';

function useFirestoreDocument<TDoc>(
  collectionName: string,
  documentID: string,
  oneTimeSnapshot: boolean = false
): [TDoc | null | undefined, firebase.firestore.DocumentReference | null | undefined, boolean] {
  const [doc, setDoc] = useState<TDoc | null | undefined>(null);
  const [docRef, setDocRef] = useState<firebase.firestore.DocumentReference | null | undefined>(null);
  const [initialLoadFinished, setInitialLoadFinished] = useState(false);

  useEffect(() => {
    if (!!collectionName && !!documentID) {
      const firestore = firebase.firestore();

      const documentRef = firestore.collection(collectionName).doc(documentID);
      setDocRef(prev => {
        if (!prev?.isEqual(documentRef)) {
          return documentRef;
        } else {
          return prev;
        }
      });

      if (oneTimeSnapshot) {
        documentRef.get().then(snapshot => {
          const data = snapshot.data() as TDoc; //have to trust that we passed the right type for this collection
          setDoc(data);
          setInitialLoadFinished(true);
        });
      } else {
        const unsubscribe = documentRef.onSnapshot(snapshot => {
          const data = snapshot.data() as TDoc; //have to trust that we passed the right type for this collection
          setDoc(data);
          setInitialLoadFinished(true);
        });

        return () => unsubscribe();
      }
    }
  }, [collectionName, documentID, oneTimeSnapshot]);
  return [doc, docRef, initialLoadFinished];
}

export default useFirestoreDocument;
