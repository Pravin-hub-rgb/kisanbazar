import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useT } from '../i18n'

export type NavItem = 'buy' | 'sell' | 'ads' | 'profile'

export default function BottomNav({ activeItem }: { activeItem: NavItem }) {
  const t = useT()

  const items: { key: NavItem; to?: string; href?: string; icon: string; en: string; hi: string }[] = [
    { key: 'buy', to: '/browse', icon: 'lucide:shopping-basket', en: 'Buy', hi: 'खरीदें' },
    { key: 'sell', to: '/post', icon: 'lucide:plus-circle', en: 'Sell', hi: 'बेचें' },
    { key: 'ads', href: '#my-ads', icon: 'lucide:layout-list', en: 'My Ads', hi: 'विज्ञापन' },
    { key: 'profile', to: '/login', icon: 'lucide:user', en: 'Profile', hi: 'प्रोफ़ाइल' },
  ]

  const activeIndex = items.findIndex((i) => i.key === activeItem)
  const n = items.length

  return (
    <nav className="fixed bottom-0 w-full z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] select-none">
      <div className="relative bg-white/85 backdrop-blur-xl border border-[#7A5230]/10 rounded-2xl p-1 shadow-[0_12px_40px_-12px_rgba(43,33,24,0.28)] flex items-center">
        {/* Sliding active indicator */}
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 rounded-xl bg-[#2F5D3A]/10 ring-1 ring-[#2F5D3A]/15 transition-all duration-300 ease-out"
          style={{
            left: `calc(0.25rem + ${Math.max(activeIndex, 0)} * ((100% - 0.5rem) / ${n}))`,
            width: `calc((100% - 0.5rem) / ${n})`,
            opacity: activeIndex < 0 ? 0 : 1,
          }}
        />
        {items.map((item) => {
          const active = activeItem === item.key
          const className = `relative flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl transition-transform active:scale-95 ${
            active ? 'text-[#2F5D3A]' : 'text-gray-400'
          }`
          const content = (
            <>
              <Icon
                icon={item.icon}
                className={`text-[20px] transition-transform duration-300 ${active ? 'scale-110' : ''}`}
              />
              <span className={`text-[10px] leading-none ${active ? 'font-bold' : 'font-semibold'}`}>
                {t(item.en, item.hi)}
              </span>
            </>
          )
          return item.to ? (
            <Link key={item.key} to={item.to} className={className} aria-current={active ? 'page' : undefined}>
              {content}
            </Link>
          ) : (
            <a key={item.key} href={item.href} className={className} aria-current={active ? 'page' : undefined}>
              {content}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
