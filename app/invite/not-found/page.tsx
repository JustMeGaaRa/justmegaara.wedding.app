'use client';

import '../../wedding.css';
import Link from 'next/link';

export default function InviteNotFound() {
  return (
    <main id="wedding-container" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <section className="slide slide--pink" style={{ width: '100%', height: '100%' }}>
        <div className="slide-inner">
          <div className="hero-frog" aria-hidden="true" style={{ fontSize: '100px' }}>😿</div>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 54px)' }}>Запрошення не знайдено</h1>
          <p style={{ maxWidth: '450px', margin: '0 auto' }}>
            Ой! Здається, це посилання недійсне або ми помилково видалили його з нашого «репозиторію».
          </p>
          <div style={{ marginTop: '20px' }}>
            <Link href="/" className="neo-btn neo-btn--yellow">
                На головну
            </Link>
          </div>
        </div>
        
        {/* Decorative stickers to match the theme */}
        <div className="sticker sticker--1" />
        <div className="sticker sticker--2" />
        <div className="sticker sticker--3 sticker--sq" />
      </section>
    </main>
  );
}
