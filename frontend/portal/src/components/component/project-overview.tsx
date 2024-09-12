import React, { useEffect, useState } from 'react';
import { Navbar } from './navbar';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useParams } from 'react-router-dom';
import { fetchProject } from '@/app/slices/projectSlice';
import { ProjectHome } from './project-home';
import { TaskManager } from './task-manager';

type SelectedItem = 'Home' | 'Tasks' | 'Members' | 'Projects' | 'Settings';

export const ProjectOveriew: React.FC = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(state => state.project.currentProject);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>('Home');

  const { projectUuid } = useParams<{ projectUuid: string }>(); // Extract projectUuid from URL

  useEffect(() => {
    if (projectUuid) {
      dispatch(fetchProject(projectUuid)); // Fetch project using the UUID from the URL
    }
  }, [dispatch, projectUuid]);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <MainContent selectedItem={selectedItem} />
      </div>
    </div>
  );
};

type SidebarProps = {
  selectedItem: SelectedItem;
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem>>;
};

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, setSelectedItem }) => (
  <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" to="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">Acme Inc</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          <SidebarLink
            label="Home"
            selected={selectedItem === 'Home'}
            onClick={() => setSelectedItem('Home')}
            Icon={HomeIcon}
          />
          <SidebarLink
            label="Tasks"
            selected={selectedItem === 'Tasks'}
            onClick={() => setSelectedItem('Tasks')}
            Icon={PackageIcon}
          />
          <SidebarLink
            label="Members"
            selected={selectedItem === 'Members'}
            onClick={() => setSelectedItem('Members')}
            Icon={UsersIcon}
          />
          <SidebarLink
            label="Designs"
            selected={selectedItem === 'Projects'}
            onClick={() => setSelectedItem('Projects')}
            Icon={PackageIcon}
          />
          <SidebarLink
            label="Settings"
            selected={selectedItem === 'Settings'}
            onClick={() => setSelectedItem('Settings')}
            Icon={SettingsIcon}
          />
        </nav>
      </div>
    </div>
  </div>
);

type SidebarLinkProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
  label,
  selected,
  onClick,
  Icon
}) => (
  <Link
    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
      selected
        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
        : 'text-gray-500'
    } transition-all hover:text-gray-900 dark:hover:text-gray-50`}
    onClick={onClick}
    to="#"
  >
    <Icon className="h-4 w-4" />
    {label}
  </Link>
);

type MainContentProps = {
  selectedItem: SelectedItem;
};

const MainContent: React.FC<MainContentProps> = ({ selectedItem }) => (
  <>
    {selectedItem === 'Home' && <ProjectHome />}
    {selectedItem === 'Tasks' && <TaskManager />}
    {/* {selectedItem === 'Members' && <CompanyMembers uuid={userCompany[0]} />}
    {selectedItem === 'Projects' && <CompanyProjects uuid={userCompany[0]} />}
    {selectedItem === 'Settings' && <CompanySettings />} */}
  </>
);

// SVG Icon components
const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
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
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const Package2Icon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
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
