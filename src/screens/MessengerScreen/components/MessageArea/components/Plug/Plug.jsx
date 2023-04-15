import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../features/themeSlice'
import { selectLanguage } from '../../../../../../features/languageSlice'
import './Plug.styles.scss'
import { Text } from '../../../../../../components/Text/Text'

export const Plug = () => {
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  return (
    <div className='plug'>
      <div
        className={
          theme.theme === 'light'
            ? 'neu light__background'
            : 'neu dark__background'
        }>
        <div
          className={
            theme.theme === 'light'
              ? 'neu_shap light__shadow'
              : 'neu_shap dark__shadow'
          }>
          <div
            className={
              theme.theme === 'light'
                ? 'neu_inner light__shadow light__background'
                : 'neu_inner dark__shadow dark__background'
            }>
            <div className='neu_ball'></div>
            <div className='neu_ball'></div>
            <div className='neu_ball'></div>
          </div>
        </div>
      </div>
      <Text
        type={'h3'}
        label={
          language.language === 'en'
            ? 'Select or create thread to start messanger!'
            : 'Выберите или создайте диалог для общения!'
        }
      />
    </div>
  )
}
