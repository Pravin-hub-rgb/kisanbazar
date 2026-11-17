import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useT } from '../i18n'

const cropChoices = [
  { value: 'wheat', en: 'Wheat', hi: 'गेहूं' },
  { value: 'paddy', en: 'Paddy', hi: 'धान' },
  { value: 'maize', en: 'Maize', hi: 'मक्का' },
  { value: 'bhusa', en: 'Bhusa (Straw)', hi: 'भूसा' },
  { value: 'pulses', en: 'Pulses', hi: 'दालें' },
  { value: 'vegetables', en: 'Vegetables', hi: 'सब्जियां' },
]

const locations = [
  { value: 'punjab', en: 'Ludhiana, Punjab', hi: 'लुधियाना, पंजाब' },
  { value: 'haryana', en: 'Karnal, Haryana', hi: 'करनाल, हरियाणा' },
  { value: 'up', en: 'Agra, Uttar Pradesh', hi: 'आगरा, उत्तर प्रदेश' },
  { value: 'mp', en: 'Indore, Madhya Pradesh', hi: 'इंदौर, मध्य प्रदेश' },
]

export default function PostListing() {
  const t = useT()
  const fileRef = useRef<HTMLInputElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    crop: 'wheat',
    quantity: '',
    price: '',
    location: 'punjab',
    description: '',
    phone: '9876543210',
  })

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }))

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPhotoPreview(URL.createObjectURL(file))
  }

  if (submitted) {
    return (
      <div className="px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-[#2F5D3A]/10 flex items-center justify-center mx-auto mb-5">
          <Icon icon="lucide:check-circle" className="text-5xl text-[#2F5D3A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2F5D3A] mb-1">{t('Listing Posted!', 'विज्ञापन पोस्ट हो गया!')}</h2>
        <p className="hindi-text text-[#7A5230] mb-3">{t('आपकी फसल पोस्ट हो गई है', 'Your crop has been posted')}</p>
        <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">
          {t('Buyers will contact you on your phone number.', 'खरीदार आपके फ़ोन नंबर पर संपर्क करेंगे।')}
        </p>
        <div className="space-y-3 max-w-xs mx-auto">
          <Link to="/browse" className="block w-full bg-[#2F5D3A] text-white font-bold py-4 rounded-xl">
            {t('Browse Crops', 'फसलें देखें')}
          </Link>
          <button
            onClick={() => setSubmitted(false)}
            className="block w-full bg-white border-2 border-[#7A5230]/20 text-[#7A5230] font-bold py-4 rounded-xl"
          >
            {t('Post Another', 'एक और पोस्ट करें')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
    >
      {/* Progress Header */}
      <div className="bg-white px-4 py-4 border-b border-[#7A5230]/10">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-[#2F5D3A]">{t('Post Your Crop', 'अपनी फसल पोस्ट करें')}</h2>
          <span className="text-sm font-semibold text-[#7A5230]">{t('Step 2 of 3', 'चरण 2 / 3')}</span>
        </div>
        <p className="hindi-text text-sm text-gray-500 mb-4">
          {t('अपनी फसल का विवरण दर्ज करें', 'Enter your crop details')}
        </p>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="w-2/3 h-full bg-[#E0A526]"></div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-4 space-y-6">
        {/* Crop Type */}
        <div className="space-y-2">
          <label className="block text-[#2B2118] font-bold">
            {t('Crop Type', 'फसल का प्रकार')}{' '}
            <span className="hindi-text font-normal opacity-60 ml-1 text-sm">{t('(फसल का प्रकार)', '(Crop Type)')}</span>
          </label>
          <div className="relative">
            <select
              value={form.crop}
              onChange={(e) => update({ crop: e.target.value })}
              className="w-full h-14 pl-4 pr-10 bg-white border-2 border-[#7A5230]/20 rounded-xl focus:border-[#2F5D3A] outline-none appearance-none transition-colors"
            >
              {cropChoices.map((c) => (
                <option key={c.value} value={c.value}>
                  {t(`${c.en} (${c.hi})`, `${c.hi} (${c.en})`)}
                </option>
              ))}
            </select>
            <Icon
              icon="lucide:chevron-down"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="block text-[#2B2118] font-bold">
            {t('Quantity in Quintals', 'मात्रा क्विंटल में')}{' '}
            <span className="hindi-text font-normal opacity-60 ml-1 text-sm">{t('(मात्रा क्विंटल में)', '(Quantity)')}</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              required
              min={1}
              value={form.quantity}
              onChange={(e) => update({ quantity: e.target.value })}
              placeholder={t('e.g. 150', 'जैसे 150')}
              className="flex-1 h-14 px-4 bg-white border-2 border-[#7A5230]/20 rounded-xl focus:border-[#2F5D3A] outline-none transition-colors"
            />
            <div className="h-14 px-4 bg-[#F7F1E3] flex items-center justify-center rounded-xl font-bold text-gray-500 border-2 border-transparent">
              q
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="block text-[#2B2118] font-bold">
            {t('Price per Quintal (₹)', 'प्रति क्विंटल मूल्य (₹)')}{' '}
            <span className="hindi-text font-normal opacity-60 ml-1 text-sm">{t('(प्रति क्विंटल मूल्य)', '(Price)')}</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
            <input
              type="number"
              required
              min={1}
              value={form.price}
              onChange={(e) => update({ price: e.target.value })}
              placeholder={t('e.g. 2400', 'जैसे 2400')}
              className="w-full h-14 pl-8 pr-4 bg-white border-2 border-[#7A5230]/20 rounded-xl focus:border-[#2F5D3A] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-[#2B2118] font-bold">
            {t('Location', 'स्थान')}{' '}
            <span className="hindi-text font-normal opacity-60 ml-1 text-sm">{t('(स्थान)', '(Location)')}</span>
          </label>
          <div className="relative">
            <select
              value={form.location}
              onChange={(e) => update({ location: e.target.value })}
              className="w-full h-14 pl-4 pr-10 bg-white border-2 border-[#7A5230]/20 rounded-xl focus:border-[#2F5D3A] outline-none appearance-none transition-colors"
            >
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {t(loc.en, loc.hi)}
                </option>
              ))}
            </select>
            <Icon
              icon="lucide:map-pin"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="block text-[#2B2118] font-bold">
            {t('Upload Photo', 'फोटो अपलोड करें')}{' '}
            <span className="hindi-text font-normal opacity-60 ml-1 text-sm">{t('(फोटो अपलोड करें)', '(Photo)')}</span>
          </label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-[#7A5230]/30 bg-white rounded-2xl p-8 flex flex-col items-center justify-center gap-3 active:bg-gray-50 transition-colors"
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[#E0A526]/10 flex items-center justify-center text-[#E0A526]">
                  <Icon icon="lucide:camera" className="text-2xl" />
                </div>
                <div className="text-center">
                  <p className="font-bold">{t('Tap to take photo', 'फोटो लेने के लिए टैप करें')}</p>
                  <p className="text-xs text-gray-500">{t('or select from gallery', 'या गैलरी से चुनें')}</p>
                </div>
              </>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onPhotoChange} className="hidden" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-[#2B2118] font-bold">
            {t('Description', 'विवरण')}{' '}
            <span className="hindi-text font-normal opacity-60 ml-1 text-sm">{t('(विवरण)', '(Description)')}</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder={t(
              'Describe quality, grade, or moisture level (e.g. Super quality, dry wheat)',
              'गुणवत्ता, ग्रेड या नमी बताएं (जैसे सुपर क्वालिटी, सूखा गेहूं)',
            )}
            rows={4}
            className="w-full p-4 bg-white border-2 border-[#7A5230]/20 rounded-xl focus:border-[#2F5D3A] outline-none transition-colors resize-none"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-[#2B2118] font-bold">
            {t('Phone Number', 'मोबाइल नंबर')}{' '}
            <span className="hindi-text font-normal opacity-60 ml-1 text-sm">{t('(मोबाइल नंबर)', '(Phone)')}</span>
          </label>
          <div className="flex gap-2">
            <div className="h-14 px-3 bg-gray-100 flex items-center justify-center rounded-xl text-gray-500 font-bold border-2 border-transparent">
              +91
            </div>
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              value={form.phone}
              onChange={(e) => update({ phone: e.target.value })}
              className="flex-1 h-14 px-4 bg-white border-2 border-[#7A5230]/20 rounded-xl focus:border-[#2F5D3A] outline-none transition-colors"
            />
          </div>
          <p className="text-[10px] text-gray-500">
            {t('Buyers will contact you on this number.', 'खरीदार इसी नंबर पर आपसे संपर्क करेंगे।')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col gap-3 pb-8">
          <button
            type="submit"
            className="w-full h-14 bg-[#2F5D3A] text-white rounded-xl font-bold flex flex-col items-center justify-center transition-transform active:scale-[0.98]"
          >
            <span>{t('Post My Listing', 'मेरी फसल पोस्ट करें')}</span>
            <span className="hindi-text text-xs font-normal opacity-80">
              {t('मेरी फसल पोस्ट करें', 'Post My Listing')}
            </span>
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full h-14 bg-white border-2 border-[#7A5230]/20 text-[#7A5230] rounded-xl font-bold transition-all"
          >
            {t('Previous Step', 'पिछला चरण')}
          </button>
        </div>
      </div>
    </form>
  )
}
