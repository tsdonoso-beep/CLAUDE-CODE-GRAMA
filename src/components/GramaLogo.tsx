// src/components/GramaLogo.tsx
import { useId } from 'react'

interface GramaLogoProps {
  variant?: 'light' | 'dark'   // light = sobre fondos oscuros, dark = sobre fondos claros
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const HEIGHTS = { sm: 20, md: 28, lg: 38 }
const ASPECT  = 139.33525 / 28.939627   // ≈ 4.814

export function GramaLogo({ variant = 'light', size = 'md', className = '' }: GramaLogoProps) {
  const uid = useId().replace(/:/g, '')

  const h  = HEIGHTS[size]
  const w  = Math.round(h * ASPECT)

  // icon = partes oscuras del ícono G; en light (fondo oscuro) se hacen blancas
  const accent = '#02d47e'
  const icon   = variant === 'light' ? 'rgba(255,255,255,0.88)' : '#043941'
  const text   = variant === 'light' ? '#ffffff'                : '#043941'

  const cp = (n: number) => `${uid}_${n}`

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 139.33525 28.939627"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none shrink-0 ${className}`}
      aria-label="GRAMA Proyectos Educativos"
      style={{ display: 'block' }}
    >
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id={cp(400)}>
          <path d="M 0,1280 H 4737.829 V 0 H 0 Z" transform="translate(-1944.948,-641.98632)" />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id={cp(402)}>
          <path d="M 0,1280 H 4737.829 V 0 H 0 Z" transform="translate(-2008.1004,-598.57321)" />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id={cp(404)}>
          <path d="M 0,1280 H 4737.829 V 0 H 0 Z" transform="translate(-1982.0359,-637.14502)" />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id={cp(406)}>
          <path d="M 0,1280 H 4737.829 V 0 H 0 Z" transform="translate(-2014.489,-680.46532)" />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id={cp(408)}>
          <path d="M 0,1280 H 4737.829 V 0 H 0 Z" transform="translate(-2151.2371,-638.61871)" />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id={cp(410)}>
          <path d="M 0,1280 H 4737.829 V 0 H 0 Z" transform="translate(-2223.4099,-674.72662)" />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id={cp(412)}>
          <path d="M 0,1280 H 4737.829 V 0 H 0 Z" transform="translate(-2294.6521,-638.61871)" />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id={cp(414)}>
          <path d="M 0,1280 H 4737.829 V 0 H 0 Z" transform="translate(-2046.8152,-663.95212)" />
        </clipPath>
      </defs>

      <g transform="translate(-33.173335,-209.44376)">
        {/* ── Ícono G — forma exterior verde ── */}
        <path
          fill={accent}
          d="m 0,0 v -14.316 c 0,-16.07 13.632,-29.097 30.447,-29.097 H 52.465 L 8.974,0.684 Z"
          transform="matrix(0.35277776,0,0,-0.35277776,33.173343,223.05405)"
          clipPath={`url(#${cp(400)})`}
        />
        {/* ── Ícono G — relleno interior oscuro (esquina) ── */}
        <path
          fill={icon}
          d="M 0,0 C 7.105,0 12.865,5.505 12.865,12.295 V 39.619 L -28.794,0 Z"
          transform="matrix(0.35277776,0,0,-0.35277776,55.45208,238.36923)"
          clipPath={`url(#${cp(402)})`}
        />
        {/* ── Ícono G — chevron verde superior ── */}
        <path
          fill={accent}
          d="m 0,0 12.706,-12.143 c 3.431,-3.277 8.991,-3.277 12.422,0 L 38.93,1.047 0.433,1.078 C -0.139,1.049 -0.405,0.387 0,0"
          transform="matrix(0.35277776,0,0,-0.35277776,46.257121,224.76196)"
          clipPath={`url(#${cp(404)})`}
        />
        {/* ── Ícono G — bracket exterior oscuro ── */}
        <path
          fill={icon}
          d="M 0,0 H -34.592 C -53.894,0 -69.541,-14.953 -69.541,-33.398 V -51.342 L 1.083,-2.323 C 1.927,-1.427 1.262,0 0,0"
          transform="matrix(0.35277776,0,0,-0.35277776,57.705854,209.47952)"
          clipPath={`url(#${cp(406)})`}
        />
        {/* ── Letra G ── */}
        <path
          fill={text}
          d="m 0,0 h -28.646 v 17.925 c 0,4.085 3.323,7.408 7.408,7.408 H 0 Z m -45.261,17.925 v -56.369 c 0,-0.907 0.736,-1.641 1.642,-1.641 h 13.331 c 0.906,0 1.642,0.734 1.642,1.641 v 23.832 H 0 v -23.832 c 0,-0.907 0.735,-1.641 1.642,-1.641 h 13.331 c 0.907,0 1.641,0.734 1.641,1.641 v 80.392 h -37.852 c -13.268,0 -24.023,-10.756 -24.023,-24.023"
          transform="matrix(0.35277776,0,0,-0.35277776,105.94754,224.24207)"
          clipPath={`url(#${cp(408)})`}
        />
        {/* ── Letra M ── */}
        <path
          fill={text}
          d="M 0,0 C -4.21,3.634 -9.688,5.84 -15.673,5.84 H -46.04 v -80.392 c 0,-0.906 0.734,-1.641 1.642,-1.641 h 13.331 c 0.906,0 1.641,0.735 1.641,1.641 v 63.778 h 13.753 c 4.092,0 7.409,-3.317 7.409,-7.409 v -7.11 -40.501 c 0,-0.907 0.735,-1.643 1.642,-1.643 h 13.33 c 0.907,0 1.643,0.736 1.643,1.643 v 40.501 7.11 0.137 c 0,4.016 3.254,7.272 7.271,7.272 h 13.299 v -63.778 c 0,-0.906 0.735,-1.641 1.641,-1.641 h 13.332 c 0.907,0 1.641,0.735 1.641,1.641 V 5.84 H 15.621 C 9.652,5.84 4.191,3.634 0,0"
          transform="matrix(0.35277776,0,0,-0.35277776,131.40851,211.504)"
          clipPath={`url(#${cp(410)})`}
        />
        {/* ── Letra A ── */}
        <path
          fill={text}
          d="m 0,0 v 25.333 h 21.239 c 4.085,0 7.408,-3.323 7.408,-7.408 L 28.647,0 Z m 21.239,41.948 h -37.853 v -80.392 c 0,-0.907 0.735,-1.641 1.641,-1.641 h 13.331 c 0.907,0 1.642,0.734 1.642,1.641 v 23.832 h 28.647 v -23.832 c 0,-0.907 0.736,-1.641 1.642,-1.641 H 43.62 c 0.906,0 1.642,0.734 1.642,1.641 v 56.369 c 0,13.267 -10.755,24.023 -24.023,24.023"
          transform="matrix(0.35277776,0,0,-0.35277776,156.54117,224.24207)"
          clipPath={`url(#${cp(412)})`}
        />
        {/* ── Letra R ── */}
        <path
          fill={text}
          d="m 0,0 h 26.021 c 4.092,0 7.409,-3.317 7.409,-7.408 v -10.446 c 0,-4.092 -3.317,-7.409 -7.409,-7.409 H 0 Z m 39.122,-46.27 -2.279,7.909 c 7.823,3.965 13.201,12.082 13.201,21.437 v 9.516 c 0,13.267 -10.755,24.022 -24.023,24.022 h -40.994 c -0.906,0 -1.641,-0.735 -1.641,-1.641 v -78.75 c 0,-0.907 0.735,-1.642 1.641,-1.642 h 13.331 c 0.907,0 1.642,0.735 1.642,1.642 v 23.575 h 20.333 l 2.746,-10.388 c 2.333,-8.661 10.226,-14.709 19.195,-14.709 h 9.459 v 16.614 h -9.459 c -1.476,0 -2.768,0.99 -3.152,2.415"
          transform="matrix(0.35277776,0,0,-0.35277776,69.109819,215.30501)"
          clipPath={`url(#${cp(414)})`}
        />
      </g>
    </svg>
  )
}
