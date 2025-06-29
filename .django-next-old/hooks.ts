// hooks.ts - Generated React Query hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API } from './api';
import * as types from './types';

const api = new API();

export function useApi_academics_assignments_teacher_list(params?: types.paths["/api/academics/assignments/teacher/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_assignments_teacher_list', params], () => api.api_academics_assignments_teacher_list(params));
}

export function useApi_academics_assignments_teacher_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/assignments/teacher/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_assignments_teacher_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_assignments_teacher_create']);
    },
  });
}

export function useApi_academics_assignments_teacher_retrieve(params?: types.paths["/api/academics/assignments/teacher/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_assignments_teacher_retrieve', params], () => api.api_academics_assignments_teacher_retrieve(params));
}

export function useApi_academics_assignments_teacher_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/assignments/teacher/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_academics_assignments_teacher_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_assignments_teacher_update']);
    },
  });
}

export function useApi_academics_assignments_teacher_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/assignments/teacher/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_academics_assignments_teacher_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_assignments_teacher_partial_update']);
    },
  });
}

export function useApi_academics_assignments_teacher_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/assignments/teacher/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_academics_assignments_teacher_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_assignments_teacher_destroy']);
    },
  });
}

export function useApi_academics_attendance_parent_list(params?: types.paths["/api/academics/attendance/parent/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_attendance_parent_list', params], () => api.api_academics_attendance_parent_list(params));
}

export function useApi_academics_attendance_student_list(params?: types.paths["/api/academics/attendance/student/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_attendance_student_list', params], () => api.api_academics_attendance_student_list(params));
}

export function useApi_academics_attendance_teacher_list(params?: types.paths["/api/academics/attendance/teacher/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_attendance_teacher_list', params], () => api.api_academics_attendance_teacher_list(params));
}

export function useApi_academics_attendance_teacher_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/attendance/teacher/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_attendance_teacher_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_attendance_teacher_create']);
    },
  });
}

export function useApi_academics_classes_list(params?: types.paths["/api/academics/classes/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_classes_list', params], () => api.api_academics_classes_list(params));
}

export function useApi_academics_classes_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/classes/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_classes_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_classes_create']);
    },
  });
}

export function useApi_academics_classes_retrieve(params?: types.paths["/api/academics/classes/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_classes_retrieve', params], () => api.api_academics_classes_retrieve(params));
}

export function useApi_academics_classes_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/classes/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_academics_classes_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_classes_update']);
    },
  });
}

export function useApi_academics_classes_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/classes/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_academics_classes_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_classes_partial_update']);
    },
  });
}

export function useApi_academics_classes_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/classes/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_academics_classes_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_classes_destroy']);
    },
  });
}

export function useApi_academics_courses_list(params?: types.paths["/api/academics/courses/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_courses_list', params], () => api.api_academics_courses_list(params));
}

export function useApi_academics_courses_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/courses/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_courses_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_courses_create']);
    },
  });
}

export function useApi_academics_courses_retrieve(params?: types.paths["/api/academics/courses/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_courses_retrieve', params], () => api.api_academics_courses_retrieve(params));
}

export function useApi_academics_courses_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/courses/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_academics_courses_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_courses_update']);
    },
  });
}

export function useApi_academics_courses_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/courses/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_academics_courses_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_courses_partial_update']);
    },
  });
}

export function useApi_academics_courses_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/courses/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_academics_courses_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_courses_destroy']);
    },
  });
}

export function useApi_academics_courses_available_list(params?: types.paths["/api/academics/courses/available/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_courses_available_list', params], () => api.api_academics_courses_available_list(params));
}

export function useApi_academics_enrollments_list(params?: types.paths["/api/academics/enrollments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_enrollments_list', params], () => api.api_academics_enrollments_list(params));
}

export function useApi_academics_enrollments_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/enrollments/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_enrollments_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_enrollments_create']);
    },
  });
}

