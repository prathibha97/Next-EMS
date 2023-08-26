import { useSession } from 'next-auth/react';

export const useUserRole = (allowedRoles: string[]) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    // You might want to redirect or handle unauthorized access
    // For example, redirect to a login page or show an unauthorized message
  }

  return userRole;
};
