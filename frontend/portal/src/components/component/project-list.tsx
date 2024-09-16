import { useEffect } from 'react';
import { fetchProjects } from '@/app/slices/projectSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ProjectCard from './project-card';

export function ProjectList() {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(state => state.auth);
  const { projects, fetchStatus, error } = useAppSelector(
    state => state.project
  );


  useEffect(() => {
    if (email && projects.length < 1) {
      dispatch(fetchProjects(email));
    }
  }, [dispatch, email, projects.length]);


  if (fetchStatus === 'loading') {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500" aria-label="Loading projects...">
          Loading projects...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <Alert variant="destructive">
          <AlertTitle>Error Loading Projects</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl p-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
