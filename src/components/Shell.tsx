import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'
import type { NavItem } from './BottomNav'

export default function Shell() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [pathname])

  const activeItem: NavItem = pathname.startsWith('/post')
    ? 'sell'
    : pathname.startsWith('/login')
      ? 'profile'
      : 'buy'

  return (
    <div className="w-full h-screen flex flex-col grain-bg text-[#2B2118]">
      <Header />
      <main ref={mainRef} className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </main>
      <BottomNav activeItem={activeItem} />
    </div>
  )
}
