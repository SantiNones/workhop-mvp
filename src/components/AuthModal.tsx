'use client';

import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSent?: () => void;
};

export default function AuthModal({ open, onClose, onSent }: Props) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setEmail('');
      setSubmitting(false);
      setError('');
      setSent(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card card">
        <div className="detail-content">
          <div className="modal-header">
            <h3 className="detail-subtitle">Sign in to book</h3>
            <button type="button" className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>

          <p className="detail-muted">
            We’ll email you a magic link to confirm it’s you.
          </p>

          <div className="detail-form">
            <label className="detail-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="detail-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              autoComplete="email"
            />
          </div>

          <button
            className="btn btn-primary detail-cta"
            type="button"
            disabled={submitting || email.trim().length === 0}
            onClick={async () => {
              setSubmitting(true);
              setError('');

              try {
                const res = await signIn('email', {
                  email: email.trim(),
                  redirect: false,
                });

                if (res?.error) {
                  setError('Could not send sign-in email.');
                  return;
                }

                setSent(true);
                onSent?.();
              } catch {
                setError('Could not send sign-in email.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? 'Sending…' : 'Send magic link'}
          </button>

          {sent ? <p className="detail-success">Check your email for the link.</p> : null}
          {error ? <p className="detail-error">{error}</p> : null}

          <p className="detail-muted detail-footnote">
            You can close this window after you open the email link.
          </p>
        </div>
      </div>
    </div>
  );
}
