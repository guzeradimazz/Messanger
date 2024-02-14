import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import "./LoginScreen.styles.scss";
import { setUsers } from "../../features/usersSlice";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { auth } from "../../firebase";
import { Button } from "../../components/Button/Button";
import { selectTheme } from "../../features/themeSlice";
import { useSelector } from "react-redux";
import { DARK, LIGHT } from "../../utils/Theme/theme";
import { Text } from "../../components/Text/Text";
import { sendLog } from "../../utils/log";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const googleSignIn = async () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const analRef = collection(getFirestore(), "analytycs");
      await addDoc(analRef, {
        id: Math.random(),
        userId: user.user.id,
        action: "SUCCESS_LOGIN",
        timestamp: Timestamp.fromDate(new Date()).seconds,
      });
      dispatch(setUser(user));
      sendLog(user.uid, "USER LOGIN");
      return;
    }
    const firestore = getFirestore();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const newUser = {
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL,
        id: user.uid,
      };
      if (!userDoc.exists()) await setDoc(userRef, newUser);
      dispatch(setUser(newUser));
      localStorage.setItem("user", JSON.stringify(newUser));
      sendLog(user.uid, "USER LOGIN");
    } catch (error) {
      console.log("[SETTING USER ERROR]");
      console.log(error.message);
    }

    try {
      const usersCollectionRef = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      const users = [];
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        users.push(data);
      });
      dispatch(setUsers(users));
    } catch (error) {
      console.log("[GETTING USERS ERROR]");
      console.log(error.message);
    }
  };

  return (
    <div
      className="login"
      style={{
        backgroundColor:
          theme.theme === "light" ? LIGHT.background : DARK.background,
      }}
    >
      <div
        className="login__modal"
        style={{
          backgroundColor:
            theme.theme === "light" ? LIGHT.background : DARK.background,
        }}
      >
        <Text type={"h1"} label={"messenger"} />
        <Button onClick={googleSignIn} text={"login"} />
      </div>
    </div>
  );
};
