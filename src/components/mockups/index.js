import StoreDashboard from './StoreDashboard';
import BillingDashboard from './BillingDashboard';
import { OpsMock, SiteMock, TicketsMock } from './SmallMockups';

// Keys match `mockup` in data/projects.js.
export const mockups = {
  store: StoreDashboard,
  billing: BillingDashboard,
  tickets: TicketsMock,
  site: SiteMock,
  ops: OpsMock,
};
