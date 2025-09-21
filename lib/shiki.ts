import { codeToHtml, type BundledLanguage, type BundledTheme } from 'shiki'

export type HighlightOptions = {
  code: string
  lang?: BundledLanguage | string
  theme?: BundledTheme
}

export async function highlightToHtml({
  code,
  lang = 'tsx',
  theme = 'vitesse-light',
}: HighlightOptions) {
  // Shiki v3: directly use codeToHtml, which lazy-loads grammars/themes as needed
  return await codeToHtml(code, { lang, theme })
}
