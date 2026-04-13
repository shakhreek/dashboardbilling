
## University Billing Dashboard

A professional, mobile-responsive billing dashboard with 6 themed module cards, global filters, and interactive side panels with charts.

### Layout & Structure
- **Top bar**: Dashboard title + global filters (Academic Year dropdown, Faculty dropdown)
- **Card grid**: 3 columns on desktop, 2 on tablet, 1 on mobile
- **Each card**: Themed color accent, Lucide icon, 4-5 metric rows, hover scale animation, "Batafsil" (View Details) button
- **Detail panels**: Shadcn Sheet (right side panel) with Recharts visualizations

### 6 Module Cards

1. **Kontrakt** (Blue) — Applications, approved contracts, total sum, paid sum → Sheet: progress bar (paid vs total) + bar chart by faculty
2. **Kredit modul** (Purple) — Applications, contracts, sum, payments → Sheet: pie chart of payment status
3. **TTJ** (Green) — Applications, contracts, sum, payments, residents count → Sheet: occupancy gauge (beds vs occupied)
4. **Stipendiya** (Amber) — Recipients count, total amount → Sheet: donut chart by stipend type (Beshlik, To'rtlik, Prezident)
5. **Ijara** (Rose) — Applications, total amount, subsidy recipients → Sheet: line chart of monthly disbursement
6. **TTJ Subsidiya** (Indigo) — Applications, amount, recipients → Sheet: horizontal bar funnel (New → Approved → Paid)

### Components to Create
- `src/pages/Index.tsx` — Main dashboard page with filters and card grid
- `src/components/DashboardFilters.tsx` — Academic year & faculty selects
- `src/components/ModuleCard.tsx` — Reusable themed card component
- `src/components/ModuleDetailSheet.tsx` — Sheet wrapper for detail views
- `src/components/details/KontraktDetails.tsx` — Bar chart + progress
- `src/components/details/KreditDetails.tsx` — Pie chart
- `src/components/details/TTJDetails.tsx` — Occupancy visualization
- `src/components/details/StipendiyaDetails.tsx` — Donut chart
- `src/components/details/IjaraDetails.tsx` — Line chart
- `src/components/details/TTJSubsidiyaDetails.tsx` — Funnel bars
- `src/data/dashboardData.ts` — All mock data and chart data

### Design
- All labels in Uzbek
- Color themes via Tailwind classes (blue, purple, green, amber, rose, indigo)
- Cards with `hover:scale-[1.02]` transition
- Clean, professional typography
- Recharts for all visualizations
