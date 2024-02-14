import React, { useEffect, useState } from "react";
import "./Message.styles.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../../../../features/themeSlice";
import { saveAs } from "file-saver";
import { Text } from "../../../../../../../components/Text/Text";
import DownloadImg from './download.png'
import CrossImg from './cross.png'

export const Message = ({
  message,
  photo,
  isCurrentUser,
  name,
  picture,
  audioURL,
}) => {
  const [isBot, setIsBot] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const checkIsBot = () => {
    const pattern = /^https:\/\/.*\.png$/;
    if (pattern.test(message)) {
      setIsBot(true);
    } else {
      setIsBot(false);
    }
  };
  useEffect(() => {
    checkIsBot();
  }, [message]);
  const theme = useSelector(selectTheme);

  const handleClickPicture = (pic) => {
    setModalImg(pic);
    setModalVisible(true);
  };

  const handleClosePicture = () => {
    setModalImg(null);
    setModalVisible(false);
  };

  const handleDownloadImg = () => {
    saveAs(modalImg, "messanger_image.jpg");
  };

  if (isBot) {
    return (
      <div
        className={"message__wrapper"}
        style={{
          flexDirection: isCurrentUser ? "row-reverse" : "row",
        }}
      >
        {modalVisible && (
          <div className="modalImg">
            <img
              onClick={handleClosePicture}
              className="modalImgCross"
              src={CrossImg}
            />
            <img
              onClick={handleDownloadImg}
              className="modalImgDownload"
              src={DownloadImg}
            />
            <img src={modalImg} alt="" />
          </div>
        )}
        <div
          className={
            theme.theme === "light"
              ? "message light__background light__shadow"
              : "message dark__background dark__shadow"
          }
          style={{
            flexDirection: isCurrentUser ? "row-reverse" : "row",
          }}
        >
          <button onClick={() => handleClickPicture(message)}>
            <img src={message} className="message__content_img" alt="picture" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={"message__wrapper"}
      style={{
        flexDirection: isCurrentUser ? "row-reverse" : "row",
      }}
    >
      <div
        className={
          theme.theme === "light"
            ? "message light__background light__shadow"
            : "message dark__background dark__shadow"
        }
        style={{
          flexDirection: isCurrentUser ? "row-reverse" : "row",
        }}
      >
        {photo ? (
          <img src={photo} alt="avatar" />
        ) : (
          <div
            style={{
              width: 50,
              height: 50,
              backgroundColor: "black",
              borderRadius: 100,
            }}
          />
        )}
        <div className="message__content">
          {picture && (
            <>
              {modalVisible && (
                <div className="modalImg">
                  <img
                    onClick={handleClosePicture}
                    className="modalImgCross"
                    src={CrossImg}
                  />
                  <img
                    onClick={handleDownloadImg}
                    className="modalImgDownload"
                    src={DownloadImg}
                  />
                  <img  src={modalImg} alt="" />
                </div>
              )}
              <img
                onClick={() => handleClickPicture(picture)}
                src={picture}
                className="message__content_img"
                alt="picture"
              />
            </>
          )}
          {audioURL && (
            <audio controls onClick={(e) => e.target.play()}>
              <source src={audioURL}></source>
            </audio>
          )}
          {message === 0 ? null : <Text type={"p"} label={message} />}
        </div>
        <p className="message__displayName">{name}</p>
      </div>
    </div>
  );
};
