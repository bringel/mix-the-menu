import { useEffect, useState } from 'react';
import firebase from '../firebase';

function useFirestoreSimpleQuery<TDoc>(
  collectionName: string,
  fieldName: string | firebase.firestore.FieldPath,
  operator: firebase.firestore.WhereFilterOp,
  value: any,
  oneTimeSnapshot: boolean = false
): [Array<TDoc> | null, boolean] {
  const [data, setData] = useState<Array<TDoc> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firestore = firebase.firestore();

    const collection = firestore.collection(collectionName);
    const query = collection.where(fieldName, operator, value);
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
  }, [collectionName, fieldName, oneTimeSnapshot, operator, value]);

  return [data, loading];
}

export default useFirestoreSimpleQuery;