export function useApi_academics_enrollments_retrieve(params?: types.paths["/api/academics/enrollments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_enrollments_retrieve', params], () => api.api_academics_enrollments_retrieve(params));
}

export function useApi_academics_enrollments_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/enrollments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_academics_enrollments_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_enrollments_destroy']);
    },
  });
}

export function useApi_academics_grade_components_list(params?: types.paths["/api/academics/grade-components/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_grade_components_list', params], () => api.api_academics_grade_components_list(params));
}

export function useApi_academics_grade_components_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/grade-components/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_grade_components_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_grade_components_create']);
    },
  });
}

export function useApi_academics_grade_components_retrieve(params?: types.paths["/api/academics/grade-components/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_grade_components_retrieve', params], () => api.api_academics_grade_components_retrieve(params));
}

export function useApi_academics_grade_components_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/grade-components/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_academics_grade_components_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_grade_components_update']);
    },
  });
}

export function useApi_academics_grade_components_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/grade-components/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_academics_grade_components_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_grade_components_partial_update']);
    },
  });
}

export function useApi_academics_grade_components_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/grade-components/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_academics_grade_components_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_grade_components_destroy']);
    },
  });
}

export function useApi_academics_grades_parent_list(params?: types.paths["/api/academics/grades/parent/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_grades_parent_list', params], () => api.api_academics_grades_parent_list(params));
}

export function useApi_academics_grades_student_list(params?: types.paths["/api/academics/grades/student/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_grades_student_list', params], () => api.api_academics_grades_student_list(params));
}

export function useApi_academics_grades_teacher_list(params?: types.paths["/api/academics/grades/teacher/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_grades_teacher_list', params], () => api.api_academics_grades_teacher_list(params));
}

export function useApi_academics_grades_teacher_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/grades/teacher/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_grades_teacher_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_grades_teacher_create']);
    },
  });
}

export function useApi_academics_grading_scales_list(params?: types.paths["/api/academics/grading-scales/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_grading_scales_list', params], () => api.api_academics_grading_scales_list(params));
}

export function useApi_academics_grading_scales_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/grading-scales/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_grading_scales_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_grading_scales_create']);
    },
  });
}

export function useApi_academics_grading_scales_retrieve(params?: types.paths["/api/academics/grading-scales/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_grading_scales_retrieve', params], () => api.api_academics_grading_scales_retrieve(params));
}

export function useApi_academics_grading_scales_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/grading-scales/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_academics_grading_scales_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_grading_scales_update']);
    },
  });
}

export function useApi_academics_grading_scales_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/grading-scales/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_academics_grading_scales_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_grading_scales_partial_update']);
    },
  });
}

export function useApi_academics_grading_scales_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/grading-scales/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_academics_grading_scales_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_grading_scales_destroy']);
    },
  });
}

export function useApi_academics_lesson_plans_teacher_list(params?: types.paths["/api/academics/lesson-plans/teacher/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_lesson_plans_teacher_list', params], () => api.api_academics_lesson_plans_teacher_list(params));
}

export function useApi_academics_lesson_plans_teacher_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/lesson-plans/teacher/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_lesson_plans_teacher_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_lesson_plans_teacher_create']);
    },
  });
}

export function useApi_academics_lesson_plans_teacher_retrieve(params?: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_lesson_plans_teacher_retrieve', params], () => api.api_academics_lesson_plans_teacher_retrieve(params));
}

export function useApi_academics_lesson_plans_teacher_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_academics_lesson_plans_teacher_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_lesson_plans_teacher_update']);
    },
  });
}

export function useApi_academics_lesson_plans_teacher_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_academics_lesson_plans_teacher_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_lesson_plans_teacher_partial_update']);
    },
  });
}

export function useApi_academics_lesson_plans_teacher_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_academics_lesson_plans_teacher_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_lesson_plans_teacher_destroy']);
    },
  });
}

export function useApi_academics_scores_list(params?: types.paths["/api/academics/scores/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_scores_list', params], () => api.api_academics_scores_list(params));
}

export function useApi_academics_scores_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/scores/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_scores_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_scores_create']);
    },
  });
}

