import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/platform/dashboard';
import { pageHead } from '@/lib/platform-data';
export const Route = createFileRoute('/analysis')({ head: () => pageHead(6), component: Page });
function Page() { return <Dashboard page=6/>; }
