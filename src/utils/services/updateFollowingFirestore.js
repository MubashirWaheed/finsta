import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const updateFollowingArray = async (loggedUserID, followedID) => {
  const docRef = doc(db, "users", loggedUserID);
  const docSnap = await getDoc(docRef);
  let following = [...docSnap.data().following];
  following.push(followedID);
  await updateDoc(docRef, {
    following: following,
  });
  return following;
};
