import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { getListing, img, listings } from '../data/listings'
import ListingCard from '../components/ListingCard'
import { useT } from '../i18n'

export default function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const t = useT()
  const [copied, setCopied] = useState(false)
  const listing = getListing(id)

  if (!listing) {
    return (
      <div className="px-4 py-16 text-center">
        <Icon icon="lucide:search-x" className="text-5xl text-[#7A5230]/40 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">{t('Listing not found', 'विज्ञापन नहीं मिला')}</h2>
        <p className="text-sm text-gray-500 mb-6">{t('It may have been sold or removed.', 'इसे बेच दिया या हटा दिया गया हो सकता है।')}</p>
        <Link
          to="/browse"
          className="inline-block bg-[#2F5D3A] text-white font-bold px-6 py-3 rounded-xl"
        >
          {t('Browse Crops', 'फसलें देखें')}
        </Link>
      </div>
    )
  }

  const similar = listings
    .filter((l) => l.id !== listing.id && (l.crop === listing.crop || l.state === listing.state))
    .slice(0, 3)

  const goBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/browse')
  }

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      {/* Listing Image */}
      <div className="w-full h-80 relative">
        <img
          src={img(listing.photo, 600, 800)}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={goBack}
          aria-label="Go back"
          className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-lg"
        >
          <Icon icon="lucide:arrow-left" className="text-2xl text-[#2B2118]" />
        </button>
        <button
          onClick={share}
          aria-label="Share"
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg"
        >
          <Icon icon={copied ? 'lucide:check' : 'lucide:share-2'} className="text-2xl text-[#2B2118]" />
        </button>
        {copied && (
          <span className="absolute top-5 right-16 bg-[#2B2118] text-white text-[10px] font-bold px-2 py-1 rounded">
            {t('Link copied', 'लिंक कॉपी हुआ')}
          </span>
        )}
      </div>

      {/* Crop Details Card */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 custom-shadow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-bold text-[#2B2118]">{listing.title}</h2>
              <p className="hindi-text text-[#7A5230] font-medium">
                {t(listing.titleHi, listing.title)}
              </p>
            </div>
            {listing.verified && (
              <div className="bg-[#E0A526]/10 text-[#E0A526] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                {t('Verified', 'सत्यापित')}
              </div>
            )}
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2F5D3A]">
              ₹{listing.price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-500 uppercase">{t('/ quintal', '/ क्विंटल')}</span>
            <span className="hindi-text text-xs text-gray-400">{t('(प्रति क्विंटल)', '(per quintal)')}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 py-6 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F7F1E3] rounded-xl flex items-center justify-center text-[#7A5230]">
                <Icon icon="mdi:scale-balanced" className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">{t('Quantity', 'मात्रा')}</p>
                <p className="text-sm font-bold">
                  {listing.quantityQuintals} {t('Quintals', 'क्विंटल')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F7F1E3] rounded-xl flex items-center justify-center text-[#7A5230]">
                <Icon icon="mdi:certificate" className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">{t('Grade', 'ग्रेड')}</p>
                <p className="text-sm font-bold">{listing.grade}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F7F1E3] rounded-xl flex items-center justify-center text-[#7A5230]">
                <Icon icon="mdi:water-percent" className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">{t('Moisture', 'नमी')}</p>
                <p className="text-sm font-bold">{listing.moisture}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F7F1E3] rounded-xl flex items-center justify-center text-[#7A5230]">
                <Icon icon="mdi:map-marker-radius" className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">{t('State', 'राज्य')}</p>
                <p className="text-sm font-bold">{listing.state}</p>
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="mt-6 bg-[#F7F1E3]/50 p-4 rounded-2xl border border-[#7A5230]/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#7A5230] rounded-full flex items-center justify-center text-white text-xl font-bold shadow-sm">
                {listing.seller.initials}
              </div>
              <div>
                <h4 className="font-bold text-[#2B2118]">{listing.seller.name}</h4>
                <p className="text-xs text-gray-500">{listing.seller.village}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Icon icon="lucide:star" className="text-[#E0A526] text-xs" />
                  <span className="text-[10px] font-bold">
                    {listing.seller.rating} ({listing.seller.trades} {t('trades', 'सौदे')})
                  </span>
                </div>
              </div>
            </div>
            <Icon icon="lucide:chevron-right" className="text-[#7A5230]/40" />
          </div>

          <div className="mt-4">
            <p className="text-[10px] text-gray-400 uppercase font-bold text-center">
              {t('Listing posted', 'विज्ञापन पोस्ट किया गया')} {listing.postedAgo}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-6 space-y-3">
        <a
          id="cta-call-seller"
          href={`tel:+91${listing.phone}`}
          className="w-full h-14 bg-[#2F5D3A] text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-lg custom-shadow"
        >
          <Icon icon="lucide:phone-call" className="text-2xl" />
          <span>
            {t('Call Seller', 'कॉल करें')}{' '}
            <span className="hindi-text font-normal text-sm ml-1 text-white/80">
              {t('(कॉल करें)', '(Call Seller)')}
            </span>
          </span>
        </a>
        <a
          id="cta-whatsapp-seller"
          href={`https://wa.me/91${listing.phone}`}
          target="_blank"
          rel="noreferrer"
          className="w-full h-14 bg-white text-[#2F5D3A] border-2 border-[#2F5D3A] rounded-2xl flex items-center justify-center gap-3 font-bold text-lg"
        >
          <Icon icon="mdi:whatsapp" className="text-2xl" />
          <span>
            WhatsApp{' '}
            <span className="hindi-text font-normal text-sm ml-1 text-[#2F5D3A]/70">
              {t('(मैसेज करें)', '(Message)')}
            </span>
          </span>
        </a>
      </div>

      {/* Similar Listings */}
      <section className="px-4 py-6 mb-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          {t('Similar Listings', 'मिलती-जुलती फसलें')}
          <span className="hindi-text font-normal text-sm opacity-60 ml-1">
            {t('(मिलती-जुलती फसलें)', '(Similar Listings)')}
          </span>
        </h3>
        <div className="space-y-4">
          {similar.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="px-4 py-8 text-center bg-white border-t border-[#7A5230]/10">
        <p className="text-xs text-gray-400">
          {t('Reference', 'संदर्भ')} #{listing.ref} • {t('Safe Trading Guidelines', 'सुरक्षित व्यापार दिशानिर्देश')}
        </p>
      </footer>
    </>
  )
}
