"use client";

import { SVGProps } from "react";

const logoClass = "h-12 w-auto sm:h-14 md:h-16";

export function GoogleLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function MetaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path
        fill="#0081FB"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.2-6.8c-2.2 0-3.9-1.3-5.2-3.4-.9 1.5-2.4 3.4-4.8 3.4-2.3 0-4.2-1.9-4.2-4.2 0-2.1 1.5-3.8 3.5-4.1.2 0 .4-.1.6-.1 2.3 0 3.9 1.3 5.1 3.3.9-1.5 2.5-3.3 4.9-3.3 2.3 0 4.2 1.9 4.2 4.2.1 2.1-1.4 3.8-3.4 4.1-.2.1-.5.1-.7.1z"
      />
    </svg>
  );
}

export function MicrosoftLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 21 21" className={logoClass} {...props}>
      <path fill="#F25022" d="M0 0h10v10H0z" />
      <path fill="#00A4EF" d="M11 0h10v10H11z" />
      <path fill="#7FBA00" d="M0 11h10v10H0z" />
      <path fill="#FFB900" d="M11 11h10v10H11z" />
    </svg>
  );
}

export function AmazonLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path
        fill="#FF9900"
        d="M16.6 17.8c-3.6 1.7-8.1 1.7-10.8 0-.4-.2-.7 0-.6.4.6 1.9 3.2 3.3 6 3.3s5.4-1.4 6-3.3c.1-.4-.2-.6-.6-.4z"
      />
      <path
        fill="#FFFFFF"
        d="M13.9 12.1c0-1.4-.8-2.4-2.3-2.4-1.4 0-2.4 1-2.4 2.4s1 2.4 2.4 2.4c1.5 0 2.3-1 2.3-2.4zm2.5 0c0 2.5-1.9 4.5-4.8 4.5s-4.8-2-4.8-4.5 1.9-4.5 4.8-4.5 4.8 2 4.8 4.5z"
      />
    </svg>
  );
}

export function AppleLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path
        fill="#FFFFFF"
        d="M18.7 8.8c-.9-.5-2-.8-3.1-.8-1.6 0-2.9.7-3.6 1.2-.7-.5-1.9-1.2-3.5-1.2-2.6 0-5 1.6-5 5.3 0 4.1 3.6 8.8 6.4 8.8 1.4 0 2.1-.8 3.3-.8 1.3 0 1.9.8 3.3.8 2.5 0 6-4.3 6-8.7 0-2.1-1.4-3.8-3.8-4.6zm-3.3-5.3c1.3-1.6 2.2-3.7 2-5.6-1.9.1-4.2 1.3-5.5 2.9-1.2 1.4-2.2 3.6-1.9 5.5 2.1.2 4.2-1.1 5.4-2.8z"
      />
    </svg>
  );
}

export function NetflixLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path fill="#E50914" d="M5.4 1.1h2.8l3.8 10.6L15.8 1.1h2.8L13.4 22.9h-2.8l1.6-4.8-3.8-10.6-3.8 10.6 1.6 4.8H.4L5.4 1.1z" />
    </svg>
  );
}

export function SpotifyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <circle cx="12" cy="12" r="12" fill="#1DB954" />
      <path
        fill="#191414"
        d="M17.8 10.5c-2.7-1.6-7.1-1.7-9.7-.9-.4.1-.8 0-.9-.4-.1-.4 0-.8.4-.9 3-.9 7.8-.8 10.8 1.1.3.2.4.6.2.9-.2.3-.6.4-.8.2zm-.9 2.5c-.2-.4-.6-.5-1-.3-2.3 1.4-5.8 1.8-8.5 1-.3-.1-.7.1-.8.4-.1.3.1.7.4.8 3.1.9 6.9.5 9.5-1.1.4-.2.5-.6.4-.8zm-1 2.5c-.2-.3-.5-.4-.8-.3-2 1.2-5 1.6-7.3.9-.3-.1-.5.1-.6.3-.1.3.1.5.3.6 2.6.8 5.8.4 8.1-.9.3-.2.4-.4.3-.6z"
      />
    </svg>
  );
}

