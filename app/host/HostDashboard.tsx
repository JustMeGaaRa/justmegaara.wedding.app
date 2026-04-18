'use client';

import { useState, useEffect } from 'react';

interface Guest {
  name: string;
  id: string;
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
              <th>ID</th>
              <th>Дія</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.name}</td>
                <td>
                    <code className="guest-id">{guest.id}</code>
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
          background: var(--white);
          padding: clamp(20px, 5vw, 60px);
          font-family: var(--font-body);
          color: var(--black);
          position: relative;
          z-index: 10;
        }

        .host-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .host-header h1 {
          font-family: var(--font-heading);
          font-size: clamp(32px, 6vw, 56px);
          margin-bottom: 10px;
        }

        .table-wrapper {
          max-width: 900px;
          margin: 0 auto;
          overflow-x: auto;
          border: var(--border-w) solid var(--black);
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          background: var(--white);
        }

        .host-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .host-table th {
          background: var(--blue);
          color: var(--white);
          padding: 16px 20px;
          font-family: var(--font-heading);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: var(--border-w) solid var(--black);
        }

        .host-table td {
          padding: 16px 20px;
          border-bottom: 2px solid var(--black);
          font-size: 18px;
        }

        .host-table tr:last-child td {
          border-bottom: none;
        }

        .guest-id {
          background: var(--yellow);
          padding: 4px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-weight: bold;
        }

        .neo-btn {
            font-size: 14px;
            padding: 8px 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 2px solid var(--black);
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
            transform: translate(2px, 2px);
            box-shadow: 1px 1px 0 var(--black);
        }

        .neo-btn--green { background: #74C044; color: var(--black); }
        .neo-btn--yellow { background: #FFEA2D; color: var(--black); }

        @media (max-width: 600px) {
            .host-table th:nth-child(2),
            .host-table td:nth-child(2) {
                display: none;
            }
        }
      `}</style>
    </div>
  );
}
