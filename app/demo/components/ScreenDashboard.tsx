'use client';

import { StoreData } from '../lib/types';

const MOCK_ORDERS = [
  { name: 'Sarah Johnson', id: 'GW-1234', qty: 124, status: 'Sent', color: '#4ADE80' },
  { name: 'Mike Chen', id: 'GW-1235', qty: 48, status: 'Scheduled', color: '#FBBF24' },
  { name: 'Lisa Park', id: 'GW-1236', qty: 89, status: 'Delivered', color: '#818CF8' },
];

const MOCK_ACTIVITY = [
  { text: 'John Doe claimed their gift', time: '2 minutes ago' },
  { text: 'Jane Smith opted in to marketing', time: '15 minutes ago' },
  { text: 'Order #GW-1234 shipped to 124 recipients', time: '1 hour ago' },
  { text: 'Mike Kim placed order for $4,950', time: '3 hours ago' },
];

export default function ScreenDashboard({
  store,
  onNext,
}: {
  store: StoreData;
  onNext: () => void;
}) {
  // Suppress unused var warning
  void store;

  return (
    <div className="screen-dashboard-dark">
      <div className="dashboard-dark-header">
        <h2>Dashboard</h2>
      </div>

      <div className="dashboard-dark-stats">
        {[
          { icon: '💰', value: '$47,320', label: 'Revenue this month', change: '↑ 26%' },
          { icon: '🎁', value: '423', label: 'Gifts sent', change: '↑ 18%' },
          { icon: '✅', value: '87%', label: 'Claim rate', change: null },
          { icon: '👥', value: '312', label: 'New email subscribers', change: '↑ 156' },
        ].map((stat, i) => (
          <div key={i} className="stat-card-dark">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            {stat.change && <div className="stat-change">{stat.change}</div>}
          </div>
        ))}
      </div>

      <div className="dashboard-dark-columns">
        <div className="dashboard-dark-col">
          <h4>Recent Orders</h4>
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="order-row-dark">
              <div className="order-avatar-dark">{order.name.charAt(0)}</div>
              <div>
                <div className="order-name-dark">{order.name}</div>
                <div className="order-meta-dark">{order.id} · {order.qty} gifts</div>
              </div>
              <span className="order-status-dark" style={{ color: order.color }}>{order.status}</span>
            </div>
          ))}
        </div>
        <div className="dashboard-dark-col">
          <h4>Recent Activity</h4>
          {MOCK_ACTIVITY.map((a, i) => (
            <div key={i} className="activity-row-dark">
              <div className="activity-dot-dark" />
              <div>
                <div className="activity-text-dark">{a.text}</div>
                <div className="activity-time-dark">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-cta-dark">
        <p>This is what <strong>you</strong> see. Real-time tracking for every gift.</p>
        <button onClick={onNext}>Get Started →</button>
      </div>
    </div>
  );
}
