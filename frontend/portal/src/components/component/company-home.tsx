import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchApplicantsByCompany } from "@/app/slices/companySlice";

export function CompanyHome(props) {
  const dispatch = useAppDispatch();
  const applicantCount = useAppSelector(
    (state) => state.company.applicantCount
  );

  useEffect(() => {
    dispatch(fetchApplicantsByCompany(props.uuid));
  }, [dispatch]);
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link to="#" className="lg:hidden">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
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
            <div>
              <h2 className="text-xl font-semibold">Pending Applicants</h2>
              <p className="text-gray-500 dark:text-gray-400">
                You have {applicantCount} pending applicants.
              </p>
            </div>
          </div>
          <div className="border shadow-sm rounded-lg p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">About Acme Inc</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Acme Inc is a leading provider of innovative products and
                services. We have been in business for over 20 years and have a
                reputation for quality and customer satisfaction.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Our Mission</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Our mission is to provide our customers with the best possible
                products and services. We are committed to continuous
                improvement and innovation to meet the changing needs of our
                customers.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Our Team</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Our team is made up of talented and dedicated individuals who
                are passionate about what they do. We work together to deliver
                the best possible results for our customers.
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
