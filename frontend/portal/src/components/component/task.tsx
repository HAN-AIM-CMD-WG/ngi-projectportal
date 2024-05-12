import React from 'react';
import { Badge } from '../ui/badge';

interface TaskProps {
  task: {
    title: string;
    description: string;
    status: string;
  };
}

const Task = ({ task }: TaskProps) => {
  const badgeStyles = {
    Completed:
      'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    'In Progress':
      'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    'To Do': 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
        <ClipboardIcon className="w-5 h-5" />
      </div>
      <div>
        <div className="font-medium">{task.title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {task.description}
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Badge
          className={badgeStyles[task.status as keyof typeof badgeStyles]}
          variant="outline"
        >
          {task.status}
        </Badge>
      </div>
    </div>
  );
};

function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

export default Task;
