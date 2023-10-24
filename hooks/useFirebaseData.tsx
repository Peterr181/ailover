import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db, auth } from "../app/firebase";

const useFirebaseData = (collectionPath: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = () => {
      auth.onAuthStateChanged((user) => {
        if (auth.currentUser) {
          onValue(ref(db, collectionPath), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
              const dataArray = Object.values(data);
              setData(dataArray);
            }
            setLoading(false);
          });
        }
      });
    };

    fetchData();
  }, [collectionPath]);

  return { data, loading };
};

export default useFirebaseData;
