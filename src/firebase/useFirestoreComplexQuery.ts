import { useEffect, useState } from 'react';
import firebase from '../firebase';

function useFirestoreComplexQuery<TDoc>(
  collectionName: string,
  buildQuery: (collection: firebase.firestore.CollectionReference) => firebase.firestore.Query,
  oneTimeSnapshot: boolean = false
) {
  const [data, setData] = useState<Array<TDoc> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firestore = firebase.firestore();

    const collection = firestore.collection(collectionName);
    const query = buildQuery(collection);
    setLoading(true);

    if (oneTimeSnapshot) {
      query.get().then(snapshot => {
        const docData = snapshot.docs.map(docSnapshot => docSnapshot.data()) as Array<TDoc>;
        setData(docData);
        setLoading(false);
      });
    } else {
      const unsubscribe = query.onSnapshot(snapshot => {
        const docData = snapshot.docs.map(docSnapshot => docSnapshot.data()) as Array<TDoc>;
        setData(docData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [buildQuery, collectionName, oneTimeSnapshot]);

  return [data, loading];
}

export default useFirestoreComplexQuery;
