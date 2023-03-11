import React from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../features/themeSlice'
import { DARK, LIGHT } from '../../../../../../utils/Theme/theme'
import { selectLanguage } from '../../../../../../features/languageSlice'

export const Plug = () => {
  const theme = useSelector(selectTheme)
  const language = useSelector(selectLanguage)
  return (
    <div className='plug'>
      <div
        className='neu'
        style={{
          background: `${
            theme.theme === 'light' ? LIGHT.background : DARK.background
          }`,
        }}>
        <div
          className='neu_shap'
          style={{
            boxShadow: `${
              theme.theme === 'light'
                ? `0 0 10px ${LIGHT.shadow} inset`
                : `0 0 16px ${DARK.shadow} inset`
            }`,
          }}>
          <div
            className='neu_inner'
            style={{
              background: `${
                theme.theme === 'light' ? LIGHT.background : DARK.background
              }`,
              boxShadow: `${
                theme.theme === 'light'
                  ? `inset 8px 8px 16px ${LIGHT.shadow}, inset -8px -8px 16px ${LIGHT.shadow}`
                  : `inset 8px 8px 16px ${DARK.shadow}, inset -8px -8px 16px ${DARK.shadow}`
              }`,
            }}>
            <div className='neu_ball'></div>
            <div className='neu_ball'></div>
            <div className='neu_ball'></div>
          </div>
        </div>
      </div>
      <p>
        {language.language === 'en'
          ? 'Select or create thread to start messanger!'
          : 'Выберите или создайте диалог для общения!'}
      </p>
    </div>
  )
}
