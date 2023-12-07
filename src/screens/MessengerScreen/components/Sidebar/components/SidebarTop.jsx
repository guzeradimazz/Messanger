import React from "react";
import { Button } from "../../../../../components/Button/Button";
import { Text } from "../../../../../components/Text/Text";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../../../../features/languageSlice";
import { DEFUALT_ICONS, NIGHT_ICONS } from "../../../../../imgs/Icons";

export const SidebarTop = ({
  theme,
  user,
  setModalShow,
  searchInput,
  setSearchInput,
  setSidebarVisibility,
  setModalShowBot,
}) => {
  const language = useSelector(selectLanguage);
  return (
    <header
      className={
        theme === "light"
          ? "sidebar__top light__background light__shadow"
          : "sidebar__top dark__background dark__shadow"
      }
    >
      <div className="user-info">
        {user.photo !== "" && <img src={user.photo} alt="user" />}
        <Text type={"h3"} label={user.displayName} />
        <div
          onClick={() => setSidebarVisibility((prev) => !prev)}
          className="sidebar__close-mobile"
          style={{
            backgroundImage: `url(${
              theme === "light"
                ? DEFUALT_ICONS.Close_def
                : NIGHT_ICONS.Close_night
            })`,
          }}
        />
      </div>
      <input
        className={
          theme === "light"
            ? "light__color light__background light__shadow"
            : "dark__color dark__background dark__shadow"
        }
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder={language.language === "en" ? "Search" : "Поиск"}
      />
      <Button
        onClick={() => setModalShow((prev) => !prev)}
        text={language.language === "en" ? "create chat" : "создать чат"}
      />
      <Button
        onClick={() => setModalShowBot((prev) => !prev)}
        text={language.language === "en" ? "create chatbot" : "создать бота"}
      />
    </header>
  );
};