export function useApi_academics_scores_retrieve(params?: types.paths["/api/academics/scores/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_scores_retrieve', params], () => api.api_academics_scores_retrieve(params));
}

export function useApi_academics_scores_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/scores/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_academics_scores_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_scores_update']);
    },
  });
}

export function useApi_academics_scores_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/scores/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_academics_scores_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_scores_partial_update']);
    },
  });
}

export function useApi_academics_scores_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/scores/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_academics_scores_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_scores_destroy']);
    },
  });
}

export function useApi_academics_student_enrollments_list(params?: types.paths["/api/academics/student/enrollments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_student_enrollments_list', params], () => api.api_academics_student_enrollments_list(params));
}

export function useApi_academics_student_enrollments_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/student/enrollments/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_student_enrollments_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_student_enrollments_create']);
    },
  });
}

export function useApi_academics_student_enrollments_retrieve(params?: types.paths["/api/academics/student/enrollments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_academics_student_enrollments_retrieve', params], () => api.api_academics_student_enrollments_retrieve(params));
}

export function useApi_academics_student_enrollments_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/academics/student/enrollments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_academics_student_enrollments_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_academics_student_enrollments_destroy']);
    },
  });
}

export function useApi_accountants_fees_list(params?: types.paths["/api/accountants/fees/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_accountants_fees_list', params], () => api.api_accountants_fees_list(params));
}

export function useApi_accountants_fees_retrieve(params?: types.paths["/api/accountants/fees/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_accountants_fees_retrieve', params], () => api.api_accountants_fees_retrieve(params));
}

export function useApi_accountants_financial_report_list(params?: types.paths["/api/accountants/financial-report/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_accountants_financial_report_list', params], () => api.api_accountants_financial_report_list(params));
}

export function useApi_accountants_payments_list(params?: types.paths["/api/accountants/payments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_accountants_payments_list', params], () => api.api_accountants_payments_list(params));
}

export function useApi_accountants_payments_retrieve(params?: types.paths["/api/accountants/payments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_accountants_payments_retrieve', params], () => api.api_accountants_payments_retrieve(params));
}

export function useApi_auth_login_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/auth/login/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_auth_login_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_auth_login_create']);
    },
  });
}

export function useApi_auth_logout_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/auth/logout/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_auth_logout_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_auth_logout_create']);
    },
  });
}

export function useApi_communications_bulk_messages_list(params?: types.paths["/api/communications/bulk-messages/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_communications_bulk_messages_list', params], () => api.api_communications_bulk_messages_list(params));
}

export function useApi_communications_bulk_messages_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/communications/bulk-messages/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_communications_bulk_messages_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_communications_bulk_messages_create']);
    },
  });
}

export function useApi_communications_bulk_messages_retrieve(params?: types.paths["/api/communications/bulk-messages/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_communications_bulk_messages_retrieve', params], () => api.api_communications_bulk_messages_retrieve(params));
}

export function useApi_communications_bulk_messages_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/communications/bulk-messages/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_communications_bulk_messages_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_communications_bulk_messages_update']);
    },
  });
}

export function useApi_communications_bulk_messages_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/communications/bulk-messages/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_communications_bulk_messages_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_communications_bulk_messages_partial_update']);
    },
  });
}

export function useApi_communications_bulk_messages_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/communications/bulk-messages/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_communications_bulk_messages_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_communications_bulk_messages_destroy']);
    },
  });
}

export function useApi_communications_messages_list(params?: types.paths["/api/communications/messages/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_communications_messages_list', params], () => api.api_communications_messages_list(params));
}

export function useApi_communications_messages_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/communications/messages/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_communications_messages_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_communications_messages_create']);
    },
  });
}

export function useApi_communications_messages_retrieve(params?: types.paths["/api/communications/messages/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_communications_messages_retrieve', params], () => api.api_communications_messages_retrieve(params));
}

export function useApi_communications_messages_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/communications/messages/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_communications_messages_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_communications_messages_update']);
    },
  });
}

export function useApi_communications_messages_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/communications/messages/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_communications_messages_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_communications_messages_partial_update']);
    },
  });
}

