import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';

export function TaskManager() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button size="icon" variant="outline">
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="font-semibold text-lg md:text-xl">Task Manager</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>
            View and manage the tasks for this project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                  <ClipboardIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Design new homepage</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Create a new design for the homepage
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Badge
                    className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                    variant="outline"
                  >
                    Completed
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                  <ClipboardIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Implement new navigation</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Integrate the new navigation design
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Badge
                    className="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                    variant="outline"
                  >
                    In Progress
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                  <ClipboardIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Optimize page load times</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Improve website performance
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Badge
                    className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    variant="outline"
                  >
                    To Do
                  </Badge>
                </div>
              </div>
            </div>
            <Separator />
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input id="task-title" placeholder="Enter task title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-description">Task Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Enter task description"
                />
              </div>
              <Button type="submit">Add Task</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

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
