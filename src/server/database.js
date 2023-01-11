import {
  child,
  get,
  onValue,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import moment from "moment";
import { database } from "./firebase";

export const uploadBocket = async (
  name,
  gender,
  size,
  price,
  imgUrl,
  user,
  id,
  describe,
  uid
) => {
  const docData = {
    gender: gender,
    name: name,
    size: size,
    imgUrl: imgUrl,
    date: moment().format("YYYY MMMM Do, hh:mm:ss"),
    price: price,
    userId: user,
    id: id,
    count: 1,
    describe: describe,
  };
  await set(ref(database, "carts/" + uid + "/" + id), docData);
};

let data;
export const readBocket = async (uid) => {
  const dataRef = ref(database);
  await get(child(dataRef, `carts/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = Object.values(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((err) => console.log(err));

  return data;
};

export const updateBocket = async (uid, id, count) => {
  const docData = {
    count: count,
  };
  await update(ref(database, "carts/" + uid + "/" + id), docData);
};

export const readListen = async (uid, setTotalPrice, setTotal) => {
  const dataRef = ref(database, "carts/" + uid);
  const initialValue = 0;

  onValue(dataRef, (snap) => {
    const arr = Object.values(snap.val());
    const cnt = [];
    const price = [];
    arr.map((v) => cnt.push(v.count));
    arr.map((v) => price.push(v.count * v.price));

    setTotalPrice(price.reduce((pre, cur) => pre + cur, initialValue));
    setTotal(cnt.reduce((cur, pre) => cur + pre, initialValue));
  });
};

export const deleteCart = async (uid, id) => {
  await remove(ref(database, "carts/" + uid + "/" + id));
};
