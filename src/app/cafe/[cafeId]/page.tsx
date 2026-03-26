'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { getCafeById } from '../../../data/cafes';
import { track } from '../../../lib/tracking';
import AuthModal from '../../../components/AuthModal';

export default function CafeDetailPage() {
  const { status } = useSession();
  const params = useParams<{ cafeId: string }>();

  const cafe = useMemo(() => {
    const id = Number(params?.cafeId);
    if (Number.isNaN(id)) return undefined;
    return getCafeById(id);
  }, [params?.cafeId]);

  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [seats, setSeats] = useState<number>(1);
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');

  const [showAuth, setShowAuth] = useState(false);

  const maxSeatsPerReservation = 2;

  useEffect(() => {
    if (cafe) {
      track('view_cafe_detail', { cafeId: cafe.id });
    }
  }, [cafe]);

  if (!cafe) {
    return (
      <main className="container">
        <div className="detail-card card">
          <div className="detail-content">
            <p className="detail-muted">Cafe not found.</p>
            <Link href="/" className="detail-back">
              Back to cafés
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
      />
      <div className="detail-header">
        <Link href="/" className="detail-back">
          Back to cafés
        </Link>
      </div>

      <div className="detail-layout">
        <div className="detail-card card">
          <img src={cafe.image} alt={cafe.name} className="detail-image" />
          <div className="detail-content">
            <h2 className="detail-title">{cafe.name}</h2>
            <p className="detail-muted">{cafe.address}</p>
            <p className="detail-description">{cafe.description}</p>

            <div className="detail-badges">
              <span className="detail-badge">Min: €{cafe.minConsumption}/hr</span>
              <span className="detail-badge">{cafe.availableSlots} seats</span>
            </div>

            <div className="amenities">
              <h3 className="amenities-title">What this place offers</h3>
              <div className="amenities-list">
                {cafe.amenities.map((a: string) => (
                  <span key={a} className="amenity-chip">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="detail-card card">
          <div className="detail-content">
            <h3 className="detail-subtitle">Pick a slot (9:00–18:00)</h3>

            <div className="slot-grid">
              {cafe.slots.map((slot: string) => {
                const active = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-button ${active ? 'slot-button--active' : ''}`}
                    onClick={() => {
                      setSelectedSlot(slot);
                      track('slot_select', { cafeId: cafe.id, slot });
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            <div className="detail-form">
              <label className="detail-label" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                className="detail-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label className="detail-label" htmlFor="name">
                Your name
              </label>
              <input
                id="name"
                className="detail-input"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Name"
              />

              <label className="detail-label" htmlFor="seats">
                Seats
              </label>
              <input
                id="seats"
                className="detail-input"
                type="number"
                min={1}
                max={maxSeatsPerReservation}
                value={seats}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (Number.isNaN(next)) return;
                  setSeats(Math.max(1, Math.min(maxSeatsPerReservation, next)));
                }}
              />
            </div>

            <button
              className="btn btn-primary detail-cta"
              disabled={!selectedSlot || submitting || customerName.trim().length === 0 || !date}
              onClick={async () => {
                if (status !== 'authenticated') {
                  setShowAuth(true);
                  return;
                }

                setSubmitting(true);
                setError('');
                setConfirmation('');

                try {
                  track('reserve_click', { cafeId: cafe.id, slot: selectedSlot });

                  const res = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      cafeId: cafe.id,
                      date,
                      time: selectedSlot,
                      seats,
                      customerName: customerName.trim(),
                    }),
                  });

                  if (!res.ok) {
                    const payload = (await res.json().catch(() => null)) as
                      | { error?: string }
                      | null;
                    setError(payload?.error ?? `Booking failed (${res.status})`);
                    return;
                  }

                  const created = (await res.json()) as { id: string };
                  setConfirmation(`Booked. Reservation id: ${created.id}`);
                } catch {
                  setError('Booking failed. Please try again.');
                } finally {
                  setSubmitting(false);
                }
              }}
              type="button"
            >
              {submitting ? 'Booking…' : 'Book your station'}
            </button>

            {error ? <p className="detail-error">{error}</p> : null}
            {confirmation ? <p className="detail-success">{confirmation}</p> : null}

            <p className="detail-muted detail-footnote">
              This is a prototype. No payment, no account.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
