'use client';

import { useState, useEffect } from 'react';

interface Guest {
  name: string;
  id: string;
  opens?: number;
  hasRSVP?: boolean;
  decision?: 'yes' | 'no';
}

export default function HostDashboard({ guests, baseUrl }: { guests: Guest[], baseUrl: string }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Enable scrolling on body for this page
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const copyToClipboard = (id: string) => {
    const url = `${baseUrl}/invite/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="host-container">
      <header className="host-header">
        <h1>Керування гостями 🐸</h1>
        <p>Список усіх запрошених та їхні унікальні посилання</p>
      </header>

      <div className="table-wrapper">
        <table className="host-table">
          <thead>
            <tr>
              <th>Ім'я гостя</th>
              <th>Код запрошення</th>
              <th>Переглядів</th>
              <th>Відповідь</th>
              <th>Посилання</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.name}</td>
                <td>
                  <code className="guest-id">{guest.id}</code>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="stats-badge">{guest.opens || 0}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  {!guest.hasRSVP ? (
                    <span className="rsvp-badge pending">Очікуємо ⏳</span>
                  ) : guest.decision === 'yes' ? (
                    <span className="rsvp-badge yes">Будуть ✅</span>
                  ) : (
                    <span className="rsvp-badge no">Ні ❌</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => copyToClipboard(guest.id)}
                    className={`neo-btn ${copiedId === guest.id ? 'neo-btn--green' : 'neo-btn--yellow'}`}
                  >
                    {copiedId === guest.id ? (
                      <>
                        <span>Скопійовано!</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                        </svg>
                        <span>Копіювати лінк</span>
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .host-container {
          min-height: 100dvh;
          background: #f0f0f0;
          padding: clamp(20px, 5vw, 60px);
          font-family: var(--font-body);
          color: var(--black);
          position: relative;
        }

        .host-container::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image: radial-gradient(var(--black) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
        }

        .host-header {
          margin-bottom: 50px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .host-header h1 {
          font-family: var(--font-heading);
          font-size: clamp(32px, 6vw, 64px);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .host-header p {
          font-size: 18px;
          opacity: 0.7;
          font-weight: 500;
        }

        .table-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          overflow-x: auto;
          border: var(--border-w) solid var(--black);
          border-radius: 12px;
          box-shadow: 10px 10px 0 var(--black);
          background: var(--white);
          position: relative;
          z-index: 1;
        }

        .host-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .host-table th {
          background: var(--green);
          color: var(--black);
          padding: 20px;
          font-family: var(--font-heading);
          text-transform: uppercase;
          font-size: 14px;
          letter-spacing: 0.1em;
          border-bottom: var(--border-w) solid var(--black);
        }

        .host-table td {
          padding: 16px 20px;
          border-bottom: 2px solid #eee;
          font-size: 17px;
          font-weight: 500;
        }

        .host-table tr:hover td {
          background: #fafafa;
        }

        .host-table tr:last-child td {
          border-bottom: none;
        }

        .guest-id {
          background: #eee;
          padding: 4px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 14px;
          color: #666;
        }

        .neo-btn {
            font-size: 13px;
            padding: 8px 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 2px solid var(--black);
            border-radius: 6px;
            font-weight: 800;
            text-transform: uppercase;
            box-shadow: 3px 3px 0 var(--black);
            cursor: pointer;
            transition: all 0.1s;
        }

        .neo-btn:hover {
            transform: translate(-1px, -1px);
            box-shadow: 4px 4px 0 var(--black);
        }

        .neo-btn:active {
            transform: translate(1px, 1px);
            box-shadow: 1px 1px 0 var(--black);
        }

        .neo-btn--green { background: var(--green); }
        .neo-btn--yellow { background: var(--yellow); }

        .stats-badge {
            background: var(--black);
            color: white;
            padding: 2px 10px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 13px;
        }

        .rsvp-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 8px;
            font-weight: 800;
            font-size: 13px;
            border: 2px solid var(--black);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .rsvp-badge.pending { background: #eee; color: #666; }
        .rsvp-badge.yes { background: var(--green); color: var(--black); }
        .rsvp-badge.no { background: var(--pink); color: var(--white); }

        @media (max-width: 800px) {
            .host-table th:nth-child(2),
            .host-table td:nth-child(2),
            .host-table th:nth-child(3),
            .host-table td:nth-child(3) {
                display: none;
            }
        }
      `}</style>
    </div>
  );
}
