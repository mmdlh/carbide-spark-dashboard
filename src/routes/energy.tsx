import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/platform/dashboard';
import { pageHead } from '@/lib/platform-data';
export const Route = createFileRoute('/energy')({ head: () => pageHead(2), component: Page });
function Page() { return <Dashboard page=2/>; }
