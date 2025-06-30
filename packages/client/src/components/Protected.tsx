// Enhanced Protected component for RBAC
import React from 'react';
import { useAuth } from '../auth';

interface ProtectedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
  requireAuth?: boolean;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  requireAllRoles?: boolean;
  requireAllPermissions?: boolean;
  onAccessDenied?: () => void;
  // Legacy props for backward compatibility
  hasAll?: string[];
  hasAnyRole?: string[];
}

export function Protected({
  children,
  fallback = <div>Access denied</div>,
  loadingFallback = <div>Loading...</div>,
  requireAuth = true,
  requiredRoles = [],
  requiredPermissions = [],
  requireAllRoles = false,
  requireAllPermissions = true,
  onAccessDenied,
  // Legacy props
  hasAll,
  hasAnyRole,
}: ProtectedProps) {
  const {
    isAuthenticated,
    isLoading,
    user,
    hasPermission,
    hasRole,
    hasAnyRole: hasAnyRoleAuth,
    hasAllRoles
  } = useAuth();

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (requireAuth && !isAuthenticated) {
    onAccessDenied?.();
    return <>{fallback}</>;
  }

  // Legacy support for hasAll and hasAnyRole props
  if (hasAll && hasAll.length > 0) {
    const hasAllRoles = user?.roles && hasAll.every(r => user.roles?.includes(r));
    const hasAllPerms = user?.permissions && hasAll.every(p => user.permissions?.includes(p));
    if (!hasAllRoles && !hasAllPerms) {
      onAccessDenied?.();
      return <>{fallback}</>;
    }
  }

  if (hasAnyRole && hasAnyRole.length > 0) {
    const hasAnyRoleMatch = user?.roles && hasAnyRole.some(r => user.roles?.includes(r));
    const hasAnyPermMatch = user?.permissions && hasAnyRole.some(p => user.permissions?.includes(p));
    if (!hasAnyRoleMatch && !hasAnyPermMatch) {
      onAccessDenied?.();
      return <>{fallback}</>;
    }
  }

  // New role checking logic
  if (requiredRoles.length > 0) {
    const roleCheck = requireAllRoles
      ? hasAllRoles(requiredRoles)
      : hasAnyRoleAuth(requiredRoles);

    if (!roleCheck) {
      onAccessDenied?.();
      return <>{fallback}</>;
    }
  }

  // New permission checking logic
  if (requiredPermissions.length > 0) {
    const permissionCheck = requireAllPermissions
      ? requiredPermissions.every(permission => hasPermission(permission))
      : requiredPermissions.some(permission => hasPermission(permission));

    if (!permissionCheck) {
      onAccessDenied?.();
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

// Convenience components for common patterns
export function RequireAuth({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <Protected requireAuth={true} fallback={fallback}>
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
    <Protected requiredRoles={[role]} fallback={fallback}>
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
    <Protected requiredPermissions={[permission]} fallback={fallback}>
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
