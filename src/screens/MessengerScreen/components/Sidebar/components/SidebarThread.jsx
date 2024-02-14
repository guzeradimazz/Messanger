import React from "react";
import { Thread } from "./Thread/Thread";
import { useDispatch, useSelector } from "react-redux";
import { setChoosedThread } from "../../../../../features/choosedThreadSlice";
import { selectTheme } from "../../../../../features/themeSlice";
import { selectLanguage } from "../../../../../features/languageSlice";

export const SidebarThread = ({ threads, setSidebarVisibility, bots, setIsGenuis }) => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const theme = useSelector(selectTheme);

  const setChoosedThreadToMessages = (thread) => {
    if (window.screen.width <= 500) setSidebarVisibility(false);
    dispatch(setChoosedThread(thread));
    setIsGenuis(false)
  };
  return (
    <ul
      className={
        theme.theme === "light"
          ? "threads light__background light__shadow"
          : "threads dark__background dark__shadow"
      }
    >
      <h1 style={{ color: "rgb(139, 182, 255)" }}>
        {language.language === "en" ? "Threads" : "Чаты"}
      </h1>
      {threads.map((i) => (
        <Thread
          theme={theme.theme}
          onClick={() => setChoosedThreadToMessages(i)}
          key={i.id}
          id={i.id}
          name={i.name}
          date={i.date}
          file={i.file}
        />
      ))}
      <h1 style={{ color: "rgb(139, 182, 255)" }}>
        {language.language === "en" ? "Bots" : "Боты"}
      </h1>
      {bots.map((i) => (
        <Thread
          theme={theme.theme}
          onClick={() => setChoosedThreadToMessages(i)}
          key={i.id}
          id={i.id}
          name={i.name}
          date={i.date}
          file={i.file}
        />
      ))}
    </ul>
  );
};
