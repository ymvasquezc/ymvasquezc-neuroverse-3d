/**
 * Traducción al español de las etiquetas anatómicas del modelo (Z-Anatomy/BodyParts3D).
 *
 * Clave = `label` en inglés del manifest. Valor = término en español según la
 * nomenclatura anatómica habitual (Terminologia Anatomica).
 *
 * INTEGRIDAD CIENTÍFICA: solo se traducen términos con equivalente establecido en
 * español. Si una etiqueta no está aquí, la UI conserva el nombre original en vez
 * de arriesgar una traducción incorrecta de un término médico.
 */
export const LABEL_ES: Readonly<Record<string, string>> = {
  // --- Córtex: giros, surcos y lóbulos ---
  'Angular gyrus': 'Giro angular',
  'Anterior occipital sulcus': 'Surco occipital anterior',
  'Calcarine sulcus': 'Surco calcarino',
  'Central sulcus': 'Surco central',
  'Cingulate gyrus (Posteroventral part)': 'Giro del cíngulo (parte posteroventral)',
  'Cingulate gyrus and sulcus (Middle anterior part)':
    'Giro y surco del cíngulo (parte media anterior)',
  'Cingulate gyrus and sulcus (Middle posterior part)':
    'Giro y surco del cíngulo (parte media posterior)',
  'Cingulate gyrus and sulcus (Posterior dorsal part)':
    'Giro y surco del cíngulo (parte posterior dorsal)',
  'Cingulate sulcus (Marginal part)': 'Surco del cíngulo (parte marginal)',
  'Circular sulcus of insula': 'Surco circular de la ínsula',
  'Collateral sulcus': 'Surco colateral',
  Cuneus: 'Cuña (cuneus)',
  Hippocampus: 'Hipocampo',
  'Inferior frontal sulcus': 'Surco frontal inferior',
  'Inferior occipital gyrus and sulcus': 'Giro y surco occipital inferior',
  'Inferior temporal gyrus': 'Giro temporal inferior',
  'Inferior temporal sulcus': 'Surco temporal inferior',
  'Insula (Subcentral gyrus and ant. and post. sulci)':
    'Ínsula (giro subcentral y surcos anterior y posterior)',
  'Intraparietal sulcus': 'Surco intraparietal',
  'Lat Fis-ant-Horizont': 'Cisura lateral (ramo anterior horizontal)',
  'Lat Fis-ant-Vertical': 'Cisura lateral (ramo anterior vertical)',
  'Lat Fis-post': 'Cisura lateral (ramo posterior)',
  'Sulcus interm prim-Jensen': 'Surco intermedio primario (de Jensen)',
  'Lateral occipital gyrus (Middle occipital gyrus)':
    'Giro occipital lateral (giro occipital medio)',
  'Lateral occipitotemporal gyrus': 'Giro occipitotemporal lateral',
  'Lingual gyrus': 'Giro lingual',
  'Lunate sulcus': 'Surco lunado',
  'Medial occipitotemporal gyrus (Parahippocampal)':
    'Giro occipitotemporal medial (parahipocampal)',
  'Middle frontal gyrus': 'Giro frontal medio',
  'Middle temporal gyrus': 'Giro temporal medio',
  'Occipital pole': 'Polo occipital',
  'Occipitotemporal sulcus (Lateral part)': 'Surco occipitotemporal (parte lateral)',
  'Olfactory sulcus': 'Surco olfatorio',
  'Opercular part of inferior frontal gyrus':
    'Parte opercular del giro frontal inferior',
  'Orbital gyri': 'Giros orbitarios',
  'Orbital gyri (Frontomarginal gyrus and sulcus)':
    'Giros orbitarios (giro y surco frontomarginal)',
  'Orbital part of inferior frontal gyrus':
    'Parte orbitaria del giro frontal inferior',
  'Orbital sulci (H-shaped orbital sulci)':
    'Surcos orbitarios (surcos orbitarios en H)',
  'Orbital sulci (Lateral Orbital sulcus)':
    'Surcos orbitarios (surco orbitario lateral)',
  'Paracentral gyrus and sulcus': 'Giro y surco paracentral',
  'Paracentral sulcus': 'Surco paracentral',
  'Parieto-occipital sulcus': 'Surco parietooccipital',
  'Postcentral gyrus': 'Giro poscentral',
  'Postcentral sulcus': 'Surco poscentral',
  'Posterior transverse collateral sulcus':
    'Surco colateral transverso posterior',
  'Precentral gyrus': 'Giro precentral',
  'Precentral sulcus (Superior part)': 'Surco precentral (parte superior)',
  'Precentral sulcus (inferior part)': 'Surco precentral (parte inferior)',
  Precuneus: 'Precuña (precuneus)',
  'Straight gyrus (Gyrus rectus)': 'Giro recto',
  'Subparietal sulcus': 'Surco subparietal',
  'Superior frontal gyrus': 'Giro frontal superior',
  'Superior frontal sulcus': 'Surco frontal superior',
  'Superior occipital gyri': 'Giros occipitales superiores',
  'Superior parietal lobule': 'Lobulillo parietal superior',
  'Superior temporal gyrus (Lateral part)': 'Giro temporal superior (parte lateral)',
  'Superior temporal sulcus': 'Surco temporal superior',
  'Supramarginal gyrus': 'Giro supramarginal',
  'Temporal plane': 'Plano temporal',
  'Temporal pole': 'Polo temporal',
  'Transverse frontopolar gyrus and sulcus': 'Giro y surco frontopolar transverso',
  'Transverse occipital sulcus': 'Surco occipital transverso',
  'Transverse temporal gyri': 'Giros temporales transversos',
  'Triangular part of inferior frontal gyrus':
    'Parte triangular del giro frontal inferior',

  // --- Nervios craneales ---
  'Abducens nerve (VI)': 'Nervio abducens (VI)',
  'Accessory nerve (XI)': 'Nervio accesorio (XI)',
  'Anterior division of mandibular nerve': 'División anterior del nervio mandibular',
  'Buccal nerve': 'Nervio bucal',
  'Facial nerve (VII)': 'Nervio facial (VII)',
  'Hypoglossal nerve (XII)': 'Nervio hipogloso (XII)',
  'Inferior alveolar nerve': 'Nervio alveolar inferior',
  'Lingual nerve': 'Nervio lingual',
  'Maxillary nerve': 'Nervio maxilar',
  'Meningeal branch of maxillary nerve': 'Ramo meníngeo del nervio maxilar',
  'Mental nerve': 'Nervio mentoniano',
  'Motor root of trigeminal nerve': 'Raíz motora del nervio trigémino',
  'Oculomotor nerve (III)': 'Nervio oculomotor (III)',
  'Olfactory nerve (I)': 'Nervio olfatorio (I)',
  'Ophthalmic nerve': 'Nervio oftálmico',
  'Optic nerve (II)': 'Nervio óptico (II)',
  'Posterior division of mandibular nerve':
    'División posterior del nervio mandibular',
  'Sensory root of trigeminal nerve': 'Raíz sensitiva del nervio trigémino',
  'Trigeminal nerve (V)': 'Nervio trigémino (V)',
  'Trochlear nerve (IV)': 'Nervio troclear (IV)',
  'Vagus nerve (X)': 'Nervio vago (X)',
  'Vestibular nerve': 'Nervio vestibular',

  // --- Tronco encefálico ---
  'Accessory nucleus of oculomotor nerve':
    'Núcleo accesorio del nervio oculomotor',
  'Aqueduct of midbrain': 'Acueducto del mesencéfalo',
  'Inferior colliculus': 'Colículo inferior',
  'Interpeduncular fossa': 'Fosa interpeduncular',
  'Medulla oblongata': 'Bulbo raquídeo',
  Midbrain: 'Mesencéfalo',
  'Motor nucleus of facial nerve': 'Núcleo motor del nervio facial',
  'Nucleus of abducens nerve': 'Núcleo del nervio abducens',
  'Nucleus of oculomotor nerve': 'Núcleo del nervio oculomotor',
  Olive: 'Oliva',
  Pons: 'Puente (protuberancia)',
  'Pyramid of medulla oblongata': 'Pirámide del bulbo raquídeo',
  'Red nucleus': 'Núcleo rojo',
  'Superior colliculus': 'Colículo superior',
  'Superior salivatory nucleus': 'Núcleo salivatorio superior',
  'Vestibular nuclei': 'Núcleos vestibulares',

  // --- Tractos de sustancia blanca ---
  'Acoustic radiation': 'Radiación acústica',
  'Anterior thalamic radiation': 'Radiación talámica anterior',
  'Arcuate fasciculus': 'Fascículo arqueado',
  'Corticobulbar tract': 'Tracto corticobulbar',
  'Corticopontine tract (frontal)': 'Tracto corticopontino (frontal)',
  'Corticopontine tract (occipital)': 'Tracto corticopontino (occipital)',
  'Corticopontine tract (parietal)': 'Tracto corticopontino (parietal)',
  'Corticospinal tract': 'Tracto corticoespinal',
  'Corticostriatal tract (anterior)': 'Tracto corticoestriatal (anterior)',
  'Corticostriatal tract (posterior)': 'Tracto corticoestriatal (posterior)',
  'Corticostriatal tract (superior)': 'Tracto corticoestriatal (superior)',
  'Dentatorubrothalamic tract': 'Tracto dentadorrubrotalámico',
  'Frontal aslant tract': 'Tracto frontal oblicuo',
  'Inferior cerebellar peduncle': 'Pedúnculo cerebeloso inferior',
  'Inferior fronto-occipital fasciculus': 'Fascículo frontooccipital inferior',
  'Inferior longitudinal fasciculus': 'Fascículo longitudinal inferior',
  'Medial lemniscus': 'Lemnisco medial',
  'Middle cerebellar peduncle': 'Pedúnculo cerebeloso medio',
  'Middle longitudinal fasciculus': 'Fascículo longitudinal medio',
  'Optic radiation': 'Radiación óptica',
  'Posterior thalamic radiation': 'Radiación talámica posterior',
  'Reticulospinal tract': 'Tracto reticuloespinal',
  'Superior cerebellar peduncle': 'Pedúnculo cerebeloso superior',
  'Superior longitudinal fasciculus I': 'Fascículo longitudinal superior I',
  'Superior longitudinal fasciculus II': 'Fascículo longitudinal superior II',
  'Superior longitudinal fasciculus III': 'Fascículo longitudinal superior III',
  'Superior thalamic radiation': 'Radiación talámica superior',
  'Uncinate fasciculus': 'Fascículo unciforme',

  // --- Diencéfalo ---
  Adenohypophysis: 'Adenohipófisis',
  'Anterior hypothalamus': 'Hipotálamo anterior',
  'Anterior nuclei of thalamus': 'Núcleos anteriores del tálamo',
  Habenula: 'Habénula',
  'Intralaminar and lateral posterior nuclei':
    'Núcleos intralaminares y lateral posterior',
  'Lateral geniculate body': 'Cuerpo geniculado lateral',
  'Lateral hypothalamus': 'Hipotálamo lateral',
  'Mamillary body': 'Cuerpo mamilar',
  'Medial geniculate body': 'Cuerpo geniculado medial',
  'Mediodorsal nucleus': 'Núcleo mediodorsal',
  Neurohypophysis: 'Neurohipófisis',
  'Optic chiasm': 'Quiasma óptico',
  'Optic tract': 'Tracto óptico',
  'Pineal gland': 'Glándula pineal',
  'Posterior commissure': 'Comisura posterior',
  'Posterior hypothalamus': 'Hipotálamo posterior',
  'Preoptic hypothalamus': 'Hipotálamo preóptico',
  Pulvinar: 'Pulvinar',
  'Stria medullaris thalami': 'Estría medular del tálamo',
  'Tuberal hypothalamus': 'Hipotálamo tuberal',
  'Ventral anterior nucleus': 'Núcleo ventral anterior',
  'Ventral laterodorsal nucleus': 'Núcleo ventral laterodorsal',
  'Ventral lateroventral nucleus': 'Núcleo ventral lateroventral',

  // --- Arterias ---
  'Anterior cerebral artery': 'Arteria cerebral anterior',
  'Anterior communicating artery': 'Arteria comunicante anterior',
  'Anterior inferior cerebellar artery': 'Arteria cerebelosa anteroinferior',
  'Anterior spinal artery': 'Arteria espinal anterior',
  'Basilar artery': 'Arteria basilar',
  'Callosomarginal artery': 'Arteria callosomarginal',
  'Distal lateral striate branches': 'Ramas estriadas laterales distales',
  'Frontal branches of callosomarginal artery':
    'Ramas frontales de la arteria callosomarginal',
  'Insular branches of middle cerebral artery (M2)':
    'Ramas insulares de la arteria cerebral media (M2)',
  'Insular branches of middle cerebral artery (M2-segment)':
    'Ramas insulares de la arteria cerebral media (segmento M2)',
  'Internal carotid artery': 'Arteria carótida interna',
  'Lateral pontine branches of basilar artery':
    'Ramas pontinas laterales de la arteria basilar',
  'Medial pontine branches of basilar artery':
    'Ramas pontinas mediales de la arteria basilar',
  'Middle cerebral artery (M1-segment)':
    'Arteria cerebral media (segmento M1)',
  'Middle cerebral artery (M3 segment)':
    'Arteria cerebral media (segmento M3)',
  'Middle cerebral artery (M3-segment)':
    'Arteria cerebral media (segmento M3)',
  'Ophthalmic artery': 'Arteria oftálmica',
  'Orbitofrontal branches of anterior cerebral artery':
    'Ramas orbitofrontales de la arteria cerebral anterior',
  'Parietal branches of middle cerebral artery':
    'Ramas parietales de la arteria cerebral media',
  'Pericallosal artery': 'Arteria pericallosa',
  'Posterior cerebral artery': 'Arteria cerebral posterior',
  'Posterior communicating artery': 'Arteria comunicante posterior',
  'Posterior inferior cerebellar artery': 'Arteria cerebelosa posteroinferior',
  'Proximal lateral striate branches': 'Ramas estriadas laterales proximales',
  'Superior cerebellar artery': 'Arteria cerebelosa superior',
  'Temporal branches of middle cerebral artery':
    'Ramas temporales de la arteria cerebral media',
  'Vertebral artery': 'Arteria vertebral',

  // --- Sustancia blanca y comisuras ---
  'Anterior commissure': 'Comisura anterior',
  'Corpus callosum': 'Cuerpo calloso',
  Fornix: 'Fórnix',
  'Hippocampal commissure': 'Comisura del hipocampo',
  'Stria terminalis': 'Estría terminal',
  'White matter of telencephalon': 'Sustancia blanca del telencéfalo',

  // --- Venas y senos durales ---
  'Anterior intercavernous sinus': 'Seno intercavernoso anterior',
  'Basilar venous plexus': 'Plexo venoso basilar',
  'Cavernous sinus': 'Seno cavernoso',
  'Inferior petrosal sinus': 'Seno petroso inferior',
  'Inferior sagittal sinus': 'Seno sagital inferior',
  'Occipital sinus': 'Seno occipital',
  'Posterior intercavernous sinus': 'Seno intercavernoso posterior',
  'Sigmoid sinus': 'Seno sigmoideo',
  'Straight sinus': 'Seno recto',
  'Superior petrosal sinus': 'Seno petroso superior',
  'Superior sagittal sinus': 'Seno sagital superior',
  'Transverse sinus': 'Seno transverso',

  // --- Cerebelo ---
  'Anterior quadrangular lobule': 'Lobulillo cuadrangular anterior',
  'Base of peduncle': 'Base del pedúnculo',
  'Biventral lobule': 'Lobulillo biventral',
  'Central lobule': 'Lobulillo central',
  Culmen: 'Culmen',
  Declive: 'Declive',
  Flocculus: 'Flóculo',
  'Folium of vermis': 'Folium del vermis',
  'Gracile lobule': 'Lobulillo grácil',
  'Inferior semilunar lobule': 'Lobulillo semilunar inferior',
  'Lingula of cerebellum': 'Língula del cerebelo',
  'Nodule of vermis': 'Nódulo del vermis',
  'Peduncle of flocculus': 'Pedúnculo del flóculo',
  'Posterior quadrangular lobule': 'Lobulillo cuadrangular posterior',
  'Pyramis of vermis': 'Pirámide del vermis',
  'Superior semilunar lobule': 'Lobulillo semilunar superior',
  'Tonsil of cerebellum': 'Amígdala cerebelosa',
  'Tuber of vermis': 'Túber del vermis',
  'Uvula of vermis': 'Úvula del vermis',
  'Wing of central lobule': 'Ala del lobulillo central',

  // --- Núcleos grises profundos / ganglios basales ---
  'Basolateral complex': 'Complejo basolateral (amígdala)',
  'Caudate nucleus': 'Núcleo caudado',
  'Central nucleus': 'Núcleo central (amígdala)',
  'Corticomedial group': 'Grupo corticomedial (amígdala)',
  'Globus pallidus external': 'Globo pálido externo',
  'Globus pallidus internal': 'Globo pálido interno',
  'Lateral nucleus': 'Núcleo lateral (amígdala)',
  'Nucleus accumbens': 'Núcleo accumbens',
  Putamen: 'Putamen',
  'Septal nuclei': 'Núcleos septales',
  'Substantia nigra': 'Sustancia negra',
  'Subthalamic nucleus': 'Núcleo subtalámico',

  // --- Ventrículos ---
  'Choroid plexus': 'Plexo coroideo',
  'Fourth ventricle': 'Cuarto ventrículo',
  'Lateral ventricle': 'Ventrículo lateral',
  'Septum pellucidum': 'Septum pellucidum',
  'Third ventricle': 'Tercer ventrículo',

  // --- Meninges y duramadre ---
  'Falx cerebri': 'Hoz del cerebro',
  'Tentorium cerebelli': 'Tienda del cerebelo',
};

/** Etiquetas de categoría en español. */
export const CATEGORY_LABEL_ES: Readonly<Record<string, string>> = {
  cortex: 'Córtex: giros, surcos y lóbulos',
  cranial_nerves: 'Nervios craneales (I–XII)',
  brainstem: 'Tronco encefálico',
  tracts: 'Tractos de sustancia blanca',
  diencephalon: 'Diencéfalo (tálamo, hipotálamo)',
  arteries: 'Arterias (polígono de Willis)',
  white_matter: 'Sustancia blanca y comisuras',
  veins_sinuses: 'Senos y venas durales',
  cerebellum: 'Cerebelo',
  deep_grey: 'Núcleos grises profundos / ganglios basales',
  ventricles: 'Sistema ventricular',
  meninges_dura: 'Meninges y duramadre',
};

/** Traduce una etiqueta al español; conserva el original si no hay traducción. */
export function translateLabel(label: string): string {
  return LABEL_ES[label] ?? label;
}

/** Traduce una etiqueta de categoría al español. */
export function translateCategory(key: string, fallback: string): string {
  return CATEGORY_LABEL_ES[key] ?? fallback;
}