export function useApi_communications_messages_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/communications/messages/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_communications_messages_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_communications_messages_destroy']);
    },
  });
}

export function useApi_counselors_sessions_list(params?: types.paths["/api/counselors/sessions/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_counselors_sessions_list', params], () => api.api_counselors_sessions_list(params));
}

export function useApi_counselors_sessions_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/counselors/sessions/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_counselors_sessions_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_counselors_sessions_create']);
    },
  });
}

export function useApi_counselors_sessions_retrieve(params?: types.paths["/api/counselors/sessions/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_counselors_sessions_retrieve', params], () => api.api_counselors_sessions_retrieve(params));
}

export function useApi_counselors_sessions_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/counselors/sessions/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_counselors_sessions_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_counselors_sessions_update']);
    },
  });
}

export function useApi_counselors_sessions_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/counselors/sessions/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_counselors_sessions_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_counselors_sessions_partial_update']);
    },
  });
}

export function useApi_counselors_sessions_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/counselors/sessions/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_counselors_sessions_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_counselors_sessions_destroy']);
    },
  });
}

export function useApi_counselors_students_list(params?: types.paths["/api/counselors/students/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_counselors_students_list', params], () => api.api_counselors_students_list(params));
}

export function useApi_counselors_students_retrieve(params?: types.paths["/api/counselors/students/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_counselors_students_retrieve', params], () => api.api_counselors_students_retrieve(params));
}

export function useApi_custom_tables_fields_list(params?: types.paths["/api/custom_tables/fields/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_custom_tables_fields_list', params], () => api.api_custom_tables_fields_list(params));
}

export function useApi_custom_tables_fields_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/custom_tables/fields/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_custom_tables_fields_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_custom_tables_fields_create']);
    },
  });
}

export function useApi_custom_tables_fields_retrieve(params?: types.paths["/api/custom_tables/fields/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_custom_tables_fields_retrieve', params], () => api.api_custom_tables_fields_retrieve(params));
}

export function useApi_custom_tables_fields_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/custom_tables/fields/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_custom_tables_fields_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_custom_tables_fields_update']);
    },
  });
}

export function useApi_custom_tables_fields_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/custom_tables/fields/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_custom_tables_fields_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_custom_tables_fields_partial_update']);
    },
  });
}

export function useApi_custom_tables_fields_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/custom_tables/fields/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_custom_tables_fields_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_custom_tables_fields_destroy']);
    },
  });
}

export function useApi_custom_tables_tables_list(params?: types.paths["/api/custom_tables/tables/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_custom_tables_tables_list', params], () => api.api_custom_tables_tables_list(params));
}

export function useApi_custom_tables_tables_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/custom_tables/tables/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_custom_tables_tables_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_custom_tables_tables_create']);
    },
  });
}

export function useApi_custom_tables_tables_retrieve(params?: types.paths["/api/custom_tables/tables/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_custom_tables_tables_retrieve', params], () => api.api_custom_tables_tables_retrieve(params));
}

export function useApi_custom_tables_tables_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/custom_tables/tables/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_custom_tables_tables_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_custom_tables_tables_update']);
    },
  });
}

export function useApi_custom_tables_tables_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/custom_tables/tables/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_custom_tables_tables_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_custom_tables_tables_partial_update']);
    },
  });
}

export function useApi_custom_tables_tables_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/custom_tables/tables/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_custom_tables_tables_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_custom_tables_tables_destroy']);
    },
  });
}

export function useApi_dashboard_retrieve(params?: types.paths["/api/dashboard/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_dashboard_retrieve', params], () => api.api_dashboard_retrieve(params));
}

export function useApi_fees_fees_list(params?: types.paths["/api/fees/fees/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_fees_fees_list', params], () => api.api_fees_fees_list(params));
}

export function useApi_fees_fees_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/fees/fees/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_fees_fees_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_fees_fees_create']);
    },
  });
}

