import { useEffect, useState } from 'react';
import firebase from '../firebase';

function useFirestoreComplexQuery<TDoc>(
  collectionName: string,
  buildQuery: (collection: firebase.firestore.CollectionReference) => firebase.firestore.Query,
  oneTimeSnapshot: boolean = false
): [Array<TDoc> | null, boolean] {
  const [data, setData] = useState<Array<TDoc> | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<firebase.firestore.Query | null>(null);

  useEffect(() => {
    const firestore = firebase.firestore();
    const collection = firestore.collection(collectionName);
    const inputQuery = buildQuery(collection);

    if ((query !== null && !query.isEqual(inputQuery)) || query === null) {
      setQuery(inputQuery);
    }
  }, [buildQuery, collectionName, query]);

  useEffect(() => {
    if (query !== null) {
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
    }
  }, [oneTimeSnapshot, query]);

  return [data, loading];
}

export default useFirestoreComplexQuery;
