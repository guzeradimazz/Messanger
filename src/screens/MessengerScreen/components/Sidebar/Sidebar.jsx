import React, { useEffect, useState } from 'react';
import './Sidebar.styles.scss';
import { SidebarTop } from './components/SidebarTop';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../features/userSlice';
import { SidebarBottom } from './components/SidebarBottom';
import { SidebarThread } from './components/SidebarThread';
import { setThreads } from '../../../../features/threadsSlice';
import {
  setDoc,
  doc,
  getDocs,
  query,
  collection,
  Timestamp,
  onSnapshot,
  getFirestore,
  addDoc,
} from 'firebase/firestore';
import { db } from '../../../../firebase';
import { Modal } from './components/Modal/Modal';
import { selectTheme } from '../../../../features/themeSlice';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { ModalBot } from './components/ModalBot/ModalBot';
import { setBots } from '../../../../features/botsSlice';
import { sendLog } from '../../../../utils/log';
import { Button } from '../../../../components/Button/Button';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const Sidebar = ({
  isSidebarVisible,
  setSidebarVisibility,
  isGenuis,
  setIsGenuis,
}) => {
  const dispatch = useDispatch();
  const [isModalShow, setModalShow] = useState(true);
  const [isModalShowBot, setModalShowBot] = useState(true);
  const [threadName, setThreadName] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentThreads, setCurrentThreads] = useState([]);
  const [fileModal, setFileModal] = useState(null);

  const { height, width } = useWindowDimensions();

  const [botDesc, setBotDesc] = useState('');
  const [currentBots, setCurrentBots] = useState([]);

  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const getThreads = async () => {
    const q = query(collection(db, 'threads'));

    const querySnapshot = await getDocs(q);
    const threadsSnapshot = querySnapshot.docs.map((i) => ({
      id: i.id,
      ...i.data(),
    }));
    threadsSnapshot.sort((a, b) => b.date - a.date);
    dispatch(setThreads(threadsSnapshot));
    setCurrentThreads(threadsSnapshot);
  };

  const getBots = async () => {
    const q = query(collection(db, 'bots'));

    const querySnapshot = await getDocs(q);
    const threadsSnapshot = querySnapshot.docs.map((i) => ({
      id: i.id,
      ...i.data(),
    }));
    const snaps = threadsSnapshot
      .filter((i) => i.userId === user.user.id)
      .sort((a, b) => b.date - a.date);
    console.log('====================================');
    console.log(snaps);
    console.log('====================================');
    dispatch(setBots(snaps));
    setCurrentThreads(snaps);
  };

  useEffect(() => {
    //bots
    const botsRef = collection(db, 'bots');
    const botsQ = query(botsRef);
    const unsubscribeBots = onSnapshot(botsQ, (snapshot) => {
      const bots = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const snaps = bots
        .filter((i) => i.userId === user.user.id)
        .sort((a, b) => a.date - b.date);
      dispatch(setBots(snaps));
      setCurrentBots(snaps);
    });

    //chats
    const threadsRef = collection(db, 'threads');
    const threadsQuery = query(threadsRef);
    const unsubscribe = onSnapshot(threadsQuery, (snapshot) => {
      const threads = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      threads.sort((a, b) => a.date - b.date);
      dispatch(setThreads(threads));
      setCurrentThreads(threads);
    });

    return () => {
      unsubscribe();
      unsubscribeBots();
    };
  }, [user]);

  useEffect(() => {
    if (searchInput) {
      const searchArray = currentThreads.filter((item) =>
        item.name.toLowerCase().includes(`${searchInput.toLowerCase()}`)
      );
      const searchBots = currentBots.filter((item) =>
        item.name.toLowerCase().includes(`${searchInput.toLowerCase()}`)
      );
      setCurrentBots(searchBots);
      setCurrentThreads(searchArray);
    } else {
      getBots();
      getThreads();
    }
  }, [searchInput]);

  const handleAddThread = async () => {
    if (fileModal === null && threadName.trim()) {
      const newThread = {
        name: threadName,
        userId: user.user.id,
        date: Timestamp.fromDate(new Date()).seconds,
      };
      await setDoc(doc(db, 'threads', newThread.name), newThread);
      getThreads();
      sendLog(user.user.id, 'USER CREATE TREAD' + threadName);
      setThreadName('');
    } else if (fileModal) {
      const storage = getStorage();
      const storageRef = ref(storage, 'filesthreads/' + fileModal.name);
      const uploadTask = uploadBytesResumable(storageRef, fileModal);
      const threadRef = collection(getFirestore(), 'threads');
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error(error);
        },
        () => {
          sendLog(user.user.id, 'USER CREATE TREAD' + threadName);
          console.log('Upload successful');
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(threadRef, {
              name: threadName,
              userId: user.user.id,
              date: Timestamp.fromDate(new Date()).seconds,
              file: downloadURL,
            });
          });
        }
      );
      setModalShow((prev) => !prev);
      setFileModal(null);
    } else {
      alert('Please, write thread name!');
      return;
    }
    setModalShow(false);
  };

  const handleCreateBot = async () => {
    if (fileModal === null && threadName.trim() && botDesc.trim()) {
      const newThread = {
        name: threadName,
        userId: user.user.id,
        date: Timestamp.fromDate(new Date()).seconds,
        desc: botDesc,
      };
      await setDoc(doc(db, 'bots', newThread.name), newThread);
      getBots();
      sendLog(user.user.id, 'USER CREATE BOT' + threadName);
      setThreadName('');
    } else if (fileModal) {
      const storage = getStorage();
      const storageRef = ref(storage, 'botsthreads/' + fileModal.name);
      const uploadTask = uploadBytesResumable(storageRef, fileModal);
      const threadRef = collection(getFirestore(), 'bots');
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error(error);
        },
        () => {
          sendLog(user.user.id, 'USER CREATE BOT' + threadName);
          console.log('Upload successful');
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            addDoc(threadRef, {
              name: threadName,
              userId: user.user.id,
              date: Timestamp.fromDate(new Date()).seconds,
              file: downloadURL,
              desc: botDesc,
            });
          });
        }
      );
      setModalShowBot((prev) => !prev);
      setFileModal(null);
    } else {
      alert('Please, fill all inputs!');
      return;
    }
    setModalShowBot(false);
  };

  const handleOpenGenuis = () => {
    setIsGenuis(!isGenuis);

    if (width <= 425) {
      setSidebarVisibility(false);
    }
  };

  return (
    <section
      className={
        theme.theme === 'light'
          ? 'sidebar light__background light__shadow'
          : 'sidebar dark__background dark__shadow'
      }
      style={{
        transform: `translateX(${isSidebarVisible ? '0' : '-200%'})`,
        opacity: `${isSidebarVisible ? '1' : '0'}`,
        zIndex: isSidebarVisible ? '123' : '-21',
      }}
    >
      <SidebarTop
        setSidebarVisibility={setSidebarVisibility}
        theme={theme.theme}
        user={user.user}
        setModalShow={setModalShow}
        setModalShowBot={setModalShowBot}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div
        style={{
          width: '100%',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button onClick={handleOpenGenuis} text={'open genuis'} />
      </div>
      <SidebarThread
        setIsGenuis={setIsGenuis}
        threads={currentThreads}
        bots={currentBots}
        setSidebarVisibility={setSidebarVisibility}
      />
      <SidebarBottom />
      <Modal
        fileModal={fileModal}
        setFileModal={setFileModal}
        handleAddThread={handleAddThread}
        setModalShow={setModalShow}
        threadName={threadName}
        setThreadName={setThreadName}
        isModalShow={isModalShow}
      />
      <ModalBot
        fileModal={fileModal}
        setFileModal={setFileModal}
        handleAddThread={handleCreateBot}
        setModalShow={setModalShowBot}
        threadName={threadName}
        setThreadName={setThreadName}
        isModalShow={isModalShowBot}
        botDesc={botDesc}
        setBotDesc={setBotDesc}
      />
    </section>
  );
};
