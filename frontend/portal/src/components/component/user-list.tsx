import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getParticipiants } from '@/app/slices/userSlice';
import { useEffect } from 'react';

export function UserList() {
  const dispatch = useAppDispatch();
  const { participants, isLoading, error } = useAppSelector(
    state => state.users
  );

  useEffect(() => {
    dispatch(getParticipiants());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid w-full max-w-sm gap-4 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      {participants.map((user, index) => (
        <div key={index} className="flex items-center gap-4">
          <img
            alt="User"
            className="rounded-full"
            src={user.pictureUrl || '/placeholder.svg'}
            style={{
              aspectRatio: '40/40',
              objectFit: 'cover'
            }}
            width="40"
            height="40"
          />
          <div className="flex-1">
            <h3 className="text-sm font-semibold leading-none">{user.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
