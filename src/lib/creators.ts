// Roster = the 12 creators, with photos, niches and platform stats. No outbound
// profile links.
//
// Lives here rather than in the Connect page because two consumers need it and
// they no longer sit together: the Connect hero's contact sheet renders every
// photo, while RosterBrowser — pulled off the page — renders the full
// dossier. Keeping one array means the roster is edited in a single place.
export type Creator = {
  num: string
  name: string
  photo: string
  /**
   * Shown in the Connect hero readout as well as the dossier, so a missing one
   * is visible on the live site — the readout holds the line with an NBSP.
   */
  niche?: string
  /**
   * Read *only* by `RosterBrowser`, which is not currently mounted anywhere.
   * The eleven populated sets are there for when it is; chasing the twelfth
   * would be sourcing data nothing renders. Fill it in if the browser goes
   * back on a page.
   */
  stats?: { platform: string; count: string }[]
}

export const creators: Creator[] = [
  {
    num: '01',
    name: 'Marygrace Tropeano',
    niche: 'Model · Beauty · Lifestyle',
    photo: '/images/creators/marygrace-tropeano.jpg',
    stats: [
      { platform: 'TikTok', count: '1,200,000' },
      { platform: 'YouTube', count: '682,000' },
      { platform: 'Instagram', count: '342,000' },
    ],
  },
  {
    num: '02',
    name: 'Carrie Patsalis',
    niche: 'Travel · Tech · Lifestyle',
    photo: '/images/creators/carrie-patsalis.jpg',
    stats: [
      { platform: 'Instagram', count: '207,000' },
      { platform: 'YouTube', count: '167,000' },
      { platform: 'TikTok', count: '75,000' },
    ],
  },
  {
    num: '03',
    name: 'Time Drops',
    niche: 'Horology · Lifestyle',
    photo: '/images/creators/time-drops.jpg',
    stats: [
      { platform: 'YouTube', count: '52,000' },
      { platform: 'Instagram', count: '2,500' },
      { platform: 'Newsletter Readers', count: '2,500' },
    ],
  },
  {
    num: '04',
    name: 'Paul Johnston Naylor',
    niche: 'Humour · Family · Movies',
    photo: '/images/creators/paul-johnston-naylor.jpg',
    stats: [
      { platform: 'Facebook', count: '1,000,000' },
      { platform: 'TikTok', count: '417,000' },
      { platform: 'Instagram', count: '218,000' },
    ],
  },
  {
    num: '05',
    name: 'Lapheal Sterling',
    niche: 'Fashion · Lifestyle',
    photo: '/images/creators/lapheal-sterling.jpg',
    stats: [
      { platform: 'Instagram', count: '53,000' },
      { platform: 'TikTok', count: '13,000' },
    ],
  },
  {
    num: '06',
    name: 'Amiizmus',
    niche: 'Fashion · Lifestyle',
    photo: '/images/creators/amiizmus.jpg',
    stats: [
      { platform: 'Instagram', count: '20,000' },
      { platform: 'TikTok', count: '3,000' },
    ],
  },
  {
    num: '07',
    name: 'Monika Rosie Young',
    niche: 'Fashion · Beauty · Lifestyle',
    photo: '/images/creators/monika-rosie-young.jpg',
    stats: [
      { platform: 'Instagram', count: '10,700' },
      { platform: 'TikTok', count: '2,000' },
    ],
  },
  {
    num: '08',
    name: 'Sam Kojo Plummer',
    niche: 'Sport · Fitness · Tech',
    photo: '/images/creators/sam-kojo-plummer.jpg',
    stats: [
      { platform: 'Instagram @kojostricklab', count: '155,000' },
      { platform: 'Instagram', count: '117,000' },
    ],
  },
  {
    num: '09',
    name: 'Thick CutChipz',
    niche: 'Fashion · Lifestyle',
    photo: '/images/creators/thick-cutchipz.jpg',
    stats: [{ platform: 'Instagram', count: '9,000' }],
  },
  {
    num: '10',
    name: 'HiggoUK',
    niche: 'Music · Tech',
    photo: '/images/creators/higgouk.jpg',
    stats: [
      { platform: 'Spotify Listeners', count: '350,000' },
      { platform: 'Instagram', count: '12,000' },
    ],
  },
  {
    num: '11',
    name: 'Strength Sweat Succeed',
    niche: 'Fitness · Tech',
    photo: '/images/creators/strength-sweat-succeed.jpg',
    stats: [{ platform: 'YouTube', count: '10,200' }],
  },
  {
    // `name` is the account's profile name, not the handle — every other entry
    // here displays a name, and `@jamesbondlifestyle` stood out as the odd one.
    //
    // `stats` is deliberately absent rather than pending — see the note on the
    // type below. `niche` follows the file's ordering habit of ending on the
    // broad term, which is also the confident half of the pair here.
    num: '12',
    name: 'Bond Lifestyle',
    niche: 'Film · Lifestyle',
    photo: '/images/creators/jamesbondlifestyle.jpg',
  },
]
