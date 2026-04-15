import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {DEFAULT_LOCALE, SUPPORTED_LOCALES, type LocaleCode} from './locales';

function isLocale(value: string): value is LocaleCode {
  return SUPPORTED_LOCALES.includes(value as LocaleCode);
}

type Messages = Record<string, unknown>;

function deepMergeMessages(base: Messages, override: Messages): Messages {
  const merged: Messages = {...base};

  for (const [key, value] of Object.entries(override)) {
    const baseValue = merged[key];
    const isBaseObject = typeof baseValue === 'object' && baseValue !== null && !Array.isArray(baseValue);
    const isOverrideObject = typeof value === 'object' && value !== null && !Array.isArray(value);

    if (isBaseObject && isOverrideObject) {
      merged[key] = deepMergeMessages(baseValue as Messages, value as Messages);
      continue;
    }

    merged[key] = value;
  }

  return merged;
}

export default getRequestConfig(async ({requestLocale}) => {
  const incomingLocale = await requestLocale;

  if (!incomingLocale || !isLocale(incomingLocale)) notFound();

  const locale = incomingLocale;
  const defaultMessages = (await import(`../messages/${DEFAULT_LOCALE}.json`)).default as Messages;

  try {
    if (locale === DEFAULT_LOCALE) {
      return {
        locale,
        messages: defaultMessages
      };
    }

    const localeMessages = (await import(`../messages/${locale}.json`)).default as Messages;

    return {
      locale,
      messages: deepMergeMessages(defaultMessages, localeMessages)
    };
  } catch {
    return {
      locale,
      messages: defaultMessages
    };
  }
});
