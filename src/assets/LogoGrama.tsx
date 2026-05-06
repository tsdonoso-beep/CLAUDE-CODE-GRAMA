/**
 * LogoGrama — Componentes SVG del logotipo GRAMA Proyectos Educativos
 * Basado en la identidad visual oficial: verde #00c16e, acento claro #d2ffe1
 */

interface LogoProps {
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Logotipo completo: GRAMA + "PROYECTOS EDUCATIVOS"
 * Usar en sidebar expandido, headers, splash screens.
 */
export function LogoGramaFull({ style, className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 228 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      aria-label="GRAMA Proyectos Educativos"
    >
      {/* ── Acento Tangram dentro del counter del G ── */}
      <defs>
        {/* Clip aproximado al counter interior del G (Manrope ExtraBold 48px) */}
        <clipPath id="g-counter-clip">
          <rect x="7" y="7" width="20" height="30" rx="1" />
        </clipPath>
      </defs>

      {/* Pieza inferior: triángulo grande (bottom-left del counter) */}
      <polygon
        points="7,24 27,24 7,37"
        fill="#d2ffe1"
        clipPath="url(#g-counter-clip)"
      />
      {/* Pieza superior: rectángulo achatado (upper counter) */}
      <polygon
        points="9,8 27,8 27,21 9,21"
        fill="#d2ffe1"
        opacity="0.65"
        clipPath="url(#g-counter-clip)"
      />

      {/* ── Texto GRAMA ── */}
      <text
        y="44"
        fontFamily="Manrope, system-ui, sans-serif"
        fontWeight="800"
        fontSize="48"
        fill="#00c16e"
        letterSpacing="-0.5"
      >
        GRAMA
      </text>

      {/* ── Subtítulo PROYECTOS EDUCATIVOS ── */}
      <text
        x="41"
        y="55"
        fontFamily="Manrope, system-ui, sans-serif"
        fontWeight="500"
        fontSize="7"
        fill="rgba(255,255,255,0.72)"
        letterSpacing="2.6"
      >
        PROYECTOS EDUCATIVOS
      </text>
    </svg>
  );
}

/**
 * Isotipo: solo la G con acento Tangram.
 * Usar en sidebar colapsado, favicon fallback, NotFound.
 */
export function LogoGramaIcon({ style, className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      aria-label="GRAMA"
    >
      <defs>
        <clipPath id="g-icon-clip">
          <rect x="7" y="7" width="20" height="30" rx="1" />
        </clipPath>
      </defs>

      {/* Acento Tangram */}
      <polygon
        points="7,24 27,24 7,37"
        fill="#d2ffe1"
        clipPath="url(#g-icon-clip)"
      />
      <polygon
        points="9,8 27,8 27,21 9,21"
        fill="#d2ffe1"
        opacity="0.65"
        clipPath="url(#g-icon-clip)"
      />

      {/* G */}
      <text
        y="44"
        fontFamily="Manrope, system-ui, sans-serif"
        fontWeight="800"
        fontSize="48"
        fill="#00c16e"
      >
        G
      </text>
    </svg>
  );
}
