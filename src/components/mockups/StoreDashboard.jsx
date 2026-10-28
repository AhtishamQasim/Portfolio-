import { OrderRow } from './parts';

const kpis = [
  { label: 'Revenue', value: 'Rs 1.84M', trend: '▲ 12.4%' },
  { label: 'Orders', value: '2,340', trend: '▲ 8.1%' },
  { label: 'Customers', value: '1,126', trend: '▲ 5.6%' },
];
const orders = [
  { initials: 'AM', tone: 1, name: 'Ayesha Malik', meta: '#10482 · 3 items', amount: 'Rs 7,450', status: 'Delivered', pill: 'ok' },
  { initials: 'HR', tone: 2, name: 'Hassan Raza', meta: '#10481 · 1 item', amount: 'Rs 2,190', status: 'Shipped', pill: 'info' },
  { initials: 'SK', tone: 3, name: 'Sana Khan', meta: '#10480 · 5 items', amount: 'Rs 12,800', status: 'Packing', pill: 'warn' },
];

export default function StoreDashboard() {
  return (
    <div className="mock-stage" aria-hidden="true">
      <div className="mock mock-dash">
        <div className="mock-bar"><i /><i /><i /><span>admin · orders</span></div>
        <div className="mock-body">
          <aside className="mock-side"><b /><b className="on" /><b /><b /><b /><b /></aside>
          <div className="mock-main">
            <div className="mock-kpis">
              {kpis.map((k) => (
                <div key={k.label}><small>{k.label}</small><b>{k.value}</b><span className="up">{k.trend}</span></div>
              ))}
            </div>
            <div className="mock-chart">
              <svg viewBox="0 0 300 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gA" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="currentColor" stopOpacity=".45" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 70 C30 60 45 30 75 38 S120 70 150 45 S200 10 230 22 S280 40 300 15 V90 H0Z" fill="url(#gA)" />
                <path className="draw" d="M0 70 C30 60 45 30 75 38 S120 70 150 45 S200 10 230 22 S280 40 300 15" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="m-rows">{orders.map((o) => <OrderRow key={o.name} {...o} />)}</div>
          </div>
        </div>
      </div>
      {/* Floats via the CSS `bob` animation */}
      <div className="mock mock-phone">
        <div className="phone-notch" />
        <div className="phone-hero" />
        <div className="phone-grid"><i /><i /><i /><i /></div>
        <div className="phone-btn">Checkout</div>
      </div>
    </div>
  );
}
