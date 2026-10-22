/**
 * Personal photos for the "Beyond the code" carousel (About section).
 * Order here = order on the site (output name: src/assets/personal/NN-<slug>.jpg).
 *
 *   file   original in photos-inbox/ (gitignored: originals carry camera metadata and GPS)
 *   slug   short kebab-case name for the output file
 *   focus  optional crop anchor when the subject is not centred:
 *          'attention' (default, sharp's saliency crop), 'entropy', 'centre',
 *          'top' | 'bottom' | 'left' | 'right' | 'left top' | 'right bottom' …
 *
 * Alt text and captions live in src/data/profile.{en,es}.ts (one entry per photo, same order).
 * Run: node scripts/normalize-photos.mjs
 */
export default [
  { file: 'machu-picchu-peru.jpg', slug: 'machu-picchu', focus: 'right' },
  { file: 'cerro-punay-ecuador.jpg', slug: 'cerro-punay', focus: 'centre' },
  { file: 'chimborazo-ecuador.jpg', slug: 'chimborazo', focus: 'centre' },
  { file: 'uyuni-bolivia.jpg', slug: 'uyuni', focus: 'centre' },
  { file: 'mangahurco-ecuador.jpg', slug: 'mangahurco', focus: 'top' },
  { file: 'alausi-ecuador.heic', slug: 'alausi', focus: 'bottom' },
];