export function AirbnbLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path
        fill="#FF5A5F"
        d="M12 22c-.6 0-1.2-.3-1.6-.9-1.2-1.8-2.2-3.5-2.9-5.1-.7-1.6-1.1-3.1-1.1-4.4 0-1.6.5-3 1.4-4 .9-1 2.1-1.6 3.4-1.6.6 0 1.2.1 1.8.4.5.2 1 .6 1.4 1 .4-.4.9-.8 1.4-1 .6-.3 1.2-.4 1.8-.4 1.3 0 2.5.6 3.4 1.6.9 1 1.4 2.4 1.4 4 0 1.3-.4 2.8-1.1 4.4-.7 1.6-1.7 3.3-2.9 5.1-.4.6-1 .9-1.6.9-.6 0-1.2-.3-1.6-.9-.6-.9-1.2-1.8-1.6-2.6-.4.8-1 1.7-1.6 2.6-.4.6-1 .9-1.6.9zm0-3.5c.6-1 1.2-2 1.6-2.9.4-.9.7-1.7.7-2.4 0-.8-.3-1.5-.8-2-.5-.5-1.2-.8-1.9-.8s-1.4.3-1.9.8c-.5.5-.8 1.2-.8 2 0 .7.3 1.5.7 2.4.4.9 1 1.9 1.6 2.9.3.5.6.9.8 1.2.2-.3.5-.7.8-1.2h.2z"
      />
    </svg>
  );
}

export function TeslaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path
        fill="#E31937"
        d="M12 1.5C7 1.5 2.5 3.2 0 6c.5 2.5 4 5 9 6-1.5-1.5-2.5-3.5-2.5-5.8 0-4 3.6-7.2 8.5-7.2s8.5 3.2 8.5 7.2c0 2.3-1 4.3-2.5 5.8 5-.9 8.5-3.4 9-6C21.5 3.2 17 1.5 12 1.5z"
      />
      <path
        fill="#E31937"
        d="M12 9c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
      />
    </svg>
  );
}

export function NvidiaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path
        fill="#76B900"
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5.8 14.5c-.9.4-1.9.6-2.9.6-3.1 0-5.7-1.9-5.7-4.8 0-2.6 2.1-4.5 4.8-4.5.5 0 1 .1 1.4.2v2.3c-.4-.1-.9-.2-1.4-.2-1.5 0-2.6 1-2.6 2.3 0 1.6 1.5 2.7 3.5 2.7.9 0 1.7-.2 2.4-.5l-.5 2.4v.5zm1.5-4.2c0-2.9-2.2-5-5.3-5-3.3 0-5.8 2.4-5.8 5.5 0 3.3 2.7 5.5 6.1 5.5 1.5 0 2.9-.4 4.1-1.1l-.6-2c-.9.5-2 .8-3.1.8-1.8 0-3.3-.9-3.6-2.2h7.9c.2-.4.3-.9.3-1.5z"
      />
    </svg>
  );
}

export function AdobeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path fill="#FF0000" d="M13.3 2h8.7v20L13.3 2zM10.7 2H2v20L10.7 2z" />
      <path fill="#FF0000" d="M12 9.5l3.5 8.5h-2.6l-1-2.6h-2l2.1-5.9z" />
    </svg>
  );
}

