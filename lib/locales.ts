export const DEFAULT_LOCALE = "en" as const;

export const SUPPORTED_LOCALES = [
  "en",
  "ar",
  "fr",
  "de",
  "es",
  "it",
  "pt",
  "ru",
  "tr",
  "nl",
  "sv",
  "da",
  "no",
  "fi",
  "pl",
  "cs",
  "ro",
  "uk",
  "el",
  "he",
  "ja",
  "ko",
  "zh",
  "hi",
  "id",
  "ms"
] as const;

export type LocaleCode = (typeof SUPPORTED_LOCALES)[number];

export type LanguageOption = {
  code: LocaleCode;
  countryCode: string;
  label: string;
  sublabel: string;
  suggested?: boolean;
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "ar", countryCode: "sy", label: "Arabic", sublabel: "Al Arabiya", suggested: true },
  { code: "en", countryCode: "us", label: "English", sublabel: "English (US)", suggested: true },
  { code: "de", countryCode: "de", label: "German", sublabel: "Deutsch", suggested: true },
  { code: "tr", countryCode: "tr", label: "Turkish", sublabel: "Turkce", suggested: true },
  { code: "ru", countryCode: "ru", label: "Russian", sublabel: "Russkiy", suggested: true },
  { code: "fr", countryCode: "fr", label: "French", sublabel: "Francais" },
  { code: "nl", countryCode: "nl", label: "Dutch", sublabel: "Nederlands" },
  { code: "es", countryCode: "es", label: "Spanish", sublabel: "Espanol" },
  { code: "it", countryCode: "it", label: "Italian", sublabel: "Italiano" },
  { code: "pt", countryCode: "pt", label: "Portuguese", sublabel: "Portugues" },
  { code: "sv", countryCode: "se", label: "Swedish", sublabel: "Svenska" },
  { code: "da", countryCode: "dk", label: "Danish", sublabel: "Dansk" },
  { code: "no", countryCode: "no", label: "Norwegian", sublabel: "Norsk" },
  { code: "fi", countryCode: "fi", label: "Finnish", sublabel: "Suomi" },
  { code: "pl", countryCode: "pl", label: "Polish", sublabel: "Polski" },
  { code: "cs", countryCode: "cz", label: "Czech", sublabel: "Cestina" },
  { code: "ro", countryCode: "ro", label: "Romanian", sublabel: "Romana" },
  { code: "uk", countryCode: "ua", label: "Ukrainian", sublabel: "Ukrainska" },
  { code: "el", countryCode: "gr", label: "Greek", sublabel: "Ellinika" },

  { code: "ja", countryCode: "jp", label: "Japanese", sublabel: "Nihongo" },
  { code: "ko", countryCode: "kr", label: "Korean", sublabel: "Hangugeo" },
  { code: "zh", countryCode: "cn", label: "Chinese", sublabel: "Zhongwen" },
  { code: "hi", countryCode: "in", label: "Hindi", sublabel: "Hindi" },
  { code: "id", countryCode: "id", label: "Indonesian", sublabel: "Bahasa Indonesia" },
  { code: "ms", countryCode: "my", label: "Malay", sublabel: "Bahasa Melayu" }
];