export function useApi_fees_fees_retrieve(params?: types.paths["/api/fees/fees/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_fees_fees_retrieve', params], () => api.api_fees_fees_retrieve(params));
}

export function useApi_fees_fees_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/fees/fees/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_fees_fees_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_fees_fees_update']);
    },
  });
}

export function useApi_fees_fees_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/fees/fees/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_fees_fees_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_fees_fees_partial_update']);
    },
  });
}

export function useApi_fees_fees_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/fees/fees/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_fees_fees_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_fees_fees_destroy']);
    },
  });
}

export function useApi_fees_parent_payments_list(params?: types.paths["/api/fees/parent/payments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_fees_parent_payments_list', params], () => api.api_fees_parent_payments_list(params));
}

export function useApi_fees_parent_students_unpaid_fees_list(params?: types.paths["/api/fees/parent/students/{student_id}/unpaid-fees/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_fees_parent_students_unpaid_fees_list', params], () => api.api_fees_parent_students_unpaid_fees_list(params));
}

export function useApi_fees_payments_list(params?: types.paths["/api/fees/payments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_fees_payments_list', params], () => api.api_fees_payments_list(params));
}

export function useApi_fees_payments_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/fees/payments/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_fees_payments_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_fees_payments_create']);
    },
  });
}

export function useApi_fees_payments_retrieve(params?: types.paths["/api/fees/payments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_fees_payments_retrieve', params], () => api.api_fees_payments_retrieve(params));
}

export function useApi_fees_payments_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/fees/payments/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_fees_payments_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_fees_payments_update']);
    },
  });
}

export function useApi_fees_payments_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/fees/payments/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_fees_payments_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_fees_payments_partial_update']);
    },
  });
}

export function useApi_fees_payments_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/fees/payments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_fees_payments_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_fees_payments_destroy']);
    },
  });
}

export function useApi_librarians_books_list(params?: types.paths["/api/librarians/books/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_librarians_books_list', params], () => api.api_librarians_books_list(params));
}

export function useApi_librarians_books_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/librarians/books/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_librarians_books_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_librarians_books_create']);
    },
  });
}

export function useApi_librarians_books_retrieve(params?: types.paths["/api/librarians/books/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_librarians_books_retrieve', params], () => api.api_librarians_books_retrieve(params));
}

export function useApi_librarians_books_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/librarians/books/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_librarians_books_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_librarians_books_update']);
    },
  });
}

export function useApi_librarians_books_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/librarians/books/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_librarians_books_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_librarians_books_partial_update']);
    },
  });
}

export function useApi_librarians_books_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/librarians/books/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_librarians_books_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_librarians_books_destroy']);
    },
  });
}

export function useApi_librarians_borrowing_records_list(params?: types.paths["/api/librarians/borrowing-records/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_librarians_borrowing_records_list', params], () => api.api_librarians_borrowing_records_list(params));
}

export function useApi_librarians_borrowing_records_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/librarians/borrowing-records/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_librarians_borrowing_records_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_librarians_borrowing_records_create']);
    },
  });
}

export function useApi_librarians_borrowing_records_retrieve(params?: types.paths["/api/librarians/borrowing-records/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_librarians_borrowing_records_retrieve', params], () => api.api_librarians_borrowing_records_retrieve(params));
}

export function useApi_librarians_borrowing_records_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/librarians/borrowing-records/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_librarians_borrowing_records_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_librarians_borrowing_records_update']);
    },
  });
}

export function useApi_librarians_borrowing_records_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/librarians/borrowing-records/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_librarians_borrowing_records_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_librarians_borrowing_records_partial_update']);
    },
  });
}

export function useApi_librarians_borrowing_records_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/librarians/borrowing-records/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_librarians_borrowing_records_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_librarians_borrowing_records_destroy']);
    },
  });
}

