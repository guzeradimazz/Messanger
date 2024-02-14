import React from "react";
import { Button } from "../../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "../../../../features/themeSlice";
import { DARK, LIGHT } from "../../../../utils/Theme/theme";
import {
  selectLanguage,
  setLanguage,
} from "../../../../features/languageSlice";
import { selectUser } from "../../../../features/userSlice";
import { Bubble } from "../../../../components/Bubble/Bubble";
import emailjs from "@emailjs/browser";
import {
  collection,
  getFirestore,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { sendLog } from "../../../../utils/log";

const ThemeModify = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);
  const user = useSelector(selectUser);

  const handleChangeTheme = () => {

    sendLog(user.user.id, "USER CHANGE THEME");
    if (theme.theme === "light") dispatch(setTheme("dark"));
    else if (theme.theme === "dark") dispatch(setTheme("light"));
    else return null;
  };
  return (
    <div className="themeModify">
      <Button
        onClick={handleChangeTheme}
        text={language.language === "en" ? "Switch Theme" : "Изменить тему"}
      />
    </div>
  );
};

const LanguageModify = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const handleChangeLanguage = (type) => {
    dispatch(setLanguage(type));
    sendLog(user.user.id, "USER CHANGE LANGUAGE TO " + type);
  }
  return (
    <div className="languageModify">
      <Button onClick={() => handleChangeLanguage("en")} text={"English"} />
      <Button onClick={() => handleChangeLanguage("ru")} text={"Русский"} />
    </div>
  );
};

const BubbleWrapper = () => {
  return (
    <div className="bubble">
      <Bubble />
    </div>
  );
};

const ReportSend = () => {
  const user = useSelector(selectUser);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (
      document.getElementById("emailForm").value === "" ||
      document.getElementById("emailText").value === ""
    ) {
      alert("fill all fields");
      return null;
    }
    emailjs.sendForm(
      "service_td2wdzp",
      "template_exkvwuu",
      e.target,
      "dHCyn07M0V4bPsc53"
    );
    alert("success sended");
    const reportRef = collection(getFirestore(), "reports");
    await addDoc(reportRef, {
      userId: user.user.id,
      reportDesc: document.getElementById("emailText").value,
      reportH: document.getElementById("emailForm").value,
      timestamp: Timestamp.fromDate(new Date()).seconds,
    });
    sendLog(user.user.id, "USER SEND REPORT " + document.getElementById("emailForm").value);
    document.getElementById("emailForm").value = "";
    document.getElementById("emailText").value = "";
  };
  return (
    <div style={{ alignItems: "center", justifyContent: "center", zIndex: 20 }}>
      <form
        onSubmit={sendEmail}
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 30,
          borderRadius: 20,
        }}
      >
        <label
          htmlFor="email_form"
          style={{ textAlign: "left", width: "100%" }}
        >
          Email:{" "}
        </label>
        <input
          type="text"
          name="email_form"
          id="emailForm"
          style={{
            borderRadius: 10,
            borderColor: "rgb(26, 34, 44)",
            height: 36,
            width: 200,
            paddingLeft: 10,
          }}
        ></input>
        <label
          htmlFor="email_text"
          style={{ marginTop: 20, textAlign: "left", width: "100%" }}
        >
          Text:{" "}
        </label>
        <input
          type="text"
          name="email_text"
          id="emailText"
          style={{
            borderRadius: 10,
            borderColor: "rgb(26, 34, 44)",
            height: 36,
            width: 200,
            paddingLeft: 10,
          }}
        ></input>
        <button
          type="submit"
          style={{
            fontSize: 18,
            color: "#fff",
            backgroundColor: "rgb(26, 34, 44)",
            borderRadius: 20,
            padding: "10px 20px",
            marginTop: 20,
          }}
        >
          send
        </button>
      </form>
    </div>
  );
};
export const ToModify = ({ choice }) => {
  const theme = useSelector(selectTheme);
  return (
    <main
      className="settings__modify"
      style={{
        background: `${
          theme.theme === "light" ? LIGHT.background : DARK.background
        }`,
      }}
    >
      <BubbleWrapper />
      {choice === "theme" ? <ThemeModify /> : null}
      {choice === "language" ? <LanguageModify /> : null}
      {choice === "report" ? <ReportSend /> : null}
    </main>
  );
};
