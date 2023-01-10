import {
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  setDoc,
  doc,
} from "firebase/firestore";
import moment from "moment/moment";
import db from "./firebase";

let documentSnapshots;
export async function productList() {
  const q = query(collection(db, "products"), orderBy("date", "asc"), limit(1));
  const data = [];
  documentSnapshots = await getDocs(q);
  documentSnapshots.forEach((doc) => {
    data.push({ id: doc.id, value: doc.data() });
  });
  return data;
}

export async function nextProductList() {
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  if (lastVisible !== undefined) {
    const next = query(
      collection(db, "products"),
      orderBy("date", "asc"),
      startAfter(lastVisible),
      limit(1)
    );
    documentSnapshots = await getDocs(next);
    const data = [];
    documentSnapshots.forEach((doc) => {
      data.push({ id: doc.id, value: doc.data() });
    });
    return data;
  } else {
    return;
  }
}

export const uploadData = async (name, gender, option, price, id, imgUrl) => {
  const docData = {
    gender: gender,
    name: name,
    option: option,
    imgUrl: imgUrl,
    date: moment().format("YYYY MMMM Do, hh:mm:ss"),
    price: price,
  };
  await setDoc(doc(db, "products", id), docData);
};
export const uploadBocket = async (
  name,
  gender,
  size,
  price,
  imgUrl,
  count,
  user,
  id
) => {
  const docData = {
    gender: gender,
    name: name,
    size: size,
    imgUrl: imgUrl,
    count: count,
    date: moment().format("YYYY MMMM Do, hh:mm:ss"),
    price: price,
    userId: user,
  };
  await setDoc(doc(db, "users", id), docData);
};
