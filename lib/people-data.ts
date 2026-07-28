export type HairStyle =
  | 'buzzcut'
  | 'fade'
  | 'pompadour'
  | 'side_part'
  | 'short_crop'
  | 'spikes'
  | 'man_bun'
  | 'cap'
  | 'afro'
  | 'dreads'
  | 'slick'
  | 'long_wavy'
  | 'bun'
  | 'pixie'
  | 'curly_bob'
  | 'ponytail';

export type FacingDirection = 'left' | 'right' | 'front';

export type OutfitType = 'turtleneck' | 'round_neck' | 'v_neck' | 'hoodie' | 'collar';

export type AccessoryType = 'none' | 'beard' | 'mustache';

export interface PersonData {
  id: string;
  name: string;
  role: string;
  bio?: string;
  hairStyle: HairStyle;
  facing: FacingDirection;
  skinColor: string;
  hairColor: string;
  outfitColor: string;
  outfitType: OutfitType;
  accessory: AccessoryType;
  lipsColor?: string;
  tileBg?: string;
  row?: number;
  col?: number;
}

export interface ColorPalette {
  id: string;
  name: string;
  bg: string;
  frameBg: string;
  skins: string[];
  hairs: string[];
  outfits: string[];
  lips: string[];
  tileBgs?: string[];
}

export const LIGHT_SKIN_TONES = [
  '#FFF0E5', // Fair Porcelain
  '#FFDFC4', // Light Ivory / White
  '#FDDFC5', // Warm Peach
  '#F3D0B7', // Light Beige
  '#F2CD96', // Golden / Light
  '#E8C39E', // Golden Wheat
  '#E5B880', // Warm Light Tan
];

export const DARK_SKIN_TONES = [
  '#C68642', // Warm Cinnamon / Mixed
  '#B5783B', // Amber Brown
  '#A06236', // Bronze
  '#8D5524', // Deep Brown
  '#734128', // Rich Espresso Brown
  '#603B14', // Dark Chocolate
  '#4A2C11', // Deep Ebony
];

export const NATURAL_SKIN_TONES = [
  ...LIGHT_SKIN_TONES,
  ...DARK_SKIN_TONES,
];

export const PRESET_PALETTES: ColorPalette[] = [
  {
    id: 'frosted_glass',
    name: 'Frosted Glass Noir',
    bg: '#020617',
    frameBg: 'rgba(255, 255, 255, 0.08)',
    skins: NATURAL_SKIN_TONES,
    hairs: ['#6366F1', '#38BDF8', '#A855F7', '#10B981', '#F43F5E', '#FFFFFF'],
    outfits: ['#1E1B4B', '#312E81', '#0F172A', '#4C1D95', '#064E3B', '#881337'],
    lips: ['#F43F5E', '#818CF8', '#38BDF8'],
    tileBgs: [
      'rgba(255, 255, 255, 0.05)',
      'rgba(99, 102, 241, 0.12)',
      'rgba(168, 85, 247, 0.12)',
      'rgba(56, 189, 248, 0.12)',
      'rgba(16, 185, 129, 0.12)',
    ],
  },
  {
    id: 'original_pop',
    name: 'Original Pop Art',
    bg: '#FF2B85',
    frameBg: '#FFFFFF',
    skins: NATURAL_SKIN_TONES,
    hairs: ['#071026', '#00D2FF', '#FF0055', '#FF85B3', '#FFFFFF', '#00E5FF'],
    outfits: ['#071026', '#FF0055', '#00D2FF', '#FF85B3', '#FFFFFF', '#0A1A40'],
    lips: ['#FF0055', '#00D2FF', '#071026', '#FF85B3'],
    tileBgs: [
      '#FF2B85',
      '#00D2FF',
      '#071026',
      '#FF0055',
      '#00E5FF',
      '#FF85B3',
      '#0A1A40',
      '#FF2B85',
    ],
  },
  {
    id: 'cyberpunk',
    name: 'Cyber Neon',
    bg: '#0F051D',
    frameBg: '#180B30',
    skins: NATURAL_SKIN_TONES,
    hairs: ['#00F0FF', '#FF007F', '#FFE600', '#7000FF', '#FFFFFF'],
    outfits: ['#1F0038', '#FF007F', '#00F0FF', '#FFE600', '#2E0054'],
    lips: ['#FF007F', '#00F0FF', '#FFE600'],
    tileBgs: ['#1F0038', '#2E0054', '#00F0FF22', '#FF007F22', '#7000FF22'],
  },
  {
    id: 'pastel_dreams',
    name: 'Pastel Dreams',
    bg: '#F3E8FF',
    frameBg: '#FFFFFF',
    skins: NATURAL_SKIN_TONES,
    hairs: ['#38BDF8', '#F472B6', '#FBBF24', '#818CF8', '#34D399'],
    outfits: ['#0284C7', '#DB2777', '#D97706', '#4F46E5', '#059669'],
    lips: ['#E11D48', '#0284C7', '#7C3AED'],
    tileBgs: ['#F3E8FF', '#E0F2FE', '#FCE7F3', '#FEF3C7', '#ECFDF5'],
  },
  {
    id: 'monochrome_dark',
    name: 'Monochrome Noir',
    bg: '#111827',
    frameBg: '#1F2937',
    skins: NATURAL_SKIN_TONES,
    hairs: ['#F9FAFB', '#6B7280', '#374151', '#111827', '#E5E7EB'],
    outfits: ['#1F2937', '#374151', '#4B5563', '#9CA3AF', '#F3F4F6'],
    lips: ['#9CA3AF', '#4B5563', '#111827'],
    tileBgs: ['#111827', '#1F2937', '#374151', '#030712'],
  },
  {
    id: 'warm_sunset',
    name: 'Warm Sunset',
    bg: '#FF5E36',
    frameBg: '#FFF7ED',
    skins: NATURAL_SKIN_TONES,
    hairs: ['#FF2E00', '#FF9900', '#4A0E17', '#FFFFFF', '#FFD200'],
    outfits: ['#7C2D12', '#C2410C', '#EA580C', '#1E1B4B', '#991B1B'],
    lips: ['#991B1B', '#7C2D12', '#FF2E00'],
    tileBgs: ['#FF5E36', '#9A3412', '#C2410C', '#FF9900', '#7C2D12'],
  },
];

