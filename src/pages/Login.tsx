import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useT } from '../i18n'

export default function Login() {
  const t = useT()
  const navigate = useNavigate()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const onOtpChange = (i: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[i] = digit
    setOtp(next)
    if (digit && i < 3) otpRefs.current[i + 1]?.focus()
  }

  const onOtpKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }

  const otpComplete = otp.every((d) => d !== '')

  return (
    <div className="w-full h-screen flex flex-col grain-bg text-[#2B2118]">
      <main className="flex-1 relative flex flex-col items-center justify-start pt-6 pb-[34px] px-6 overflow-y-auto">
        {/* Back to home */}
        <Link
          to="/"
          aria-label="Back to home"
          className="absolute top-4 left-4 bg-white p-2.5 rounded-full custom-shadow text-[#2F5D3A] flex items-center"
        >
          <Icon icon="lucide:arrow-left" className="text-xl" />
        </Link>

        {/* Brand & Logo */}
        <Link to="/" className="flex flex-col items-center gap-3 mt-6 mb-10">
          <div className="bg-[#2F5D3A] p-4 rounded-3xl custom-shadow">
            <Icon icon="lucide:leaf" className="text-white text-5xl" />
          </div>
          <h1 id="brand-title" className="text-[#2F5D3A] font-bold text-3xl tracking-tight">
            KisanBazar
          </h1>
        </Link>

        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-1">{t('Login to KisanBazar', 'किसानबाज़ार में लॉगिन करें')}</h2>
          <p className="hindi-text text-[#7A5230] text-lg font-medium tracking-wide">
            {t('किसानबाज़ार में लॉगिन करें', 'Login to KisanBazar')}
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm space-y-8">
          {step === 'phone' ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold flex items-center justify-between">
                  <span>{t('Phone Number', 'फ़ोन नंबर')}</span>
                  <span className="hindi-text text-xs text-gray-500 font-normal">
                    {t('फ़ोन नंबर दर्ज करें', 'Enter phone number')}
                  </span>
                </label>
                <div className="flex gap-2">
                  <div className="bg-white border-2 border-transparent border-[#7A5230]/10 rounded-2xl flex items-center px-4 custom-shadow">
                    <span className="text-sm font-bold">+91</span>
                    <Icon icon="lucide:chevron-down" className="ml-2 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder={t('Enter 10-digit number', '10 अंकों का नंबर डालें')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 bg-white border-2 border-[#7A5230]/10 rounded-2xl px-5 py-4 text-lg font-medium custom-shadow outline-none focus:border-[#2F5D3A]"
                  />
                </div>
              </div>

              <button
                id="cta-send-otp"
                onClick={() => setStep('otp')}
                disabled={phone.length !== 10}
                className="w-full bg-[#E0A526] hover:bg-[#d19922] disabled:opacity-50 disabled:cursor-not-allowed text-[#2F5D3A] font-bold py-4 px-6 rounded-2xl text-lg flex flex-col items-center justify-center transition-all custom-shadow"
              >
                <span>{t('Send OTP', 'OTP भेजें')}</span>
                <span className="hindi-text text-sm font-medium opacity-90">{t('OTP भेजें', 'Send OTP')}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {t("We've sent a 4-digit code to your phone", 'हमने आपके फ़ोन पर 4-अंकों का कोड भेजा है')}
                  </p>
                  <p className="hindi-text text-xs text-gray-500">
                    {t('हमने आपके फ़ोन पर 4-अंकों का कोड भेजा है', "We've sent a 4-digit code to your phone")}
                  </p>
                  <p className="text-xs font-bold text-[#7A5230] mt-1">+91 {phone}</p>
                </div>

                <div className="flex justify-between max-w-[240px] mx-auto gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el
                      }}
                      type="number"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => onOtpChange(i, e.target.value)}
                      onKeyDown={(e) => onOtpKeyDown(i, e)}
                      className="otp-input w-12 h-14 bg-white border-2 border-[#7A5230]/10 rounded-xl text-center text-2xl font-bold custom-shadow outline-none focus:border-[#2F5D3A]"
                    />
                  ))}
                </div>

                <div className="text-center">
                  <button
                    id="resend-otp-link"
                    onClick={() => setStep('phone')}
                    className="text-sm font-semibold text-[#7A5230] underline"
                  >
                    {t("Didn't receive? Resend OTP", 'नहीं मिला? OTP दोबारा भेजें')}
                  </button>
                </div>
              </div>

              <button
                id="cta-verify-otp"
                onClick={() => navigate('/')}
                disabled={!otpComplete}
                className="w-full bg-[#2F5D3A] hover:bg-[#254a2e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl text-lg flex flex-col items-center justify-center transition-all custom-shadow"
              >
                <span>{t('Verify OTP', 'OTP सत्यापित करें')}</span>
                <span className="hindi-text text-sm font-medium opacity-90">
                  {t('OTP सत्यापित करें', 'Verify OTP')}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="mt-auto text-center space-y-6 pt-10">
          <div className="space-y-1">
            <p className="text-xs text-gray-500">
              {t("No password needed. We'll verify via SMS.", 'पासवर्ड की आवश्यकता नहीं है। हम SMS के माध्यम से सत्यापित करेंगे।')}
            </p>
            <p className="hindi-text text-[10px] text-gray-400">
              {t('पासवर्ड की आवश्यकता नहीं है। हम SMS के माध्यम से सत्यापित करेंगे।', "No password needed. We'll verify via SMS.")}
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-sm text-[#2B2118]">
              {t("Don't have an account?", 'खाता नहीं है?')} <br />
              <a href="#" className="text-[#2F5D3A] font-bold">
                {t('Sign up here', 'यहाँ साइन अप करें')} ({t('यहाँ साइन अप करें', 'Sign up here')})
              </a>
            </p>
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7A5230] underline">
              <Icon icon="lucide:arrow-left" className="text-base" />
              {t('Back to home', 'होम पर वापस जाएं')}
            </Link>
          </div>

          <div className="flex justify-center gap-6 text-2xl text-[#7A5230]/40">
            <Icon icon="lucide:shield-check" />
            <Icon icon="lucide:lock" />
            <Icon icon="lucide:smartphone" />
          </div>
        </div>
      </main>
    </div>
  )
}
