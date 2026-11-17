import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useT } from '../i18n'

export type NavItem = 'buy' | 'sell' | 'ads' | 'profile'

export default function BottomNav({ activeItem }: { activeItem: NavItem }) {
  const t = useT()

  const items: { key: NavItem; to?: string; href?: string; icon: string; en: string; hi: string }[] = [
    { key: 'buy', to: '/browse', icon: 'lucide:shopping-basket', en: 'Buy', hi: 'खरीदें' },
    { key: 'sell', to: '/post', icon: 'lucide:plus-circle', en: 'Sell', hi: 'बेचें' },
    { key: 'ads', href: '#my-ads', icon: 'lucide:layout-list', en: 'My Ads', hi: 'मेरे विज्ञापन' },
    { key: 'profile', to: '/login', icon: 'lucide:user', en: 'Profile', hi: 'प्रोफ़ाइल' },
  ]

  return (
    <nav className="shrink-0 pb-[34px] px-4 pt-3 bg-white border-t border-[#7A5230]/10 flex justify-between items-center fixed bottom-0 w-full z-50">
      {items.map((item) => {
        const className = `flex flex-col items-center gap-0.5 transition-all ${
          activeItem === item.key ? 'text-[#2F5D3A]' : 'text-gray-400'
        }`
        const content = (
          <>
            <Icon icon={item.icon} className="text-2xl" />
            <span className="text-[10px] font-bold uppercase">
              {t(item.en, item.hi)} ({t(item.hi, item.en)})
            </span>
          </>
        )
        return item.to ? (
          <Link key={item.key} to={item.to} className={className}>
            {content}
          </Link>
        ) : (
          <a key={item.key} href={item.href} className={className}>
            {content}
          </a>
        )
      })}
    </nav>
  )
}
