// src/data/manualesPDF.ts
// Manuales PDF por taller y bien.n — links de Google Drive (públicos)
// Para agregar más talleres: añadir nueva clave con el slug y el mapa n → URL

// Extrae el ID de Google Drive de una URL /view o similar
function getDriveId(driveUrl: string): string | null {
  return driveUrl.match(/\/file\/d\/([^/]+)/)?.[1] ?? null
}

// URL para embed en iframe (sin branding de Drive, solo el PDF)
export function getDriveEmbedUrl(driveUrl: string): string {
  const id = getDriveId(driveUrl)
  return id ? `https://drive.google.com/file/d/${id}/preview` : ''
}

// URL de descarga directa (no expone la ubicación en Drive)
export function getDriveDownloadUrl(driveUrl: string): string {
  const id = getDriveId(driveUrl)
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : ''
}

// Thumbnail de la página 1 del PDF (imagen de vista previa)
export function getDriveThumbnailUrl(driveUrl: string, width = 400): string {
  const id = getDriveId(driveUrl)
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w${width}` : ''
}

// ── Vimeo helpers ────────────────────────────────────────────────────────────
function getVimeoId(url: string): string | null {
  return url.match(/vimeo\.com\/(\d+)/)?.[1] ?? null
}

export function isVimeoUrl(url: string): boolean {
  return url.includes('vimeo.com')
}

// URL embed universal: detecta Vimeo o Drive automáticamente
export function getVideoEmbedUrl(url: string): string {
  if (isVimeoUrl(url)) {
    const id = getVimeoId(url)
    return id ? `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0` : ''
  }
  return getDriveEmbedUrl(url)
}

// Etiqueta para el botón "Abrir en …"
export function getVideoSourceLabel(url: string): string {
  return isVimeoUrl(url) ? 'Abrir en Vimeo' : 'Abrir en Google Drive'
}

// tallerSlug → bien.n → Drive URL
export const manualesPDFPorBien: Record<string, Record<number, string>> = {
  'ebanisteria': {
    76: 'https://drive.google.com/file/d/1IEHUwvg12o_2BDBfP1KZmxxysfV-BwnT/view',  // Máquina garlopa
  },
  'mecanica-automotriz': {
    // ── Herramientas manuales ──────────────────────────────────────────────
    129: 'https://drive.google.com/file/d/1AJWbait30iOj_ub5dKWiZs7ynEKr5qFp/view',  // Aceitera
     70: 'https://drive.google.com/file/d/16u9VXfQFpoR4DI9Ult0x2r0lYBlvAnxX/view',  // Alicate de presión
     93: 'https://drive.google.com/file/d/1jF6t5bHjCKX1DGlhkEL5aQpB5CJr3bz8/view',  // Arco de sierra
    133: 'https://drive.google.com/file/d/1rhjw4dUJ9ZPWf5PPBIS-XSLzjZ7QrTpO/view',  // Bandeja para recolectar aceite
    105: 'https://drive.google.com/file/d/10vczpodcyUklVGpazpmDN_j_wIirvOtA/view',  // Batería
     71: 'https://drive.google.com/file/d/1OFeNZVvWqk1ioszSAbmBjIwN4Dk8vm-O/view',  // Calibrador digital
    127: 'https://drive.google.com/file/d/10zRCLlDKsQSoqFDSi9gIBxpfA5F8X_T_/view',  // Cepillo de acero
    117: 'https://drive.google.com/file/d/132z7BEIL6-G6zQ61a-ToDX8HLVQbeXq9/view',  // Compresímetro de anillos
    106: 'https://drive.google.com/file/d/1W4XA_es02zLKqEfQ-kR0VL34DfJAetdE/view',  // Cúter
    134: 'https://drive.google.com/file/d/1loUXEXN_dEtkBE_v363rzZMJSggkQbMe/view',  // Embudo de uso industrial
     96: 'https://drive.google.com/file/d/1xy611aU5Q8DEljUDmv2GSNOhG7OO3cZu/view',  // Engrasadora
     73: 'https://drive.google.com/file/d/11nY2CV68Rpc_H6BcfmZMqusZuE89z0Cf/view',  // Extractor de palier
     63: 'https://drive.google.com/file/d/1PyD5K8uABTcdOM5T6UIItf-R2DQmmayy/view',  // Extractor de resortes (Compresor de resortes de suspensión)
     67: 'https://drive.google.com/file/d/1jNU1ua9OnvWBdEjTEd40b6Ngh10EkosT/view',  // Extractor de Volante
    135: 'https://drive.google.com/file/d/1rXneOCKRQ0fwgAhyMxheG6zmWrxl3Ztq/view',  // Galonera
     75: 'https://drive.google.com/file/d/1v561f9HigNGxGM12XlcqthbrRXAWHC2W/view',  // Goniómetro digital
     94: 'https://drive.google.com/file/d/1nuDAC3Szwt11XoGg-eoX6C-hcMKngUru/view',  // Herramienta para remover resorte de freno
     69: 'https://drive.google.com/file/d/1jPfR9UsDdh3bK9ipJqHonNBw7hxRPylq/view',  // Juego de alicates
     89: 'https://drive.google.com/file/d/1PeB9pQZl2sphb34kZIqgqm-pXF3zw_Ss/view',  // Juego de brocas
    130: 'https://drive.google.com/file/d/1UJIMzY_9RKppLzbmdNnE88aBP3X4hM3s/view',  // Juego de Dados para bujías
     74: 'https://drive.google.com/file/d/1IMX7uKNP4VpezY_lQJhA82_RgUJCr40Z/view',  // Juego de destornilladores (6) — zona herramientas
    107: 'https://drive.google.com/file/d/1IMX7uKNP4VpezY_lQJhA82_RgUJCr40Z/view',  // Juego de destornilladores (6) — zona eléctrica (mismo manual)
     87: 'https://drive.google.com/file/d/1GJMZu42_oUe457cjm1mCDoredRkvvUx6/view',  // Juego de Extractor de rodajes
     88: 'https://drive.google.com/file/d/1baMTkE0yXtTFVcFD6-mXm1gb_W5_d3ak/view',  // Juego de Gauge de láminas
    121: 'https://drive.google.com/file/d/1EOUjDTU1-Y461XjGuqvuPDOOhcwJWwtT/view',  // Juego de lapeadores de válvula
     95: 'https://drive.google.com/file/d/1MYPbykeGqqsGxRi0gm7y7IWQFQrUaYJA/view',  // Juego de limas
    123: 'https://drive.google.com/file/d/1lAaL0gY0nCWn7ApKhTAO0JQ0_caBIwRV/view',  // Juego de llaves Allen
     62: 'https://drive.google.com/file/d/1jhc30LGc2GKoIgMq7z_bCTl-K0I0pT_3/view',  // Juego de llaves de dado
     61: 'https://drive.google.com/file/d/1i5jwutCsOMko6576IcMdApNnaw5A7G1m/view',  // Juego de llaves de ruedas (Llave de cruz)
    131: 'https://drive.google.com/file/d/10Joar6FLVssla4-4-zJdLP_Bq1dOfM7Z/view',  // Juego de llaves para filtros de aceite
    120: 'https://drive.google.com/file/d/1OHSFegGB0YGRLTdGNMOgEfLNGNmV2wX5/view',  // Juego de micrómetro de interiores
     64: 'https://drive.google.com/file/d/1QSEdkB7xINGBi0l2P_vYx6rLaUs8W90h/view',  // Kit de llaves mixtas boca-corona
     86: 'https://drive.google.com/file/d/1937qbmDC7oeklWsvhMv8t7ZIowbaCRwX/view',  // Kit de Reloj comparador
     90: 'https://drive.google.com/file/d/1nFSF45DypKAsUqEh5DKTI4vj_0f4FYsq/view',  // Kit de Terrajas y machos (mm y pulgadas)
    125: 'https://drive.google.com/file/d/1FyumDpo783NkMd4lm3uHA9BdjkzmJ1iR/view',  // Kit para desmontaje de sensores
     65: 'https://drive.google.com/file/d/1Ea2WBBBjaIhpZkMFb-JqJCAYqhlPlrBE/view',  // Llave ajustable
     66: 'https://drive.google.com/file/d/1Rp7EyTm2kiJPThwLL-R6oXspuO_VBnju/view',  // Llave stillson
     76: 'https://drive.google.com/file/d/1DwB8EN7b921fxPhFQixzWMuVRXlUuDxG/view',  // Manómetro
     68: 'https://drive.google.com/file/d/1NGlHhCUmdt92hnSrq8PR-bDP7mU9Q_BG/view',  // Martillo de bola
     97: 'https://drive.google.com/file/d/1uwRPAH1tw6nRrPW7FjWj9l9idzqVpujN/view',  // Mazo de goma
     72: 'https://drive.google.com/file/d/1FsUe-pw9HhKGGiVlSbhBjy9-ZqlN4-s_/view',  // Micrómetro digital
    128: 'https://drive.google.com/file/d/1PLHWKnfEt8N9oUpeCvjZB4NreCQyziGI/view',  // Piqueta martillo cincel
     91: 'https://drive.google.com/file/d/1MHqIOQxy7L6MvagV6fMaiW5MmLGiOzjr/view',  // Prensa C
     92: 'https://drive.google.com/file/d/10v31Bar5N7AgaXfhPhdTmStE60I2TNdG/view',  // Rayador
    124: 'https://drive.google.com/file/d/1tIqnc_9x7WEEsQ2aYNl4GSEXNY_1HG9q/view',  // Recogedor magnético telescópico
    118: 'https://drive.google.com/file/d/1zz0NRuKyPQA61iNs8m-X4aQ7WM6mowBb/view',  // Recolector de aceite
    126: 'https://drive.google.com/file/d/1q676z2XQUvpenl1FMKxlLQKPDCDxILwN/view',  // Torquímetro

    // ── Mobiliario ─────────────────────────────────────────────────────────
     80: 'https://drive.google.com/file/d/1thj1CxX6Oj8nQRFAiaQjiClzNNdPfcoH/view',  // Anaquel de metal (1.00 x 0.40 x 1.80 m)
     79: 'https://drive.google.com/file/d/1qdFTEHRFCEQoH5YvW1sMpQ5AXaPP34mk/view',  // Armario de Metal — zona taller
     19: 'https://drive.google.com/file/d/1qdFTEHRFCEQoH5YvW1sMpQ5AXaPP34mk/view',  // Armario de Metal — zona TIC (mismo manual)
     57: 'https://drive.google.com/file/d/1wuEPDuQl6rf5vI6OitDxA1Fzg-J5Dye4/view',  // Banco de trabajo con tornillo de banco
     81: 'https://drive.google.com/file/d/1F-ccuPP9NNIKuyIvlpOqPxnaPga1QiyE/view',  // Carro porta herramientas
     17: 'https://drive.google.com/file/d/1yX25P3Ur_1cMk2uQD1CFq3A6AK4TPtW0/view',  // Escritorio para el docente
     58: 'https://drive.google.com/file/d/1Qs-ZWsGcmnw5gA1Qm7tOeCy4aT5SOUFx/view',  // Lavadero de 1 Poza
    142: 'https://drive.google.com/file/d/1TVNyCWeqH4TiliAfhsbwT7wzZX0v0puT/view',  // Mesa de apoyo
     10: 'https://drive.google.com/file/d/13w8H_tJNLlIfB0OwR7EWXOK7YiOpW7Z3/view',  // Mesa de Computadora para estudiante
     11: 'https://drive.google.com/file/d/1j4_kzxnXgvVoTRZRgI0GiPVT5MSJ-w6G/view',  // Mesa Discapacitado
     24: 'https://drive.google.com/file/d/1VUTLcXM1zUUxR2nJdGfFKlHouPC9ohZs/view',  // Mueble bajo (1000 x 600 x 900 mm)
     18: 'https://drive.google.com/file/d/1Em45tac28jmQdCpa6oG9YpWabJPF3N60/view',  // Silla para el docente
     12: 'https://drive.google.com/file/d/16EVFo910GKOJ6JfpTndGNY2NM2VAJBAn/view',  // Silla para Estudiante

    // ── Material pedagógico ────────────────────────────────────────────────
    154: 'https://drive.google.com/file/d/1xg2SGJ0hdZtohZLeXU0Fylf8erM3yZox/view',  // Láminas señalética y símbolos de seguridad (verificar n)
     22: 'https://drive.google.com/file/d/1rfV-Fitax8D3aKEt1_YZtrSD2Bl-SV8X/view',  // Juego de Modelos piezas mecánicas (proyecciones)
     20: 'https://drive.google.com/file/d/1oYxbtHjdC20bieOTAWpFTBwBWcXTkS7N/view',  // Kit Lienzo metodologías de diseño
     26: 'https://drive.google.com/file/d/1boyNebGyyjA4GNWFbda3IMc6T3mWsloB/view',  // Kit Lienzo flujogramas DOP y DAP
     25: 'https://drive.google.com/file/d/1bXocN2CAoDuEOUWQ5Lc9yFyfzews52vs/view',  // Kit Lienzo modelos de negocios

    // ── EPP y seguridad ────────────────────────────────────────────────────
    153: 'https://drive.google.com/file/d/1RAtRRsdU-1JD_QusaGqEokLd1DbxSmKk/view',  // Botiquín
    150: 'https://drive.google.com/file/d/1HdhOyJNfpdBp3XK56meDtxfNsUpI54Tm/view',  // Escarpines
    151: 'https://drive.google.com/file/d/1o0h3keLS2HbnJTpD8hUbNV1ijxOYPVRZ/view',  // Extintor CO2
    152: 'https://drive.google.com/file/d/1LTgO_8Rj6MUTXyCkseH7DeTX-KvOXQmq/view',  // Extintor PQS
    145: 'https://drive.google.com/file/d/1O8--cZQbrpgLYgD48EkiAod70EFkne39/view',  // Guantes de mecánico
    147: 'https://drive.google.com/file/d/1GdvNmmLg4tuj8Z6zLUlTfgNAKDawK4kb/view',  // Guantes para soldar
    144: 'https://drive.google.com/file/d/1CohewqTDwhrWi7hn5ipYf70cpxzcfFcW/view',  // Lentes de protección de policarbonato
    148: 'https://drive.google.com/file/d/1AaVfg7Gy2LiuSYMbF1OBQ6VWP60QmFe7/view',  // Mandil de serraje
    149: 'https://drive.google.com/file/d/1sZAuOrSBPpgXaHgb-z7svSbrgqQ191j7/view',  // Manga para soldar
    146: 'https://drive.google.com/file/d/1MG38Fz7zb7wdZbkohrIp8xs3MfOmUO-o/view',  // Máscara electrónica para soldar
  },
  electricidad: {
    42:  'https://drive.google.com/file/d/1dfvV1tuf331b2dEorcn9f_wDVWERmUa9/view',  // Alicate de corte
    43:  'https://drive.google.com/file/d/18eHG8mf4Zv6b8uc87_7i2E-4w42hmqam/view',  // Alicate de punta curva
    45:  'https://drive.google.com/file/d/1INWegr_H0USWEGVlKbmSEDueriZQ_56l/view',  // Alicate pelacable
    44:  'https://drive.google.com/file/d/1JlGk_KplU3nJfC1fViKG_WWFr7HCdq2g/view',  // Alicate universal
    50:  'https://drive.google.com/file/d/1cSAV2xIRLGYPKlM-QXA-rgnuC69YE_9J/view',  // Calibrador AWG
    51:  'https://drive.google.com/file/d/19dxsDGMUyNLpb5JfTlPuZB9ZLq0l7vD2/view',  // Cuchilla de electricista
    47:  'https://drive.google.com/file/d/1W-YFAkjzWLFWVvQjTWIotdmMAk_C-7b9/view',  // Guía pasacables
    46:  'https://drive.google.com/file/d/1DZaWqV4P-v0vVWng_2Jc087-qYRbda4g/view',  // Juego de destornilladores
    52:  'https://drive.google.com/file/d/1F-BxKzbPoD9PavbEznZgcse6dxqHOxd_/view',  // Wincha de 5 metros
    59:  'https://drive.google.com/file/d/1kaBLu9BzOUW9ZKi9dLqHQ1cNAd9bi5dn/view',  // Armario de metal
    60:  'https://drive.google.com/file/d/1Sc6al1WNsEqcVn7G5iyALyWYfIgWV_2t/view',  // Carritos para transporte de equipos
    18:  'https://drive.google.com/file/d/1yzQhUIS3mIo-wsA_V039eVWYROqBDkZv/view',  // Escritorio docente
    57:  'https://drive.google.com/file/d/1Oi3n5UlZAN3ArVJ7h79_fN9K9a2nmQXM/view',  // Escritorio rodable docente
    11:  'https://drive.google.com/file/d/1vqaXGPbmXMURFJwoVreeLEU139095XLf/view',  // Mesa de computadora estudiante
    78:  'https://drive.google.com/file/d/1dXxPufRafeuTgqQqUx6V2-39NqL_D7TX/view',  // Mesa de trabajo
    10:  'https://drive.google.com/file/d/1Mwf4BcRCAd2ybagpDtNPNPzBDh_14lwg/view',  // Mesa discapacitado
    14:  'https://drive.google.com/file/d/1df53aGgPqq9om287YEcGe_WnZwEC1jcA/view',  // Mueble bajo
    19:  'https://drive.google.com/file/d/1Lvx2YxuGhJi0RoUoY3uivkbVyk0XCJkQ/view',  // Silla docente
    12:  'https://drive.google.com/file/d/1n8qFZ7m6lCWmJ-fDyRaIeULO89R1Vh7R/view',  // Silla estudiante
    58:  'https://drive.google.com/file/d/1KuR-KOqvG6xU1SFZ_AWENTfFptH6xcn1/view',  // Silla rodable docente
    21:  'https://drive.google.com/file/d/1EMkCARQrtWnvyKkMr-Eg6B5aiFvbiiRW/view',  // Lienzo metodologías de diseño
    25:  'https://drive.google.com/file/d/17qqD17xNL6WyjTx898FmzyxAmYMcwSm-/view',  // Lienzo flujogramas DOP y DAP
    24:  'https://drive.google.com/file/d/1-luKr89c2EI4oNpGBpfoFej3snxksUJz/view',  // Lienzo modelos de negocios
    86:  'https://drive.google.com/file/d/1ZKth5WUcD_nGQBcrAibBIih6DqVnqJhO/view',  // Botiquín
    84:  'https://drive.google.com/file/d/1nnMyEcc8CluRvvNcV-kJsGKA7XUfRuJM/view',  // Extintor CO2
    85:  'https://drive.google.com/file/d/1M_8dPRO3-t7wvYN16WTzAAJYn1mPo-oK/view',  // Extintor PQS
    87:  'https://drive.google.com/file/d/1bRLJ5qjAHfdpGMMVHkX7osVQpnFnffzS/view',  // Guantes de electricista
  },
  'construcciones-metalicas': {
    // ── Equipos de soldadura ───────────────────────────────────────────────
    36: 'https://drive.google.com/file/d/169haFFopVFSAB5GENpV40CLcNZN4OA8v/view',  // Cabina de soldar con mesa de trabajo
    35: 'https://drive.google.com/file/d/1OZSgcxnVsSajeuiEl9zWAq7Ht61mFpOI/view',  // Regulador con flujo manómetro para CO2
    34: 'https://drive.google.com/file/d/1uyDDvl-7VA1yHDwFl5lnnNfHAZKJ2Yr_/view',  // Regulador de Argón soldador TIG-MIG CO2

    // ── Herramientas de medición ───────────────────────────────────────────
    59: 'https://drive.google.com/file/d/1zXDkGOoVC8ngqiXq5HLwxPRkyOJrecev/view',  // Calibrador analógico
    58: 'https://drive.google.com/file/d/1G5j-5A7L9VcgZpfmFSytMbhUdEkaP9Xi/view',  // Calibrador digital
    61: 'https://drive.google.com/file/d/1HT1a3uGvDj9Py7xbHIRGFInT6J0QnQ1h/view',  // Goniómetro digital
    60: 'https://drive.google.com/file/d/1S76U9YtMRFzWfDYMF3BhWfvQbsLVLi2t/view',  // Micrómetro digital
    64: 'https://drive.google.com/file/d/1Gbse9EUu0uUQOrUZpaXTtKbEkDn-7zk1/view',  // Nivel de burbujas
    57: 'https://drive.google.com/file/d/1XrVKNLLCtbEx7yWNz-Y-gOmS-KYl8fsN/view',  // Regla metálica de 30 cm
    63: 'https://drive.google.com/file/d/1B-7sS4ByPH7mpSXMijKEZtg9TZfF6oXR/view',  // Escuadra de combinación
    62: 'https://drive.google.com/file/d/1LgUB15tdIxkHM8zPOXp2VGofaAOFTmcH/view',  // Escuadra de Tope

    // ── Herramientas manuales ──────────────────────────────────────────────
    83: 'https://drive.google.com/file/d/129F6snkxRfB5TmE-l3VFcg6owMGLyCAm/view',  // Aceitera
    67: 'https://drive.google.com/file/d/1siLBm7sW8uXpph0NHEmn-7p8I24RgYks/view',  // Arco de Sierra
    40: 'https://drive.google.com/file/d/1mTop6iXBzIGlhzKXUow3rhsSm779sV2e/view',  // Cepillo de acero
    79: 'https://drive.google.com/file/d/1XZVieQn83FsqdRidDSQ1FUBCQDm4O0-3/view',  // Comba de 5 lb
    65: 'https://drive.google.com/file/d/1Kpjcbi1NvrNA-AbYx55FaooZTxa6hcxp/view',  // Granete
    74: 'https://drive.google.com/file/d/1Y4ggGorYwm-CdeExwlpyIyrJywKH4iOO/view',  // Juego de alicates aislados
    82: 'https://drive.google.com/file/d/1RdEaWdrO4u7AqT1UpC7_Fir6e9hjWm6Z/view',  // Juego de brocas HSS para metal
    78: 'https://drive.google.com/file/d/1hFpq3mzIt3rF3RXYQ7qDzH-8r1pc1-3K/view',  // Juego de Cincel
    80: 'https://drive.google.com/file/d/1F-MnCw-wWe_iYBzH3wU64XMrrWRHvlRi/view',  // Juego de Compas de punta
    69: 'https://drive.google.com/file/d/10JKOdRHn0oHY6wqaPt1JD8CzyDwt_2P4/view',  // Juego de limas
    73: 'https://drive.google.com/file/d/1S80_gLpJZj-udDqEVBpNsBhkVltpRw0B/view',  // Juego de llaves Allen milimétricas y pulgadas
    72: 'https://drive.google.com/file/d/1nx9eGBLzTOUw70ituO7-5J4sUhlA9-yZ/view',  // Juego de llaves mixtas
    70: 'https://drive.google.com/file/d/1EpFqTY4FX7Mavc2K49Zy2akkn_sldCva/view',  // Juego de martillo de bola
    81: 'https://drive.google.com/file/d/1ZzSwXBu8YD99UTS75ev8aH9mG94NaYEk/view',  // Kit de machos y terrajas
    41: 'https://drive.google.com/file/d/1NocoqqC1M4Gb3MYKCAzZZLg6jQ4vKC_F/view',  // Piqueta de soldador
    66: 'https://drive.google.com/file/d/1pKL1vX4OmXL3_JZAoBiRyB0HZtS51zdy/view',  // Rayador mecánico
    71: 'https://drive.google.com/file/d/1AKLi7K9Q3VtImaJIBVf5nCbOroCyKv7C/view',  // Set de destornilladores
    55: 'https://drive.google.com/file/d/179jIXO9nPR7_4JnJ5sDgxpjYdZ_nrzAX/view',  // Wincha de 3 metros

    // ── Mobiliario ─────────────────────────────────────────────────────────
    56: 'https://drive.google.com/file/d/1Y4zmq6w1F2fRrB0xT9BZm-yx5yrE82JY/view',  // Anaquel de metal (1.00 x 0.40 x 1.80 m)
    13: 'https://drive.google.com/file/d/1ZEXzf6IxfMgaUkUMZlcqm42UOnuGT7Mt/view',  // Armario de Metal
    54: 'https://drive.google.com/file/d/1MwuXWSF9SirG_cuF4BfFwnocReUknoDz/view',  // Banco de trabajo con tornillo de banco
    17: 'https://drive.google.com/file/d/12fk7SHJZmj8P6kU2d97Mv8FreCucBEQC/view',  // Escritorio para el docente
    52: 'https://drive.google.com/file/d/1Dv4lT-B_oBTGXkFMjPW9U7tp5r9-9aLW/view',  // Escritorio rodable docente
    19: 'https://drive.google.com/file/d/1kZIdhPLRMfpKlov-FclbJyp_NI7DQ9OA/view',  // Mesa de Computadora para estudiante
    20: 'https://drive.google.com/file/d/1Dr39hnKCD1tlk5mwiPc0RZUsYI0OCjee/view',  // Mesa Discapacitado
    30: 'https://drive.google.com/file/d/1ZtJoHmyKhtBWmLIx1dgn05HcVIeg_9IB/view',  // Mueble bajo
    16: 'https://drive.google.com/file/d/1tzEp2TLDOefgRvHVjO_e7API8LiWortO/view',  // Silla para el docente
    18: 'https://drive.google.com/file/d/1A8ZgJcYexY7th0qito7SLfg1NwUGlTXt/view',  // Silla para Estudiante
    53: 'https://drive.google.com/file/d/1rJ2A-pUx8VOIMz4X_D4KkE07wtvxB2w1/view',  // Silla rodable para el docente

    // ── Material pedagógico ────────────────────────────────────────────────
    75: 'https://drive.google.com/file/d/1ZS3tpWW4zdKS8OH5mZqjEyfday4Fd9iN/view',  // Juego de fichas señalética y símbolos de seguridad
    10: 'https://drive.google.com/file/d/1sx9JqAwV9VjaG_zsm0goTRzvHln9FWw2/view',  // Juego de Modelos de piezas
    12: 'https://drive.google.com/file/d/1oovp1FncuaefgOqBmEKhnlCVvztjzrBr/view',  // Lienzo magnético para metodologías de diseño

    // ── EPP y seguridad ────────────────────────────────────────────────────
    84: 'https://drive.google.com/file/d/1V1vFlXtrM47usUpKeiFYd46jmTIROy9x/view',  // Botiquín
    37: 'https://drive.google.com/file/d/1W6QqzFAk624NwrgwFIws0YPgnrI7Y88A/view',  // Careta de soldar fotosensible
    76: 'https://drive.google.com/file/d/1YmIU4uCPkqeeNqk1V4hb6dY91p_4W-zG/view',  // Extintor PQS
  },
  electronica: {
    49:  'https://drive.google.com/file/d/1JQ9neDsjKGwNuU_9qOXVFAOQXhxc0w2g/view', // Alicate de corte
    52:  'https://drive.google.com/file/d/1SbShRHVA1EazJTF7sKQ_h_mZlY9wYBB7/view', // Alicate de punta
    50:  'https://drive.google.com/file/d/1tUQTc4I3pcMoD63Mk-BRNMUQUhy7nvbl/view',  // Alicate de punta curva
    53:  'https://drive.google.com/file/d/1y1D-cVeJAvF1-nSv_MpBrEVlTt27Xu-G/view', // Alicate pelacable
    51:  'https://drive.google.com/file/d/1avcQaAeXeeIcip58IAIgjunsWlRiYTxy/view',  // Alicate universal
    66:  'https://drive.google.com/file/d/1JGq2zkAXD9eHMux3YBUDRWghcFv5znY7/view', // Calibrador AWG
    61:  'https://drive.google.com/file/d/1ubs_PZmDq_9jRKvfKvvlujvfgq0kUpMq/view', // Calibrador digital
    60:  'https://drive.google.com/file/d/1J42HbWPVZUjeFSC9YsakAG05c6Vb5hqR/view', // Cúter
    55:  'https://drive.google.com/file/d/1_RIxYd6PNpKltO-sEL8-MPNQ5D3twKLf/view', // Juego de destornilladores
    56:  'https://drive.google.com/file/d/1MPo1xu_j6Lob9K2LldLmf61cyITmKnPl/view', // Juego de destornilladores de precisión
    59:  'https://drive.google.com/file/d/1GQIs1nlk9DZ1MYvkxIbVlRngUisomYVe/view', // Juego de llaves Allen
    54:  'https://drive.google.com/file/d/1122pD-6Qn4Ip8J1RO-ronQe_pMNAGVaL/view', // Juego de mini alicates
    58:  'https://drive.google.com/file/d/11l-RhZYQV9bwML4WdEEmNWm-wYDjiFXm/view', // Juego de pinzas
    67:  'https://drive.google.com/file/d/1-psIXXfNdVLd6l5Ic2JQxTP9kJJMCqTO/view', // Llave ajustable
    73:  'https://drive.google.com/file/d/14UtoM9UtMYAFtdSM9gAghuscMwyR9jHI/view', // Lupas con iluminación
    68:  'https://drive.google.com/file/d/1pbrA8XqkTdrsTX0QWqvOyG5S0i8U0T30/view', // Tapete y sujetador de placas
    64:  'https://drive.google.com/file/d/1bZfHbgWbnTFcl-ECOJ3MALwnL0jDzF1i/view', // Tornillo de Banco
    18:  'https://drive.google.com/file/d/1rMpa3BkiqcIvmooNtULPiQI47O2I1t6U/view', // Armario de Metal
    16:  'https://drive.google.com/file/d/11sajmqqmmT5alekXwOPJKFRcY5KYgeDp/view',  // Escritorio para el docente
    10:  'https://drive.google.com/file/d/1j5iMUoUy96Hs9JbW_xF2I_556OciqW04/view', // Mesa de Computadora estudiante
    110: 'https://drive.google.com/file/d/1EfWnw8d8Cpl70T_7fyScYbDLahSs7fHw/view', // Mesa electrónica con 2 cajones
    109: 'https://drive.google.com/file/d/1BjvpwmOXBWvmA2F9Z6aO0-NNc0hVgOfN/view', // Mesa electrónica con encimera
    43:  'https://drive.google.com/file/d/11F18YZMmNizqmGGrtu-iENlSz9iPpSn7/view',  // Mesa Discapacitado
    42:  'https://drive.google.com/file/d/1QfTdfqk-rAuALcyYhOcs5nFMzxei2g_D/view', // Mueble bajo
    17:  'https://drive.google.com/file/d/1r2Jl4rDcr1_z1VIHvaZYRAvMUh0cNMYv/view', // Silla para el docente
    11:  'https://drive.google.com/file/d/1ycs1sJEnCz8MiIXdO6CPXCOrfKOGhyus/view',  // Silla para Estudiante
    111: 'https://drive.google.com/file/d/1ycs1sJEnCz8MiIXdO6CPXCOrfKOGhyus/view',  // Silla para Estudiante (duplicado)
    116: 'https://drive.google.com/file/d/1Ac9iDLgtOTkne7MH1jy9NgWamABxIiUM/view',  // Láminas señalética
    19:  'https://drive.google.com/file/d/1OqOSWE1AYYXV1HI4Tj_xyXyHMdeHfuG2/view', // Lienzo metodologías de diseño
    23:  'https://drive.google.com/file/d/1bdd_XH-vpF0nx0lrb9AVxp3RzXh8oXQw/view',  // Lienzo flujogramas DOP y DAP
    22:  'https://drive.google.com/file/d/1IQWo3ZYgQqGiJVQiLIS-r4qlI-NYUSZT/view',  // Lienzo modelos de negocios
    114: 'https://drive.google.com/file/d/1uektd9qSkUwaXijOfhyuOXGsGXEKWtQS/view',  // Botiquín
    112: 'https://drive.google.com/file/d/1JFpUQHWYKa1j_vEDP0pZzQNr12pTg7sD/view',  // Extintor CO2
    113: 'https://drive.google.com/file/d/1ZfawBdyGNOTrL72Yu9I0XRcATr0INxpX/view',  // Extintor PQS
    115: 'https://drive.google.com/file/d/1_Gt_oQnOY-h6Yf3C18EVF-BC-irLlbnE/view',  // Guantes de electricista
  },
  'taller-general-ept': {
     1: 'https://drive.google.com/file/d/1yU0hclwAmfPK3q5VEuj0BEaOOY2GFidC/view',  // Equipo de grabación para reportero
     2: 'https://drive.google.com/file/d/1WkfGJwoCmMg4xtJvcFLF7RzhoCEay1Jl/view',  // Cámara fotográfica
     3: 'https://drive.google.com/file/d/1XN5eT8bMbtPRsbVAUSutnc4NofX_8Esy/view',  // Cámara de video con trípode
    10: 'https://drive.google.com/file/d/1xIC45g_D7psg36m5yAK93VNjadxNBKy_/view',  // Mesa de computadora para estudiante
    11: 'https://drive.google.com/file/d/17xCssc7MYYE25UM4GZvfBIfw2LtTzZ9I/view',  // Silla para estudiante
    13: 'https://drive.google.com/file/d/1msCYBye2psMSdvWjFlkyoFOPECZqniaO/view',  // Mueble bajo (compartido n=13,19,51)
    15: 'https://drive.google.com/file/d/1l3g2qbp7tLX2H4aI_YCl7VmJoFWk7hiL/view',  // Escritorio para el docente
    16: 'https://drive.google.com/file/d/1F26vDWu9E1wFs18zTRzlItARBihql1ns/view',  // Silla para el docente
    17: 'https://drive.google.com/file/d/1ucXM43_auEqPB29d5ZqLz3QQ_EK-PHtJ/view',  // Ecran
    18: 'https://drive.google.com/file/d/1Lh3sMc2ej7JVtNK-hazZ_JUL6JHrGuws/view',  // Mesa para discapacitado
    19: 'https://drive.google.com/file/d/1msCYBye2psMSdvWjFlkyoFOPECZqniaO/view',  // Mueble bajo (mismo manual)
    20: 'https://drive.google.com/file/d/1DkaoX8t5t4miQld11i9_0XKtmsM_Xu8z/view',  // Armario de metal
    21: 'https://drive.google.com/file/d/1ubidVh_TC9VzA0rZJML5cyO2PKIpAHQH/view',  // Lienzo magnético — metodologías de diseño
    23: 'https://drive.google.com/file/d/1KyoGGQatcVj6vsr3unUMppdyLmXi6lP2/view',  // Lienzo magnético — modelos de negocios
    24: 'https://drive.google.com/file/d/15t0xM9NWn1B72Lip42bxH7NHRbvcO5FR/view',  // Lienzo magnético — flujogramas DOP y DAP
    30: 'https://drive.google.com/file/d/1AfUPh8n2Oa1iR3LmQ8u6iNcYh3yeT7gK/view',  // Juego de tijera de acero
    31: 'https://drive.google.com/file/d/1WhffAEyMcmWXMjRnP9aZWDO7AnsQTLse/view',  // Tijeras multiusos
    32: 'https://drive.google.com/file/d/1Z43_1Ae9CNPlGYN-XK_2Rf-SfGWWBKvN/view',  // Kit de cúter
    37: 'https://drive.google.com/file/d/1J4BLrC76xDMVpBjpvjQVcFGZftYDuOaz/view',  // Atornillador portátil
    38: 'https://drive.google.com/file/d/1rEgz_OIHPtd8Lfo3s_yEghyDNz9rF7Pt/view',  // Lijadora orbital
    39: 'https://drive.google.com/file/d/1W3BuRDMb28dTni2X4vUugYNbtmhqUGV6/view',  // Mesa de trabajo de acero
    41: 'https://drive.google.com/file/d/13PNa6B24hn3VPRr6Vhlg7DpyI-NJ7c6n/view',  // Pistola de silicona
    42: 'https://drive.google.com/file/d/1flup27FgGaQain0WPzyQUsaAqp2p_eeL/view',  // Wincha de 5 metros
    43: 'https://drive.google.com/file/d/1tRHmvCY9AK6arzf5AcxQ1-u1utsnTZ2h/view',  // Escuadra de tope
    44: 'https://drive.google.com/file/d/1rmSyJQxGKoJd58EEQL2zZg0uW9qNbufZ/view',  // Falsa escuadra
    45: 'https://drive.google.com/file/d/1xG4f0vK5MeVZNdNoqD78AO_8MkLNqiTm/view',  // Juego de pinceles
    46: 'https://drive.google.com/file/d/1EkP3Vy7FCSBGUXV2U8k32HZaoP0heA7M/view',  // Juego de pinceles esponja
    47: 'https://drive.google.com/file/d/13Cwc-6FqlPmsf1pUCu_swPmPIGncO86v/view',  // Cubeta lava pinceles
    48: 'https://drive.google.com/file/d/1DkaoX8t5t4miQld11i9_0XKtmsM_Xu8z/view',  // Armario de metal (mismo manual)
    49: 'https://drive.google.com/file/d/1x-1CQ5B5VsuzOAr0idOEXBNVsUENV4A_/view',  // Anaquel de metal
    50: 'https://drive.google.com/file/d/1T-bqEQBFhmJL84v8yFYto5ld8bucV3Ji/view',  // Mandil
    51: 'https://drive.google.com/file/d/1msCYBye2psMSdvWjFlkyoFOPECZqniaO/view',  // Mueble bajo (mismo manual)
    52: 'https://drive.google.com/file/d/1oBgUKol2gvWWiWZtdu8EmSbFMbj6mKqI/view',  // Mesa de apoyo
    57: 'https://drive.google.com/file/d/1ig_cRKJfuM_wNhW_mpr6WfH1ksdkbrzr/view',  // Armario multimedia
    58: 'https://drive.google.com/file/d/1SR1PsfqLq-bSTq-NSXPtQLv6PgssGBeu/view',  // Extintor CO2
    59: 'https://drive.google.com/file/d/18IoX3swBhOMPTT5LWLGZQ-RHu3JSmRZ7/view',  // Extintor PQS
    60: 'https://drive.google.com/file/d/1h1GFCRcEBbQF4C79YhXxl_6_VxsDLz7p/view',  // Detector de humos
    61: 'https://drive.google.com/file/d/11I-HnsBvYY50vlsaYQz0284iOI16MOOe/view',  // Botiquín
  },
}

// Busca el manual PDF para un bien específico
export function getManualPDF(tallerSlug: string, bienN: number): string | null {
  return manualesPDFPorBien[tallerSlug]?.[bienN] ?? null
}

// ── Videos de operatividad y mantenimiento por taller y bien.n ────────────────
// tallerSlug → bien.n → Drive URL (video)
export const videosOperatividadPorBien: Record<string, Record<number, string>> = {
  'ebanisteria': {
    76: 'https://vimeo.com/1182811717',  // Máquina garlopa
  },
  'taller-general-ept': {
     1: 'https://drive.google.com/file/d/1-wMPPdxZLo2oOtNd8cS_dch3cvN8HQYx/view',  // EGP-01  · Equipo de grabación para reportero
     2: 'https://drive.google.com/file/d/1QzcvxmUaoWN2YgG89TbblJzirpzTVPDB/view',  // CF-02   · Cámara fotográfica
     3: 'https://drive.google.com/file/d/14JxUAuvCzo8y8XFa6pEIgm6kRHFqWw28/view',  // CFT-02  · Cámara de video con trípode
     4: 'https://drive.google.com/file/d/1WnvX6ztLlfeFTBN-K673P9FAJzYZuPVt/view',  // TAB-02  · Tablet
     9: 'https://drive.google.com/file/d/1mux0bfhFfPyYhc5sbLcMVxJ5o54ycpv9/view',  // EGP-02  · Laptop
    10: 'https://drive.google.com/file/d/1lIqgr7Ta7qVyJ9H8Cxp4TlkUoZZ5rEeJ/view',  // MES-02  · Mesa de computadora para estudiante
    12: 'https://drive.google.com/file/d/1z-Tmoa6IZIiEYNFB_rAUNDcQAEC-OoS3/view',  // IMP-01  · Impresora multifuncional
    13: 'https://drive.google.com/file/d/1I9RCvVUl37fTk_dZIvxSnuLyUJHrSW-I/view',  // MB-01   · Mueble bajo
    18: 'https://drive.google.com/file/d/1ShtCwqR_-QE5q59gr7ClgDz_WeKgMEVv/view',  // MDI-01  · Mesa discapacitado
    20: 'https://drive.google.com/file/d/1nUTfrn4i5tFjmHWzEBOWC9LJ5PqzYk5f/view',  // ARM-01  · Armario de metal
    21: 'https://drive.google.com/file/d/1IOS-wIoHJIaaFfV-h_MmiNUUplz45C5Y/view',  // LIE-01  · Lienzo magnético para metodologías de diseño
    28: 'https://drive.google.com/file/d/1ZUEOWrD71atjn2dXWjfOgY_ZGrH5FmtE/view',  // KIT-01  · Kit electrónica (microcontroladores)
    29: 'https://drive.google.com/file/d/15YEgIX92Bn-oOr_-Wh_i3bbBXmf6Kmgp/view',  // MS-01   · Máquina de sublimación 8 en 1
    33: 'https://drive.google.com/file/d/1dgbtFCeiZU-blyae8XfIMNhl8nwM8kDg/view',  // IMP-3D  · Impresora 3D
    34: 'https://drive.google.com/file/d/1S3XaosRpRLnA4pI0IDOJQp2KU1s7XHt2/view',  // MEC-01  · Cortadora láser CO2
    35: 'https://drive.google.com/file/d/1zSDyKgkImFyXqznliet2DWBNflnpJ88z/view',  // MAC-01  · Máquina escáner y corte
    36: 'https://drive.google.com/file/d/17MPHtCehkAevM63cQwSaiYyn3ryvp-_Y/view',  // ESC-01  · Escáner 3D
    39: 'https://drive.google.com/file/d/1Fjpu6OnZcXWFRJkqVJm1PdzAuJdE9wzJ/view',  // MES-01  · Mesa de trabajo de acero
    49: 'https://drive.google.com/file/d/18fYJpuQZs121UG3UT0MyX6ds7qXK8Jh5/view',  // ANA-01  · Anaquel de metal
    50: 'https://drive.google.com/file/d/1OluNNNi8DNFa9J4feFnSDu7EszysTjU_/view',  // MAN-05  · Mandil
    52: 'https://drive.google.com/file/d/1UdANPnhZWJF8sHIoKtc2IgbAWvausMGg/view',  // MAP-01  · Mesa de apoyo
    30: 'https://drive.google.com/file/d/1wS0d6gbm0BO2UQKSZ8qhrHsjAyHtIFd4/view',  // OTR-01  · Juego de tijera de acero
    31: 'https://drive.google.com/file/d/1IGxirIue_4o1o6XSesWgYD8LE0S9JQs_/view',  // OTR-02  · Tijeras multiusos
    32: 'https://drive.google.com/file/d/1gen0AZBOr57OQ-VmqR0ZDs10TfA2eCYz/view',  // OTR-03  · Kit de cúter
    37: 'https://drive.google.com/file/d/1SMZ0J03ja4xUxtP1R0c01K7kUMpx_uD0/view',  // OTR-04  · Atornillador portátil
    38: 'https://drive.google.com/file/d/1dKgF4s5FIwB41MSgNFPb9I526GUSIO2X/view',  // OTR-05  · Lijadora orbital
    40: 'https://drive.google.com/file/d/1t5ttxge0w1S6nAqausD_6d0u53G6Bq2T/view',  // OTR-06  · Pirograbador con diversas puntas
    41: 'https://drive.google.com/file/d/1WnAIr_PcfEMFBugaZh2wnLiMYBKR8K3O/view',  // OTR-07  · Pistola de silicona
    42: 'https://drive.google.com/file/d/1xl_o3tpNIvInU6VLQhbJQcPx93-bdz-Y/view',  // OTR-08  · Wincha de 5 metros
    43: 'https://drive.google.com/file/d/1k9B4mmlIiItvBlNqI4FEwRuhJQA4WtZf/view',  // OTR-09  · Escuadra de tope
    44: 'https://drive.google.com/file/d/1P41YQF6lfto845vCP5vqzHSJaEgJ1F8m/view',  // OTR-10  · Falsa escuadra
    45: 'https://drive.google.com/file/d/16vRXA4gAB5n8Itw0ilDzgESkQLjGunu7/view',  // OTR-13  · Juego de pinceles
    46: 'https://drive.google.com/file/d/1EwV72Q6rg1o5LS5hg9u6lnKmq6W0hngw/view',  // OTR-14  · Juego de pinceles esponja
    47: 'https://drive.google.com/file/d/1BMrnMnmb8_dMxc0fPVpcig3D5ZSBZcWk/view',  // OTR-15  · Cubeta lava pinceles
    56: 'https://drive.google.com/file/d/1DA1xwpUjvzqDGr-Mw4T2bAdNcRuqWTWw/view',  // EC-01   · Equipo de comunicación switch
    57: 'https://drive.google.com/file/d/1YiKbWiTyTDjxrz4Srl6mAQeUbFw9-mnI/view',  // AMU-01  · Armario multimedia
    58: 'https://drive.google.com/file/d/1BLM2vtBbyZA7JOzSFYKLYJ9UYeyWzQzy/view',  // OTR-18  · Extintor CO2 (video agrupado extintores)
    59: 'https://drive.google.com/file/d/1BLM2vtBbyZA7JOzSFYKLYJ9UYeyWzQzy/view',  // OTR-18  · Extintor PQS (mismo video agrupado)
    63: 'https://drive.google.com/file/d/1zM4myoiUCO404H1j2dDQgDl7UOx6b6Vw/view',  // AML-01  · Armario móvil para laptop
  },
  'mecanica-automotriz': {
    // ── EPP y seguridad ────────────────────────────────────────────────────
    148: 'https://drive.google.com/file/d/1-8l_wCdtpK-KSyIwoEdpI55UVIeJXU-U/view',  // Mandil de serraje
    147: 'https://drive.google.com/file/d/1-8l_wCdtpK-KSyIwoEdpI55UVIeJXU-U/view',  // Guantes para soldar
    144: 'https://drive.google.com/file/d/1-8l_wCdtpK-KSyIwoEdpI55UVIeJXU-U/view',  // Lentes de protección de policarbonato
    150: 'https://drive.google.com/file/d/1-8l_wCdtpK-KSyIwoEdpI55UVIeJXU-U/view',  // Escarpines
    149: 'https://drive.google.com/file/d/1-8l_wCdtpK-KSyIwoEdpI55UVIeJXU-U/view',  // Manga para soldar
    146: 'https://drive.google.com/file/d/1-8l_wCdtpK-KSyIwoEdpI55UVIeJXU-U/view',  // Máscara electrónica para soldar

    // ── Herramientas manuales ──────────────────────────────────────────────
     66: 'https://drive.google.com/file/d/1PUXjv6NlsN37_iib42QpSDotnxSocLO1/view',  // Llave Stillson
     75: 'https://drive.google.com/file/d/14VgPcwgUvBJkPwyR6YVv811CHP-ob2gj/view',  // Goniómetro digital
    121: 'https://drive.google.com/file/d/1MZKDvnK-haQ1eL9WTtfAJMpaaWBw9MvT/view',  // Juego de lapeadores de válvula (video 1)
     97: 'https://drive.google.com/file/d/1XlFEDekx47NKI5hxOZACdFUCLcM20Bqt/view',  // Mazo de goma
     61: 'https://drive.google.com/file/d/1vAXVrakzfV45eWu-cQffDAO-l5PSe2Pr/view',  // Juego de llaves de ruedas (Llave de cruz)
    133: 'https://drive.google.com/file/d/1vAXVrakzfV45eWu-cQffDAO-l5PSe2Pr/view',  // Bandeja para recolectar aceite
    134: 'https://drive.google.com/file/d/1Su-GG1PcKs4w5KMuY4SibMwRh9DcV5sV/view',  // Embudo de uso industrial
    131: 'https://drive.google.com/file/d/1IPKQMeNmxeEyOGQi-dCs6Tc1S6cqo0Ik/view',  // Juego de llaves para filtros de aceite
    129: 'https://drive.google.com/file/d/1aUGxgSQECtKSfzmpOBiGet7DvGiWkctu/view',  // Aceitera
     96: 'https://drive.google.com/file/d/1rdKUw7RhbauTQkxA2l-pgvzWbudBP6S_/view',  // Engrasadora
     87: 'https://drive.google.com/file/d/1ZYlLLtr8TJDBZ_vZvY5I9BrvYZdscsMT/view',  // Juego de extractor de rodajes
    105: 'https://drive.google.com/file/d/1KI2rWkXkiiJKPJO_8nK0k7ZfG0urmPLW/view',  // Batería
    135: 'https://drive.google.com/file/d/1oKYmf26qAveZyv_5b39UF8DlNJvNEUHW/view',  // Galonera de gasolina
  },
}

// Busca el video de operatividad para un bien específico
export function getVideoOperatividad(tallerSlug: string, bienN: number): string | null {
  return videosOperatividadPorBien[tallerSlug]?.[bienN] ?? null
}
