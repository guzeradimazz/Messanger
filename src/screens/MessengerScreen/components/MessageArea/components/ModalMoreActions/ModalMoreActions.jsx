import './ModalMoreActions.styles.scss';
import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeChoosedThread,
  selectChoosedThread,
} from '../../../../../../features/choosedThreadSlice';
import { selectTheme } from '../../../../../../features/themeSlice';
import { Text } from '../../../../../../components/Text/Text';
import { selectLanguage } from '../../../../../../features/languageSlice';
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../../imgs/Icons';
import { selectUser } from '../../../../../../features/userSlice';

export const ModalMoreActions = ({
  isModalShown,
  setModalShown,
  setModalShown2,
  setModalShown3
}) => {
  const currentThread = useSelector(selectChoosedThread);
  const user = useSelector(selectUser);
  const [isAdmin, setIsAdmin] = useState(null);

  const getData = async () => {
    const currentUser = user.user.id;
    if (currentThread.choosedThread.admin === currentUser) {
      setIsAdmin(true);
    } else setIsAdmin(false);
  };
  useEffect(() => {
    getData();
  }, [currentThread]);
  const dispatch = useDispatch();
  const handleDeleteThread = async (threadId) => {
    const db = getFirestore();
    const threadRef = doc(collection(db, 'threads'), threadId);
    await deleteDoc(threadRef);
    dispatch(removeChoosedThread(null));
    setModalShown(false);

    const threadRef2 = doc(collection(db, 'bots'), threadId);
    await deleteDoc(threadRef2);
    dispatch(removeChoosedThread(null));
    setModalShown(false);
  };
  const handleAddPeople = () => {
    setModalShown2(true);
    setModalShown(false);
  };
  const handleRemovePeople = () => {
    setModalShown3(true);
    setModalShown(false);
  };

  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);
  return (
    <div
      className={
        theme.theme === 'light'
          ? 'modal-moreactions light__background '
          : 'modal-moreactions dark__background '
      }
      style={{
        opacity: isModalShown ? '1' : '0',
        visibility: isModalShown ? 'visible' : 'hidden',
        transform: `translateX(${isModalShown ? '0%' : '200%'})`,
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
      <ul>
        <li onClick={() => handleDeleteThread(currentThread.choosedThread.id)}>
          <div
            style={{
              backgroundImage: `url(${
                theme.theme === 'light'
                  ? DEFUALT_ICONS.Trash_def
                  : NIGHT_ICONS.Trash_night
              })`,
            }}
            className='trash'
          />
          <Text
            type={'p'}
            label={language.language === 'en' ? 'delete' : 'удалить'}
          />
        </li>
        {isAdmin ? (
          <>
          <li onClick={handleAddPeople}>
            <div
              style={{
                backgroundImage: `url(${
                  theme.theme === 'light'
                    ? DEFUALT_ICONS.Plus_def
                    : NIGHT_ICONS.Plus_night
                })`,
              }}
              className='trash'
            />
            <Text
              type={'p'}
              label={language.language === 'en' ? 'invite' : 'добавить'}
            />
          </li>
          <li onClick={handleRemovePeople}>
            <div
              style={{
                backgroundImage: `url(${
                  theme.theme === 'light'
                  ? DEFUALT_ICONS.Trash_def
                  : NIGHT_ICONS.Trash_night
                })`,
              }}
              className='trash'
            />
            <Text
              type={'p'}
              label={language.language === 'en' ? 'remove' : 'убрать'}
            />
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};
