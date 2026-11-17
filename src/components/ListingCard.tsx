import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { img } from '../data/listings'
import type { Listing } from '../data/listings'
import { useT } from '../i18n'

export default function ListingCard({ listing }: { listing: Listing }) {
  const t = useT()
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="block bg-white rounded-2xl p-3 shadow-[0_4px_20px_-2px_rgba(43,33,24,0.1)] border border-[#7A5230]/5"
    >
      <div className="flex gap-4 mb-3">
        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
          <img src={img(listing.photo)} alt={listing.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-between py-0.5">
          <div>
            <h4 className="font-bold text-[#2B2118]">{listing.title}</h4>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Icon icon="lucide:map-pin" />
              {listing.location}
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[#2F5D3A] font-bold text-lg">₹{listing.price.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-gray-500 uppercase">{t('/ quintal', '/ क्विंटल')}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#F7F1E3] rounded-full flex items-center justify-center text-[#7A5230] text-xs font-bold">
            {listing.seller.initials}
          </div>
          <div>
            <p className="text-xs font-bold">{listing.seller.name}</p>
            <p className="text-[10px] text-gray-500">
              {t('Available', 'उपलब्ध')}: {listing.quantityQuintals}q
            </p>
          </div>
        </div>
        <span className="bg-[#2F5D3A] text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2">
          <Icon icon="lucide:phone" />
          {t('Contact', 'संपर्क')}
        </span>
      </div>
    </Link>
  )
}
