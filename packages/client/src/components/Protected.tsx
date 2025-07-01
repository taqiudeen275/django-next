// Enhanced Protected component for RBAC - PRD Compliant
import React from 'react';
import { useAuth } from '../auth';

interface ProtectedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  // PRD-specified props (exact API from PRD)
  hasAll?: string[];      // User must have ALL specified permissions
  hasAnyRole?: string[];  // User must have AT LEAST ONE of the specified roles
}

export function Protected({
  children,
  fallback = <div>Access denied</div>,
  hasAll,
  hasAnyRole,
}: ProtectedProps) {
  const {
    isAuthenticated,
    isLoading,
    hasPermission,
    hasAnyRole: hasAnyRoleAuth,
  } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  // PRD Logic: hasAll - User must have ALL specified permissions
  if (hasAll && hasAll.length > 0) {
    const hasAllPermissions = hasAll.every(permission => hasPermission(permission));
    if (!hasAllPermissions) {
      return <>{fallback}</>;
    }
  }

  // PRD Logic: hasAnyRole - User must have AT LEAST ONE of the specified roles
  if (hasAnyRole && hasAnyRole.length > 0) {
    const hasAnyOfTheRoles = hasAnyRoleAuth(hasAnyRole);
    if (!hasAnyOfTheRoles) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

// Convenience components for common patterns using PRD-compliant API
export function RequireAuth({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  // RequireAuth just checks authentication (no specific permissions/roles)
  return (
    <Protected fallback={fallback}>
      {children}
    </Protected>
  );
}

export function RequireRole({
  role,
  children,
  fallback
}: {
  role: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Protected hasAnyRole={[role]} fallback={fallback}>
      {children}
    </Protected>
  );
}

export function RequirePermission({
  permission,
  children,
  fallback
}: {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Protected hasAll={[permission]} fallback={fallback}>
      {children}
    </Protected>
  );
}

export function RequireStaff({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const { user } = useAuth();

  if (!user?.is_staff) {
    return <>{fallback || <div>Staff access required</div>}</>;
  }

  return <>{children}</>;
}

export function RequireSuperuser({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const { user } = useAuth();

  if (!user?.is_superuser) {
    return <>{fallback || <div>Superuser access required</div>}</>;
  }

  return <>{children}</>;
}
