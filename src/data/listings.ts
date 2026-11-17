export type CropType = 'wheat' | 'paddy' | 'maize' | 'bhusa' | 'pulses' | 'vegetables' | 'mustard' | 'bajra'

export type Listing = {
  id: string
  title: string
  titleHi: string
  crop: CropType
  cropLabel: string
  location: string
  state: string
  price: number
  quantityQuintals: number
  grade: string
  moisture: string
  seller: {
    name: string
    initials: string
    village: string
    rating: number
    trades: number
  }
  phone: string
  photo: string
  verified: boolean
  postedAgo: string
  ref: string
  createdAt: number
}

const PHOTO_WHEAT = 'photo-1542332213-31f87348057f'
const PHOTO_PADDY = 'photo-1536633100344-938a90186985'
const PHOTO_STRAW = 'photo-1594488687129-753242945030'

export function img(photo: string, w = 400, h = 400) {
  return `https://images.unsplash.com/${photo}?q=80&w=${w}&h=${h}&auto=format&fit=crop`
}

export const listings: Listing[] = [
  {
    id: '1',
    title: 'Premium Sharbati Wheat',
    titleHi: 'प्रीमियम शरबती गेहूं',
    crop: 'wheat',
    cropLabel: 'Wheat (गेहूं)',
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    price: 2450,
    quantityQuintals: 150,
    grade: 'Grade A',
    moisture: '12%',
    seller: { name: 'Rajesh Singh', initials: 'RS', village: 'Rajepur Village, Ludhiana', rating: 4.8, trades: 24 },
    phone: '9876543210',
    photo: PHOTO_WHEAT,
    verified: true,
    postedAgo: '2 days ago',
    ref: 'KB-90432',
    createdAt: 9,
  },
  {
    id: '2',
    title: 'Basmati Paddy (Pusa)',
    titleHi: 'बासमती धान (पूसा)',
    crop: 'paddy',
    cropLabel: 'Paddy (धान)',
    location: 'Karnal, Haryana',
    state: 'Haryana',
    price: 2200,
    quantityQuintals: 200,
    grade: 'Grade A',
    moisture: '14%',
    seller: { name: 'Yash Kumar', initials: 'YK', village: 'Nilokheri, Karnal', rating: 4.6, trades: 18 },
    phone: '9812345670',
    photo: PHOTO_PADDY,
    verified: true,
    postedAgo: '1 day ago',
    ref: 'KB-90433',
    createdAt: 10,
  },
  {
    id: '3',
    title: 'Wheat Straw (Bhusa)',
    titleHi: 'गेहूं का भूसा',
    crop: 'bhusa',
    cropLabel: 'Bhusa (भूसा)',
    location: 'Agra, Uttar Pradesh',
    state: 'Uttar Pradesh',
    price: 750,
    quantityQuintals: 500,
    grade: 'Grade B',
    moisture: '8%',
    seller: { name: 'Amit Khan', initials: 'AK', village: 'Fatehabad Road, Agra', rating: 4.5, trades: 31 },
    phone: '9811122233',
    photo: PHOTO_STRAW,
    verified: false,
    postedAgo: '3 days ago',
    ref: 'KB-90434',
    createdAt: 8,
  },
  {
    id: '4',
    title: 'Yellow Maize (Makka)',
    titleHi: 'पीला मक्का',
    crop: 'maize',
    cropLabel: 'Maize (मक्का)',
    location: 'Indore, Madhya Pradesh',
    state: 'Madhya Pradesh',
    price: 2100,
    quantityQuintals: 300,
    grade: 'Grade A',
    moisture: '11%',
    seller: { name: 'Suresh Patel', initials: 'SP', village: 'Rau, Indore', rating: 4.7, trades: 12 },
    phone: '9822233344',
    photo: PHOTO_WHEAT,
    verified: true,
    postedAgo: '4 days ago',
    ref: 'KB-90435',
    createdAt: 7,
  },
  {
    id: '5',
    title: 'Toor Dal (Arhar)',
    titleHi: 'तूर दाल (अरहर)',
    crop: 'pulses',
    cropLabel: 'Pulses (दालें)',
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    price: 6800,
    quantityQuintals: 80,
    grade: 'Grade A',
    moisture: '10%',
    seller: { name: 'Meera Deshmukh', initials: 'MD', village: 'Ozar, Nashik', rating: 4.9, trades: 9 },
    phone: '9833344455',
    photo: PHOTO_PADDY,
    verified: true,
    postedAgo: '5 days ago',
    ref: 'KB-90436',
    createdAt: 6,
  },
  {
    id: '6',
    title: 'Nashik Red Onion',
    titleHi: 'नासिक लाल प्याज',
    crop: 'vegetables',
    cropLabel: 'Vegetables (सब्जियां)',
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    price: 1400,
    quantityQuintals: 400,
    grade: 'Grade A',
    moisture: '9%',
    seller: { name: 'Vikram Joshi', initials: 'VJ', village: 'Lasalgaon, Nashik', rating: 4.4, trades: 22 },
    phone: '9844455566',
    photo: PHOTO_STRAW,
    verified: false,
    postedAgo: '2 days ago',
    ref: 'KB-90437',
    createdAt: 9,
  },
  {
    id: '7',
    title: 'Desi Chana (Gram)',
    titleHi: 'देसी चना',
    crop: 'pulses',
    cropLabel: 'Pulses (दालें)',
    location: 'Gwalior, Madhya Pradesh',
    state: 'Madhya Pradesh',
    price: 5200,
    quantityQuintals: 120,
    grade: 'Grade A',
    moisture: '11%',
    seller: { name: 'Ramesh Yadav', initials: 'RY', village: 'Morar, Gwalior', rating: 4.6, trades: 15 },
    phone: '9855566677',
    photo: PHOTO_WHEAT,
    verified: true,
    postedAgo: '6 days ago',
    ref: 'KB-90438',
    createdAt: 5,
  },
  {
    id: '8',
    title: 'Yellow Mustard',
    titleHi: 'पीली सरसों',
    crop: 'mustard',
    cropLabel: 'Mustard (सरसों)',
    location: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    price: 5600,
    quantityQuintals: 90,
    grade: 'Grade A',
    moisture: '9%',
    seller: { name: 'Kavita Sharma', initials: 'KS', village: 'Chomu, Jaipur', rating: 4.7, trades: 11 },
    phone: '9866677788',
    photo: PHOTO_PADDY,
    verified: false,
    postedAgo: '3 days ago',
    ref: 'KB-90439',
    createdAt: 8,
  },
  {
    id: '9',
    title: 'Bajra (Pearl Millet)',
    titleHi: 'बाजरा',
    crop: 'bajra',
    cropLabel: 'Bajra (बाजरा)',
    location: 'Jodhpur, Rajasthan',
    state: 'Rajasthan',
    price: 2800,
    quantityQuintals: 250,
    grade: 'Grade B',
    moisture: '10%',
    seller: { name: 'Mohan Lal', initials: 'ML', village: 'Bali, Jodhpur', rating: 4.3, trades: 27 },
    phone: '9877788899',
    photo: PHOTO_STRAW,
    verified: false,
    postedAgo: '7 days ago',
    ref: 'KB-90440',
    createdAt: 4,
  },
]

export function getListing(id: string | undefined) {
  return listings.find((l) => l.id === id)
}
