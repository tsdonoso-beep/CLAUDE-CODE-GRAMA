// src/data/ieData.ts
// Instituciones Educativas participantes del programa EPT · GRAMA

export interface InstitucionEducativa {
  id: number;
  nombre: string;
  cui: string;
  codigoModular: string;
  region: string;
  provincia: string;
  distrito: string;
  talleres: string[]; // slugs de taller
}

export const INSTITUCIONES_EDUCATIVAS: InstitucionEducativa[] = [
  {
    id: 1,
    nombre: '16449 ELOY SOBERON FLORES',
    cui: '2131102',
    codigoModular: '594697',
    region: 'CAJAMARCA',
    provincia: 'SAN IGNACIO',
    distrito: 'SAN IGNACIO',
    talleres: ['cocina-reposteria'],
  },
  {
    id: 2,
    nombre: '2026 SIMON BOLIVAR',
    cui: '2318007',
    codigoModular: '436642',
    region: 'LIMA METROPOLITANA',
    provincia: 'LIMA',
    distrito: 'COMAS',
    talleres: ['computacion-informatica', 'electricidad', 'industria-alimentaria', 'industria-vestido'],
  },
  {
    id: 3,
    nombre: '6049 RICARDO PALMA',
    cui: '2113956',
    codigoModular: '325464',
    region: 'LIMA METROPOLITANA',
    provincia: 'LIMA',
    distrito: 'SURQUILLO',
    talleres: ['computacion-informatica', 'electronica', 'electricidad'],
  },
  {
    id: 4,
    nombre: 'FRANCISCO IRAZOLA',
    cui: '2131125',
    codigoModular: '373191',
    region: 'JUNIN',
    provincia: 'SATIPO',
    distrito: 'SATIPO',
    talleres: ['industria-alimentaria', 'mecanica-automotriz'],
  },
  {
    id: 5,
    nombre: 'GUILLERMO E. BILLINGHURST',
    cui: '2155697',
    codigoModular: '285791',
    region: 'LIMA PROVINCIA',
    provincia: 'BARRANCA',
    distrito: 'BARRANCA',
    talleres: ['computacion-informatica', 'ebanisteria', 'electricidad', 'industria-alimentaria', 'mecanica-automotriz'],
  },
  {
    id: 6,
    nombre: 'JOSE GRANDA',
    cui: '2131587',
    codigoModular: '437236',
    region: 'LIMA METROPOLITANA',
    provincia: 'LIMA',
    distrito: 'SAN MARTIN DE PORRES',
    talleres: ['mecanica-automotriz', 'computacion-informatica', 'industria-alimentaria'],
  },
  {
    id: 7,
    nombre: 'MANUEL ANTONIO MESONES MURO',
    cui: '2131620',
    codigoModular: '273599',
    region: 'SAN MARTIN',
    provincia: 'EL DORADO',
    distrito: 'SAN JOSE DE SISA',
    talleres: ['industria-vestido', 'construcciones-metalicas', 'ebanisteria'],
  },
];

export const getTalleresDeIE = (ieId: number): string[] =>
  INSTITUCIONES_EDUCATIVAS.find(ie => ie.id === ieId)?.talleres ?? [];

export const getIEsByTaller = (tallerSlug: string): InstitucionEducativa[] =>
  INSTITUCIONES_EDUCATIVAS.filter(ie => ie.talleres.includes(tallerSlug));