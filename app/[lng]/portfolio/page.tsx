import React from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'
import { useTranslation } from '@/app/i18n'
import { SwitchLenguage } from '@/components/SwitchLenguage/index'

export default async function Portafolio({ params: { lng } } : { params: { lng : string } }) {
    const { t } = await useTranslation(lng)
    return (
      <footer style={{ marginTop: 50 }}>
        <h1>{t('title')}</h1>
        <Trans i18nKey="languageSwitcher" t={t}>
          Switch from <strong>{lng}</strong> to:
        </Trans>
        <SwitchLenguage lng={lng}/>
      </footer>
    );
}