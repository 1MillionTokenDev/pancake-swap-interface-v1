import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import { LangType } from '@pancakeswap-libs/uikit'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import Swap from './Swap'
import { RedirectPathToSwapOnly } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'

import Menu from '../components/Menu'
import useGetDocumentTitlePrice from '../hooks/useGetDocumentTitlePrice'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  height: 100%;
`

const BodyWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  height: 100%;
  background: radial-gradient(45.94% 96.34% at 96.93% 0%, #1B8F97 0%, rgba(27, 143, 151, 0) 59.06%), radial-gradient(17.76% 48.86% at 0% 50%, #1B8F97 14.58%, rgba(27, 143, 151, 0) 70.93%), radial-gradient(33.96% 69.54% at 2.03% 100%, #1B8F97 22.88%, rgba(27, 143, 151, 0) 68.08%), radial-gradient(37.71% 77.63% at -7.45% -14.74%, #1B8F97 19.18%, rgba(27, 143, 151, 0) 100%), radial-gradient(46.64% 91.89% at 3.07% 62.18%, #1B8F97 0%, rgba(27, 143, 151, 0) 100%), radial-gradient(40.83% 87.89% at 97.14% 95.05%, #1B8F97 0%, rgba(27, 143, 151, 0) 100%), radial-gradient(36.25% 75.99% at 96.93% 0%, #1B8F97 0%, rgba(27, 143, 151, 0) 59.06%), linear-gradient(59.92deg, #1B8F97 -18.22%, rgba(27, 143, 151, 0) 5.1%), radial-gradient(46.67% 96.14% at 8.18% 124.46%, #1B8F97 15.66%, rgba(27, 143, 151, 0) 68.08%), radial-gradient(26.67% 52.77% at 95.26% 94.24%, #1B8F97 0%, rgba(27, 143, 151, 0) 100%), radial-gradient(38.39% 117.37% at 0% 34.12%, #1B8F97 0%, rgba(27, 143, 151, 0) 100%), radial-gradient(42.61% 143.5% at 65.05% 36.4%, rgba(27, 143, 151, 0.2) 12.86%, rgba(27, 143, 151, 0.074) 100%), conic-gradient(from 72.92deg at 36.09% 113.89%, rgba(27, 143, 151, 0.31) -57.33deg, #1B8F97 112deg, rgba(27, 143, 151, 0.31) 302.67deg, #1B8F97 472deg);
  background-blend-mode: multiply;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0;
  }
`

const CACHE_KEY = 'pancakeSwapLanguage'

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])
  const apiKey = `${process.env.REACT_APP_CROWDIN_APIKEY}`
  const projectId = parseInt(`${process.env.REACT_APP_CROWDIN_PROJECTID}`)
  const fileId = 6
  const credentials: Credentials = {
    token: apiKey,
  }

  const stringTranslationsApi = new StringTranslations(credentials)

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem(CACHE_KEY)
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  const fetchTranslationsForSelectedLanguage = async () => {
    stringTranslationsApi
      .listLanguageTranslations(projectId, selectedLanguage.code, undefined, fileId, 200)
      .then((translationApiResponse) => {
        if (translationApiResponse.data.length < 1) {
          setTranslations(['error'])
        } else {
          setTranslations(translationApiResponse.data)
        }
      })
      .then(() => setTranslatedLanguage(selectedLanguage))
      .catch((error) => {
        setTranslations(['error'])
        console.error(error)
      })
  }

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage])

  const handleLanguageSelect = (langObject: LangType) => {
    setSelectedLanguage(langObject)
    localStorage.setItem(CACHE_KEY, langObject.code)
  }

  useGetDocumentTitlePrice()

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider
            value={{
              selectedLanguage,
              setSelectedLanguage: handleLanguageSelect,
              translatedLanguage,
              setTranslatedLanguage,
            }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <Menu>
                <BodyWrapper>
                  <Popups />
                  <Web3ReactManager>
                    <Switch>
                      <Route exact strict path="/" component={Swap} />
                      <Route component={RedirectPathToSwapOnly} />
                    </Switch>
                  </Web3ReactManager>
                </BodyWrapper>
              </Menu>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
