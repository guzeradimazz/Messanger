import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from '../../../../features/settingsSlice'
import { DARK, LIGHT } from '../../../../utils/Theme/theme'
import { selectTheme } from '../../../../features/themeSlice'
import { Text } from '../../../../components/Text/Text'
import { selectLanguage } from '../../../../features/languageSlice'
import { DEFUALT_ICONS, NIGHT_ICONS } from '../../../../imgs/Icons'

const Tab = ({ label, activeTab, onClick, icon, name, width }) => {
  const theme = useSelector(selectTheme)
  return (
    <li
      className={
        activeTab === label
          ? 'settings__sidebar_item-active'
          : 'settings__sidebar_item'
      }
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
      }}
      onClick={() => onClick(label)}>
      <img style={{ width: width }} src={icon} alt='icon' />
      <Text type={'h3'} label={name} />
    </li>
  )
}

export const Sidebar = ({ setChoice }) => {
  const language = useSelector(selectLanguage)
  const theme = useSelector(selectTheme)

  const tabs = [
    {
      id: 'id13r2453g24',
      label: 'theme',
      name: language.language === 'en' ? 'theme' : 'тема',
      icon:
        theme.theme === 'light'
          ? DEFUALT_ICONS.Light_def
          : NIGHT_ICONS.Night_night,
    },
    {
      id: 'id13r2453g242311',
      label: 'report',
      name: language.language === 'en' ? 'report' : 'жалоба',
      icon:
        theme.theme === 'light'
          ? 'https://cdn-icons-png.flaticon.com/512/2912/2912794.png'
          : 'https://cdn-icons-png.flaticon.com/512/2912/2912785.png',
    },
    {
      id: 'id13r24dafvrbwe53g24',
      label: 'language',
      name: language.language === 'en' ? 'speech' : 'язык',
      icon:
        theme.theme === 'light'
          ? DEFUALT_ICONS.Language_def
          : NIGHT_ICONS.Language_night,
      width: '25px',
    },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0].label)
  const dispatch = useDispatch()

  const handleToMessanger = () => {
    dispatch(setSettings(false))
    setChoice('')
  }

  const handleClick = label => {
    setActiveTab(label)
    setChoice(label)
  }
  return (
    <div
      className='settings__sidebar'
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
        boxShadow: `${
          theme.theme === 'light'
            ? `2px 0 10px ${LIGHT.shadow}`
            : `2px 0 10px ${DARK.shadow}`
        }`,
      }}>
      <Text
        type={'h3'}
        label={language.language === 'en' ? 'Settings' : 'Настройки'}
      />
      {tabs.map(i => (
        <Tab
          key={i.id}
          activeTab={activeTab}
          label={i.label}
          name={i.name}
          width={i.width}
          onClick={handleClick}
          icon={i.icon}
        />
      ))}
      <div
        className='settings__sidebar_item'
        onClick={handleToMessanger}
        style={{
          background: `${
            theme.theme === 'light' ? LIGHT.background : DARK.background
          }`,
        }}>
        <img
          src={
            theme.theme === 'light'
              ? DEFUALT_ICONS.Back_def
              : NIGHT_ICONS.Back_night
          }
          alt='icon'
        />
        <Text
          type={'h3'}
          label={language.language === 'en' ? 'back' : 'назад'}
        />
      </div>
    </div>
  )
}
