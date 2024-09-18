import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { Link } from "react-router-dom";
import {
  fetchCompanyData,
  fetchApplicantsByCompany,
} from "@/app/slices/companySlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { CompanyHome } from "./company-home";
import { CompanyInfo } from "./company-info";
import { CompanyMembers } from "./company-members";
import { CompanyProjects } from "./company-projects";
import { CompanySettings } from "./company-settings";

export function CompanyDetail() {
  const dispatch = useAppDispatch();
  const userCompany = useAppSelector((state) => state.auth.company);
  const [selectedItem, setSelectedItem] = useState("Home");
  useEffect(() => {
    dispatch(fetchCompanyData(userCompany[0]));
    dispatch(fetchApplicantsByCompany(userCompany[0]));
  }, [dispatch, userCompany]);

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
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${
                    selectedItem === "Home"
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setSelectedItem("Home")}
                  to="#"
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>

                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${
                    selectedItem === "Info"
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setSelectedItem("Info")}
                  to="#"
                >
                  <PackageIcon className="h-4 w-4" />
                  Company Info
                </Link>

                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${
                    selectedItem === "Members"
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setSelectedItem("Members")}
                  to="#"
                >
                  <UsersIcon className="h-4 w-4" />
                  Members
                </Link>

                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${
                    selectedItem === "Projects"
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setSelectedItem("Projects")}
                  to="#"
                >
                  <PackageIcon className="h-4 w-4" />
                  Projects
                </Link>

                <Link
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${
                    selectedItem === "Settings"
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  onClick={() => setSelectedItem("Settings")}
                  to="#"
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <>
          {selectedItem === "Home" && <CompanyHome uuid={userCompany[0]} />}
          {selectedItem === "Info" && <CompanyInfo />}
          {selectedItem === "Members" && (
            <CompanyMembers uuid={userCompany[0]} />
          )}
          {selectedItem === "Projects" && (
            <CompanyProjects uuid={userCompany[0]} />
          )}
          {selectedItem === "Settings" && <CompanySettings />}
        </>
      </div>
    </div>
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
