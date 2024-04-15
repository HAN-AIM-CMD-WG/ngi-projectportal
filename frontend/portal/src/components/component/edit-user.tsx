/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { editUser } from '@/app/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatuses } from '@/app/slices/userSlice';

export function EditUser({ user }: { user: any }) {
  const dispatch = useDispatch();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [userStatus, setStatus] = useState<string[]>(user.status);
  const { availableStatus } = useSelector((state: any) => state.users);
  const updatedUser = useSelector((state: { users: { users: any[] } }) =>
    state.users.users.find((u: { email: string }) => u.email === user.email)
  );
  const selectedStatusText =
    userStatus.length > 0 ? userStatus.join(', ') : 'Select status';

  useEffect(() => {
    if (!availableStatus) dispatch(fetchStatuses() as any);
  }, [availableStatus, dispatch]);

  useEffect(() => {
    if (updatedUser) {
      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setStatus(updatedUser.status);
    }
  }, [updatedUser]);

  const closeDialog = () => {
    setName(user.name);
    setEmail(user.email);
    setStatus(user.status);
    setDialogOpen(false);
  };

  const updateUser = async () => {
    try {
      dispatch(
        editUser({ email: user.email, name, status: userStatus }) as any
      );
      closeDialog();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <FileEditIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>Edit User</DialogTitle>
          <Button
            className="material-icons bg-white text-gray-400 hover:text-gray-500"
            onClick={closeDialog}
          >
            close
          </Button>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullname">Full name</Label>
            <Input
              id="fullname"
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Status</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="text-left">
                  <span
                    className={
                      userStatus.length > 0 ? 'text-black' : 'text-gray-400'
                    }
                  >
                    {selectedStatusText}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white shadow-md border border-gray-200">
                {availableStatus?.map((dropdownStatus: any) => (
                  <DropdownMenuCheckboxItem
                    key={dropdownStatus.name}
                    checked={userStatus.includes(dropdownStatus.name)}
                    onCheckedChange={() => {
                      if (userStatus.includes(dropdownStatus.name)) {
                        setStatus(prevStatus =>
                          prevStatus.filter(
                            status => status !== dropdownStatus.name
                          )
                        );
                      } else {
                        setStatus(prevStatus => [
                          ...prevStatus,
                          dropdownStatus.name
                        ]);
                      }
                    }}
                  >
                    <DropdownMenuLabel>{dropdownStatus.name}</DropdownMenuLabel>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" onClick={updateUser}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FileEditIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}
