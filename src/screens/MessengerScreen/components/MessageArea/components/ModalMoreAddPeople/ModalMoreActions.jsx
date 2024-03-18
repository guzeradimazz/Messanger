import './ModalMoreActions2.styles.scss';
import React, { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectChoosedThread } from '../../../../../../features/choosedThreadSlice';
import { selectTheme } from '../../../../../../features/themeSlice';
import { selectLanguage } from '../../../../../../features/languageSlice';
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../../imgs/Icons';
import { db } from '../../../../../../firebase';
import { selectUser } from '../../../../../../features/userSlice';

export const ModalMoreAddPeople = ({ isModalShown, setModalShown }) => {
  const dispatch = useDispatch();
  const currentThread = useSelector(selectChoosedThread);

  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);
  const user = useSelector(selectUser)

  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [input, setInput] = useState('');
  const [isAdmin, setIsAdmin] = useState(null)

  const getUsers = async () => {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const threadsSnapshot = querySnapshot.docs.map((i) => ({
      id: i.id,
      ...i.data(),
    }));
    setUsers(threadsSnapshot);
    setFilteredUsers(threadsSnapshot);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (users) {
      const filtered = users.filter((i) => i.displayName.includes(input));
      setFilteredUsers(filtered);
    }
  }, [input]);

  const handleAddMember = async (memberId) => {
    const chatId = currentThread.choosedThread.id;
    try {
      // Получаем ссылку на документ чата
      const chatDocRef = doc(db, 'threads', chatId);

      // Получаем текущий список участников
      const chatDocSnapshot = await getDoc(chatDocRef);
      const currentMembers = chatDocSnapshot.data().members || [];

      // Проверяем, чтобы избежать дублирования участников
      if (!currentMembers.includes(memberId)) {
        // Обновляем массив участников, добавляя нового участника
        const updatedMembers = [...currentMembers, memberId];

        // Обновляем данные в Firestore
        await updateDoc(chatDocRef, { members: updatedMembers });

        alert(`Пользователь с ID ${memberId} добавлен в чат ${chatId}.`);
      } else {
        alert(
          `Пользователь с ID ${memberId} уже является участником чата ${chatId}.`
        );
      }
    } catch (error) {
      console.error('Ошибка при добавлении участника в чат:', error);
    }
  };
  return (
    <div
      className={
        theme.theme === 'light'
          ? 'modal-moreactions2 light__background '
          : 'modal-moreactions2 dark__background '
      }
      style={{
        opacity: isModalShown ? '1' : '0',
        visibility: isModalShown ? 'visible' : 'hidden',
        transform: `translateX(${isModalShown ? '0%' : '200%'})`,
        overflowY: 'scroll',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${
            theme.theme === 'light'
              ? DEFUALT_ICONS.Close_def
              : NIGHT_ICONS.Close_night
          })`,
        }}
        className='close'
        onClick={() => setModalShown((prev) => !prev)}
      />
      <input
        style={{
          width: '100%',
          border: '1px solid #000',
          height: 40,
          marginTop: 30,
          marginBottom: 10,
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {filteredUsers
        ? filteredUsers.map((i) => {
            return (
              <div
                onClick={() => handleAddMember(i.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 15,
                  borderRadius: 8,
                  border: '1px solid #000',
                }}
                key={i.id}
              >
                <img
                  style={{ width: 30, height: 30, borderRadius: 100 }}
                  src={i.photo}
                  alt='pic'
                />
                <p style={{ marginLeft: 10 }}>{i.displayName}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};
