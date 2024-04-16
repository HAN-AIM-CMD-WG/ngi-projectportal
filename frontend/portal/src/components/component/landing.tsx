import { Button } from '@/components/ui/button';
import { Project } from './project';
import { Navbar } from './navbar';
import { ProjectList } from './project-list.tsx';
import { UserList } from './user-list.tsx';
import { useAppSelector } from '@/app/hooks.ts';

export function Landing() {
  const roles = useAppSelector(state => state.auth.roles);

  return (
    <div key="1">
      <Navbar />
      <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32 relative">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Projojo
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Start creating your projects easily and efficiently.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="default">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      {roles.includes('ROLE_OPDRACHTGEVER') && (
        <>
          <section className="w-full py-6">
            <div className="container flex flex-wrap md:flex-nowrap px-4 md:px-6">
              <div className="w-full md:w-2/3 md:pr-4">
                <Project />
              </div>
              <div className="w-full md:w-1/3 md:pl-4">
                <UserList />
              </div>
            </div>
          </section>
          <section className="w-full py-6">
            <div className="container px-4 md:px-6">
              <ProjectList />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
