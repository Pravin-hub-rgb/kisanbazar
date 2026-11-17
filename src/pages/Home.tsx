import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { listings } from '../data/listings'
import ListingCard from '../components/ListingCard'
import { Pair, useT } from '../i18n'

const categories = [
  { en: 'Wheat', hi: 'गेहूं', icon: 'mdi:wheat', color: 'text-[#E0A526]' },
  { en: 'Paddy', hi: 'धान', icon: 'mdi:sprout', color: 'text-[#2F5D3A]' },
  { en: 'Maize', hi: 'मक्का', icon: 'mdi:corn', color: 'text-yellow-600' },
  { en: 'Bhusa', hi: 'भूसा', icon: 'mdi:grass', color: 'text-[#7A5230]' },
]

const stats = [
  { value: '50,000+', en: 'Farmers', hi: 'किसान' },
  { value: '1.2L+', en: 'Listings', hi: 'फसलें' },
  { value: '15+', en: 'States', hi: 'राज्य' },
  { value: '₹0', en: 'Commission', hi: 'कमीशन' },
]

const steps = [
  {
    en: 'Post your crop',
    hi: 'अपनी फसल पोस्ट करें',
    descEn: 'List what you have and your expected price.',
    descHi: 'जो आपके पास है और आपकी अपेक्षित कीमत दर्ज करें।',
  },
  {
    en: 'Get contacted',
    hi: 'संपर्क पाएं',
    descEn: 'Buyers will call or WhatsApp you directly.',
    descHi: 'खरीदार सीधे आपको कॉल या WhatsApp करेंगे।',
  },
  {
    en: 'Close the deal',
    hi: 'सौदा पक्का करें',
    descEn: 'No commissions. No middlemen. Keep 100%.',
    descHi: 'कोई कमीशन नहीं। कोई बिचौलिया नहीं। 100% अपने पास रखें।',
  },
]

export default function Home() {
  const t = useT()
  const heroHeadEn = 'Buy and sell crops directly, no middlemen'
  const heroHeadHi = 'बिना बिचौलियों के सीधे फसलें बेचें और खरीदें'

  return (
    <>
      {/* Hero */}
      <section className="px-4 py-8 bg-[#2F5D3A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <Icon icon="mdi:wheat" className="text-9xl" />
        </div>
        <h2 className="text-3xl font-bold leading-tight mb-2">{t(heroHeadEn, heroHeadHi)}</h2>
        <p className="hindi-text text-lg text-white/90 mb-6">{t(heroHeadHi, heroHeadEn)}</p>

        <div className="space-y-3 mb-8">
          <div className="bg-white rounded-xl p-1 flex items-center">
            <div className="flex-1 flex items-center px-3 py-2 border-r border-gray-100">
              <Icon icon="lucide:search" className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder={t('Crop name (e.g. Wheat)', 'फसल का नाम (जैसे गेहूं)')}
                className="w-full text-sm text-[#2B2118] outline-none"
              />
            </div>
            <div className="w-32 flex items-center px-3 py-2">
              <Icon icon="lucide:map-pin" className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder={t('Location', 'स्थान')}
                className="w-full text-sm text-[#2B2118] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            id="hero-buy-btn"
            to="/browse"
            className="bg-[#E0A526] hover:bg-[#d19922] text-[#2B2118] font-bold py-4 rounded-xl text-center flex flex-col items-center justify-center transition-all"
          >
            <span>{t('I want to Buy', 'मैं खरीदना चाहता हूँ')}</span>
            <span className="hindi-text text-sm font-medium opacity-90">
              {t('मैं खरीदना चाहता हूँ', 'I want to Buy')}
            </span>
          </Link>
          <Link
            id="hero-sell-btn"
            to="/post"
            className="bg-white hover:bg-gray-100 text-[#2F5D3A] font-bold py-4 rounded-xl text-center flex flex-col items-center justify-center transition-all"
          >
            <span>{t('I want to Sell', 'मैं बेचना चाहता हूँ')}</span>
            <span className="hindi-text text-sm font-medium opacity-90">
              {t('मैं बेचना चाहता हूँ', 'I want to Sell')}
            </span>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Icon icon="lucide:layout-grid" className="text-[#2F5D3A]" />
          <Pair en="Browse Categories" hi="श्रेणियाँ" />
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link to="/browse" key={cat.en} className="flex flex-col items-center gap-1.5">
              <div className="w-full aspect-square bg-white rounded-2xl flex items-center justify-center custom-shadow">
                <Icon icon={cat.icon} className={`text-3xl ${cat.color}`} />
              </div>
              <span className="text-[10px] font-semibold text-center">{t(cat.en, cat.hi)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Listings */}
      <section className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            <Pair en="Recent Listings" hi="नई फसलें" />
          </h3>
          <Link to="/browse" className="text-[#2F5D3A] text-sm font-semibold">
            {t('View All', 'सभी देखें')}
          </Link>
        </div>
        <div className="space-y-4">
          {listings.slice(0, 3).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-10 bg-[#7A5230]/5 mt-8">
        <h3 className="text-center text-xl font-bold mb-8">
          {t('How it works', 'यह कैसे काम करता है')} <br />
          <span className="hindi-text text-base font-normal opacity-70">
            {t('यह कैसे काम करता है', 'How it works')}
          </span>
        </h3>
        <div className="space-y-8 max-w-xs mx-auto">
          {steps.map((step, i) => (
            <div className="flex gap-4" key={step.en}>
              <div className="w-10 h-10 rounded-full bg-[#E0A526] text-white flex items-center justify-center font-bold shrink-0">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold">{t(step.en, step.hi)}</h4>
                <p className="text-xs text-gray-600">{t(step.descEn, step.descHi)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="px-4 py-12 bg-[#2F5D3A] text-white text-center">
        <div className="grid grid-cols-2 gap-y-10 gap-x-4">
          {stats.map((stat) => (
            <div key={stat.en}>
              <p className="text-3xl font-bold text-[#E0A526]">{stat.value}</p>
              <p className="text-sm uppercase tracking-wide font-medium">{t(stat.en, stat.hi)}</p>
              <p className="hindi-text text-xs opacity-70">{t(stat.hi, stat.en)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 text-[#2B2118] text-center space-y-8 bg-white">
        <div>
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="bg-[#2F5D3A] p-1.5 rounded-lg">
              <Icon icon="lucide:leaf" className="text-white text-xl" />
            </div>
            <h2 className="text-[#2F5D3A] font-bold text-xl">KisanBazar</h2>
          </div>
          <p className="text-sm text-gray-500">
            {t('Empowering Indian farmers through technology.', 'तकनीक के माध्यम से भारतीय किसानों को सशक्त बनाना।')}
          </p>
        </div>

        <div className="flex justify-center gap-8">
          <Link to="/browse" className="font-bold">
            {t('Buy', 'खरीदें')}
          </Link>
          <Link to="/post" className="font-bold">
            {t('Sell', 'बेचें')}
          </Link>
          <a href="#" className="font-bold">
            {t('Help', 'मदद')}
          </a>
          <a href="#" className="font-bold">
            {t('Contact', 'संपर्क')}
          </a>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <Icon icon="lucide:facebook" className="text-2xl text-[#2F5D3A]" />
            <Icon icon="lucide:instagram" className="text-2xl text-[#2F5D3A]" />
            <Icon icon="lucide:youtube" className="text-2xl text-[#2F5D3A]" />
          </div>
          <p className="text-[10px] text-gray-400">© 2024 KisanBazar Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
