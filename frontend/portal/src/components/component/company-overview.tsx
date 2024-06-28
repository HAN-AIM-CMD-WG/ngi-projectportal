import React from "react";
import { Navbar } from "./navbar";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CompanyDetail() {
  return (
    <div className="">
      <Navbar />
      {/* <Sidebar [] /> */}
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
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
                <Link
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  to="#"
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <PackageIcon className="h-4 w-4" />
                  Company Info
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <UsersIcon className="h-4 w-4" />
                  Members
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <PackageIcon className="h-4 w-4" />
                  Projects
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
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
                    placeholder="Search members..."
                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  />
                </div>
              </form>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-2xl md:text-3xl">
                Welcome to Acme Inc
              </h1>
              <Button variant="outline" size="sm">
                <PlusIcon className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border shadow-sm rounded-lg p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Projects</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    You have 12 active projects.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Tasks</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    You have 24 tasks assigned to you.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Pending Tasks</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    You have 8 pending tasks.
                  </p>
                </div>
              </div>
              <div className="border shadow-sm rounded-lg p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">About Acme Inc</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Acme Inc is a leading provider of innovative products and
                    services. We have been in business for over 20 years and
                    have a reputation for quality and customer satisfaction.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Our Mission</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our mission is to provide our customers with the best
                    possible products and services. We are committed to
                    continuous improvement and innovation to meet the changing
                    needs of our customers.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Our Team</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our team is made up of talented and dedicated individuals
                    who are passionate about what they do. We work together to
                    deliver the best possible results for our customers.
                  </p>
                </div>
              </div>
            </div>
            <div className="border shadow-sm rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Applications Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                  <h3 className="text-lg font-semibold">Project A</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Total Applications: 15
                  </p>
                  <Link
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                    to="#"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                    View Applications
                  </Link>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                  <h3 className="text-lg font-semibold">Project B</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Total Applications: 8
                  </p>
                  <Link
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                    to="#"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                    View Applications
                  </Link>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                  <h3 className="text-lg font-semibold">Project C</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Total Applications: 22
                  </p>
                  <Link
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                    to="#"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                    View Applications
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
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

function PackageIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
