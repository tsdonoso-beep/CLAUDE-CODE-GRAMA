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

// tallerSlug → bien.n → Drive URL
export const manualesPDFPorBien: Record<string, Record<number, string>> = {
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
}

// Busca el manual PDF para un bien específico
export function getManualPDF(tallerSlug: string, bienN: number): string | null {
  return manualesPDFPorBien[tallerSlug]?.[bienN] ?? null
}
