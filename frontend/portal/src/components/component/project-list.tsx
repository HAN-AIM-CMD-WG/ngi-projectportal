import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { useEffect } from 'react';
import { fetchProjects } from '@/app/slices/projectSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Projects } from '@/app/slices/projectSlice';

export function ProjectList() {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(state => state.auth);
  const { projects, fetchStatus, error } = useAppSelector(
    state => state.project
  );

  useEffect(() => {
    if (email) dispatch(fetchProjects(email));
    console.log(projects);
  }, [dispatch, email]);

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My Projects
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            A collection of our latest projects.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Projects, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm/relaxed">{project.description}</p>
                <p className="text-xs/relaxed text-gray-400">
                  Created: {project.created}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
