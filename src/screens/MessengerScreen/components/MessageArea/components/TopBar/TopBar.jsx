import React, { useEffect, useState } from 'react';
import './TopBar.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChoosedThread,
  removeChoosedThread,
} from '../../../../../../features/choosedThreadSlice';
import { ModalMoreActions } from '../ModalMoreActions/ModalMoreActions';
import { setMessages } from '../../../../../../features/currentMessages';
import { Text } from '../../../../../../components/Text/Text';
import { selectTheme } from '../../../../../../features/themeSlice';
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../../imgs/Icons';
import { ModalMoreAddPeople } from '../ModalMoreAddPeople/ModalMoreActions';
import { ModalMoreRemovePeople } from '../ModalMoreRemovePeople/ModalMoreRemovePeople';
import { selectUser } from '../../../../../../features/userSlice';

export const TopBar = ({ isSidebarVisible, setSidebarVisibility }) => {
  const selectedThread = useSelector(selectChoosedThread);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const thread = useSelector(selectChoosedThread);

  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    if (thread.choosedThread?.admin === user.user.id) setAdmin(true);
    else setAdmin(false);
  }, [user, thread]);
  const [isModalShown, setModalShown] = useState(false);
  const [isModalShown2, setModalShown2] = useState(false);
  const [isModalShown3, setModalShown3] = useState(false);

  const deleteSelectionThread = () => {
    dispatch(removeChoosedThread(null));
    setModalShown(false);
    dispatch(setMessages([]));
  };
  return (
    <header
      className={
        theme.theme === 'light'
          ? 'messagearea__top light__shadow'
          : 'messagearea__top dark__shadow'
      }
    >
      <button
        style={{
          opacity: !selectedThread.isSelected ? '0' : '1',
          transition: 'all 0.3s',
          boxShadow: 'none',
          visibility: !selectedThread.isSelected ? 'hidden' : 'visible',
          backgroundImage: `url(${
            theme.theme === 'light'
              ? DEFUALT_ICONS.Back_def
              : NIGHT_ICONS.Back_night
          })`,
        }}
        className='back-icon'
        onClick={deleteSelectionThread}
      />
      {isSidebarVisible ? null : (
        <button
          onClick={() => setSidebarVisibility((prev) => !prev)}
          className='sidebar__close-mobile'
          style={{
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Burger_def
                : NIGHT_ICONS.Burger_night
            })`,
          }}
        />
      )}
      <Text
        type={'h1'}
        label={
          selectedThread.choosedThread
            ? selectedThread.choosedThread.name
            : 'Messenger'
        }
        classname={'messagearea__top-headText'}
      />
      {admin ? (
        <button
          style={{
            opacity: !selectedThread.isSelected ? '0' : '1',
            transition: 'all 0.3s',
            visibility: !selectedThread.isSelected ? 'hidden' : 'visible',
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Dots_def
                : NIGHT_ICONS.Dots_night
            })`,
          }}
          className='dots-icon'
          onClick={() => setModalShown((prev) => !prev)}
        />
      ) : null}
      <ModalMoreActions
        isModalShown={isModalShown}
        setModalShown={setModalShown}
        setModalShown2={setModalShown2}
        setModalShown3={setModalShown3}
      />
      <ModalMoreAddPeople
        isModalShown={isModalShown2}
        setModalShown={setModalShown2}
      />
      <ModalMoreRemovePeople
        isModalShown={isModalShown3}
        setModalShown={setModalShown3}
      />
    </header>
  );
};