export function useApi_librarians_overdue_books_list(params?: types.paths["/api/librarians/overdue-books/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_librarians_overdue_books_list', params], () => api.api_librarians_overdue_books_list(params));
}

export function useApi_reports_attendance_list(params?: types.paths["/api/reports/attendance/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_attendance_list', params], () => api.api_reports_attendance_list(params));
}

export function useApi_reports_classes_list(params?: types.paths["/api/reports/classes/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_classes_list', params], () => api.api_reports_classes_list(params));
}

export function useApi_reports_courses_list(params?: types.paths["/api/reports/courses/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_courses_list', params], () => api.api_reports_courses_list(params));
}

export function useApi_reports_custom_retrieve(params?: types.paths["/api/reports/custom/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_custom_retrieve', params], () => api.api_reports_custom_retrieve(params));
}

export function useApi_reports_custom_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/reports/custom/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_reports_custom_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_reports_custom_create']);
    },
  });
}

export function useApi_reports_download_report_card_retrieve(params?: types.paths["/api/reports/download-report-card/{report_card_id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_download_report_card_retrieve', params], () => api.api_reports_download_report_card_retrieve(params));
}

export function useApi_reports_enrollment_list(params?: types.paths["/api/reports/enrollment/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_enrollment_list', params], () => api.api_reports_enrollment_list(params));
}

export function useApi_reports_fees_list(params?: types.paths["/api/reports/fees/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_fees_list', params], () => api.api_reports_fees_list(params));
}

export function useApi_reports_financial_list(params?: types.paths["/api/reports/financial/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_financial_list', params], () => api.api_reports_financial_list(params));
}

export function useApi_reports_generate_report_card_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/reports/generate-report-card/{student_id}/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_reports_generate_report_card_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_reports_generate_report_card_create']);
    },
  });
}

export function useApi_reports_payments_list(params?: types.paths["/api/reports/payments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_payments_list', params], () => api.api_reports_payments_list(params));
}

export function useApi_reports_staff_list(params?: types.paths["/api/reports/staff/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_staff_list', params], () => api.api_reports_staff_list(params));
}

export function useApi_reports_student_performance_list(params?: types.paths["/api/reports/student-performance/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_student_performance_list', params], () => api.api_reports_student_performance_list(params));
}

export function useApi_reports_students_list(params?: types.paths["/api/reports/students/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_reports_students_list', params], () => api.api_reports_students_list(params));
}

export function useApi_staff_list(params?: types.paths["/api/staff/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_staff_list', params], () => api.api_staff_list(params));
}

export function useApi_staff_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/staff/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_staff_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_staff_create']);
    },
  });
}

export function useApi_staff_retrieve(params?: types.paths["/api/staff/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_staff_retrieve', params], () => api.api_staff_retrieve(params));
}

export function useApi_staff_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/staff/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_staff_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_staff_update']);
    },
  });
}

export function useApi_staff_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/staff/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_staff_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_staff_partial_update']);
    },
  });
}

export function useApi_staff_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/staff/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_staff_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_staff_destroy']);
    },
  });
}

export function useApi_staff_payroll_list(params?: types.paths["/api/staff/payroll/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_staff_payroll_list', params], () => api.api_staff_payroll_list(params));
}

export function useApi_staff_payroll_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/staff/payroll/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_staff_payroll_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_staff_payroll_create']);
    },
  });
}

export function useApi_staff_payroll_retrieve(params?: types.paths["/api/staff/payroll/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_staff_payroll_retrieve', params], () => api.api_staff_payroll_retrieve(params));
}

export function useApi_staff_payroll_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/staff/payroll/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_staff_payroll_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_staff_payroll_update']);
    },
  });
}

export function useApi_staff_payroll_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/staff/payroll/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_staff_payroll_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_staff_payroll_partial_update']);
    },
  });
}

export function useApi_staff_payroll_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/staff/payroll/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_staff_payroll_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_staff_payroll_destroy']);
    },
  });
}

export function useApi_students_list(params?: types.paths["/api/students/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_students_list', params], () => api.api_students_list(params));
}

export function useApi_students_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/students/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_students_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_students_create']);
    },
  });
}

export function useApi_students_retrieve(params?: types.paths["/api/students/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_students_retrieve', params], () => api.api_students_retrieve(params));
}

export function useApi_students_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/students/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_students_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_students_update']);
    },
  });
}

