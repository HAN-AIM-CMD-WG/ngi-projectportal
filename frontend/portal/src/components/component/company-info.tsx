import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  CheckIcon,
  GlobeIcon,
  LocateIcon,
  MailIcon,
  Package2Icon,
  PhoneIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function CompanyInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: "Acme Inc",
    description: "Software Development Company",
    address: "123 Main St, Anytown USA 12345",
    website: "www.acme.com",
    phone: "+1 (555) 555-5555",
    email: "info@acme.com",
  });
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleInputChange = (e) => {
    setCompanyInfo({
      ...companyInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-6">
        {isEditing ? (
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-12 md:w-14 dark:bg-gray-800">
                <Package2Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-2xl md:text-3xl">
                  {companyInfo.name}
                </div>
                <Input
                  name="description"
                  value={companyInfo.description}
                  onChange={handleInputChange}
                  className="text-sm text-gray-500 dark:text-gray-400"
                />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handleSave}>
                  <CheckIcon className="h-4 w-4" />
                  <span className="sr-only">Save</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handleCancel}>
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Cancel</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                <LocateIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <Input
                  name="address"
                  value={companyInfo.address}
                  onChange={handleInputChange}
                  className="font-medium"
                />
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Headquarters
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                <GlobeIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <Input
                  name="website"
                  value={companyInfo.website}
                  onChange={handleInputChange}
                  className="font-medium text-blue-600 underline"
                />
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Company website
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                <PhoneIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <Input
                  name="phone"
                  value={companyInfo.phone}
                  onChange={handleInputChange}
                  className="font-medium"
                />
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Main phone number
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                <MailIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <Input
                  name="email"
                  value={companyInfo.email}
                  onChange={handleInputChange}
                  className="font-medium text-blue-600 underline"
                />
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  General inquiries
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-12 md:w-14 dark:bg-gray-800">
                <Package2Icon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-semibold text-2xl md:text-3xl">
                  {companyInfo.name}
                </h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {companyInfo.description}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handleEdit}>
                  <FilePenIcon className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                <LocateIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">{companyInfo.address}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Headquarters
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                <GlobeIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">
                  <Link
                    to={companyInfo.website}
                    className="text-blue-600 underline"
                  >
                    {companyInfo.website}
                  </Link>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Company website
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                <PhoneIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">{companyInfo.phone}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Main phone number
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 rounded-md flex items-center justify-center aspect-square w-10 md:w-12 dark:bg-gray-800">
                <MailIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">
                  <Link
                    to={"mailto:" + companyInfo.email}
                    className="text-blue-600 underline"
                  >
                    {companyInfo.email}
                  </Link>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  General inquiries
                </div>
              </div>
            </div>
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>About Acme Inc</CardTitle>
            <CardDescription>
              Learn more about the company and its history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose">
              <p>
                Acme Inc is a leading software development company that has been
                providing innovative solutions to businesses of all sizes for
                over 20 years. Founded in 2001, the company has grown to become
                a trusted partner for organizations looking to streamline their
                operations, improve efficiency, and stay ahead of the
                competition.
              </p>
              <p>
                With a team of highly skilled engineers, designers, and project
                managers, Acme Inc offers a wide range of services, including
                custom software development, web design, mobile app development,
                and cloud-based solutions. The company's commitment to
                excellence and customer satisfaction has earned it a reputation
                as one of the top technology providers in the industry.
              </p>
              <p>
                Acme Inc's success is built on a foundation of innovation,
                collaboration, and a deep understanding of the ever-evolving
                technology landscape. The company continuously invests in
                research and development to ensure that its solutions remain
                cutting-edge and responsive to the needs of its clients.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
            <CardDescription>
              Explore the company's key performance indicators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="grid gap-1">
                <div className="text-2xl font-bold">250+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Employees
                </div>
              </div>
              <div className="grid gap-1">
                <div className="text-2xl font-bold">$50M+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Annual Revenue
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}
