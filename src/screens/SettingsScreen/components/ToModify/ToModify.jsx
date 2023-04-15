import React from 'react'
import { Button } from '../../../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, setTheme } from '../../../../features/themeSlice'
import { DARK, LIGHT } from '../../../../utils/Theme/theme'
import { selectLanguage, setLanguage } from '../../../../features/languageSlice'
import { Bubble } from '../../../../components/Bubble/Bubble'

const ThemeModify = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  const handleChangeTheme = () => {
    if (theme.theme === 'light') dispatch(setTheme('dark'))
    else if (theme.theme === 'dark') dispatch(setTheme('light'))
    else return null
  }
  return (
    <div className='themeModify'>
      <Button
        onClick={handleChangeTheme}
        text={language.language === 'en' ? 'Switch Theme' : 'Изменить тему'}
      />
    </div>
  )
}

const LanguageModify = () => {
  const dispatch = useDispatch()
  const handleChangeLanguage = type => dispatch(setLanguage(type))
  return (
    <div className='languageModify'>
      <Button onClick={() => handleChangeLanguage('en')} text={'English'} />
      <Button onClick={() => handleChangeLanguage('ru')} text={'Русский'} />
    </div>
  )
}

const BubbleWrapper = () => {
  return (
    <div className='bubble'>
      <Bubble />
    </div>
  )
}

export const ToModify = ({ choice }) => {
  const theme = useSelector(selectTheme)
  return (
    <main
      className='settings__modify'
      style={{
        background: `${
          theme.theme === 'light' ? LIGHT.background : DARK.background
        }`,
      }}>
      <BubbleWrapper />
      {choice === 'theme' ? <ThemeModify /> : null}
      {choice === 'language' ? <LanguageModify /> : null}
    </main>
  )
}
