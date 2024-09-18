import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchApplicantsByCompany,
  fetchMembersByCompany,
  procesAcceptApplicant,
  procesDenyingApplicant,
  addMember,
  removeApplicant,
  rejectApplicant,
  acceptApplicant,
  resetApplicantStatusToPending,
  updateApplicantCount,
} from "@/app/slices/companySlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function CompanyMembers(props: { uuid: string }) {
  const dispatch = useAppDispatch();
  const applicants = useAppSelector((state) => state.company.applicants);
  const members = useAppSelector((state) => state.company.members);
  const applicantCount = useAppSelector(
    (state) => state.company.applicantCount
  );
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [denialReasons, setDenialReasons] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const availableRoles = ["Developer", "Designer", "Manager", "Other"];

  const handleDenialReasonChange = (index: number, value: string) => {
    setDenialReasons((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // Handle accept logic, first accept the applicant and add role, then handle accept and finish off.
  const handleAcceptApplicant = (index: number) => {
    setSelectedRole("");
    dispatch(acceptApplicant(applicants[index].uuid));
  };

  const handleAccept = (index: number) => {
    console.log("Confirming acceptance of ", applicants[index]);
    dispatch(
      procesAcceptApplicant({
        uuid: props.uuid,
        userUuid: applicants[index].uuid,
        role: selectedRole,
      })
    );
    dispatch(addMember(applicants[index]));
    dispatch(removeApplicant(applicants[index].uuid));
    dispatch(updateApplicantCount());
  };

  // Handle denial logic, first deny the applicant and add reason, then handle denial and finish off.
  const handleDenyApplicant = (index: number) => {
    dispatch(rejectApplicant(applicants[index].uuid));
  };

  const handleDenial = (index: number) => {
    console.log("Denying applicant", applicants[index].name);
    dispatch(
      procesDenyingApplicant({
        uuid: props.uuid,
        userUuid: applicants[index].uuid,
      })
    );
    dispatch(removeApplicant(applicants[index].uuid));
    dispatch(updateApplicantCount());
  };

  // Fetch applicants and members on initial render and reset everything when modal is closed.
  useEffect(() => {
    dispatch(fetchApplicantsByCompany(props.uuid));
    dispatch(fetchMembersByCompany(props.uuid));
    if (!showApplicantsModal) {
      dispatch(resetApplicantStatusToPending());
      setDenialReasons([]);
      setSelectedRole("");
    }
  }, [dispatch, props.uuid, showApplicantsModal]);

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
                placeholder="Search members..."
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-2"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Invite
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Addresses
                      </Label>
                      <Textarea
                        id="email"
                        placeholder="Enter email addresses separated by commas"
                        className="mt-1 h-20"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Invite</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </form>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-2xl md:text-3xl">Members</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApplicantsModal(true)}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Applicants ({applicantCount})
            </Button>
          </div>
        </div>
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link
                      to="#"
                      className="flex items-center gap-3 font-medium"
                    >
                      <Avatar className="w-8 h-8 border">
                        <AvatarImage src={member.pictureUrl} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>{member.name}</div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to="#" className="text-blue-600 underline">
                      {member.email}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>+1 (555) 555-5555</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="px-2 py-1 rounded-full">
                      Developer
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" className="px-2 py-1 rounded-full">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <FilePenIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Dialog open={showApplicantsModal} onOpenChange={setShowApplicantsModal}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <DialogTitle>Applicants</DialogTitle>
                <DialogDescription>
                  There are currently {applicantCount} applicants.
                </DialogDescription>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowApplicantsModal(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-4">
                {applicants &&
                  applicants.map((applicant, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-10 h-10 border">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>
                              {applicant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{applicant.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {applicant.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleAcceptApplicant(index)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleDenyApplicant(index)}
                          >
                            Deny
                          </Button>
                        </div>
                      </div>
                      {applicants[index].status === "DENIED" && (
                        <div className="flex items-center gap-2">
                          <Label
                            htmlFor={`denial-reason-${index}`}
                            className="text-sm font-medium"
                          >
                            Reason for Denial:
                          </Label>
                          <Textarea
                            id={`denial-reason-${index}`}
                            placeholder="Enter reason for denial"
                            value={denialReasons[index] || ""}
                            onChange={(e) =>
                              handleDenialReasonChange(index, e.target.value)
                            }
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            onClick={() => handleDenial(index)}
                          >
                            Send
                          </Button>
                        </div>
                      )}
                      {applicants[index].status === "ACCEPTED" && (
                        <div className="flex items-center gap-2">
                          <Label htmlFor="role" className="text-sm font-medium">
                            Select Role:
                          </Label>
                          <div className="w-full max-w-xs space-y-4">
                            <Select
                              defaultValue=""
                              onValueChange={setSelectedRole}
                              value={selectedRole}
                            >
                              <SelectTrigger className="w-3/4">
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableRoles.map((role) => (
                                  <SelectItem key={role} value={role}>
                                    {role}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => handleAccept(index)}
                          >
                            Send
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              {applicantCount === 0 && (
                <DialogDescription>
                  There are currently no applicants.
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
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

function HomeIcon(props) {
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

function Package2Icon(props) {
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

function PackageIcon(props) {
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

function PlusIcon(props) {
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

function SearchIcon(props) {
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

function SettingsIcon(props) {
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

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UsersIcon(props) {
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

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
