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
    // Check both roles and permissions
    const hasAllRoles = user.roles && hasAll.every(r => user.roles?.includes(r));
    const hasAllPerms = user.permissions && hasAll.every(p => user.permissions?.includes(p));
    if (!hasAllRoles && !hasAllPerms) {
      return <>{fallback}</>;
    }
  }
  if (hasAnyRole && hasAnyRole.length > 0) {
    // Check both roles and permissions
    const hasAnyRoleMatch = user.roles && hasAnyRole.some(r => user.roles?.includes(r));
    const hasAnyPermMatch = user.permissions && hasAnyRole.some(p => user.permissions?.includes(p));
    if (!hasAnyRoleMatch && !hasAnyPermMatch) {
      return <>{fallback}</>;
    }
  }
  return <>{children}</>;
}
