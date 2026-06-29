import { defineStore } from 'pinia'
import langSetting from '~/data/lang-setting.json'

interface Language {
  label: string
  value: string
  isDefault: boolean
}

export const useLanguageStore = defineStore('language', {
  state: () => ({
    keyLangCurrent: langSetting.find((lang: Language) => lang.isDefault)?.value || 'en',
    countries: langSetting.map((lang: Language) => ({
      name: lang.label,
      value: lang.value,
      enable: lang.isDefault,
    })),
    defaultLang: langSetting.find((lang: Language) => lang.isDefault)?.value || 'en',
  }),
  actions: {
    setKeyLangCurrent(lang: string) {
      this.keyLangCurrent = lang
    },
    getLocalizedUrl (path: string) {
      const defaultLang = langSetting.find(lang => lang.isDefault)?.value || 'en'
      if (this.keyLangCurrent === defaultLang) {
        return path
      }
      return `/${this.keyLangCurrent}${path}`
    },
    getLocalizedData (data: any) {
      return data[this.keyLangCurrent] || data['en']
    },
    initLanguage(fullPath: string) {
        const matchedLang = fullPath.split('/')[1]
        const availableLangs = langSetting.map((l: Language) => l.value)
        if (availableLangs.includes(matchedLang)) {
          this.keyLangCurrent = matchedLang
        }
    },
  }
})