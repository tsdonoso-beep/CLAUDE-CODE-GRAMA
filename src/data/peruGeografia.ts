// src/data/peruGeografia.ts
// Geografía del Perú: Departamentos y Provincias (Fuente: INEI)

export interface PeruProvincia { nombre: string }
export interface PeruDepartamento { nombre: string; provincias: string[] }

export const PERU_GEO: PeruDepartamento[] = [
  { nombre: 'AMAZONAS', provincias: ['CHACHAPOYAS', 'BAGUA', 'BONGARÁ', 'CONDORCANQUI', 'LUYA', 'RODRÍGUEZ DE MENDOZA', 'UTCUBAMBA'] },
  { nombre: 'ÁNCASH', provincias: ['HUARAZ', 'AIJA', 'ANTONIO RAIMONDI', 'ASUNCIÓN', 'BOLOGNESI', 'CARHUAZ', 'CARLOS FERMÍN FITZCARRALD', 'CASMA', 'CORONGO', 'HUARI', 'HUARMEY', 'HUAYLAS', 'MARISCAL LUZURIAGA', 'OCROS', 'PALLASCA', 'POMABAMBA', 'RECUAY', 'SANTA', 'SIHUAS', 'YUNGAY'] },
  { nombre: 'APURÍMAC', provincias: ['ABANCAY', 'ANDAHUAYLAS', 'ANTABAMBA', 'AYMARAES', 'COTABAMBAS', 'CHINCHEROS', 'GRAU'] },
  { nombre: 'AREQUIPA', provincias: ['AREQUIPA', 'CAMANÁ', 'CARAVELÍ', 'CASTILLA', 'CAYLLOMA', 'CONDESUYOS', 'ISLAY', 'LA UNIÓN'] },
  { nombre: 'AYACUCHO', provincias: ['HUAMANGA', 'CANGALLO', 'HUANCA SANCOS', 'HUANTA', 'LA MAR', 'LUCANAS', 'PARINACOCHAS', 'PÁUCAR DEL SARA SARA', 'SUCRE', 'VÍCTOR FAJARDO', 'VILCAS HUAMÁN'] },
  { nombre: 'CAJAMARCA', provincias: ['CAJAMARCA', 'CAJABAMBA', 'CELENDÍN', 'CHOTA', 'CONTUMAZÁ', 'CUTERVO', 'HUALGAYOC', 'JAÉN', 'SAN IGNACIO', 'SAN MARCOS', 'SAN MIGUEL', 'SAN PABLO', 'SANTA CRUZ'] },
  { nombre: 'CALLAO', provincias: ['CALLAO'] },
  { nombre: 'CUSCO', provincias: ['CUSCO', 'ACOMAYO', 'ANTA', 'CALCA', 'CANAS', 'CANCHIS', 'CHUMBIVILCAS', 'ESPINAR', 'LA CONVENCIÓN', 'PARURO', 'PAUCARTAMBO', 'QUISPICANCHI', 'URUBAMBA'] },
  { nombre: 'HUANCAVELICA', provincias: ['HUANCAVELICA', 'ACOBAMBA', 'ANGARAES', 'CASTROVIRREYNA', 'CHURCAMPA', 'HUAYTARA', 'TAYACAJA'] },
  { nombre: 'HUÁNUCO', provincias: ['HUÁNUCO', 'AMBO', 'DOS DE MAYO', 'HUACAYBAMBA', 'HUAMALÍES', 'LEONCIO PRADO', 'MARAÑÓN', 'PACHITEA', 'PUERTO INCA', 'LAURICOCHA', 'YAROWILCA'] },
  { nombre: 'ICA', provincias: ['ICA', 'CHINCHA', 'NASCA', 'PALPA', 'PISCO'] },
  { nombre: 'JUNÍN', provincias: ['HUANCAYO', 'CHANCHAMAYO', 'CHUPACA', 'CONCEPCIÓN', 'JUNÍN', 'SATIPO', 'TARMA', 'YAULI'] },
  { nombre: 'LA LIBERTAD', provincias: ['TRUJILLO', 'ASCOPE', 'BOLÍVAR', 'CHEPÉN', 'JULCÁN', 'OTUZCO', 'PACASMAYO', 'PATAZ', 'SÁNCHEZ CARRIÓN', 'SANTIAGO DE CHUCO', 'GRAN CHIMÚ', 'VIRÚ'] },
  { nombre: 'LAMBAYEQUE', provincias: ['CHICLAYO', 'FERREÑAFE', 'LAMBAYEQUE'] },
  { nombre: 'LIMA', provincias: ['LIMA', 'BARRANCA', 'CAJATAMBO', 'CANTA', 'CAÑETE', 'HUARAL', 'HUAROCHIRÍ', 'HUAURA', 'OYÓN', 'YAUYOS'] },
  { nombre: 'LORETO', provincias: ['MAYNAS', 'ALTO AMAZONAS', 'LORETO', 'MARISCAL RAMÓN CASTILLA', 'PUTUMAYO', 'REQUENA', 'UCAYALI', 'DATEM DEL MARAÑÓN'] },
  { nombre: 'MADRE DE DIOS', provincias: ['TAMBOPATA', 'MANU', 'TAHUAMANU'] },
  { nombre: 'MOQUEGUA', provincias: ['MARISCAL NIETO', 'GENERAL SÁNCHEZ CERRO', 'ILO'] },
  { nombre: 'PASCO', provincias: ['PASCO', 'DANIEL ALCIDES CARRIÓN', 'OXAPAMPA'] },
  { nombre: 'PIURA', provincias: ['PIURA', 'AYABACA', 'HUANCABAMBA', 'MORROPÓN', 'PAITA', 'SULLANA', 'TALARA', 'SECHURA'] },
  { nombre: 'PUNO', provincias: ['PUNO', 'AZÁNGARO', 'CARABAYA', 'CHUCUITO', 'EL COLLAO', 'HUANCANÉ', 'LAMPA', 'MELGAR', 'MOHO', 'SAN ANTONIO DE PUTINA', 'SAN ROMÁN', 'SANDIA', 'YUNGUYO'] },
  { nombre: 'SAN MARTÍN', provincias: ['MOYOBAMBA', 'BELLAVISTA', 'EL DORADO', 'HUALLAGA', 'LAMAS', 'MARISCAL CÁCERES', 'PICOTA', 'RIOJA', 'SAN MARTÍN', 'TOCACHE'] },
  { nombre: 'TACNA', provincias: ['TACNA', 'CANDARAVE', 'JORGE BASADRE', 'TARATA'] },
  { nombre: 'TUMBES', provincias: ['TUMBES', 'CONTRALMIRANTE VILLAR', 'ZARUMILLA'] },
  { nombre: 'UCAYALI', provincias: ['CORONEL PORTILLO', 'ATALAYA', 'PADRE ABAD', 'PURÚS'] },
]

export const getProvincias = (departamento: string): string[] =>
  PERU_GEO.find(d => d.nombre === departamento)?.provincias ?? []
