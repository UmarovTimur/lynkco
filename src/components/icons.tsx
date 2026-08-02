import type { SVGProps } from "react";

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6.94 8.5H3.56V20.5H6.94V8.5Z"
        fill="currentColor"
      />
      <path
        d="M5.25 7C6.35 7 7.25 6.1 7.25 5C7.25 3.9 6.35 3 5.25 3C4.15 3 3.25 3.9 3.25 5C3.25 6.1 4.15 7 5.25 7Z"
        fill="currentColor"
      />
      <path
        d="M20.5 13.6V20.5H17.13V14C17.13 12.4 16.55 11.3 15.12 11.3C14.02 11.3 13.37 12.05 13.09 12.77C12.98 13.03 12.96 13.4 12.96 13.77V20.5H9.58C9.58 20.5 9.62 9.5 9.58 8.5H12.96V9.94C13.41 9.24 14.22 8.24 16.53 8.24C19.4 8.24 20.5 10.34 20.5 13.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Lynk & Co wordmark, recreated as stroke-based geometric letterforms
 * (Y and K drawn without their vertical stems, C/O as mirrored open arcs)
 * to match the brand's minimal logotype.
 */
export function LynkCoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 300 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10,10 L10,50 L34,50" />
      <path d="M46,10 L58,34 L70,10" />
      <path d="M84,50 L84,10 L108,50 L108,10" />
      <path d="M146,10 L124,30 L146,50" />
      <path d="M242.1,38.5 A20,20 0 1 1 242.1,21.5" />
      <path d="M257.9,38.5 A20,20 0 1 0 257.9,21.5" />
      <text
        x="182"
        y="46"
        fontSize="46"
        fontWeight="600"
        stroke="none"
        fill="currentColor"
        textAnchor="middle"
        fontFamily="var(--font-inter), sans-serif"
      >
        &amp;
      </text>
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

/**
 * Grayscale client/trust logo marks extracted from the "Trusted by Leaders" area of the source site.
 * Exact brand identity unconfirmed (generic placeholder marks) — verify against the live site during hero QA.
 */