export function useApi_students_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/students/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_students_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_students_partial_update']);
    },
  });
}

export function useApi_students_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/students/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_students_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_students_destroy']);
    },
  });
}

export function useApi_students_applications_list(params?: types.paths["/api/students/applications/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_students_applications_list', params], () => api.api_students_applications_list(params));
}

export function useApi_students_applications_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/students/applications/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_students_applications_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_students_applications_create']);
    },
  });
}

export function useApi_students_applications_retrieve(params?: types.paths["/api/students/applications/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_students_applications_retrieve', params], () => api.api_students_applications_retrieve(params));
}

export function useApi_students_applications_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/students/applications/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_students_applications_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_students_applications_update']);
    },
  });
}

export function useApi_students_applications_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/students/applications/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_students_applications_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_students_applications_partial_update']);
    },
  });
}

export function useApi_students_applications_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/students/applications/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_students_applications_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_students_applications_destroy']);
    },
  });
}

export function useApi_token_refresh_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/token/refresh/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_token_refresh_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_token_refresh_create']);
    },
  });
}

export function useApi_users_list(params?: types.paths["/api/users/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_list', params], () => api.api_users_list(params));
}

export function useApi_users_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_users_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_create']);
    },
  });
}

export function useApi_users_retrieve(params?: types.paths["/api/users/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_retrieve', params], () => api.api_users_retrieve(params));
}

export function useApi_users_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_users_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_update']);
    },
  });
}

export function useApi_users_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_users_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_partial_update']);
    },
  });
}

export function useApi_users_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_users_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_destroy']);
    },
  });
}

export function useApi_users_profile_retrieve(params?: types.paths["/api/users/{id}/profile/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_profile_retrieve', params], () => api.api_users_profile_retrieve(params));
}

export function useApi_users_login_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/login/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_users_login_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_login_create']);
    },
  });
}

export function useApi_users_logout_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/logout/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_users_logout_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_logout_create']);
    },
  });
}

export function useApi_users_me_retrieve(params?: types.paths["/api/users/me/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_me_retrieve', params], () => api.api_users_me_retrieve(params));
}

export function useApi_users_me_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/me/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_users_me_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_me_update']);
    },
  });
}

export function useApi_users_me_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/me/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_users_me_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_me_partial_update']);
    },
  });
}

export function useApi_users_parent_children_list(params?: types.paths["/api/users/parent/children/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_list', params], () => api.api_users_parent_children_list(params));
}

export function useApi_users_parent_children_retrieve(params?: types.paths["/api/users/parent/children/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_retrieve', params], () => api.api_users_parent_children_retrieve(params));
}

export function useApi_users_parent_children_assignments_list(params?: types.paths["/api/users/parent/children/{student_id}/assignments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_assignments_list', params], () => api.api_users_parent_children_assignments_list(params));
}

export function useApi_users_parent_children_attendance_list(params?: types.paths["/api/users/parent/children/{student_id}/attendance/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_attendance_list', params], () => api.api_users_parent_children_attendance_list(params));
}

export function useApi_users_parent_children_classes_list(params?: types.paths["/api/users/parent/children/{student_id}/classes/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_classes_list', params], () => api.api_users_parent_children_classes_list(params));
}

export function useApi_users_parent_children_enrollments_list(params?: types.paths["/api/users/parent/children/{student_id}/enrollments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_enrollments_list', params], () => api.api_users_parent_children_enrollments_list(params));
}

export function useApi_users_parent_children_fees_fees_list(params?: types.paths["/api/users/parent/children/{student_id}/fees/fees/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_fees_fees_list', params], () => api.api_users_parent_children_fees_fees_list(params));
}

export function useApi_users_parent_children_fees_fees_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parent/children/{student_id}/fees/fees/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_users_parent_children_fees_fees_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parent_children_fees_fees_create']);
    },
  });
}

export function useApi_users_parent_children_fees_fees_retrieve(params?: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_fees_fees_retrieve', params], () => api.api_users_parent_children_fees_fees_retrieve(params));
}

export function useApi_users_parent_children_fees_fees_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_users_parent_children_fees_fees_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parent_children_fees_fees_update']);
    },
  });
}