const FEMALE_NAMES = [
  'Maya', 'Zara', 'Elena', 'Chloe', 'Aria', 'Zoe', 'Amara', 'Siena',
  'Kira', 'Rhea', 'Lila', 'Freya', 'Sofia', 'Nina', 'Layla', 'Mia'
];

const MALE_NAMES = [
  'Leo', 'Kai', 'Lucas', 'Mateo', 'Kenji', 'Finn', 'Liam', 'Diego',
  'Tariq', 'Milo', 'Julien', 'Oscar', 'Dante', 'Marcus', 'Noah'
];

const UNISEX_NAMES = [
  'Sora', 'Devon', 'Nova', 'Yuki', 'Jordan', 'Morgan', 'Alex', 'Riley'
];

const FEMALE_HAIRSTYLES: HairStyle[] = [
  'curly_bob', 'long_wavy', 'bun', 'pixie', 'ponytail', 'afro', 'dreads', 'side_part', 'cap', 'short_crop'
];

const MALE_HAIRSTYLES: HairStyle[] = [
  'buzzcut', 'fade', 'pompadour', 'side_part', 'short_crop', 'spikes', 'man_bun', 'cap', 'afro', 'dreads', 'slick'
];

const UNISEX_HAIRSTYLES: HairStyle[] = [
  'afro', 'dreads', 'cap', 'short_crop', 'side_part', 'pixie', 'bun', 'ponytail'
];

const ROLES = [
  'UI Designer', 'Frontend Dev', 'Product Lead', 'Creative Director', 'AI Researcher',
  'Sound Engineer', 'Illustrator', 'UX Writer', 'Motion Designer', 'Fullstack Engineer',
  '3D Artist', 'Community Manager', 'Brand Strategist', 'Systems Architect', 'Data Scientist'
];

const BIOS = [
  'Passionate about responsive motion & pop art dynamics.',
  'Building accessible, delightful web interfaces.',
  'Coffee enthusiast & vector art lover.',
  'Crafting scalable frontend design systems.',
  'Exploring generative canvas art & Framer Motion.',
  'Obsessed with micro-interactions and smooth curves.',
  'Creating human-centered digital experiences.'
];

function cyrb128(str: string) {
  let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860223);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860223);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return (h1^h2^h3^h4) >>> 0;
}

function sfc32(a: number, b: number, c: number, d: number) {
  return function() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = c << 21 | c >>> 11;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  };
}

function createPRNG(seedStr: string) {
  const seed = cyrb128(seedStr);
  return sfc32(seed, seed ^ 0xDEADBEEF, seed ^ 0xCAFEBABE, seed ^ 0x811C9DC5);
}

