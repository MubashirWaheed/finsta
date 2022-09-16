import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export const getSuggestions = async (loggedUserID) => {
  // getting following list
  // getting random users from firetore
  // return user that are not follwed and not not current user
  const docRef = doc(db, "users", loggedUserID);
  const docSnap = await getDoc(docRef);
  let following = docSnap.data().following;
  const userRef = collection(db, "users");
  const q = query(userRef, where("random", ">=", Math.random()), limit(5));
  const querySnapshot = await getDocs(q);
  console.log("hello");
  return querySnapshot.docs
    .map((obj) => ({
      ...obj.data(),
      id: obj.id,
    }))
    .filter(
      (profile) =>
        loggedUserID !== profile.id && !following.includes(profile.id)
    );
};
