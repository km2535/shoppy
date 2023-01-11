import {
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  setDoc,
  doc,
  endBefore,
  limitToLast,
} from "firebase/firestore";
import moment from "moment/moment";
import db from "./firebase";

let documentSnapshots;
const limitData = 8;

export async function productList(setFirstPage) {
  setFirstPage && setFirstPage(true);
  const q = query(
    collection(db, "products"),
    orderBy("date", "desc"),
    limit(limitData)
  );
  const data = [];
  documentSnapshots = await getDocs(q);
  documentSnapshots.forEach((doc) => {
    data.push({ id: doc.id, value: doc.data() });
  });
  return data;
}

export async function nextProductList(setLastPage, setFirstPage) {
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  if (lastVisible !== undefined) {
    const next = query(
      collection(db, "products"),
      orderBy("date", "desc"),
      startAfter(lastVisible),
      limit(limitData)
    );
    documentSnapshots = await getDocs(next);
    const data = [];
    documentSnapshots.forEach((doc) => {
      data.push({ id: doc.id, value: doc.data() });
    });
    if (limitData !== documentSnapshots.docs.length) {
      console.log("마지막페이지");
      setLastPage(true);
    }
    return data;
  } else {
    productList(setFirstPage);
    return;
  }
}
export async function prevProductList(setFirstPage) {
  let prevVisible;
  const data = [];
  if (documentSnapshots.docs.length > 1) {
    prevVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - limitData];
  } else {
    prevVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  }
  if (prevVisible !== undefined) {
    const prev = query(
      collection(db, "products"),
      orderBy("date", "desc"),
      endBefore(prevVisible),
      limitToLast(limitData)
    );
    documentSnapshots = await getDocs(prev);
    documentSnapshots.forEach((doc) => {
      data.push({ id: doc.id, value: doc.data() });
    });
    return data;
  } else {
    productList(setFirstPage);
    return;
  }
}
export const uploadData = async (
  name,
  gender,
  option,
  price,
  id,
  imgUrl,
  describe
) => {
  const docData = {
    gender: gender,
    name: name,
    option: option,
    imgUrl: imgUrl,
    id: id,
    describe: describe,
    date: moment().format("YYYY MMMM Do, hh:mm:ss"),
    price: price,
  };
  await setDoc(doc(db, "products", id), docData);
};
