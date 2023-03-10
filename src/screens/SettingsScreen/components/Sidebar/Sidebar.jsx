import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from '../../../../features/settingsSlice'
import { DARK, LIGHT } from '../../../../utils/Theme/theme'
import { selectTheme } from '../../../../features/themeSlice'
import { Text } from '../../../../components/Text/Text'

const Tab = ({ label, activeTab, onClick, icon }) => {
  const theme = useSelector(selectTheme)
  return (
    <div
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
      <img src={icon} alt='icon' />
      <Text label={label} />
    </div>
  )
}

const tabs = [
  {
    id: 'id13r2453g24',
    label: 'theme',
    icon: 'https://cdn-icons-png.flaticon.com/512/8818/8818235.png',
  },
  {
    id: 'id13r24dafvrbwe53g24',
    label: 'language',
    icon: 'https://cdn-icons-png.flaticon.com/512/3898/3898840.png',
  },
]

export const Sidebar = ({ setChoice }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label)
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

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
      }}>
      <Text label={'Settings'} />
      {tabs.map(i => (
        <Tab
          key={i.id}
          activeTab={activeTab}
          label={i.label}
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
          src='https://cdn-icons-png.flaticon.com/512/130/130882.png'
          alt='icon'
        />
        <Text label={'back'} />
      </div>
    </div>
  )
}
