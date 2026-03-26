'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OwnerLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = searchParams.get('next') || '/owner';

  const [passcode, setPasscode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  return (
    <main className="container">
      <div className="detail-card card">
        <div className="detail-content">
          <h2 className="detail-title">Café login</h2>
          <p className="detail-muted">Enter the passcode to access the café dashboard.</p>

          <div className="detail-form">
            <label className="detail-label" htmlFor="passcode">
              Passcode
            </label>
            <input
              id="passcode"
              className="detail-input"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Passcode"
              autoComplete="current-password"
            />
          </div>

          <button
            className="btn btn-primary detail-cta"
            type="button"
            disabled={submitting || passcode.trim().length === 0}
            onClick={async () => {
              setSubmitting(true);
              setError('');
              try {
                const res = await fetch('/api/owner/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ passcode }),
                });

                if (!res.ok) {
                  const payload = (await res.json().catch(() => null)) as { error?: string } | null;
                  setError(payload?.error ?? 'Login failed');
                  return;
                }

                router.replace(nextPath);
              } catch {
                setError('Login failed');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>

          {error ? <p className="detail-error">{error}</p> : null}

          <p className="detail-muted detail-footnote">
            MVP access control. We’ll replace this with real accounts later.
          </p>
        </div>
      </div>
    </main>
  );
}
