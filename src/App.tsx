import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LangProvider } from './i18n'
import Shell from './components/Shell'
import Home from './pages/Home'
import Browse from './pages/Browse'
import ListingDetails from './pages/ListingDetails'
import PostListing from './pages/PostListing'
import Login from './pages/Login'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/post" element={<PostListing />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
