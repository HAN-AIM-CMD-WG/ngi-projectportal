import { useEffect, useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle,
  Edit,
  Save,
  Plus,
  Flag,
  Target,
  Star,
  Sun
} from 'lucide-react'; // Import additional icons
import {
  fetchProjectDetail,
  RoadmapStep,
  updateProjectDetailAsync,
  uploadProjectImage
} from '@/app/slices/projectDetailSlice';
import { Project } from '@/app/slices/projectDetailSlice';

export function ProjectHome() {
  const { uuid } = useParams<{ uuid: string }>();
  const dispatch = useAppDispatch();
  const projectDetail = useAppSelector(state => state.projectDetail.project);
  const projectStatus = useAppSelector(state => state.projectDetail.status);
  const error = useAppSelector(state => state.projectDetail.error);

  const [localProject, setLocalProject] = useState<Project | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Define available icons for roadmap steps
  const availableIcons = [
    { name: 'Flag', component: <Flag className="h-6 w-6 text-purple-500" /> },
    { name: 'Target', component: <Target className="h-6 w-6 text-blue-500" /> },
    { name: 'Star', component: <Star className="h-6 w-6 text-yellow-500" /> },
    { name: 'Sun', component: <Sun className="h-6 w-6 text-orange-500" /> }
    // Add more icons as needed
  ];

  // Map icon names to their components for rendering
  const iconMap: { [key: string]: React.ReactNode } = {
    Flag: <Flag className="h-6 w-6 text-purple-500" />,
    Target: <Target className="h-6 w-6 text-blue-500" />,
    Star: <Star className="h-6 w-6 text-yellow-500" />,
    Sun: <Sun className="h-6 w-6 text-orange-500" />
    // Add more mappings as needed
  };

  useEffect(() => {
    if (uuid) {
      dispatch(fetchProjectDetail(uuid));
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (projectDetail) {
      setLocalProject(projectDetail);
    }
  }, [projectDetail]);

  const handleSave = async () => {
    if (localProject && uuid) {
      await dispatch(updateProjectDetailAsync({ uuid, project: localProject }));
      // Refetch project details to ensure localProject is up-to-date
      dispatch(fetchProjectDetail(uuid));
      setEditMode(false);
    }
  };

  const handleRoadmapChange = (
    index: number,
    field: keyof RoadmapStep,
    value: string
  ) => {
    if (localProject) {
      const updatedRoadmapSteps = [...localProject.roadmapSteps];
      updatedRoadmapSteps[index] = {
        ...updatedRoadmapSteps[index],
        [field]: value
      };
      setLocalProject({ ...localProject, roadmapSteps: updatedRoadmapSteps });
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && uuid) {
      const imageFile = e.target.files[0];
      dispatch(uploadProjectImage({ uuid, imageFile }))
        .then(() => {
          // Optionally, refetch project details to get updated image
          if (uuid) {
            dispatch(fetchProjectDetail(uuid));
          }
        })
        .catch(() => {
          // Handle upload error if needed
        });
    }
  };

  const addRoadmapStep = () => {
    if (localProject) {
      const newStep: RoadmapStep = {
        icon: 'Flag', // Default icon name
        title: '',
        description: ''
      };
      setLocalProject({
        ...localProject,
        roadmapSteps: [...localProject.roadmapSteps, newStep]
      });
    }
  };

  if (projectStatus === 'loading' || !localProject) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  if (projectStatus === 'failed') {
    return (
      <div className="container mx-auto p-8 text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="container mx-auto p-8 flex-grow">
        {/* Toggle Edit Mode Button */}
        {/* Project Title */}
        <div className="flex items-center mb-6">
          {editMode ? (
            <Input
              value={localProject.title}
              onChange={e =>
                setLocalProject({ ...localProject, title: e.target.value })
              }
              className="text-3xl font-bold bg-transparent border-none focus:ring-0 flex-grow"
            />
          ) : (
            <h2 className="text-3xl font-bold flex-grow flex items-center justify-between">
              {localProject.title}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(!editMode)}
                aria-label={
                  editMode ? 'Switch to view mode' : 'Switch to edit mode'
                }
                className="ml-4"
              >
                <Edit className="h-5 w-5 mr-2" />
                {editMode ? 'View Mode' : 'Edit Mode'}
              </Button>
            </h2>
          )}
          {editMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              aria-label="Save project title"
            >
              <Save className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Project Image and Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <img
              src={
                localProject.image
                  ? `data:image/*;base64,${localProject.image}`
                  : '/placeholder.svg?height=400&width=800'
              }
              alt={localProject.title}
              width={800}
              height={400}
              className="rounded-lg shadow-lg"
            />
            {editMode && (
              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Project Members</h3>
              <div className="space-y-4">
                {['Sten van Uitenburg', 'Ferdie Koelman', 'Dustin Hansen'].map(
                  (name, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt={name}
                        />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{name}</p>
                        <p className="text-sm text-gray-500">Role</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Description, Roadmap, Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Project Description */}
            <section>
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold flex-grow">The Project</h3>
                {editMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    aria-label="Save project description"
                  >
                    <Save className="h-5 w-5" />
                  </Button>
                )}
              </div>
              {editMode ? (
                <Textarea
                  value={localProject.description}
                  onChange={e =>
                    setLocalProject({
                      ...localProject,
                      description: e.target.value
                    })
                  }
                  className="w-full min-h-[150px] text-gray-600"
                />
              ) : (
                <p className="text-gray-600">{localProject.description}</p>
              )}
            </section>

            {/* Roadmap */}
            <section>
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold flex-grow">Roadmap</h3>
                {editMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    aria-label="Save roadmap"
                  >
                    <Save className="h-5 w-5" />
                  </Button>
                )}
              </div>
              {editMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addRoadmapStep}
                  className="mb-4 flex items-center"
                  aria-label="Add roadmap step"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              )}
              <div className="relative">
                <div className="absolute top-5 left-5 w-[calc(100%-2.5rem)] h-1 bg-gray-200 rounded"></div>
                <div className="relative z-10 flex justify-between">
                  {localProject.roadmapSteps.length > 0 ? (
                    localProject.roadmapSteps.map((step, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center w-1/4"
                      >
                        <div className="mb-2 p-2 bg-white rounded-full border-2 border-purple-500 shadow-md flex items-center justify-center">
                          {iconMap[step.icon] || (
                            <Flag className="h-6 w-6 text-purple-500" />
                          )}
                        </div>
                        {editMode ? (
                          <>
                            {/* Icon Selection */}
                            <div className="mb-2">
                              <label
                                htmlFor={`icon-select-${index}`}
                                className="sr-only"
                              >
                                Select icon for roadmap step
                              </label>
                              <select
                                id={`icon-select-${index}`}
                                value={step.icon}
                                onChange={e =>
                                  handleRoadmapChange(
                                    index,
                                    'icon',
                                    e.target.value
                                  )
                                }
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                              >
                                {availableIcons.map(icon => (
                                  <option key={icon.name} value={icon.name}>
                                    {icon.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <Input
                              value={step.title}
                              onChange={e =>
                                handleRoadmapChange(
                                  index,
                                  'title',
                                  e.target.value
                                )
                              }
                              placeholder="Title"
                              className="text-sm font-semibold mb-1 text-center bg-transparent border-none focus:ring-0"
                            />
                            <Textarea
                              value={step.description}
                              onChange={e =>
                                handleRoadmapChange(
                                  index,
                                  'description',
                                  e.target.value
                                )
                              }
                              placeholder="Description"
                              className="text-xs text-gray-500 text-center w-full resize-none bg-transparent border-none focus:ring-0"
                            />
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-semibold mb-1 text-center">
                              {step.title || 'Untitled Step'}
                            </p>
                            <p className="text-xs text-gray-500 text-center">
                              {step.description || 'No description provided.'}
                            </p>
                          </>
                        )}
                        <CheckCircle
                          className="mt-2 text-green-500"
                          size={20}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No roadmap steps added yet.</p>
                  )}
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section>
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold flex-grow">Next Steps</h3>
                {editMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    aria-label="Save next steps"
                  >
                    <Save className="h-5 w-5" />
                  </Button>
                )}
              </div>
              {editMode ? (
                <Textarea
                  value={localProject.nextSteps}
                  onChange={e =>
                    setLocalProject({
                      ...localProject,
                      nextSteps: e.target.value
                    })
                  }
                  className="w-full min-h-[150px] text-gray-600"
                />
              ) : (
                <p className="text-gray-600">{localProject.nextSteps}</p>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
