import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Project } from '@/app/types/project';
import { Link } from 'react-router-dom';

export default function ProjectCard({
  project: project
}: {
  project: Project;
}) {
  return (
    <Link to={`/project/${project.uuid}`} style={{ textDecoration: 'none' }}>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">{project.description}</p>
          <p className="text-xs text-gray-400">
            Created: {new Date(project.created).toLocaleDateString()}
          </p>

          <div className="mt-4">
            <h4 className="text-sm font-medium">Tasks</h4>
            {project.tasks && project.tasks.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {project.tasks.map((task, index) => (
                  <li key={index}>
                    {task.title} -{' '}
                    <span className="text-xs text-gray-500">
                      {task.skills.join(', ')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-400">No tasks added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
