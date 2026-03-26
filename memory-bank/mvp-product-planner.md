# Workhop — MVP Product Planner

## 1) Product summary
Workhop helps people reserve seats and time slots in cafés to work, while giving cafés a simple way to publish availability and view reservations.

## 2) Target users
- People who want a reliable place to work from a café (remote workers, students, freelancers)
- Café owners/managers who want to offer/manage seat reservations with minimal overhead

## 3) Problem
- Customers show up and can’t find a seat or suitable spot to work.
- Cafés can’t predict demand for work-friendly seating/time windows.
- Existing options are either informal (no guarantee) or too heavy (complex booking platforms).

## 4) Core value proposition
- Customers can confidently plan a café work session by reserving a seat/time slot.
- Cafés can list simple availability and see upcoming reservations without complex tooling.

## 5) MVP scope (strict)
### Customer (user) side
- Browse a list of cafés (card grid)
- View café details
- Select a time slot
- Book a slot (single CTA)
- See a confirmation screen

### Café (owner) side — simple
- Define available slots (hardcoded/basic UI is acceptable in MVP)
- View reservations

## 6) Out of scope (explicit)
- Payments
- Full multi-tenant authentication/roles (beyond the minimum needed to demo)
- Complex backend logic (dynamic pricing, seat maps, etc.)
- Reviews, ratings, messaging

## 7) Key user flows
### Flow A — Customer booking
1. Open Workhop
2. Browse café list
3. Open café detail
4. Pick a time slot
5. Tap “Book”
6. View confirmation

### Flow B — Owner slot setup
1. Open owner area
2. Define available time slots
3. Save/publish

### Flow C — Owner reservation viewing
1. Open owner area
2. View list of reservations

## 8) Success criteria (validation)
Track:
- Reserve CTA clicks
- Completed bookings
- Drop-offs (e.g., detail page visits vs booking completions)

## 9) Assumptions & risks
- Users are willing to reserve seats in advance for café work sessions.
- Cafés will adopt a lightweight tool if setup is simple.
- Risk: insufficient supply of cafés/slots makes the marketplace feel empty.
- Risk: operational friction (no-shows, overbooking) could require policy features later.

## 10) MVP constraints
- Prioritize speed and learnings over completeness.
- Keep owner tooling minimal.
- Use mock data where needed, but preserve the end-to-end flow.

## 11) MVP deliverable checklist
- Customer flow works end-to-end
- Owner can define slots and view reservations
- Tracking events exist for the validation requirements
