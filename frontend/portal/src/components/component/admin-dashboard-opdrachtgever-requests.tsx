import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    pictureUrl: "/placeholder.svg",
    company: "Tech Corp",
    role: "Developer",
    telephone: "+1234567890",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    pictureUrl: "/placeholder.svg",
    company: "Design Inc",
    role: "Designer",
    telephone: "+2345678901",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    pictureUrl: "/placeholder.svg",
    company: "Marketing Pro",
    role: "Marketer",
    telephone: "+3456789012",
  },
];

export default function Component() {
  const [users, setUsers] = useState(mockUsers);

  const handleApprove = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    // In a real application, you would also make an API call to update the user's status
    console.log(`Approved user with ID: ${userId}`);
  };

  const handleDeny = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    // In a real application, you would also make an API call to update the user's status
    console.log(`Denied user with ID: ${userId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Pending Opdrachtgever Requests
          </h1>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="bg-white border shadow-sm rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Telephone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="w-[40px] h-9">
                      <AvatarImage
                        alt={`${user.name}'s avatar`}
                        src={user.pictureUrl}
                      />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{user.name}</span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.telephone}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleApprove(user.id)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleDeny(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Deny
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
