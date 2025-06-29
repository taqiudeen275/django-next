// Protected component for RBAC
import React from 'react';
import { useAuth } from '../auth';

type ProtectedProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  hasAll?: string[];
  hasAnyRole?: string[];
};

export function Protected({ children, fallback = null, hasAll, hasAnyRole }: ProtectedProps) {
  const { user } = useAuth();
  if (!user) return <>{fallback}</>;

  // RBAC logic
  if (hasAll && hasAll.length > 0) {
    if (!user.roles || !hasAll.every(r => user.roles?.includes(r))) {
      return <>{fallback}</>;
    }
  }
  if (hasAnyRole && hasAnyRole.length > 0) {
    if (!user.roles || !hasAnyRole.some(r => user.roles?.includes(r))) {
      return <>{fallback}</>;
    }
  }
  return <>{children}</>;
}
