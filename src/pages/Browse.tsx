import { useState } from 'react'
import { Icon } from '@iconify/react'
import { listings } from '../data/listings'
import ListingCard from '../components/ListingCard'
import { Pair, useT } from '../i18n'

type Filters = {
  query: string
  crop: string
  state: string
  maxPrice: number
}

const defaultFilters: Filters = { query: '', crop: '', state: '', maxPrice: 8000 }

const cropOptions = [
  { value: '', en: 'All Crops', hi: 'सभी फसलें' },
  { value: 'wheat', en: 'Wheat', hi: 'गेहूं' },
  { value: 'paddy', en: 'Paddy', hi: 'धान' },
  { value: 'maize', en: 'Maize', hi: 'मक्का' },
  { value: 'bhusa', en: 'Bhusa', hi: 'भूसा' },
]

const stateOptions = [
  { value: '', en: 'All States', hi: 'सभी राज्य' },
  { value: 'Punjab', en: 'Punjab', hi: 'पंजाब' },
  { value: 'Haryana', en: 'Haryana', hi: 'हरियाणा' },
  { value: 'Uttar Pradesh', en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
  { value: 'Madhya Pradesh', en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
  { value: 'Maharashtra', en: 'Maharashtra', hi: 'महाराष्ट्र' },
  { value: 'Rajasthan', en: 'Rajasthan', hi: 'राजस्थान' },
]

const sortOptions = [
  { value: 'newest', en: 'Newest First', hi: 'नया पहले' },
  { value: 'price-asc', en: 'Price: Low to High', hi: 'कीमत: कम से अधिक' },
  { value: 'price-desc', en: 'Price: High to Low', hi: 'कीमत: अधिक से कम' },
  { value: 'nearest', en: 'Nearest First', hi: 'निकटतम पहले' },
]

export default function Browse() {
  const t = useT()
  const [draft, setDraft] = useState<Filters>(defaultFilters)
  const [applied, setApplied] = useState<Filters>(defaultFilters)
  const [sort, setSort] = useState('newest')
  const [visibleCount, setVisibleCount] = useState(6)

  const applyFilters = (next: Filters) => {
    setApplied(next)
    setVisibleCount(6)
  }

  const filtered = listings
    .filter((l) => {
      const q = applied.query.trim().toLowerCase()
      const matchesQuery =
        !q || l.title.toLowerCase().includes(q) || l.titleHi.includes(q) || l.location.toLowerCase().includes(q)
      const matchesCrop = !applied.crop || l.crop === applied.crop
      const matchesState = !applied.state || l.state === applied.state
      const matchesPrice = l.price <= applied.maxPrice
      return matchesQuery && matchesCrop && matchesState && matchesPrice
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'newest') return b.createdAt - a.createdAt
      return 0
    })

  const visible = filtered.slice(0, visibleCount)

  const update = (patch: Partial<Filters>) => setDraft((d) => ({ ...d, ...patch }))

  return (
    <>
      {/* Search & Filters */}
      <section className="px-4 pt-6">
        <div className="bg-white rounded-2xl p-4 custom-shadow mb-6 border border-[#7A5230]/5">
          <div className="relative mb-4">
            <Icon
              icon="lucide:search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
            />
            <input
              type="text"
              value={draft.query}
              onChange={(e) => update({ query: e.target.value })}
              placeholder={t('Search crops (e.g. Wheat, Paddy)...', 'फसलें खोजें (जैसे गेहूं, धान)...')}
              className="w-full bg-[#F7F1E3]/50 border border-gray-100 rounded-xl py-3.5 pl-11 pr-4 text-base focus:outline-none focus:border-[#2F5D3A] transition-colors"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Icon icon="lucide:sliders-horizontal" className="text-[#2F5D3A]" />
              <Pair en="Filters" hi="फिल्टर" />
            </h3>
            <button
              onClick={() => {
                setDraft(defaultFilters)
                applyFilters(defaultFilters)
              }}
              className="text-[#7A5230] text-sm font-semibold underline"
            >
              {t('Clear All', 'सभी हटाएं')}
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase px-1">
                  {t('Crop Type', 'फसल का प्रकार')}
                </label>
                <select
                  value={draft.crop}
                  onChange={(e) => update({ crop: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm appearance-none outline-none"
                >
                  {cropOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(`${opt.en} (${opt.hi})`, `${opt.hi} (${opt.en})`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase px-1">
                  {t('State', 'राज्य')}
                </label>
                <select
                  value={draft.state}
                  onChange={(e) => update({ state: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-sm appearance-none outline-none"
                >
                  {stateOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(`${opt.en} (${opt.hi})`, `${opt.hi} (${opt.en})`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-500 uppercase px-1">
                  {t('Price Range (₹/q)', 'मूल्य सीमा (₹/क्विंटल)')}
                </label>
                <span className="text-xs font-bold text-[#2F5D3A]">
                  ₹500 - ₹{draft.maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={8000}
                step={50}
                value={draft.maxPrice}
                onChange={(e) => update({ maxPrice: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2F5D3A]"
              />
            </div>

            <button
              onClick={() => applyFilters(draft)}
              className="w-full bg-[#2F5D3A] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#2F5D3A]/20"
            >
              {t('Apply Filters', 'फिल्टर लागू करें')}
            </button>
          </div>
        </div>
      </section>

      {/* Results Stats & Sort */}
      <section className="px-4 mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">
            {filtered.length} {t('crops found', 'फसलें मिलीं')}
          </p>
          <p className="text-[10px] text-gray-500 hindi-text">
            {t(`${filtered.length} फसलें मिलीं`, `${filtered.length} crops found`)}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#7A5230]/10">
          <Icon icon="lucide:arrow-down-up" className="text-gray-400" />
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
              setVisibleCount(6)
            }}
            className="text-xs font-bold bg-transparent border-none outline-none pr-4"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(opt.en, opt.hi)}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Listings */}
      <section className="px-4 space-y-4">
        {visible.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center custom-shadow border border-[#7A5230]/5">
            <Icon icon="lucide:search-x" className="text-4xl text-[#7A5230]/40 mx-auto mb-3" />
            <p className="font-bold">{t('No crops found', 'कोई फसल नहीं मिली')}</p>
            <p className="text-xs text-gray-500 mt-1">
              {t('Try changing filters or clearing search.', 'फिल्टर बदलें या खोज हटाएं।')}
            </p>
          </div>
        )}
      </section>

      {/* Load More */}
      {visibleCount < filtered.length && (
        <section className="px-4 py-8">
          <button
            onClick={() => setVisibleCount((c) => c + 6)}
            className="w-full py-4 border-2 border-[#7A5230]/20 rounded-2xl text-[#7A5230] font-bold text-sm"
          >
            {t('Load More Listings', 'और फसलें देखें')}
          </button>
        </section>
      )}
    </>
  )
}
