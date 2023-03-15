import React from 'react'
import { Button } from '../../../../../components/Button/Button'
import { DARK, LIGHT } from '../../../../../utils/Theme/theme'
import { Text } from '../../../../../components/Text/Text'
import { useSelector } from 'react-redux'
import { selectLanguage } from '../../../../../features/languageSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../../imgs/Icons'

export const SidebarTop = ({
  theme,
  user,
  setModalShow,
  searchInput,
  setSearchInput,
  setSidebarVisibility,
}) => {
  const language = useSelector(selectLanguage)
  return (
    <div
      className='sidebar__top'
      style={{
        background: `${theme === 'light' ? LIGHT.background : DARK.background}`,
      }}>
      <div className='user-info'>
        <img src={user.photo} alt='user' />
        <Text label={user.displayName} />
        <div
          onClick={() => setSidebarVisibility(prev => !prev)}
          className='sidebar__close-mobile'
          style={{
            backgroundImage: `url(${
              theme.theme === 'light'
                ? DEFUALT_ICONS.Close_def
                : NIGHT_ICONS.Close_night
            })`,
          }}
        />
      </div>
      <input
        style={{
          boxShadow: `${
            theme === 'light'
              ? `0px 0 10px ${LIGHT.shadow}`
              : `0px 0 10px ${DARK.shadow}`
          }`,
          background: `${
            theme === 'light' ? LIGHT.background : DARK.background
          }`,
          color: `${theme === 'light' ? LIGHT.textColor : DARK.textColor}`,
        }}
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        type='text'
        placeholder={language.language === 'en' ? 'Search' : 'Поиск'}
      />
      <Button
        onClick={() => setModalShow(prev => !prev)}
        text={language.language === 'en' ? 'create chat' : 'создать чат'}
      />
    </div>
  )
}
