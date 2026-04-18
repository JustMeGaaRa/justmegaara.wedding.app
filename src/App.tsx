import { useCallback, useEffect, useRef } from 'react'
import './App.css'

const TOTAL_SLIDES = 8

function getGuestName(): string {
  const params = new URLSearchParams(window.location.search)
  const raw = params.get('guest')
  if (!raw) return 'друже'
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

const guestName = getGuestName()

const stop = (e: React.MouseEvent) => e.stopPropagation()

/* ── Inline SVG Icons ── */

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function IconChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function IconChevronUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 15 12 9 18 15" />
    </svg>
  )
}

/* ── App ── */

function App() {
  const currentSlide = useRef(0)

  const scrollToSlide = useCallback((index: number) => {
    const el = document.getElementById(`slide-${index}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      currentSlide.current = index
    }
  }, [])

  const goNext = useCallback(() => {
    const next = currentSlide.current >= TOTAL_SLIDES - 1 ? 0 : currentSlide.current + 1
    scrollToSlide(next)
  }, [scrollToSlide])

  /* Track which slide is visible via IntersectionObserver */
  useEffect(() => {
    const container = document.getElementById('root')
    if (!container) return
    const slides = Array.from(container.querySelectorAll<HTMLElement>('.slide'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const idx = parseInt(id.replace('slide-', ''), 10)
            if (!isNaN(idx)) currentSlide.current = idx
          }
        }
      },
      { root: container, threshold: 0.6 }
    )
    slides.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* Keyboard navigation */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === ' ') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext])

  return (
    <div>

      {/* ══════ SLIDE 1 — HERO ══════ */}
      <section id="slide-0" className="slide slide--yellow">
        <div className="sticker sticker--1" />
        <div className="sticker sticker--2" />
        <div className="sticker sticker--3 sticker--sq" />
        <span className="slide-counter">01 / 08</span>
        <div className="slide-inner">
          <div className="hero-frog" aria-hidden="true">🐸</div>
          <h1>Весілля Павла та Катрусі</h1>
          <p className="subtitle">Operation «Zhaba»</p>
          <p>
            Привіт, <span className="guest-name">{guestName}</span>! Ми вирішили, що життя занадто коротке, щоб не відсвяткувати наше «Long Live» разом. Готуйтеся, буде весело, затишно і зовсім не офіційно!
          </p>
          <div className="hero-date">1 серпня 2026</div>
        </div>
        <div className="scroll-hint">
          <span>Гортай</span>
          <IconChevronDown />
        </div>
      </section>

      {/* ══════ SLIDE 2 — CEREMONY ══════ */}
      <section id="slide-1" className="slide slide--white">
        <span className="slide-counter">02 / 08</span>
        <div className="slide-inner">
          <div className="slide-emoji" aria-hidden="true">⛪️</div>
          <h2>Офіційна частина (Шлюб)</h2>
          <p>Тут ми скажемо «Так» і постараємось не розплакатися (але це неточно).</p>
          <div className="time-block">12:00</div>
          <p>Домініканський собор, Музейна площа, Львів</p>
          <a
            href="https://maps.app.goo.gl/yWn4BCQw3duS3nz98"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn neo-btn--orange"
            onClick={stop}
          >
            <IconMapPin />
            Показати на карті
          </a>
        </div>
        <div className="scroll-hint">
          <span>Гортай</span>
          <IconChevronDown />
        </div>
      </section>

      {/* ══════ SLIDE 3 — TRANSFER ══════ */}
      <section id="slide-2" className="slide slide--green">
        <span className="slide-counter">03 / 08</span>
        <div className="slide-inner">
          <div className="slide-emoji" aria-hidden="true">🚌</div>
          <h2>Quest: Як потрапити на вечірку?</h2>
          <p>Ми подбали, щоб ніхто не загубився по дорозі до пригод:</p>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-time">12:45</span>
              <span className="timeline-text">Завантажуємось у трансфер прямо від собору.</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-time">14:00</span>
              <span className="timeline-text">Прибуваємо в «Сад / Garden» (с. Хоросно). Тут починається найцікавіше!</span>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/ABKqmJyAVofQ23968"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn neo-btn--orange"
            onClick={stop}
          >
            <IconMapPin />
            Показати на карті
          </a>
          <a
            href="https://www.instagram.com/garden.prostir/"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn neo-btn--purple"
            onClick={stop}
          >
            <IconInstagram />
            Garden в Instagram
          </a>
        </div>
        <div className="scroll-hint">
          <span>Гортай</span>
          <IconChevronDown />
        </div>
      </section>

      {/* ══════ SLIDE 4 — PARTY / DRESS CODE ══════ */}
      <section id="slide-3" className="slide slide--white">
        <span className="slide-counter">04 / 08</span>
        <div className="slide-inner">
          <div className="slide-emoji" aria-hidden="true">💃🏻</div>
          <h2>Party Time & Атмосфера</h2>
          <p>Ніяких незручних костюмів (якщо ви самі того не хочете).</p>
          <div className="dress-badge">Smart Casual & Happy Face</div>
          <p>Головне, щоб вам було зручно танцювати або релаксувати на травичці.</p>
          <div className="swatches-wrap">
            <span className="swatches-label">Палітра для натхнення:</span>
            <div className="swatches">
              <div className="swatch" style={{ background: '#74C044' }} />
              <div className="swatch" style={{ background: '#FFEA2D' }} />
              <div className="swatch" style={{ background: '#FF572D' }} />
              <div className="swatch" style={{ background: '#FF005D' }} />
              <div className="swatch" style={{ background: '#70149A' }} />
              <div className="swatch" style={{ background: '#3C489B' }} />
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Гортай</span>
          <IconChevronDown />
        </div>
      </section>

      {/* ══════ SLIDE 5 — RETURN HOME ══════ */}
      <section id="slide-4" className="slide slide--blue">
        <span className="slide-counter">05 / 08</span>
        <div className="slide-inner">
          <div className="slide-emoji" aria-hidden="true">🏠</div>
          <h2>Повернення додому</h2>
          <div className="time-block">22:30</div>
          <p>Вечірка офіційно переходить у фазу «сон», тому на локацію приїде трансфер.</p>
          <div className="route-block">
            Хоросно → Львів → Шептицький
          </div>
          <p>Довеземо з вітерцем!</p>
        </div>
        <div className="scroll-hint">
          <span>Гортай</span>
          <IconChevronDown />
        </div>
      </section>

      {/* ══════ SLIDE 6 — IMPORTANT NOTES ══════ */}
      <section id="slide-5" className="slide slide--green">
        <span className="slide-counter">06 / 08</span>
        <div className="slide-inner">
          <div className="slide-emoji" aria-hidden="true">💡</div>
          <h2>Те, про що часто забувають</h2>
          <div className="cards-grid">
            <div className="info-card">
              <span className="info-card-icon">🎁</span>
              <h3>Подарунки</h3>
              <p>Найкращий подарунок — це ви. Але якщо хочете зробити нам приємно, ми будемо вдячні за внесок у наш «сімейний репозиторій» 💵</p>
            </div>
            <div className="info-card">
              <span className="info-card-icon">🌸</span>
              <h3>Квіти</h3>
              <p>Замість квітів, які швидко в'януть, ми будемо раді пляшці вашого улюбленого вина 🍷 або корму для тварин, який ми передамо в притулок.</p>
            </div>
            <div className="info-card">
              <span className="info-card-icon">👶</span>
              <h3>Діти</h3>
              <p>Ваші малюки — це теж гості! Але попередьте нас, якщо їм потрібне окреме дитяче крісло чи меню.</p>
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Гортай</span>
          <IconChevronDown />
        </div>
      </section>

      {/* ══════ SLIDE 7 — CONTACT ══════ */}
      <section id="slide-6" className="slide slide--purple">
        <span className="slide-counter">07 / 08</span>
        <div className="slide-inner">
          <div className="slide-emoji" aria-hidden="true">📞</div>
          <h2>Техпідтримка весілля</h2>
          <p>Якщо ви заблукали, забули, який сьогодні рік, або просто хочете привітати — пишіть нашій феї-організатору:</p>
          <div className="contact-name">Надія</div>
          <div className="btn-row">
            <a
              href="tel:+380937450263"
              className="neo-btn neo-btn--green"
              onClick={stop}
            >
              <IconPhone />
              +380 93 745 02 63
            </a>
            <a
              href="https://t.me/nadya_chayka"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn--orange"
              onClick={stop}
            >
              <IconTelegram />
              @nadya_chayka
            </a>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Гортай</span>
          <IconChevronDown />
        </div>
      </section>

      {/* ══════ SLIDE 8 — RSVP ══════ */}
      <section id="slide-7" className="slide slide--orange">
        <span className="slide-counter">08 / 08</span>
        <div className="slide-inner">
          <div className="slide-emoji" aria-hidden="true">📝</div>
          <h2>RSVP (Ваш комміт)</h2>
          <p>Будь ласка, заповніть форму до <strong>25 червня 2026 року</strong>, щоб ми встигли замовити достатньо ігристого!</p>
          <div className="rsvp-list">
            <div className="rsvp-item">
              <div className="rsvp-item-label">Трансфер до собору:</div>
              <div className="rsvp-item-options">Потрібен / Буду на своєму літаку</div>
            </div>
            <div className="rsvp-item">
              <div className="rsvp-item-label">Трансфер на локацію:</div>
              <div className="rsvp-item-options">Їду з усіма / Доберусь сам</div>
            </div>
            <div className="rsvp-item">
              <div className="rsvp-item-label">Рівень відриву:</div>
              <div className="rsvp-item-options">Буду запалювати на танцполі! / Буду чілити з дітьми</div>
            </div>
            <div className="rsvp-item">
              <div className="rsvp-item-label">Харчові «баги»:</div>
              <div className="rsvp-item-options">Алергії, вегетаріанство чи нелюбов до цибулі — пишіть нам</div>
            </div>
          </div>
          <div className="closing">З любов'ю, Павло та Катруся! 🐸</div>
        </div>
        <div className="scroll-hint scroll-hint--up" onClick={stop}>
          <IconChevronUp />
          <span>Нагору</span>
          <button style={{ position: 'absolute', inset: 0, opacity: 0 }} onClick={() => scrollToSlide(0)} aria-label="Нагору" />
        </div>
      </section>
    </div>
  )
}

export default App
