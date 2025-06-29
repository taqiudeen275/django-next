// actions.ts - Generated Next.js server actions
import * as validators from './validators';
import * as types from './types';

export async function api_academics_assignments_teacher_createAction(params: types.paths["/api/academics/assignments/teacher/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_assignments_teacher_createSchema if available
  // Example: validators.api_academics_assignments_teacher_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_assignments_teacher_create(params);
}

export async function api_academics_assignments_teacher_updateAction(params: types.paths["/api/academics/assignments/teacher/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_assignments_teacher_updateSchema if available
  // Example: validators.api_academics_assignments_teacher_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_assignments_teacher_update(params);
}

export async function api_academics_assignments_teacher_partial_updateAction(params: types.paths["/api/academics/assignments/teacher/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_assignments_teacher_partial_updateSchema if available
  // Example: validators.api_academics_assignments_teacher_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_assignments_teacher_partial_update(params);
}

export async function api_academics_assignments_teacher_destroyAction(params: types.paths["/api/academics/assignments/teacher/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_assignments_teacher_destroySchema if available
  // Example: validators.api_academics_assignments_teacher_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_assignments_teacher_destroy(params);
}

export async function api_academics_attendance_teacher_createAction(params: types.paths["/api/academics/attendance/teacher/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_attendance_teacher_createSchema if available
  // Example: validators.api_academics_attendance_teacher_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_attendance_teacher_create(params);
}

export async function api_academics_classes_createAction(params: types.paths["/api/academics/classes/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_classes_createSchema if available
  // Example: validators.api_academics_classes_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_classes_create(params);
}

export async function api_academics_classes_updateAction(params: types.paths["/api/academics/classes/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_classes_updateSchema if available
  // Example: validators.api_academics_classes_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_classes_update(params);
}

export async function api_academics_classes_partial_updateAction(params: types.paths["/api/academics/classes/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_classes_partial_updateSchema if available
  // Example: validators.api_academics_classes_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_classes_partial_update(params);
}

export async function api_academics_classes_destroyAction(params: types.paths["/api/academics/classes/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_classes_destroySchema if available
  // Example: validators.api_academics_classes_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_classes_destroy(params);
}

export async function api_academics_courses_createAction(params: types.paths["/api/academics/courses/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_courses_createSchema if available
  // Example: validators.api_academics_courses_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_courses_create(params);
}

export async function api_academics_courses_updateAction(params: types.paths["/api/academics/courses/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_courses_updateSchema if available
  // Example: validators.api_academics_courses_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_courses_update(params);
}

export async function api_academics_courses_partial_updateAction(params: types.paths["/api/academics/courses/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_courses_partial_updateSchema if available
  // Example: validators.api_academics_courses_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_courses_partial_update(params);
}

export async function api_academics_courses_destroyAction(params: types.paths["/api/academics/courses/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_courses_destroySchema if available
  // Example: validators.api_academics_courses_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_courses_destroy(params);
}

export async function api_academics_enrollments_createAction(params: types.paths["/api/academics/enrollments/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_enrollments_createSchema if available
  // Example: validators.api_academics_enrollments_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_enrollments_create(params);
}

export async function api_academics_enrollments_destroyAction(params: types.paths["/api/academics/enrollments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_enrollments_destroySchema if available
  // Example: validators.api_academics_enrollments_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_enrollments_destroy(params);
}

export async function api_academics_grade_components_createAction(params: types.paths["/api/academics/grade-components/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_grade_components_createSchema if available
  // Example: validators.api_academics_grade_components_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_grade_components_create(params);
}

export async function api_academics_grade_components_updateAction(params: types.paths["/api/academics/grade-components/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_grade_components_updateSchema if available
  // Example: validators.api_academics_grade_components_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_grade_components_update(params);
}

export async function api_academics_grade_components_partial_updateAction(params: types.paths["/api/academics/grade-components/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_grade_components_partial_updateSchema if available
  // Example: validators.api_academics_grade_components_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_grade_components_partial_update(params);
}

export async function api_academics_grade_components_destroyAction(params: types.paths["/api/academics/grade-components/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_grade_components_destroySchema if available
  // Example: validators.api_academics_grade_components_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_grade_components_destroy(params);
}

export async function api_academics_grades_teacher_createAction(params: types.paths["/api/academics/grades/teacher/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_grades_teacher_createSchema if available
  // Example: validators.api_academics_grades_teacher_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_grades_teacher_create(params);
}

export async function api_academics_grading_scales_createAction(params: types.paths["/api/academics/grading-scales/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_grading_scales_createSchema if available
  // Example: validators.api_academics_grading_scales_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_grading_scales_create(params);
}

export async function api_academics_grading_scales_updateAction(params: types.paths["/api/academics/grading-scales/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_grading_scales_updateSchema if available
  // Example: validators.api_academics_grading_scales_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_grading_scales_update(params);
}

export async function api_academics_grading_scales_partial_updateAction(params: types.paths["/api/academics/grading-scales/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_grading_scales_partial_updateSchema if available
  // Example: validators.api_academics_grading_scales_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_grading_scales_partial_update(params);
}

export async function api_academics_grading_scales_destroyAction(params: types.paths["/api/academics/grading-scales/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_grading_scales_destroySchema if available
  // Example: validators.api_academics_grading_scales_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_grading_scales_destroy(params);
}

export async function api_academics_lesson_plans_teacher_createAction(params: types.paths["/api/academics/lesson-plans/teacher/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_lesson_plans_teacher_createSchema if available
  // Example: validators.api_academics_lesson_plans_teacher_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_lesson_plans_teacher_create(params);
}

export async function api_academics_lesson_plans_teacher_updateAction(params: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_lesson_plans_teacher_updateSchema if available
  // Example: validators.api_academics_lesson_plans_teacher_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_lesson_plans_teacher_update(params);
}

export async function api_academics_lesson_plans_teacher_partial_updateAction(params: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_lesson_plans_teacher_partial_updateSchema if available
  // Example: validators.api_academics_lesson_plans_teacher_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_lesson_plans_teacher_partial_update(params);
}

export async function api_academics_lesson_plans_teacher_destroyAction(params: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_lesson_plans_teacher_destroySchema if available
  // Example: validators.api_academics_lesson_plans_teacher_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_lesson_plans_teacher_destroy(params);
}

export async function api_academics_scores_createAction(params: types.paths["/api/academics/scores/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_scores_createSchema if available
  // Example: validators.api_academics_scores_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_scores_create(params);
}

export async function api_academics_scores_updateAction(params: types.paths["/api/academics/scores/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_scores_updateSchema if available
  // Example: validators.api_academics_scores_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_scores_update(params);
}

export async function api_academics_scores_partial_updateAction(params: types.paths["/api/academics/scores/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_scores_partial_updateSchema if available
  // Example: validators.api_academics_scores_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_scores_partial_update(params);
}

export async function api_academics_scores_destroyAction(params: types.paths["/api/academics/scores/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_scores_destroySchema if available
  // Example: validators.api_academics_scores_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_scores_destroy(params);
}

export async function api_academics_student_enrollments_createAction(params: types.paths["/api/academics/student/enrollments/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_student_enrollments_createSchema if available
  // Example: validators.api_academics_student_enrollments_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_student_enrollments_create(params);
}

export async function api_academics_student_enrollments_destroyAction(params: types.paths["/api/academics/student/enrollments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_academics_student_enrollments_destroySchema if available
  // Example: validators.api_academics_student_enrollments_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_academics_student_enrollments_destroy(params);
}

export async function api_auth_login_createAction(params: types.paths["/api/auth/login/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_auth_login_createSchema if available
  // Example: validators.api_auth_login_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_auth_login_create(params);
}

export async function api_auth_logout_createAction(params: types.paths["/api/auth/logout/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_auth_logout_createSchema if available
  // Example: validators.api_auth_logout_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_auth_logout_create(params);
}

export async function api_communications_bulk_messages_createAction(params: types.paths["/api/communications/bulk-messages/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_communications_bulk_messages_createSchema if available
  // Example: validators.api_communications_bulk_messages_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_communications_bulk_messages_create(params);
}

export async function api_communications_bulk_messages_updateAction(params: types.paths["/api/communications/bulk-messages/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_communications_bulk_messages_updateSchema if available
  // Example: validators.api_communications_bulk_messages_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_communications_bulk_messages_update(params);
}

export async function api_communications_bulk_messages_partial_updateAction(params: types.paths["/api/communications/bulk-messages/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_communications_bulk_messages_partial_updateSchema if available
  // Example: validators.api_communications_bulk_messages_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_communications_bulk_messages_partial_update(params);
}

export async function api_communications_bulk_messages_destroyAction(params: types.paths["/api/communications/bulk-messages/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_communications_bulk_messages_destroySchema if available
  // Example: validators.api_communications_bulk_messages_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_communications_bulk_messages_destroy(params);
}

export async function api_communications_messages_createAction(params: types.paths["/api/communications/messages/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_communications_messages_createSchema if available
  // Example: validators.api_communications_messages_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_communications_messages_create(params);
}

export async function api_communications_messages_updateAction(params: types.paths["/api/communications/messages/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_communications_messages_updateSchema if available
  // Example: validators.api_communications_messages_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_communications_messages_update(params);
}

export async function api_communications_messages_partial_updateAction(params: types.paths["/api/communications/messages/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_communications_messages_partial_updateSchema if available
  // Example: validators.api_communications_messages_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_communications_messages_partial_update(params);
}

export async function api_communications_messages_destroyAction(params: types.paths["/api/communications/messages/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_communications_messages_destroySchema if available
  // Example: validators.api_communications_messages_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_communications_messages_destroy(params);
}

export async function api_counselors_sessions_createAction(params: types.paths["/api/counselors/sessions/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_counselors_sessions_createSchema if available
  // Example: validators.api_counselors_sessions_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_counselors_sessions_create(params);
}

export async function api_counselors_sessions_updateAction(params: types.paths["/api/counselors/sessions/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_counselors_sessions_updateSchema if available
  // Example: validators.api_counselors_sessions_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_counselors_sessions_update(params);
}

export async function api_counselors_sessions_partial_updateAction(params: types.paths["/api/counselors/sessions/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_counselors_sessions_partial_updateSchema if available
  // Example: validators.api_counselors_sessions_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_counselors_sessions_partial_update(params);
}

export async function api_counselors_sessions_destroyAction(params: types.paths["/api/counselors/sessions/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_counselors_sessions_destroySchema if available
  // Example: validators.api_counselors_sessions_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_counselors_sessions_destroy(params);
}

export async function api_custom_tables_fields_createAction(params: types.paths["/api/custom_tables/fields/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_custom_tables_fields_createSchema if available
  // Example: validators.api_custom_tables_fields_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_custom_tables_fields_create(params);
}

export async function api_custom_tables_fields_updateAction(params: types.paths["/api/custom_tables/fields/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_custom_tables_fields_updateSchema if available
  // Example: validators.api_custom_tables_fields_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_custom_tables_fields_update(params);
}

export async function api_custom_tables_fields_partial_updateAction(params: types.paths["/api/custom_tables/fields/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_custom_tables_fields_partial_updateSchema if available
  // Example: validators.api_custom_tables_fields_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_custom_tables_fields_partial_update(params);
}

export async function api_custom_tables_fields_destroyAction(params: types.paths["/api/custom_tables/fields/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_custom_tables_fields_destroySchema if available
  // Example: validators.api_custom_tables_fields_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_custom_tables_fields_destroy(params);
}

export async function api_custom_tables_tables_createAction(params: types.paths["/api/custom_tables/tables/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_custom_tables_tables_createSchema if available
  // Example: validators.api_custom_tables_tables_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_custom_tables_tables_create(params);
}

export async function api_custom_tables_tables_updateAction(params: types.paths["/api/custom_tables/tables/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_custom_tables_tables_updateSchema if available
  // Example: validators.api_custom_tables_tables_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_custom_tables_tables_update(params);
}

export async function api_custom_tables_tables_partial_updateAction(params: types.paths["/api/custom_tables/tables/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_custom_tables_tables_partial_updateSchema if available
  // Example: validators.api_custom_tables_tables_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_custom_tables_tables_partial_update(params);
}

export async function api_custom_tables_tables_destroyAction(params: types.paths["/api/custom_tables/tables/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_custom_tables_tables_destroySchema if available
  // Example: validators.api_custom_tables_tables_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_custom_tables_tables_destroy(params);
}

export async function api_fees_fees_createAction(params: types.paths["/api/fees/fees/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_fees_fees_createSchema if available
  // Example: validators.api_fees_fees_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_fees_fees_create(params);
}

export async function api_fees_fees_updateAction(params: types.paths["/api/fees/fees/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_fees_fees_updateSchema if available
  // Example: validators.api_fees_fees_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_fees_fees_update(params);
}

export async function api_fees_fees_partial_updateAction(params: types.paths["/api/fees/fees/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_fees_fees_partial_updateSchema if available
  // Example: validators.api_fees_fees_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_fees_fees_partial_update(params);
}

export async function api_fees_fees_destroyAction(params: types.paths["/api/fees/fees/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_fees_fees_destroySchema if available
  // Example: validators.api_fees_fees_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_fees_fees_destroy(params);
}

export async function api_fees_payments_createAction(params: types.paths["/api/fees/payments/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_fees_payments_createSchema if available
  // Example: validators.api_fees_payments_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_fees_payments_create(params);
}

export async function api_fees_payments_updateAction(params: types.paths["/api/fees/payments/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_fees_payments_updateSchema if available
  // Example: validators.api_fees_payments_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_fees_payments_update(params);
}

export async function api_fees_payments_partial_updateAction(params: types.paths["/api/fees/payments/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_fees_payments_partial_updateSchema if available
  // Example: validators.api_fees_payments_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_fees_payments_partial_update(params);
}

export async function api_fees_payments_destroyAction(params: types.paths["/api/fees/payments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_fees_payments_destroySchema if available
  // Example: validators.api_fees_payments_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_fees_payments_destroy(params);
}

export async function api_librarians_books_createAction(params: types.paths["/api/librarians/books/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_librarians_books_createSchema if available
  // Example: validators.api_librarians_books_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_librarians_books_create(params);
}

export async function api_librarians_books_updateAction(params: types.paths["/api/librarians/books/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_librarians_books_updateSchema if available
  // Example: validators.api_librarians_books_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_librarians_books_update(params);
}

export async function api_librarians_books_partial_updateAction(params: types.paths["/api/librarians/books/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_librarians_books_partial_updateSchema if available
  // Example: validators.api_librarians_books_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_librarians_books_partial_update(params);
}

export async function api_librarians_books_destroyAction(params: types.paths["/api/librarians/books/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_librarians_books_destroySchema if available
  // Example: validators.api_librarians_books_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_librarians_books_destroy(params);
}

export async function api_librarians_borrowing_records_createAction(params: types.paths["/api/librarians/borrowing-records/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_librarians_borrowing_records_createSchema if available
  // Example: validators.api_librarians_borrowing_records_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_librarians_borrowing_records_create(params);
}

export async function api_librarians_borrowing_records_updateAction(params: types.paths["/api/librarians/borrowing-records/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_librarians_borrowing_records_updateSchema if available
  // Example: validators.api_librarians_borrowing_records_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_librarians_borrowing_records_update(params);
}

export async function api_librarians_borrowing_records_partial_updateAction(params: types.paths["/api/librarians/borrowing-records/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_librarians_borrowing_records_partial_updateSchema if available
  // Example: validators.api_librarians_borrowing_records_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_librarians_borrowing_records_partial_update(params);
}

export async function api_librarians_borrowing_records_destroyAction(params: types.paths["/api/librarians/borrowing-records/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_librarians_borrowing_records_destroySchema if available
  // Example: validators.api_librarians_borrowing_records_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_librarians_borrowing_records_destroy(params);
}

export async function api_reports_custom_createAction(params: types.paths["/api/reports/custom/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_reports_custom_createSchema if available
  // Example: validators.api_reports_custom_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_reports_custom_create(params);
}

export async function api_reports_generate_report_card_createAction(params: types.paths["/api/reports/generate-report-card/{student_id}/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_reports_generate_report_card_createSchema if available
  // Example: validators.api_reports_generate_report_card_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_reports_generate_report_card_create(params);
}

export async function api_staff_createAction(params: types.paths["/api/staff/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_staff_createSchema if available
  // Example: validators.api_staff_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_staff_create(params);
}

export async function api_staff_updateAction(params: types.paths["/api/staff/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_staff_updateSchema if available
  // Example: validators.api_staff_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_staff_update(params);
}

export async function api_staff_partial_updateAction(params: types.paths["/api/staff/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_staff_partial_updateSchema if available
  // Example: validators.api_staff_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_staff_partial_update(params);
}

export async function api_staff_destroyAction(params: types.paths["/api/staff/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_staff_destroySchema if available
  // Example: validators.api_staff_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_staff_destroy(params);
}

export async function api_staff_payroll_createAction(params: types.paths["/api/staff/payroll/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_staff_payroll_createSchema if available
  // Example: validators.api_staff_payroll_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_staff_payroll_create(params);
}

export async function api_staff_payroll_updateAction(params: types.paths["/api/staff/payroll/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_staff_payroll_updateSchema if available
  // Example: validators.api_staff_payroll_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_staff_payroll_update(params);
}

export async function api_staff_payroll_partial_updateAction(params: types.paths["/api/staff/payroll/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_staff_payroll_partial_updateSchema if available
  // Example: validators.api_staff_payroll_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_staff_payroll_partial_update(params);
}

export async function api_staff_payroll_destroyAction(params: types.paths["/api/staff/payroll/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_staff_payroll_destroySchema if available
  // Example: validators.api_staff_payroll_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_staff_payroll_destroy(params);
}

export async function api_students_createAction(params: types.paths["/api/students/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_students_createSchema if available
  // Example: validators.api_students_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_students_create(params);
}

export async function api_students_updateAction(params: types.paths["/api/students/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_students_updateSchema if available
  // Example: validators.api_students_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_students_update(params);
}

export async function api_students_partial_updateAction(params: types.paths["/api/students/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_students_partial_updateSchema if available
  // Example: validators.api_students_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_students_partial_update(params);
}

export async function api_students_destroyAction(params: types.paths["/api/students/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_students_destroySchema if available
  // Example: validators.api_students_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_students_destroy(params);
}

export async function api_students_applications_createAction(params: types.paths["/api/students/applications/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_students_applications_createSchema if available
  // Example: validators.api_students_applications_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_students_applications_create(params);
}

export async function api_students_applications_updateAction(params: types.paths["/api/students/applications/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_students_applications_updateSchema if available
  // Example: validators.api_students_applications_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_students_applications_update(params);
}

export async function api_students_applications_partial_updateAction(params: types.paths["/api/students/applications/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_students_applications_partial_updateSchema if available
  // Example: validators.api_students_applications_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_students_applications_partial_update(params);
}

export async function api_students_applications_destroyAction(params: types.paths["/api/students/applications/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_students_applications_destroySchema if available
  // Example: validators.api_students_applications_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_students_applications_destroy(params);
}

export async function api_token_refresh_createAction(params: types.paths["/api/token/refresh/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_token_refresh_createSchema if available
  // Example: validators.api_token_refresh_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_token_refresh_create(params);
}

export async function api_users_createAction(params: types.paths["/api/users/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_createSchema if available
  // Example: validators.api_users_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_create(params);
}

export async function api_users_updateAction(params: types.paths["/api/users/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_updateSchema if available
  // Example: validators.api_users_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_update(params);
}

export async function api_users_partial_updateAction(params: types.paths["/api/users/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_partial_updateSchema if available
  // Example: validators.api_users_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_partial_update(params);
}

export async function api_users_destroyAction(params: types.paths["/api/users/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_destroySchema if available
  // Example: validators.api_users_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_destroy(params);
}

export async function api_users_login_createAction(params: types.paths["/api/users/login/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_login_createSchema if available
  // Example: validators.api_users_login_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_login_create(params);
}

export async function api_users_logout_createAction(params: types.paths["/api/users/logout/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_logout_createSchema if available
  // Example: validators.api_users_logout_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_logout_create(params);
}

export async function api_users_me_updateAction(params: types.paths["/api/users/me/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_me_updateSchema if available
  // Example: validators.api_users_me_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_me_update(params);
}

export async function api_users_me_partial_updateAction(params: types.paths["/api/users/me/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_me_partial_updateSchema if available
  // Example: validators.api_users_me_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_me_partial_update(params);
}

export async function api_users_parent_children_fees_fees_createAction(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parent_children_fees_fees_createSchema if available
  // Example: validators.api_users_parent_children_fees_fees_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parent_children_fees_fees_create(params);
}

export async function api_users_parent_children_fees_fees_updateAction(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parent_children_fees_fees_updateSchema if available
  // Example: validators.api_users_parent_children_fees_fees_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parent_children_fees_fees_update(params);
}

export async function api_users_parent_children_fees_fees_partial_updateAction(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parent_children_fees_fees_partial_updateSchema if available
  // Example: validators.api_users_parent_children_fees_fees_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parent_children_fees_fees_partial_update(params);
}

export async function api_users_parent_children_fees_fees_destroyAction(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parent_children_fees_fees_destroySchema if available
  // Example: validators.api_users_parent_children_fees_fees_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parent_children_fees_fees_destroy(params);
}

export async function api_users_parent_children_fees_payments_createAction(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parent_children_fees_payments_createSchema if available
  // Example: validators.api_users_parent_children_fees_payments_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parent_children_fees_payments_create(params);
}

export async function api_users_parent_children_fees_payments_updateAction(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parent_children_fees_payments_updateSchema if available
  // Example: validators.api_users_parent_children_fees_payments_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parent_children_fees_payments_update(params);
}

export async function api_users_parent_children_fees_payments_partial_updateAction(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parent_children_fees_payments_partial_updateSchema if available
  // Example: validators.api_users_parent_children_fees_payments_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parent_children_fees_payments_partial_update(params);
}

export async function api_users_parent_children_fees_payments_destroyAction(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parent_children_fees_payments_destroySchema if available
  // Example: validators.api_users_parent_children_fees_payments_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parent_children_fees_payments_destroy(params);
}

export async function api_users_parents_createAction(params: types.paths["/api/users/parents/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parents_createSchema if available
  // Example: validators.api_users_parents_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parents_create(params);
}

export async function api_users_parents_updateAction(params: types.paths["/api/users/parents/{id}/"]["put"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parents_updateSchema if available
  // Example: validators.api_users_parents_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parents_update(params);
}

export async function api_users_parents_partial_updateAction(params: types.paths["/api/users/parents/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parents_partial_updateSchema if available
  // Example: validators.api_users_parents_partial_updateSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parents_partial_update(params);
}

export async function api_users_parents_destroyAction(params: types.paths["/api/users/parents/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_parents_destroySchema if available
  // Example: validators.api_users_parents_destroySchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_parents_destroy(params);
}

export async function api_users_password_reset_createAction(params: types.paths["/api/users/password-reset/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_password_reset_createSchema if available
  // Example: validators.api_users_password_reset_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_password_reset_create(params);
}

export async function api_users_password_reset_confirm_createAction(params: types.paths["/api/users/password-reset/confirm/{uid}/{token}/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_password_reset_confirm_createSchema if available
  // Example: validators.api_users_password_reset_confirm_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_password_reset_confirm_create(params);
}

export async function api_users_register_createAction(params: types.paths["/api/users/register/"]["post"] extends { parameters: infer P } ? P : undefined) {
  // TODO: Validate params with validators.api_users_register_createSchema if available
  // Example: validators.api_users_register_createSchema.parse(params);
  const api = new (await import('./api')).API();
  return api.api_users_register_create(params);
}
