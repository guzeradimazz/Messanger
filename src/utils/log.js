import { addDoc, collection, getFirestore } from "firebase/firestore";

export const sendLog = async ( userId, log ) => {
  const logRef = collection(getFirestore(), "userActivity");
  await addDoc(logRef, {
    id: Math.random(),
    userId: userId,
    activity: log,
  });
}