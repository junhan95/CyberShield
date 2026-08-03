import { asset } from "./site-config";

/**
 * Cut-metal CYBERSHIELD wordmark: a brushed steel sheet shown through the
 * letterforms, with a polished chamfer and a cast shadow. Filter values are
 * tuned for the 26px display height — at larger sizes the grain needs a lower
 * frequency, so a separate asset is used for hero-scale placements.
 *
 * The definitions are emitted once per page; every placement references them
 * through <use>, so the ids must stay unique across the document.
 */
export function WordmarkDefs() {
  return (
    <svg className="wordmark-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cs-steel" gradientUnits="userSpaceOnUse" x1="0" y1="4" x2="0" y2="20">
          <stop offset="0%" stopColor="#e4ebf2" />
          <stop offset="26%" stopColor="#9aa5b0" />
          <stop offset="48%" stopColor="#e0e7ee" />
          <stop offset="64%" stopColor="#8b96a2" />
          <stop offset="84%" stopColor="#c5ced7" />
          <stop offset="100%" stopColor="#929da8" />
        </linearGradient>

        <filter id="cs-grain" filterUnits="userSpaceOnUse" x="0" y="0" width="136" height="26">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.85" numOctaves="3" seed="14" result="n" />
          <feColorMatrix
            in="n" type="matrix" result="light"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.55 0 0 0 -0.14"
          />
          <feColorMatrix
            in="n" type="matrix" result="dark"
            values="0 0 0 0 0.05  0 0 0 0 0.07  0 0 0 0 0.09  -0.5 0 0 0 0.26"
          />
          <feMerge result="g"><feMergeNode in="dark" /><feMergeNode in="light" /></feMerge>
          <feComposite in="g" in2="SourceGraphic" operator="atop" />
        </filter>

        <filter id="cs-cut" x="-8%" y="-45%" width="118%" height="210%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.45" result="b" />
          <feSpecularLighting
            in="b" surfaceScale="2.4" specularConstant="1.35" specularExponent="26"
            lightingColor="#ffffff" result="sp"
          >
            <feDistantLight azimuth="232" elevation="54" />
          </feSpecularLighting>
          <feComposite in="sp" in2="SourceAlpha" operator="in" result="spc" />
          <feComposite in="SourceGraphic" in2="spc" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="lit" />
          <feDropShadow dx="0.6" dy="1" stdDeviation="0.9" floodColor="#000" floodOpacity="0.45" />
        </filter>

        <mask id="cs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="136" height="26">
          <text
            x="3" y="19"
            fontFamily="Jost, 'Century Gothic', Futura, Inter, sans-serif"
            fontSize="18" fontWeight="700" letterSpacing="1.13" fill="#fff"
          >
            CYBERSHIELD
          </text>
        </mask>

        <symbol id="cs-wordmark" viewBox="0 0 136 26">
          <g filter="url(#cs-cut)">
            <g mask="url(#cs-mask)">
              <g filter="url(#cs-grain)"><rect width="136" height="26" fill="url(#cs-steel)" /></g>
            </g>
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

/** The Frankonia lockup, a hairline rule, then the product wordmark. */
export function BrandLockup({ decorative = false }: { decorative?: boolean }) {
  return (
    <>
      <img
        className="brand-logo"
        src={asset("/frankonia-logo.svg")}
        width={1898}
        height={1029}
        alt={decorative ? "" : "Frankonia"}
        aria-hidden={decorative || undefined}
      />
      <span className="brand-product">
        <svg
          className="brand-wordmark"
          viewBox="0 0 136 26"
          role={decorative ? undefined : "img"}
          aria-label={decorative ? undefined : "CyberShield"}
          aria-hidden={decorative || undefined}
          focusable="false"
        >
          <use href="#cs-wordmark" />
        </svg>
      </span>
    </>
  );
}
