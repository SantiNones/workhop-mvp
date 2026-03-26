import React from 'react';
import Link from 'next/link';

import { cafes } from '../data/cafes';

const CafeGrid = () => {
  return (
    <div className="cafe-grid">
      <h2 className="grid-title">Available Stations</h2>
      <p className="grid-subtitle">Pick a café, choose a slot, book your station.</p>
      <div className="grid">
        {cafes.map((cafe) => (
          <Link key={cafe.id} href={`/cafe/${cafe.id}`} className="cafe-card-link">
            <div className="cafe-card">
              <img src={cafe.image} alt={cafe.name} className="cafe-image" />
              <div className="cafe-content">
                <h3 className="cafe-name">{cafe.name}</h3>
                <p className="cafe-location">{cafe.address}</p>
                <p className="cafe-description">{cafe.description}</p>
                <div className="cafe-details">
                  <span className="cafe-detail">Min: €{cafe.minConsumption}/hr</span>
                  <span className="cafe-detail">{cafe.availableSlots} seats</span>
                </div>
                <div className="btn btn-primary cafe-button">Book your station</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CafeGrid;