export function TrustLogoMarkA(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="88" height="34" viewBox="0 0 88 34" fill="none" {...props}>
      <g clipPath="url(#trust-logo-a)" fill="currentColor">
        <path d="M20.888 0a12.928 12.928 0 0 0-9.162 3.812l-7.93 7.967A13.047 13.047 0 0 0 0 20.983C0 28.173 5.801 34 12.958 34c3.436 0 6.732-1.371 9.162-3.813l5.486-5.51L43.589 8.62a6.175 6.175 0 0 1 4.376-1.82c2.748 0 5.078 1.8 5.885 4.289l5.045-5.068C56.594 2.401 52.559 0 47.965 0a12.928 12.928 0 0 0-9.162 3.812L17.333 25.38a6.174 6.174 0 0 1-4.375 1.821c-3.418 0-6.189-2.783-6.189-6.217a6.23 6.23 0 0 1 1.813-4.396l7.93-7.966A6.175 6.175 0 0 1 20.888 6.8c2.748 0 5.078 1.8 5.885 4.289l5.045-5.068C29.517 2.401 25.482 0 20.888 0Z" />
        <path d="M44.41 25.38a6.175 6.175 0 0 1-4.375 1.82c-2.748 0-5.077-1.799-5.885-4.288l-5.044 5.067C31.407 31.6 35.442 34 40.035 34c3.436 0 6.732-1.371 9.162-3.813l21.47-21.566A6.175 6.175 0 0 1 75.041 6.8c3.418 0 6.189 2.783 6.189 6.217a6.23 6.23 0 0 1-1.813 4.396l-7.93 7.966a6.175 6.175 0 0 1-4.376 1.821c-2.748 0-5.078-1.799-5.885-4.288l-5.045 5.067C58.484 31.599 62.52 34 67.112 34c3.436 0 6.732-1.371 9.162-3.813l7.93-7.966A13.046 13.046 0 0 0 88 13.017C88 5.827 82.199 0 75.042 0a12.928 12.928 0 0 0-9.162 3.812L44.41 25.38Z" />
      </g>
      <defs>
        <clipPath id="trust-logo-a">
          <path fill="#fff" d="M0 0h88v34H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function TrustLogoMarkB(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="88" height="48" viewBox="0 0 88 48" fill="none" {...props}>
      <g clipPath="url(#trust-logo-b)" fill="currentColor">
        <path d="M38.325 7.797a.636.636 0 0 1 .167.712l-8.25 27.094a1.267 1.267 0 0 1-.596.694c-.227.15-.49.237-.763.256H2.66a.921.921 0 0 1-.596-.256.637.637 0 0 1-.168-.694l8.27-27.094c.094-.3.3-.554.576-.712a1.7 1.7 0 0 1 .764-.238H37.73a.885.885 0 0 1 .596.238ZM24.636 30.144l4.936-16.176H15.753l-4.916 16.176h13.8ZM63.354 8.071a.911.911 0 0 0 .727.31h3.408a.776.776 0 0 0 .652-.347.758.758 0 0 0 .13-.584l-.67-4.82a1.524 1.524 0 0 0-.336-.603.913.913 0 0 0-.726-.31h-3.408a.776.776 0 0 0-.652.347c-.13.255-.186.42-.13.566l.689 4.82c.035.234.146.452.316.62Zm10.82-5.478a1.526 1.526 0 0 0-.335-.602.874.874 0 0 0-.707-.31h-3.427a.719.719 0 0 0-.633.346.755.755 0 0 0-.15.566l.69 4.82c.043.232.153.448.317.621a.948.948 0 0 0 .726.31h3.426a.737.737 0 0 0 .634-.347.688.688 0 0 0 .13-.584l-.67-4.82ZM60.357 9.896l-.335-2.373H43.5c-.258.014-.51.096-.725.237a1.074 1.074 0 0 0-.54.712L40.857 13a.61.61 0 0 0 .112.694.9.9 0 0 0 .578.237h20.076l-4.936 16.177h-20.02a1.4 1.4 0 0 0-.726.219 1.244 1.244 0 0 0-.54.712l-1.397 4.528a.664.664 0 0 0 .13.693.865.865 0 0 0 .578.256h26.296c.272-.023.534-.11.763-.256.275-.151.482-.399.578-.693l7.56-24.758H61.4a1.005 1.005 0 0 1-.726-.292 1.324 1.324 0 0 1-.317-.584v-.037Z" />
      </g>
      <defs>
        <clipPath id="trust-logo-b">
          <path fill="#fff" d="M0 0h88v48H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function TrustLogoMarkC(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="100" height="40" viewBox="0 0 100 40" fill="none" {...props}>
      <g clipPath="url(#trust-logo-c)">
        <path
          fill="currentColor"
          d="M4.77 4.235C5.03 3.001 6.26 2 7.513 2h6.812L8.66 28.823H1.848c-1.254 0-2.06-1-1.799-2.235L4.77 4.235Zm22.707 0C27.738 3.001 28.967 2 30.22 2h6.812l-5.665 26.823h-6.812c-1.254 0-2.06-1-1.799-2.235l4.721-22.353Zm45.415 0C73.152 3.001 74.38 2 75.635 2h6.812l-5.665 26.823H69.97c-1.254 0-2.059-1-1.798-2.235l4.721-22.353ZM39.303 2h6.812c1.254 0 2.06 1 1.8 2.235l-4.722 22.353c-.26 1.235-1.489 2.235-2.743 2.235h-6.812L39.303 2Zm45.415 0h6.812c1.254 0 2.06 1 1.8 2.235l-4.723 22.353c-.26 1.235-1.488 2.235-2.742 2.235h-6.813L84.718 2ZM50.185 4.235C50.445 3.001 51.673 2 52.927 2h6.813l-5.666 26.823h-6.812c-1.254 0-2.06-1-1.798-2.235l4.72-22.353h.001ZM62.01 2h6.813c1.254 0 2.06 1 1.798 2.235l-7.08 33.53C63.277 38.999 62.05 40 60.795 40h-6.813L62.01 2ZM12.82 19.882h9.082l-1.416 6.706c-.26 1.235-1.49 2.235-2.743 2.235H10.93l1.888-8.94.001-.001Zm31.7 11.177h9.082L51.714 40h-6.812c-1.255 0-2.06-1-1.799-2.235l1.417-6.706ZM100 2c0 1.105-.89 2-1.987 2a1.993 1.993 0 0 1-1.987-2c0-1.105.89-2 1.987-2S100 .895 100 2Z"
        />
      </g>
      <defs>
        <clipPath id="trust-logo-c">
          <path fill="#fff" d="M0 0h100v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function TrustLogoMarkD(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="132" height="30" viewBox="0 0 132 30" fill="none" {...props}>
      <g clipPath="url(#trust-logo-d)" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.25 21a3.75 3.75 0 0 1-3.75-3.75V0H0v17.25C0 23.463 5.037 28.5 11.25 28.5h8.25V21h-8.25Zm22.5-13.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM19.5 14.25C19.5 6.38 25.88 0 33.75 0S48 6.38 48 14.25 41.62 28.5 33.75 28.5 19.5 22.12 19.5 14.25Zm95.25-6.75a6.75 6.75 0 1 0 0 13.501 6.75 6.75 0 0 0 0-13.501Zm-14.25 6.75C100.5 6.38 106.88 0 114.75 0S129 6.38 129 14.25s-6.38 14.25-14.25 14.25-14.25-6.38-14.25-14.25ZM63.75 0C55.88 0 49.5 6.38 49.5 14.25S55.88 28.5 63.75 28.5h21c1.477 0 2.901-.225 4.24-.642L93 30l4.326-8.103A14.255 14.255 0 0 0 99 15.196v-.946C99 6.38 92.62 0 84.75 0h-21ZM91.5 14.25a6.75 6.75 0 0 0-6.75-6.75h-21a6.75 6.75 0 1 0 0 13.5h21a6.75 6.75 0 0 0 6.75-6.697v-.053Z"
        />
        <path d="M132 1.875a1.878 1.878 0 0 1-1.875 1.875 1.877 1.877 0 0 1-1.326-3.2A1.877 1.877 0 0 1 132 1.874Z" />
      </g>
      <defs>
        <clipPath id="trust-logo-d">
          <path fill="#fff" d="M0 0h132v30H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
