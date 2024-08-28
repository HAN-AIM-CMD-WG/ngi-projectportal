import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchProjectByCompany } from '@/app/slices/companySlice';
interface CompanyProjectsProps {
  uuid: string;
}
import { ProjectList } from './project-list';

export function CompanyProjects(props: CompanyProjectsProps) {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(state => state.company.projects);
  console.log(projects);

  useEffect(() => {
    dispatch(fetchProjectByCompany(props.uuid));
  }, [dispatch, props]);
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link to="#" className="lg:hidden">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              />
            </div>
          </form>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="font-semibold text-2xl md:text-3xl">Projects</h1>
          <Button className="ml-auto" size="sm">
            Add Project
          </Button>
        </div>
        <div className="grid gap-6">
          <ProjectList />
        </div>
      </main>
    </div>
  );
}

function Package2Icon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
