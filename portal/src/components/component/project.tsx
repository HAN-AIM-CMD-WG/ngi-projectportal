import { Input } from '@/components/ui/input';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  setProjectName,
  setDescription,
  createProject
} from '@/app/slices/projectSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

export function Project() {
  const dispatch = useAppDispatch();
  const { projectName, description, status, error } = useAppSelector(
    state => state.project
  );
  const email = useAppSelector(state => state.auth.email) ?? '';

  const handleCreateProject = () => {
    dispatch(createProject({ email, projectName, description }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Project</CardTitle>
        <CardDescription>
          Fill out the form below to start a new project.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={e => dispatch(setProjectName(e.target.value))}
          />
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={e => dispatch(setDescription(e.target.value))}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={handleCreateProject}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Creating...' : 'Create Project'}
        </Button>
        {status === 'failed' && <p className="text-red-500">{error}</p>}
      </CardFooter>
    </Card>
  );
}
