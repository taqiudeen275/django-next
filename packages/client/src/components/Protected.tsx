// Protected component for RBAC placeholder
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
  // ...RBAC logic placeholder...
  return user ? <>{children}</> : <>{fallback}</>;
}
