import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import PlaceholderImage from '../../images/placeholder.svg';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Rocket, Star, Zap } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';

export function ProjectHome() {
  const project = useAppSelector(state => state.project.currentProject);

  const roadmapItems = [
    {
      title: 'Project Inception',
      description: 'Initial concept and team formation',
      date: 'January 2023',
      status: 'completed',
      icon: Star
    },
    {
      title: 'Alpha Release',
      description: 'First working prototype',
      date: 'March 2023',
      status: 'completed',
      icon: Rocket
    },
    {
      title: 'Beta Testing',
      description: 'Public beta and user feedback collection',
      date: 'June 2023',
      status: 'inProgress',
      icon: Zap
    },
    {
      title: 'Version 1.0 Launch',
      description: 'Official product launch',
      date: 'September 2023',
      status: 'upcoming',
      icon: CheckCircle
    },
    {
      title: 'Advanced Features',
      description: 'Implementation of AI-driven analytics',
      date: 'December 2023',
      status: 'upcoming',
      icon: Circle
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{project?.title}</h1>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="h-full w-full">
                    <img
                      src={PlaceholderImage}
                      alt="Project Image"
                      className="rounded-lg object-cover w-full h-full"
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Welcome to Our Project
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {project?.description}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                    <li>-</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold mb-6">Project Roadmap</h2>
              <div className="space-y-8">
                {roadmapItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        item.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : item.status === 'inProgress'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {<item.icon className="w-6 h-6" />}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-muted-foreground">
                          {item.date}
                        </span>
                        <Badge
                          className="ml-2"
                          variant={
                            item.status === 'completed'
                              ? 'default'
                              : item.status === 'inProgress'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {item.status === 'completed'
                            ? 'Completed'
                            : item.status === 'inProgress'
                            ? 'In Progress'
                            : 'Upcoming'}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>
              <p className="text-muted-foreground">
                Display a gallery of project images or screenshots here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
              <p className="text-muted-foreground">
                Introduce the team members working on this project.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
