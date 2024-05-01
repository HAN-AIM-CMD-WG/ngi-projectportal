import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { TaskManager } from './task-manager';

export function ProjectDetailPage() {
  return (
    <div>
      <Navbar />
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <TaskManager />
      </div>
    </div>
  );
}
