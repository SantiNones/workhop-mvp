# Workhop — MVP Requirements Document

## 1) Overview
Workhop is a two-sided MVP that lets customers reserve seats/time slots in cafés for work, and lets café owners publish availability and view reservations.

### Goals
- Validate demand for reservable work-friendly café seating
- Validate willingness of cafés to provide availability and manage simple reservations

### Non-goals (MVP)
- Monetization/payments
- Full production-grade authentication/roles and advanced admin tooling
- Complex scheduling rules or seat maps

## 2) Personas
### Persona A — Customer
- Needs: reliable workspace, predictable seating/time
- Motivations: planning, avoiding wasted trips

### Persona B — Café owner/manager
- Needs: simple availability management, visibility into reservations
- Motivations: increase revenue during low hours, manage capacity

## 3) User stories (MVP)
### Customer
- As a customer, I want to see a list of cafés so I can choose where to work.
- As a customer, I want to view café details so I can decide if it fits my needs.
- As a customer, I want to see available time slots so I can pick a workable time.
- As a customer, I want to book a time slot so I can reserve my spot.
- As a customer, I want confirmation of my booking so I know it succeeded.

### Owner
- As an owner, I want to define available time slots so customers can book.
- As an owner, I want to view reservations so I can anticipate occupancy.

## 4) Functional requirements

### FR-1 Café discovery
- The system must display a list of cafés.
- Each café card must show at minimum:
  - Name
  - Location (or neighborhood)
  - Short descriptor (optional)

**Acceptance criteria**
- Given the user opens the app
  - When the café list loads
  - Then the user can see at least one café card (mock data acceptable in MVP)

### FR-2 Café detail
- The system must show a detail page for a selected café.
- The detail page must show:
  - Café name
  - Address/location
  - Available time slots (see FR-3)

**Acceptance criteria**
- Given the user clicks a café card
  - When the detail page opens
  - Then the café details render without errors

### FR-3 Time slot selection
- The system must display selectable time slots for the café.
- The system must allow the user to choose one time slot.

**Acceptance criteria**
- Given the user is on a café detail page
  - When the user selects a time slot
  - Then that selection is clearly indicated

### FR-4 Booking
- The system must allow the user to book the selected time slot using a single primary CTA.
- The system must prevent booking without a selected café and time slot.

**Acceptance criteria**
- Given the user selected a time slot
  - When the user clicks “Book”
  - Then a booking is created (mock persistence acceptable)
  - And the user is shown a confirmation state
- Given the user has not selected a time slot
  - When the user clicks “Book”
  - Then the system shows a clear error or disables the action

### FR-5 Confirmation
- The system must show a confirmation screen/state after booking.
- The confirmation must include:
  - Café name
  - Time slot

**Acceptance criteria**
- Given a booking was created
  - When the confirmation is shown
  - Then the café name and time slot are displayed

### FR-6 Owner: define availability (simple)
- The system must allow an owner to define available time slots.
- MVP implementation may be basic (hardcoded or minimal UI), but it must be editable during development/demo.

**Acceptance criteria**
- Given the owner opens the owner area
  - When the owner sets available time slots
  - Then those slots appear for customers on café detail

### FR-7 Owner: view reservations
- The system must allow an owner to view a list of reservations.
- A reservation entry must include:
  - Café
  - Time slot
  - Booking creation time (optional)

**Acceptance criteria**
- Given at least one booking exists
  - When the owner views reservations
  - Then the booking appears in the list

### FR-8 Tracking (validation)
- The system must track these events:
  - Reserve CTA click
  - Completed booking
  - Drop-off points (minimum viable: page view counts for list and detail)

**Acceptance criteria**
- Given a user clicks the booking CTA
  - Then the “Reserve CTA click” metric increments
- Given a booking completes
  - Then the “Completed booking” metric increments

## 5) Data requirements (lightweight)
### Entities
- Café
  - id
  - name
  - address/location
  - description (optional)
- TimeSlot
  - id
  - caféId
  - startTime
  - endTime
  - status (available/booked)
- Reservation
  - id
  - caféId
  - timeSlotId
  - createdAt

## 6) Non-functional requirements (MVP)
- Performance: primary pages should feel responsive on typical laptop/mobile.
- Reliability: booking action must return a clear success/failure state.
- Accessibility: buttons and form controls must be keyboard reachable.
- Security: do not expose secrets client-side; protect any owner endpoints minimally.
- Observability: basic logs/metrics for booking flow and errors.

## 7) Edge cases
- No cafés available: show empty state message.
- No time slots available for a café: show “no availability” message.
- Booking failure: show error and allow retry.
- Duplicate booking attempt for same slot: prevent or show error (depending on MVP persistence).

## 8) MVP release criteria
- Customer can complete booking flow end-to-end.
- Owner can define availability and see reservations.
- Tracking exists for CTA clicks and completed bookings.

## 9) Post-MVP ideas (not required)
- Payments
- Account system + profiles
- Seat types (quiet table, power outlet, etc.)
- No-show policies / cancellation rules
- Reviews/ratings
