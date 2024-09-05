import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  CalendarDays,
  Clock,
  Link2,
  MoreVertical,
  Users,
  Paperclip,
  MessageSquare,
  Edit2,
  Check,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { fetchProject } from '@/app/slices/projectSlice';
import { useAppDispatch } from '@/app/hooks';
import { useParams } from 'react-router-dom';

export function ProjectDetail() {
  // Placeholder data
  const [project, setProject] = useState({
    title: 'Website Redesign',
    status: 'In Progress',
    description:
      'Redesigning the company website to improve user experience and conversion rates.',
    progress: 65,
    dueDate: '2023-12-31',
    teamSize: 5,
    client: 'Acme Corp',
    budget: '$50,000',
    tasks: [
      {
        id: 1,
        title: 'Wireframing',
        status: 'Completed',
        description: 'Create low-fidelity wireframes for all main pages',
        assignee: 'John Doe',
        dueDate: '2023-06-10',
        subtasks: [
          { id: 11, title: 'Homepage wireframe', completed: true },
          { id: 12, title: 'Product page wireframe', completed: true },
          { id: 13, title: 'Checkout process wireframe', completed: true }
        ]
      },
      {
        id: 2,
        title: 'UI Design',
        status: 'In Progress',
        description:
          'Design high-fidelity mockups based on approved wireframes',
        assignee: 'Jane Smith',
        dueDate: '2023-07-15',
        subtasks: [
          { id: 21, title: 'Design system creation', completed: true },
          { id: 22, title: 'Homepage design', completed: true },
          { id: 23, title: 'Inner pages design', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Frontend Development',
        status: 'Not Started',
        description: 'Implement the designed UI using React and Next.js',
        assignee: 'Bob Johnson',
        dueDate: '2023-08-31',
        subtasks: [
          { id: 31, title: 'Set up project structure', completed: false },
          { id: 32, title: 'Implement components', completed: false },
          { id: 33, title: 'Integrate with backend API', completed: false }
        ]
      },
      {
        id: 4,
        title: 'Backend Integration',
        status: 'Not Started',
        description: 'Connect frontend with backend services and APIs',
        assignee: 'Alice Brown',
        dueDate: '2023-09-30',
        subtasks: [
          { id: 41, title: 'Design API endpoints', completed: false },
          { id: 42, title: 'Implement authentication', completed: false },
          { id: 43, title: 'Set up database models', completed: false }
        ]
      }
    ],
    teamMembers: [
      {
        id: 1,
        name: 'John Doe',
        avatar: '/placeholder.svg?height=32&width=32'
      },
      {
        id: 2,
        name: 'Jane Smith',
        avatar: '/placeholder.svg?height=32&width=32'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        avatar: '/placeholder.svg?height=32&width=32'
      },
      {
        id: 4,
        name: 'Alice Brown',
        avatar: '/placeholder.svg?height=32&width=32'
      }
    ],
    designs: [
      {
        id: 1,
        title: 'Homepage Mockup',
        image: '/placeholder.svg?height=200&width=300'
      },
      {
        id: 2,
        title: 'Mobile App Design',
        image: '/placeholder.svg?height=200&width=300'
      }
    ],
    wiki: 'This is the project wiki. You can add important information, guidelines, and documentation here.',
    comments: [
      {
        id: 1,
        user: 'John Doe',
        text: 'Great progress on the wireframes!',
        timestamp: '2023-06-15 09:30'
      },
      {
        id: 2,
        user: 'Jane Smith',
        text: "I've updated the UI designs. Please review.",
        timestamp: '2023-06-16 14:45'
      }
    ],
    files: [
      { id: 1, name: 'project_brief.pdf', size: '2.5 MB' },
      { id: 2, name: 'design_assets.zip', size: '15 MB' }
    ]
  });

  const [editingWiki, setEditingWiki] = useState(false);
  const [wikiContent, setWikiContent] = useState(project.wiki);
  const [newComment, setNewComment] = useState('');
  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);

  const dispatch = useAppDispatch();
  const { projectUuid } = useParams<{ projectUuid: string }>(); // Extract projectUuid from URL

  useEffect(() => {
    if (projectUuid) {
      dispatch(fetchProject(projectUuid)); // Fetch project using the UUID from the URL
    }
  }, [dispatch, projectUuid]);

  const handleWikiSave = () => {
    setProject(prev => ({ ...prev, wiki: wikiContent }));
    setEditingWiki(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: project.comments.length + 1,
        user: 'Current User',
        text: newComment,
        timestamp: new Date().toLocaleString()
      };
      setProject(prev => ({
        ...prev,
        comments: [...prev.comments, newCommentObj]
      }));
      setNewComment('');
    }
  };

  const toggleTaskExpansion = (taskId: number) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
          <Badge
            variant={project.status === 'In Progress' ? 'default' : 'secondary'}
          >
            {project.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <CardDescription className="mt-2">
            {project.description}
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between mb-1 text-sm font-medium">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="designs">Designs</TabsTrigger>
              <TabsTrigger value="wiki">Wiki</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.tasks.map(task => (
                      <Collapsible
                        key={task.id}
                        open={expandedTasks.includes(task.id)}
                        onOpenChange={() => toggleTaskExpansion(task.id)}
                      >
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between p-2 bg-neutral-100 hover:bg-neutral-100/80 rounded-md cursor-pointer dark:bg-neutral-800 dark:hover:bg-neutral-800/80">
                            <span>{task.title}</span>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  task.status === 'Completed'
                                    ? 'default'
                                    : 'secondary'
                                }
                              >
                                {task.status}
                              </Badge>
                              {expandedTasks.includes(task.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-2 bg-neutral-100/50 rounded-md mt-1 dark:bg-neutral-800/50">
                          <div className="space-y-2">
                            <p className="text-sm">{task.description}</p>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="font-medium">Assignee:</span>
                              <span>{task.assignee}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <span className="font-medium">Due Date:</span>
                              <span>{task.dueDate}</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-sm font-medium">
                                Subtasks:
                              </span>
                              <ul className="list-disc list-inside text-sm">
                                {task.subtasks.map(subtask => (
                                  <li
                                    key={subtask.id}
                                    className={
                                      subtask.completed ? 'line-through' : ''
                                    }
                                  >
                                    {subtask.title}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="designs">
              <Card>
                <CardHeader>
                  <CardTitle>Design Previews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.designs.map(design => (
                      <div key={design.id} className="space-y-2">
                        <img
                          src={design.image}
                          alt={design.title}
                          className="rounded-md w-full"
                        />
                        <p className="text-sm font-medium">{design.title}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="wiki">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Project Wiki</CardTitle>
                  {!editingWiki && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingWiki(true)}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {editingWiki ? (
                    <div className="space-y-2">
                      <Textarea
                        value={wikiContent}
                        onChange={e => setWikiContent(e.target.value)}
                        rows={10}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" onClick={handleWikiSave}>
                          <Check className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingWiki(false)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{project.wiki}</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comments">
              <Card>
                <CardHeader>
                  <CardTitle>Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.comments.map(comment => (
                      <div
                        key={comment.id}
                        className="bg-neutral-100 p-3 rounded-md dark:bg-neutral-800"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{comment.user}</span>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                      />
                      <Button onClick={handleAddComment}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">Due Date: {project.dueDate}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">Team Size: {project.teamSize}</span>
              </div>
              <div className="flex items-center">
                <Link2 className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">Client: {project.client}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">Budget: {project.budget}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.teamMembers.map(member => (
                  <Avatar key={member.id}>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split("'")
                        .map(n => n[0])
                        .join("''")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <Button variant="outline" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.files.map(file => (
                  <li
                    key={file.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Paperclip className="mr-2 h-4 w-4 opacity-70" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {file.size}
                    </span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-4">
                <Paperclip className="mr-2 h-4 w-4" />
                Add File
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Edit Project</Button>
              <Button variant="outline" className="w-full">
                Share
              </Button>
              <Button variant="secondary" className="w-full">
                <MoreVertical className="mr-2 h-4 w-4" />
                More Options
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