export function useApi_users_parent_children_fees_fees_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_users_parent_children_fees_fees_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parent_children_fees_fees_partial_update']);
    },
  });
}

export function useApi_users_parent_children_fees_fees_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_users_parent_children_fees_fees_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parent_children_fees_fees_destroy']);
    },
  });
}

export function useApi_users_parent_children_fees_parent_payments_list(params?: types.paths["/api/users/parent/children/{student_id}/fees/parent/payments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_fees_parent_payments_list', params], () => api.api_users_parent_children_fees_parent_payments_list(params));
}

export function useApi_users_parent_children_fees_parent_students_unpaid_fees_list(params?: types.paths["/api/users/parent/children/{student_id}/fees/parent/students/{student_id}/unpaid-fees/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_fees_parent_students_unpaid_fees_list', params], () => api.api_users_parent_children_fees_parent_students_unpaid_fees_list(params));
}

export function useApi_users_parent_children_fees_payments_list(params?: types.paths["/api/users/parent/children/{student_id}/fees/payments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_fees_payments_list', params], () => api.api_users_parent_children_fees_payments_list(params));
}

export function useApi_users_parent_children_fees_payments_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parent/children/{student_id}/fees/payments/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_users_parent_children_fees_payments_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parent_children_fees_payments_create']);
    },
  });
}

export function useApi_users_parent_children_fees_payments_retrieve(params?: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_fees_payments_retrieve', params], () => api.api_users_parent_children_fees_payments_retrieve(params));
}

export function useApi_users_parent_children_fees_payments_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_users_parent_children_fees_payments_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parent_children_fees_payments_update']);
    },
  });
}

export function useApi_users_parent_children_fees_payments_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_users_parent_children_fees_payments_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parent_children_fees_payments_partial_update']);
    },
  });
}

export function useApi_users_parent_children_fees_payments_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_users_parent_children_fees_payments_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parent_children_fees_payments_destroy']);
    },
  });
}

export function useApi_users_parent_children_grades_list(params?: types.paths["/api/users/parent/children/{student_id}/grades/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_grades_list', params], () => api.api_users_parent_children_grades_list(params));
}

export function useApi_users_parent_children_unpaid_fees_list(params?: types.paths["/api/users/parent/children/{student_id}/unpaid-fees/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_children_unpaid_fees_list', params], () => api.api_users_parent_children_unpaid_fees_list(params));
}

export function useApi_users_parent_payments_list(params?: types.paths["/api/users/parent/payments/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parent_payments_list', params], () => api.api_users_parent_payments_list(params));
}

export function useApi_users_parents_list(params?: types.paths["/api/users/parents/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parents_list', params], () => api.api_users_parents_list(params));
}

export function useApi_users_parents_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parents/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_users_parents_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parents_create']);
    },
  });
}

export function useApi_users_parents_retrieve(params?: types.paths["/api/users/parents/{id}/"]["get"] extends { parameters: infer P } ? P : undefined) {
  return useQuery(['api_users_parents_retrieve', params], () => api.api_users_parents_retrieve(params));
}

export function useApi_users_parents_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parents/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) => api.api_users_parents_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parents_update']);
    },
  });
}

export function useApi_users_parents_partial_update() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parents/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) => api.api_users_parents_partial_update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parents_partial_update']);
    },
  });
}

export function useApi_users_parents_destroy() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/parents/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) => api.api_users_parents_destroy(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_parents_destroy']);
    },
  });
}

export function useApi_users_password_reset_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/password-reset/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_users_password_reset_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_password_reset_create']);
    },
  });
}

export function useApi_users_password_reset_confirm_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/password-reset/confirm/{uid}/{token}/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_users_password_reset_confirm_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_password_reset_confirm_create']);
    },
  });
}

export function useApi_users_register_create() {
  const queryClient = useQueryClient();
  return useMutation((data: types.paths["/api/users/register/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_users_register_create(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['api_users_register_create']);
    },
  });
}
