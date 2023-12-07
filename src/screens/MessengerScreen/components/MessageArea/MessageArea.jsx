import React, { useEffect, useState } from "react";
import "./MessageArea.styles.scss";
import { TopBar } from "./components/TopBar/TopBar";
import { BottomBar } from "./components/BottomBar/BottomBar";
import { Messages } from "./components/Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { selectChoosedThread } from "../../../../features/choosedThreadSlice";
import { selectUser } from "../../../../features/userSlice";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { setMessages } from "../../../../features/currentMessages";
import { Plug } from "./components/Plug/Plug";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRecorder } from "../../../../hooks/useRecorder";

export const MessageArea = ({ isSidebarVisible, setSidebarVisibility }) => {
  const dispatch = useDispatch();
  const selectedThread = useSelector(selectChoosedThread);
  const user = useSelector(selectUser);

  const [isBot, setIsBot] = useState(false);

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  const getMessagesAndFixStates = () => {
    try {
      getMessages();
    } catch (error) {
      console.log(error);
    }
    setMessage("");
    setFile(null);
  };

  const checkSizeAudioBlob = async (blob) => {
    const response = await fetch(blob);
    const audioBlob = await response.blob();
    return audioBlob.size / 1000 > 100;
  };

  const sendAudioMessage = async () => {
    const threadId = selectedThread.choosedThread.id;
    const messagesRef = collection(
      getFirestore(),
      "threads",
      threadId,
      "messages"
    );
    if (audioURL) {
      if (await checkSizeAudioBlob(audioURL)) {
        const storage = getStorage();
        const response = await fetch(audioURL);
        const blob = await response.blob();
        const storageRef = ref(
          storage,
          "audio/" + audioURL.substring(audioURL.length - 36)
        );
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error(error);
          },
          () => {
            console.log("Upload successful");
            getDownloadURL(uploadTask.snapshot.ref).then((audioMessage) => {
              addDoc(messagesRef, {
                userId: user.user.id,
                message: message ? message : "",
                id: "id" + Math.random().toString(16).slice(2),
                date: Timestamp.fromDate(new Date()).seconds,
                audioURL: audioMessage,
              }).then((docRef) => {
                setDoc(
                  doc(
                    getFirestore(),
                    `threads/${threadId}/messages/${docRef.id}`
                  ),
                  {
                    messageId: docRef.id,
                  },
                  { merge: true }
                );
              });
            });
          }
        );
        getMessagesAndFixStates();
      } else {
        alert("Toooo short audio message dude...");
        return;
      }
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const threadId = selectedThread.choosedThread.id;
    const messagesRef = collection(
      getFirestore(),
      "threads",
      threadId,
      "messages"
    );
    if (user !== null && selectedThread !== null) {
      if (file) {
        const storage = getStorage();
        const storageRef = ref(storage, "files/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error(error);
          },
          () => {
            console.log("Upload successful");
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDoc(messagesRef, {
                userId: user.user.id,
                message: message ? message : "",
                id: "id" + Math.random().toString(16).slice(2),
                date: Timestamp.fromDate(new Date()).seconds,
                fileUrl: downloadURL,
                fileName: file.name,
              }).then((docRef) => {
                setDoc(
                  doc(
                    getFirestore(),
                    `threads/${threadId}/messages/${docRef.id}`
                  ),
                  {
                    messageId: docRef.id,
                  },
                  { merge: true }
                );
              });
            });
          }
        );
        getMessagesAndFixStates();
        return;
      } else {
        if (message) {
          await addDoc(messagesRef, {
            userId: user.user.id,
            message: message,
            id: "id" + Math.random().toString(16).slice(2),
            date: Timestamp.fromDate(new Date()).seconds,
          });
          getMessagesAndFixStates();
        }
      }
    }
  };

  const getMessages = async () => {
    if (selectedThread.isSelected) {
      if (isBot) {
        const threadId = selectedThread.choosedThread?.id;
        const messagesRef = collection(
          getFirestore(),
          "bots",
          threadId,
          "messages"
        );
        const messages = await getDocs(messagesRef);
        const unSortedMessages = [];
        messages.forEach((doc) => {
          const data = doc.data();
          unSortedMessages.push(data);
        });
        unSortedMessages.sort((a, b) => a.date - b.date);
        dispatch(setMessages(unSortedMessages));
      } else {
        const threadId = selectedThread.choosedThread?.id;
        const messagesRef = collection(
          getFirestore(),
          "threads",
          threadId,
          "messages"
        );
        const messages = await getDocs(messagesRef);
        const unSortedMessages = [];
        messages.forEach((doc) => {
          const data = doc.data();
          unSortedMessages.push(data);
        });
        unSortedMessages.sort((a, b) => a.date - b.date);
        dispatch(setMessages(unSortedMessages));
      }
    }
  };

  useEffect(() => {
    if (selectedThread.isSelected) {
      getMessages();
      if (
        selectedThread.choosedThread?.desc != "" &&
        selectedThread.choosedThread?.desc != undefined
      )
        setIsBot(true);
      else setIsBot(false);
    }
  }, [selectedThread.isSelected, selectedThread.choosedThread]);

  const sendAiMsg = async (e) => {
    e.preventDefault();
    const API = "Dpb8UO5YPeKd31MJOZ11jcmPuJtQN3H5DXEuIjm6SFXtYZR23Yfn4CJA69ak";
    if (message.trim() === "") {
      alert("Empty message");
      return null;
    }
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        key: API,
        prompt: message,
        negative_prompt: null,
        width: "512",
        height: "512",
        samples: "1",
        num_inference_steps: "20",
        seed: null,
        guidance_scale: 7.5,
        safety_checker: "yes",
        multi_lingual: "no",
        panorama: "no",
        self_attention: "no",
        upscale: "no",
        embeddings_model: null,
        webhook: null,
        track_id: null,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://stablediffusionapi.com/api/v3/text2img", requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          const threadId = selectedThread.choosedThread.id;
          const messagesRef = collection(
            getFirestore(),
            "bots",
            threadId,
            "messages"
          );
          const data = JSON.parse(result).output[0];
          await addDoc(messagesRef, {
            userId: user.user.id,
            message: message,
            id: "id" + Math.random().toString(16).slice(2),
            date: Timestamp.fromDate(new Date()).seconds,
          });
          await addDoc(messagesRef, {
            userId: user.user.id+1,
            message: data,
            id: "id" + Math.random().toString(16).slice(2),
            date: Timestamp.fromDate(new Date()).seconds,
          });
          getMessagesAndFixStates();
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="messagearea">
      <TopBar
        isSidebarVisible={isSidebarVisible}
        setSidebarVisibility={setSidebarVisibility}
      />
      {selectedThread.isSelected ? (
        <main style={{ height: "inherit" }}>
          <Messages />
          <BottomBar
            isRecording={isRecording}
            audioURL={audioURL}
            sendAudioMessage={sendAudioMessage}
            startRecording={startRecording}
            stopRecording={stopRecording}
            file={file}
            setFile={setFile}
            message={message}
            setMessage={setMessage}
            sendMessage={isBot ? sendAiMsg : sendMessage}
            isBot={isBot}
          />
        </main>
      ) : (
        <Plug />
      )}
    </div>
  );
};
