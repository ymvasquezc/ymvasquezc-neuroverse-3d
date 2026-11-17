/**
 * Descripciones educativas curadas para estructuras destacadas.
 *
 * Clave = `label` del manifest (sin sufijo de lateralidad). Solo se incluyen
 * estructuras ampliamente reconocidas con descripción de nivel educativo general.
 * INTEGRIDAD CIENTÍFICA: si una estructura no está aquí, el panel NO inventa texto;
 * muestra únicamente los metadatos objetivos del modelo (nombre, categoría, TA2).
 */
export interface CuratedInfo {
  readonly description: string;
  readonly functions: readonly string[];
}

export const CURATED_DESCRIPTIONS: Readonly<Record<string, CuratedInfo>> = {
  // Cerebelo
  'Tonsil of cerebellum': {
    description:
      'Lobulillo del cerebelo situado en la cara inferior; su descenso puede comprimir el tronco (malformación de Chiari).',
    functions: ['Coordinación motora'],
  },
  Culmen: {
    description: 'Lóbulo del vermis cerebelar anterior, implicado en el control postural y del tronco.',
    functions: ['Postura', 'Coordinación axial'],
  },

  // Tronco encefálico
  Pons: {
    description:
      'Puente del tronco encefálico. Conecta cerebro y cerebelo y contiene núcleos de pares craneales y centros respiratorios.',
    functions: ['Relevo cerebro-cerebelo', 'Respiración', 'Sueño'],
  },
  'Medulla oblongata': {
    description:
      'Bulbo raquídeo. Regula funciones vitales autónomas: ritmo cardíaco, respiración y reflejos como la deglución y el vómito.',
    functions: ['Ritmo cardíaco', 'Respiración', 'Reflejos vitales'],
  },
  Midbrain: {
    description:
      'Mesencéfalo. Participa en reflejos visuales y auditivos, control motor y regulación de la vigilia.',
    functions: ['Reflejos visuales/auditivos', 'Control motor', 'Vigilia'],
  },
  'Superior colliculus': {
    description: 'Tubérculo cuadrigémino superior; coordina movimientos oculares y reflejos visuales de orientación.',
    functions: ['Orientación visual', 'Movimientos oculares'],
  },
  'Inferior colliculus': {
    description: 'Tubérculo cuadrigémino inferior; estación principal de la vía auditiva en el mesencéfalo.',
    functions: ['Procesamiento auditivo'],
  },
  'Red nucleus': {
    description: 'Núcleo rojo del mesencéfalo, implicado en la coordinación motora y el tono muscular.',
    functions: ['Coordinación motora', 'Tono muscular'],
  },

  // Diencéfalo
  'Pineal gland': {
    description: 'Glándula pineal. Secreta melatonina y regula los ritmos circadianos (ciclo sueño-vigilia).',
    functions: ['Melatonina', 'Ritmos circadianos'],
  },
  'Optic chiasm': {
    description: 'Quiasma óptico. Punto de cruce parcial de las fibras de los nervios ópticos.',
    functions: ['Vía visual'],
  },
  'Mamillary body': {
    description: 'Cuerpo mamilar del hipotálamo, parte del circuito de Papez; interviene en la memoria.',
    functions: ['Memoria'],
  },
  'Lateral geniculate body': {
    description: 'Cuerpo geniculado lateral del tálamo; relevo de la información visual hacia la corteza.',
    functions: ['Relevo visual'],
  },
  'Medial geniculate body': {
    description: 'Cuerpo geniculado medial del tálamo; relevo de la información auditiva hacia la corteza.',
    functions: ['Relevo auditivo'],
  },

  // Núcleos grises profundos / ganglios basales
  'Caudate nucleus': {
    description: 'Núcleo caudado. Parte de los ganglios basales; participa en el control del movimiento y el aprendizaje.',
    functions: ['Control motor', 'Aprendizaje', 'Conducta'],
  },
  Putamen: {
    description: 'Putamen. Junto al globo pálido forma el núcleo lenticular; regula el movimiento.',
    functions: ['Control motor'],
  },
  'Globus pallidus internal': {
    description: 'Segmento interno del globo pálido; salida principal de los ganglios basales hacia el tálamo.',
    functions: ['Regulación del movimiento'],
  },
  'Globus pallidus external': {
    description: 'Segmento externo del globo pálido; nodo de la circuitería de los ganglios basales.',
    functions: ['Regulación del movimiento'],
  },
  'Nucleus accumbens': {
    description: 'Núcleo accumbens. Nodo del circuito de recompensa y la motivación.',
    functions: ['Recompensa', 'Motivación'],
  },
  'Substantia nigra': {
    description: 'Sustancia negra. Produce dopamina; su degeneración se asocia a la enfermedad de Parkinson.',
    functions: ['Dopamina', 'Control motor'],
  },
  'Subthalamic nucleus': {
    description: 'Núcleo subtalámico; diana frecuente de la estimulación cerebral profunda en el Parkinson.',
    functions: ['Regulación del movimiento'],
  },

  // Ventrículos
  'Lateral ventricle': {
    description: 'Ventrículo lateral. Cavidad que contiene líquido cefalorraquídeo producido por el plexo coroideo.',
    functions: ['LCR'],
  },
  'Third ventricle': {
    description: 'Tercer ventrículo, cavidad media del sistema ventricular entre ambos tálamos.',
    functions: ['LCR'],
  },
  'Fourth ventricle': {
    description: 'Cuarto ventrículo, situado entre el tronco y el cerebelo; comunica con el canal central.',
    functions: ['LCR'],
  },
  'Choroid plexus': {
    description: 'Plexo coroideo. Produce el líquido cefalorraquídeo dentro de los ventrículos.',
    functions: ['Producción de LCR'],
  },

  // Sustancia blanca / comisuras
  'Corpus callosum': {
    description: 'Cuerpo calloso. Mayor haz de fibras que conecta ambos hemisferios cerebrales.',
    functions: ['Comunicación interhemisférica'],
  },
  Fornix: {
    description: 'Fórnix. Vía principal de salida del hipocampo dentro del sistema límbico.',
    functions: ['Memoria'],
  },
  'Anterior commissure': {
    description: 'Comisura anterior. Haz que conecta regiones de ambos lóbulos temporales.',
    functions: ['Comunicación interhemisférica'],
  },
};
