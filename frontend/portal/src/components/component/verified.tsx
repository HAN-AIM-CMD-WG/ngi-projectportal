import { useAppDispatch, useAppSelector } from '@/app/hooks';
import React, { useEffect } from 'react';
import { verifyUser } from '@/app/slices/userSlice';
import { Loading } from './loading';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Verified() {
  const { verificationStatus } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const { email } = useParams();

  useEffect(() => {
    if (email) {
      dispatch(verifyUser(email));
    }
  }, [dispatch, email]);

  let content;

  if (verificationStatus === null || verificationStatus === 'PENDING') {
    return <Loading />;
  }

  switch (verificationStatus) {
    case 'SUCCESS':
      content = (
        <>
          <div className="flex flex-col items-center space-y-2">
            <CheckCircleIcon className="h-12 w-12" />
            <h1 className="text-3xl font-bold">Verification Successful</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You have been successfully verified.
            </p>
            <Link to="/">
              <Button className="mt-4">Click here to return!</Button>
            </Link>
          </div>
        </>
      );
      break;
    case 'ALREADY_VERIFIED':
      content = (
        <>
          <div className="flex flex-col items-center space-y-2">
            <CheckCircleIcon className="h-12 w-12 text-green-500 dark:text-green-400" />
            <h1 className="text-3xl font-bold">Already Verified</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your account is already verified.
            </p>
            <Link to="/">
              <Button className="mt-4">Click here to return!</Button>
            </Link>
          </div>
        </>
      );
      break;
    case 'ERROR':
      content = (
        <>
          <div className="flex flex-col items-center space-y-2">
            <XCircleIcon className="h-12 w-12 text-red-500 dark:text-red-400" />
            <h1 className="text-3xl font-bold">Verification Unsuccessful</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              There was a problem verifying your account.
            </p>
            <Link className="" to="/">
              <Button className="mt-4">Click here to return!</Button>
            </Link>
          </div>
        </>
      );
      break;
    default:
      content = <Loading />;
      break;
  }

  return (
    <div className="flex justify-center items-start pt-32 h-screen">
      <div className="text-center">{content}</div>
    </div>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function XCircleIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