export function generatePerson(
  id: string,
  palette: ColorPalette = PRESET_PALETTES[0],
  row?: number,
  col?: number,
  seed: number | string = 0,
  personIndex?: number,
  forcedGender?: 'female' | 'male',
  forcedSkinToneGroup?: 'dark' | 'light'
): PersonData {
  const rng = createPRNG(`${id}-${palette.id}-${seed}-${row ?? 0}-${col ?? 0}-${personIndex ?? 0}`);
  const getRandom = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];

  // Determine index for deterministic balance across grid / crowd
  const idx = personIndex ?? (row !== undefined && col !== undefined ? row * 100 + col : Math.floor(rng() * 1000));

  // Determine gender presentation (50% Female / 50% Male for perfect balance)
  let presentation: 'female' | 'male';
  if (forcedGender) {
    presentation = forcedGender;
  } else {
    // Alternating index guarantees exact 50% Female, 50% Male
    presentation = idx % 2 === 0 ? 'female' : 'male';
  }

  // Determine skin tone group (50% Dark Skin / Black, 50% Light Skin / White for perfect balance)
  let skinToneGroup: 'dark' | 'light';
  if (forcedSkinToneGroup) {
    skinToneGroup = forcedSkinToneGroup;
  } else {
    // Staggered pattern: (idx % 4 === 0 || idx % 4 === 3) gives 50% Dark, 50% Light
    // Combining with gender gives 25% Female Dark, 25% Male Light, 25% Female Light, 25% Male Dark
    skinToneGroup = (idx % 4 === 0 || idx % 4 === 3) ? 'dark' : 'light';
  }

  let name: string;
  let hairStyle: HairStyle;
  let accessory: AccessoryType = 'none';

  if (presentation === 'female') {
    name = getRandom(FEMALE_NAMES);
    hairStyle = getRandom(FEMALE_HAIRSTYLES);
    accessory = 'none'; // strictly no beard/mustache for female presentation
  } else {
    name = getRandom(MALE_NAMES);
    hairStyle = getRandom(MALE_HAIRSTYLES);
    const hasFacialHair = rng() > 0.55;
    if (hasFacialHair) {
      accessory = getRandom(['beard', 'mustache']);
    } else {
      accessory = 'none';
    }
  }

  const directions: FacingDirection[] = ['left', 'right', 'front', 'left', 'right'];
  const outfitTypes: OutfitType[] = ['turtleneck', 'round_neck', 'v_neck', 'hoodie', 'collar'];

  const tileBg = palette.tileBgs && palette.tileBgs.length > 0
    ? getRandom(palette.tileBgs)
    : undefined;

  // Select skin color based on skinToneGroup (dark/black vs light/white)
  const skinGroupList = skinToneGroup === 'dark' ? DARK_SKIN_TONES : LIGHT_SKIN_TONES;
  const availableSkins = tileBg
    ? skinGroupList.filter(s => s.toLowerCase() !== tileBg.toLowerCase())
    : skinGroupList;
  const skin = availableSkins.length > 0 ? getRandom(availableSkins) : getRandom(skinGroupList);

  // Select hair color (must not be same as skin or tileBg)
  const availableHairs = palette.hairs.filter(
    h => h.toLowerCase() !== skin.toLowerCase() && (!tileBg || h.toLowerCase() !== tileBg.toLowerCase())
  );
  const hair = availableHairs.length > 0 ? getRandom(availableHairs) : getRandom(palette.hairs);

  // Select outfit color (STRICT REQUIREMENT: MUST NOT BE SAME AS HAIR COLOR, skin color, or tileBg)
  const availableOutfits = palette.outfits.filter(
    o =>
      o.toLowerCase() !== hair.toLowerCase() && // Hair color !== Outfit color
      o.toLowerCase() !== skin.toLowerCase() &&
      (!tileBg || o.toLowerCase() !== tileBg.toLowerCase())
  );

  let outfit: string;
  if (availableOutfits.length > 0) {
    outfit = getRandom(availableOutfits);
  } else {
    // Fallback if palette outfits was filtered out
    const backupOutfits = palette.outfits.filter(o => o.toLowerCase() !== hair.toLowerCase());
    if (backupOutfits.length > 0) {
      outfit = getRandom(backupOutfits);
    } else {
      // Pick alternative color from palette distinct from hair
      const distinctColor = palette.hairs.find(h => h.toLowerCase() !== hair.toLowerCase()) || '#0F172A';
      outfit = distinctColor;
    }
  }

  return {
    id,
    name,
    role: getRandom(ROLES),
    bio: getRandom(BIOS),
    hairStyle,
    facing: getRandom(directions),
    skinColor: skin,
    hairColor: hair,
    outfitColor: outfit,
    outfitType: getRandom(outfitTypes),
    accessory,
    lipsColor: getRandom(palette.lips),
    tileBg,
    row,
    col,
  };
}

export function generateCrowd(count: number, palette: ColorPalette = PRESET_PALETTES[0], seed: number | string = 0): PersonData[] {
  return Array.from({ length: count }, (_, i) => generatePerson(`person-${i}`, palette, undefined, undefined, seed, i));
}