export function SalesforceLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path
        fill="#00A1E0"
        d="M17.2 13.3c-.5-.3-1.2-.4-1.8-.3-.4-.9-1.3-1.6-2.4-1.6-.3 0-.6.1-.9.2-.5-1.2-1.6-2-2.9-2-1.6 0-3 1.1-3.4 2.6-.5-.2-1-.3-1.6-.3-2.2 0-4 1.8-4 4s1.8 4 4 4c.4 0 .7 0 1.1-.1.7 1.1 1.9 1.8 3.3 1.8.8 0 1.5-.2 2.1-.7.6 1.2 1.8 2 3.2 2 1.5 0 2.7-.9 3.3-2.2.4.1.7.2 1.1.2 1.9 0 3.4-1.5 3.4-3.4 0-1.8-1.4-3.2-3.1-3.4l-.4-.8z"
      />
    </svg>
  );
}

export function LinkedInLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <rect width="24" height="24" rx="2" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M5.7 9.8H8v8.9H5.7V9.8zm1.2-3.8c.9 0 1.5.6 1.5 1.4 0 .8-.6 1.4-1.6 1.4h-.1c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.6-1.4zM10.3 9.8h2.2v1.2c.3-.5 1-1.3 2.4-1.3 2.5 0 3 1.7 3 3.8v5.2h-2.3v-4.7c0-.9 0-2.1-1.3-2.1-1.3 0-1.5 1-1.5 2v4.8h-2.3V9.8z"
      />
    </svg>
  );
}

export function UberLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <circle cx="12" cy="12" r="12" fill="#000000" />
      <path
        fill="#FFFFFF"
        d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm-2.5 8.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm5 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"
      />
    </svg>
  );
}

export function SlackLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path fill="#E01E5A" d="M5.4 15.5a2.4 2.4 0 1 1 0-4.8H8v4.8a2.4 2.4 0 0 1-2.6 0z" />
      <path fill="#36C5F0" d="M8.5 5.4a2.4 2.4 0 1 1 4.8 0V8H8.5V5.4z" />
      <path fill="#2EB67D" d="M18.6 8.5a2.4 2.4 0 1 1 0 4.8H16V8.5a2.4 2.4 0 0 1 2.6 0z" />
      <path fill="#ECB22E" d="M15.5 18.6a2.4 2.4 0 1 1-4.8 0V16h4.8v2.6z" />
      <path fill="#36C5F0" d="M5.4 8.5H8v4.8H5.4a2.4 2.4 0 1 1 0-4.8z" />
      <path fill="#E01E5A" d="M16 8.5h2.6a2.4 2.4 0 1 1 0 4.8H16V8.5z" />
      <path fill="#ECB22E" d="M8.5 16h4.8v2.6a2.4 2.4 0 1 1-4.8 0V16z" />
      <path fill="#2EB67D" d="M8.5 8.5h4.8v4.8H8.5V8.5z" />
    </svg>
  );
}

export function XLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={logoClass} {...props}>
      <path
        fill="#FFFFFF"
        d="M18.3 2h3.2l-7 8.1L22.9 22h-6.4l-4.4-5.8L6.3 22H3.1l7.5-8.7L1.1 2h6.6l4 5.3L18.3 2zm-1.1 17.9h1.8L7.5 4h-2l12.7 15.9z"
      />
    </svg>
  );
}

export const groupOne = [
  { name: "Google", Logo: GoogleLogo },
  { name: "Meta", Logo: MetaLogo },
  { name: "Microsoft", Logo: MicrosoftLogo },
  { name: "Amazon", Logo: AmazonLogo },
  { name: "Apple", Logo: AppleLogo },
  { name: "Netflix", Logo: NetflixLogo },
  { name: "Spotify", Logo: SpotifyLogo },
  { name: "Airbnb", Logo: AirbnbLogo },
];

export const groupTwo = [
  { name: "Tesla", Logo: TeslaLogo },
  { name: "NVIDIA", Logo: NvidiaLogo },
  { name: "Adobe", Logo: AdobeLogo },
  { name: "Salesforce", Logo: SalesforceLogo },
  { name: "LinkedIn", Logo: LinkedInLogo },
  { name: "Uber", Logo: UberLogo },
  { name: "Slack", Logo: SlackLogo },
  { name: "X", Logo: XLogo },
];
