// api.ts - Generated API client
import axios, { AxiosInstance } from 'axios';
import * as validators from './validators';
import * as types from './types';

export class API {
  private axios: AxiosInstance;
  constructor(axiosInstance?: AxiosInstance) {
    this.axios = axiosInstance || axios.create();
  }

  async api_academics_assignments_teacher_list(params: types.paths["/api/academics/assignments/teacher/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/assignments/teacher/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_assignments_teacher_listSchema if available
    // Example: validators.api_academics_assignments_teacher_listSchema.parse(params);
    return this.axios.get('/api/academics/assignments/teacher/', params);
  }

  async api_academics_assignments_teacher_create(params: types.paths["/api/academics/assignments/teacher/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/assignments/teacher/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_assignments_teacher_createSchema if available
    // Example: validators.api_academics_assignments_teacher_createSchema.parse(params);
    return this.axios.post('/api/academics/assignments/teacher/', params);
  }

  async api_academics_assignments_teacher_retrieve(params: types.paths["/api/academics/assignments/teacher/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/assignments/teacher/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_assignments_teacher_retrieveSchema if available
    // Example: validators.api_academics_assignments_teacher_retrieveSchema.parse(params);
    return this.axios.get('/api/academics/assignments/teacher/{id}/', params);
  }

  async api_academics_assignments_teacher_update(params: types.paths["/api/academics/assignments/teacher/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/assignments/teacher/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_assignments_teacher_updateSchema if available
    // Example: validators.api_academics_assignments_teacher_updateSchema.parse(params);
    return this.axios.put('/api/academics/assignments/teacher/{id}/', params);
  }

  async api_academics_assignments_teacher_partial_update(params: types.paths["/api/academics/assignments/teacher/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/assignments/teacher/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_assignments_teacher_partial_updateSchema if available
    // Example: validators.api_academics_assignments_teacher_partial_updateSchema.parse(params);
    return this.axios.patch('/api/academics/assignments/teacher/{id}/', params);
  }

  async api_academics_assignments_teacher_destroy(params: types.paths["/api/academics/assignments/teacher/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/assignments/teacher/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_assignments_teacher_destroySchema if available
    // Example: validators.api_academics_assignments_teacher_destroySchema.parse(params);
    return this.axios.delete('/api/academics/assignments/teacher/{id}/', params);
  }

  async api_academics_attendance_parent_list(params: types.paths["/api/academics/attendance/parent/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/attendance/parent/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_attendance_parent_listSchema if available
    // Example: validators.api_academics_attendance_parent_listSchema.parse(params);
    return this.axios.get('/api/academics/attendance/parent/', params);
  }

  async api_academics_attendance_student_list(params: types.paths["/api/academics/attendance/student/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/attendance/student/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_attendance_student_listSchema if available
    // Example: validators.api_academics_attendance_student_listSchema.parse(params);
    return this.axios.get('/api/academics/attendance/student/', params);
  }

  async api_academics_attendance_teacher_list(params: types.paths["/api/academics/attendance/teacher/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/attendance/teacher/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_attendance_teacher_listSchema if available
    // Example: validators.api_academics_attendance_teacher_listSchema.parse(params);
    return this.axios.get('/api/academics/attendance/teacher/', params);
  }

  async api_academics_attendance_teacher_create(params: types.paths["/api/academics/attendance/teacher/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/attendance/teacher/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_attendance_teacher_createSchema if available
    // Example: validators.api_academics_attendance_teacher_createSchema.parse(params);
    return this.axios.post('/api/academics/attendance/teacher/', params);
  }

  async api_academics_classes_list(params: types.paths["/api/academics/classes/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/classes/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_classes_listSchema if available
    // Example: validators.api_academics_classes_listSchema.parse(params);
    return this.axios.get('/api/academics/classes/', params);
  }

  async api_academics_classes_create(params: types.paths["/api/academics/classes/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/classes/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_classes_createSchema if available
    // Example: validators.api_academics_classes_createSchema.parse(params);
    return this.axios.post('/api/academics/classes/', params);
  }

  async api_academics_classes_retrieve(params: types.paths["/api/academics/classes/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/classes/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_classes_retrieveSchema if available
    // Example: validators.api_academics_classes_retrieveSchema.parse(params);
    return this.axios.get('/api/academics/classes/{id}/', params);
  }

  async api_academics_classes_update(params: types.paths["/api/academics/classes/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/classes/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_classes_updateSchema if available
    // Example: validators.api_academics_classes_updateSchema.parse(params);
    return this.axios.put('/api/academics/classes/{id}/', params);
  }

  async api_academics_classes_partial_update(params: types.paths["/api/academics/classes/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/classes/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_classes_partial_updateSchema if available
    // Example: validators.api_academics_classes_partial_updateSchema.parse(params);
    return this.axios.patch('/api/academics/classes/{id}/', params);
  }

  async api_academics_classes_destroy(params: types.paths["/api/academics/classes/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/classes/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_classes_destroySchema if available
    // Example: validators.api_academics_classes_destroySchema.parse(params);
    return this.axios.delete('/api/academics/classes/{id}/', params);
  }

  async api_academics_courses_list(params: types.paths["/api/academics/courses/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/courses/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_courses_listSchema if available
    // Example: validators.api_academics_courses_listSchema.parse(params);
    return this.axios.get('/api/academics/courses/', params);
  }

  async api_academics_courses_create(params: types.paths["/api/academics/courses/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/courses/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_courses_createSchema if available
    // Example: validators.api_academics_courses_createSchema.parse(params);
    return this.axios.post('/api/academics/courses/', params);
  }

  async api_academics_courses_retrieve(params: types.paths["/api/academics/courses/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/courses/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_courses_retrieveSchema if available
    // Example: validators.api_academics_courses_retrieveSchema.parse(params);
    return this.axios.get('/api/academics/courses/{id}/', params);
  }

  async api_academics_courses_update(params: types.paths["/api/academics/courses/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/courses/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_courses_updateSchema if available
    // Example: validators.api_academics_courses_updateSchema.parse(params);
    return this.axios.put('/api/academics/courses/{id}/', params);
  }

  async api_academics_courses_partial_update(params: types.paths["/api/academics/courses/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/courses/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_courses_partial_updateSchema if available
    // Example: validators.api_academics_courses_partial_updateSchema.parse(params);
    return this.axios.patch('/api/academics/courses/{id}/', params);
  }

  async api_academics_courses_destroy(params: types.paths["/api/academics/courses/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/courses/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_courses_destroySchema if available
    // Example: validators.api_academics_courses_destroySchema.parse(params);
    return this.axios.delete('/api/academics/courses/{id}/', params);
  }

  async api_academics_courses_available_list(params: types.paths["/api/academics/courses/available/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/courses/available/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_courses_available_listSchema if available
    // Example: validators.api_academics_courses_available_listSchema.parse(params);
    return this.axios.get('/api/academics/courses/available/', params);
  }

  async api_academics_enrollments_list(params: types.paths["/api/academics/enrollments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/enrollments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_enrollments_listSchema if available
    // Example: validators.api_academics_enrollments_listSchema.parse(params);
    return this.axios.get('/api/academics/enrollments/', params);
  }

  async api_academics_enrollments_create(params: types.paths["/api/academics/enrollments/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/enrollments/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_enrollments_createSchema if available
    // Example: validators.api_academics_enrollments_createSchema.parse(params);
    return this.axios.post('/api/academics/enrollments/', params);
  }

  async api_academics_enrollments_retrieve(params: types.paths["/api/academics/enrollments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/enrollments/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_enrollments_retrieveSchema if available
    // Example: validators.api_academics_enrollments_retrieveSchema.parse(params);
    return this.axios.get('/api/academics/enrollments/{id}/', params);
  }

  async api_academics_enrollments_destroy(params: types.paths["/api/academics/enrollments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/enrollments/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_enrollments_destroySchema if available
    // Example: validators.api_academics_enrollments_destroySchema.parse(params);
    return this.axios.delete('/api/academics/enrollments/{id}/', params);
  }

  async api_academics_grade_components_list(params: types.paths["/api/academics/grade-components/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grade-components/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grade_components_listSchema if available
    // Example: validators.api_academics_grade_components_listSchema.parse(params);
    return this.axios.get('/api/academics/grade-components/', params);
  }

  async api_academics_grade_components_create(params: types.paths["/api/academics/grade-components/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grade-components/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grade_components_createSchema if available
    // Example: validators.api_academics_grade_components_createSchema.parse(params);
    return this.axios.post('/api/academics/grade-components/', params);
  }

  async api_academics_grade_components_retrieve(params: types.paths["/api/academics/grade-components/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grade-components/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grade_components_retrieveSchema if available
    // Example: validators.api_academics_grade_components_retrieveSchema.parse(params);
    return this.axios.get('/api/academics/grade-components/{id}/', params);
  }

  async api_academics_grade_components_update(params: types.paths["/api/academics/grade-components/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grade-components/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grade_components_updateSchema if available
    // Example: validators.api_academics_grade_components_updateSchema.parse(params);
    return this.axios.put('/api/academics/grade-components/{id}/', params);
  }

  async api_academics_grade_components_partial_update(params: types.paths["/api/academics/grade-components/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grade-components/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grade_components_partial_updateSchema if available
    // Example: validators.api_academics_grade_components_partial_updateSchema.parse(params);
    return this.axios.patch('/api/academics/grade-components/{id}/', params);
  }

  async api_academics_grade_components_destroy(params: types.paths["/api/academics/grade-components/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grade-components/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grade_components_destroySchema if available
    // Example: validators.api_academics_grade_components_destroySchema.parse(params);
    return this.axios.delete('/api/academics/grade-components/{id}/', params);
  }

  async api_academics_grades_parent_list(params: types.paths["/api/academics/grades/parent/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grades/parent/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grades_parent_listSchema if available
    // Example: validators.api_academics_grades_parent_listSchema.parse(params);
    return this.axios.get('/api/academics/grades/parent/', params);
  }

  async api_academics_grades_student_list(params: types.paths["/api/academics/grades/student/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grades/student/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grades_student_listSchema if available
    // Example: validators.api_academics_grades_student_listSchema.parse(params);
    return this.axios.get('/api/academics/grades/student/', params);
  }

  async api_academics_grades_teacher_list(params: types.paths["/api/academics/grades/teacher/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grades/teacher/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grades_teacher_listSchema if available
    // Example: validators.api_academics_grades_teacher_listSchema.parse(params);
    return this.axios.get('/api/academics/grades/teacher/', params);
  }

  async api_academics_grades_teacher_create(params: types.paths["/api/academics/grades/teacher/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grades/teacher/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grades_teacher_createSchema if available
    // Example: validators.api_academics_grades_teacher_createSchema.parse(params);
    return this.axios.post('/api/academics/grades/teacher/', params);
  }

  async api_academics_grading_scales_list(params: types.paths["/api/academics/grading-scales/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grading-scales/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grading_scales_listSchema if available
    // Example: validators.api_academics_grading_scales_listSchema.parse(params);
    return this.axios.get('/api/academics/grading-scales/', params);
  }

  async api_academics_grading_scales_create(params: types.paths["/api/academics/grading-scales/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grading-scales/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grading_scales_createSchema if available
    // Example: validators.api_academics_grading_scales_createSchema.parse(params);
    return this.axios.post('/api/academics/grading-scales/', params);
  }

  async api_academics_grading_scales_retrieve(params: types.paths["/api/academics/grading-scales/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grading-scales/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grading_scales_retrieveSchema if available
    // Example: validators.api_academics_grading_scales_retrieveSchema.parse(params);
    return this.axios.get('/api/academics/grading-scales/{id}/', params);
  }

  async api_academics_grading_scales_update(params: types.paths["/api/academics/grading-scales/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grading-scales/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grading_scales_updateSchema if available
    // Example: validators.api_academics_grading_scales_updateSchema.parse(params);
    return this.axios.put('/api/academics/grading-scales/{id}/', params);
  }

  async api_academics_grading_scales_partial_update(params: types.paths["/api/academics/grading-scales/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grading-scales/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grading_scales_partial_updateSchema if available
    // Example: validators.api_academics_grading_scales_partial_updateSchema.parse(params);
    return this.axios.patch('/api/academics/grading-scales/{id}/', params);
  }

  async api_academics_grading_scales_destroy(params: types.paths["/api/academics/grading-scales/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/grading-scales/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_grading_scales_destroySchema if available
    // Example: validators.api_academics_grading_scales_destroySchema.parse(params);
    return this.axios.delete('/api/academics/grading-scales/{id}/', params);
  }

  async api_academics_lesson_plans_teacher_list(params: types.paths["/api/academics/lesson-plans/teacher/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/lesson-plans/teacher/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_lesson_plans_teacher_listSchema if available
    // Example: validators.api_academics_lesson_plans_teacher_listSchema.parse(params);
    return this.axios.get('/api/academics/lesson-plans/teacher/', params);
  }

  async api_academics_lesson_plans_teacher_create(params: types.paths["/api/academics/lesson-plans/teacher/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/lesson-plans/teacher/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_lesson_plans_teacher_createSchema if available
    // Example: validators.api_academics_lesson_plans_teacher_createSchema.parse(params);
    return this.axios.post('/api/academics/lesson-plans/teacher/', params);
  }

  async api_academics_lesson_plans_teacher_retrieve(params: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/lesson-plans/teacher/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_lesson_plans_teacher_retrieveSchema if available
    // Example: validators.api_academics_lesson_plans_teacher_retrieveSchema.parse(params);
    return this.axios.get('/api/academics/lesson-plans/teacher/{id}/', params);
  }

  async api_academics_lesson_plans_teacher_update(params: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/lesson-plans/teacher/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_lesson_plans_teacher_updateSchema if available
    // Example: validators.api_academics_lesson_plans_teacher_updateSchema.parse(params);
    return this.axios.put('/api/academics/lesson-plans/teacher/{id}/', params);
  }

  async api_academics_lesson_plans_teacher_partial_update(params: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/lesson-plans/teacher/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_lesson_plans_teacher_partial_updateSchema if available
    // Example: validators.api_academics_lesson_plans_teacher_partial_updateSchema.parse(params);
    return this.axios.patch('/api/academics/lesson-plans/teacher/{id}/', params);
  }

  async api_academics_lesson_plans_teacher_destroy(params: types.paths["/api/academics/lesson-plans/teacher/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/lesson-plans/teacher/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_lesson_plans_teacher_destroySchema if available
    // Example: validators.api_academics_lesson_plans_teacher_destroySchema.parse(params);
    return this.axios.delete('/api/academics/lesson-plans/teacher/{id}/', params);
  }

  async api_academics_scores_list(params: types.paths["/api/academics/scores/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/scores/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_scores_listSchema if available
    // Example: validators.api_academics_scores_listSchema.parse(params);
    return this.axios.get('/api/academics/scores/', params);
  }

  async api_academics_scores_create(params: types.paths["/api/academics/scores/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/scores/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_scores_createSchema if available
    // Example: validators.api_academics_scores_createSchema.parse(params);
    return this.axios.post('/api/academics/scores/', params);
  }

  async api_academics_scores_retrieve(params: types.paths["/api/academics/scores/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/scores/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_scores_retrieveSchema if available
    // Example: validators.api_academics_scores_retrieveSchema.parse(params);
    return this.axios.get('/api/academics/scores/{id}/', params);
  }

  async api_academics_scores_update(params: types.paths["/api/academics/scores/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/scores/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_scores_updateSchema if available
    // Example: validators.api_academics_scores_updateSchema.parse(params);
    return this.axios.put('/api/academics/scores/{id}/', params);
  }

  async api_academics_scores_partial_update(params: types.paths["/api/academics/scores/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/scores/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_scores_partial_updateSchema if available
    // Example: validators.api_academics_scores_partial_updateSchema.parse(params);
    return this.axios.patch('/api/academics/scores/{id}/', params);
  }

  async api_academics_scores_destroy(params: types.paths["/api/academics/scores/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/scores/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_scores_destroySchema if available
    // Example: validators.api_academics_scores_destroySchema.parse(params);
    return this.axios.delete('/api/academics/scores/{id}/', params);
  }

  async api_academics_student_enrollments_list(params: types.paths["/api/academics/student/enrollments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/student/enrollments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_student_enrollments_listSchema if available
    // Example: validators.api_academics_student_enrollments_listSchema.parse(params);
    return this.axios.get('/api/academics/student/enrollments/', params);
  }

  async api_academics_student_enrollments_create(params: types.paths["/api/academics/student/enrollments/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/student/enrollments/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_student_enrollments_createSchema if available
    // Example: validators.api_academics_student_enrollments_createSchema.parse(params);
    return this.axios.post('/api/academics/student/enrollments/', params);
  }

  async api_academics_student_enrollments_retrieve(params: types.paths["/api/academics/student/enrollments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/student/enrollments/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_student_enrollments_retrieveSchema if available
    // Example: validators.api_academics_student_enrollments_retrieveSchema.parse(params);
    return this.axios.get('/api/academics/student/enrollments/{id}/', params);
  }

  async api_academics_student_enrollments_destroy(params: types.paths["/api/academics/student/enrollments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/academics/student/enrollments/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_academics_student_enrollments_destroySchema if available
    // Example: validators.api_academics_student_enrollments_destroySchema.parse(params);
    return this.axios.delete('/api/academics/student/enrollments/{id}/', params);
  }

  async api_accountants_fees_list(params: types.paths["/api/accountants/fees/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/accountants/fees/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_accountants_fees_listSchema if available
    // Example: validators.api_accountants_fees_listSchema.parse(params);
    return this.axios.get('/api/accountants/fees/', params);
  }

  async api_accountants_fees_retrieve(params: types.paths["/api/accountants/fees/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/accountants/fees/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_accountants_fees_retrieveSchema if available
    // Example: validators.api_accountants_fees_retrieveSchema.parse(params);
    return this.axios.get('/api/accountants/fees/{id}/', params);
  }

  async api_accountants_financial_report_list(params: types.paths["/api/accountants/financial-report/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/accountants/financial-report/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_accountants_financial_report_listSchema if available
    // Example: validators.api_accountants_financial_report_listSchema.parse(params);
    return this.axios.get('/api/accountants/financial-report/', params);
  }

  async api_accountants_payments_list(params: types.paths["/api/accountants/payments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/accountants/payments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_accountants_payments_listSchema if available
    // Example: validators.api_accountants_payments_listSchema.parse(params);
    return this.axios.get('/api/accountants/payments/', params);
  }

  async api_accountants_payments_retrieve(params: types.paths["/api/accountants/payments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/accountants/payments/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_accountants_payments_retrieveSchema if available
    // Example: validators.api_accountants_payments_retrieveSchema.parse(params);
    return this.axios.get('/api/accountants/payments/{id}/', params);
  }

  async api_auth_login_create(params: types.paths["/api/auth/login/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/auth/login/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_auth_login_createSchema if available
    // Example: validators.api_auth_login_createSchema.parse(params);
    return this.axios.post('/api/auth/login/', params);
  }

  async api_auth_logout_create(params: types.paths["/api/auth/logout/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/auth/logout/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_auth_logout_createSchema if available
    // Example: validators.api_auth_logout_createSchema.parse(params);
    return this.axios.post('/api/auth/logout/', params);
  }

  async api_communications_bulk_messages_list(params: types.paths["/api/communications/bulk-messages/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/bulk-messages/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_bulk_messages_listSchema if available
    // Example: validators.api_communications_bulk_messages_listSchema.parse(params);
    return this.axios.get('/api/communications/bulk-messages/', params);
  }

  async api_communications_bulk_messages_create(params: types.paths["/api/communications/bulk-messages/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/bulk-messages/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_bulk_messages_createSchema if available
    // Example: validators.api_communications_bulk_messages_createSchema.parse(params);
    return this.axios.post('/api/communications/bulk-messages/', params);
  }

  async api_communications_bulk_messages_retrieve(params: types.paths["/api/communications/bulk-messages/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/bulk-messages/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_bulk_messages_retrieveSchema if available
    // Example: validators.api_communications_bulk_messages_retrieveSchema.parse(params);
    return this.axios.get('/api/communications/bulk-messages/{id}/', params);
  }

  async api_communications_bulk_messages_update(params: types.paths["/api/communications/bulk-messages/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/bulk-messages/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_bulk_messages_updateSchema if available
    // Example: validators.api_communications_bulk_messages_updateSchema.parse(params);
    return this.axios.put('/api/communications/bulk-messages/{id}/', params);
  }

  async api_communications_bulk_messages_partial_update(params: types.paths["/api/communications/bulk-messages/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/bulk-messages/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_bulk_messages_partial_updateSchema if available
    // Example: validators.api_communications_bulk_messages_partial_updateSchema.parse(params);
    return this.axios.patch('/api/communications/bulk-messages/{id}/', params);
  }

  async api_communications_bulk_messages_destroy(params: types.paths["/api/communications/bulk-messages/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/bulk-messages/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_bulk_messages_destroySchema if available
    // Example: validators.api_communications_bulk_messages_destroySchema.parse(params);
    return this.axios.delete('/api/communications/bulk-messages/{id}/', params);
  }

  async api_communications_messages_list(params: types.paths["/api/communications/messages/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/messages/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_messages_listSchema if available
    // Example: validators.api_communications_messages_listSchema.parse(params);
    return this.axios.get('/api/communications/messages/', params);
  }

  async api_communications_messages_create(params: types.paths["/api/communications/messages/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/messages/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_messages_createSchema if available
    // Example: validators.api_communications_messages_createSchema.parse(params);
    return this.axios.post('/api/communications/messages/', params);
  }

  async api_communications_messages_retrieve(params: types.paths["/api/communications/messages/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/messages/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_messages_retrieveSchema if available
    // Example: validators.api_communications_messages_retrieveSchema.parse(params);
    return this.axios.get('/api/communications/messages/{id}/', params);
  }

  async api_communications_messages_update(params: types.paths["/api/communications/messages/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/messages/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_messages_updateSchema if available
    // Example: validators.api_communications_messages_updateSchema.parse(params);
    return this.axios.put('/api/communications/messages/{id}/', params);
  }

  async api_communications_messages_partial_update(params: types.paths["/api/communications/messages/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/messages/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_messages_partial_updateSchema if available
    // Example: validators.api_communications_messages_partial_updateSchema.parse(params);
    return this.axios.patch('/api/communications/messages/{id}/', params);
  }

  async api_communications_messages_destroy(params: types.paths["/api/communications/messages/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/communications/messages/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_communications_messages_destroySchema if available
    // Example: validators.api_communications_messages_destroySchema.parse(params);
    return this.axios.delete('/api/communications/messages/{id}/', params);
  }

  async api_counselors_sessions_list(params: types.paths["/api/counselors/sessions/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/counselors/sessions/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_counselors_sessions_listSchema if available
    // Example: validators.api_counselors_sessions_listSchema.parse(params);
    return this.axios.get('/api/counselors/sessions/', params);
  }

  async api_counselors_sessions_create(params: types.paths["/api/counselors/sessions/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/counselors/sessions/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_counselors_sessions_createSchema if available
    // Example: validators.api_counselors_sessions_createSchema.parse(params);
    return this.axios.post('/api/counselors/sessions/', params);
  }

  async api_counselors_sessions_retrieve(params: types.paths["/api/counselors/sessions/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/counselors/sessions/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_counselors_sessions_retrieveSchema if available
    // Example: validators.api_counselors_sessions_retrieveSchema.parse(params);
    return this.axios.get('/api/counselors/sessions/{id}/', params);
  }

  async api_counselors_sessions_update(params: types.paths["/api/counselors/sessions/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/counselors/sessions/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_counselors_sessions_updateSchema if available
    // Example: validators.api_counselors_sessions_updateSchema.parse(params);
    return this.axios.put('/api/counselors/sessions/{id}/', params);
  }

  async api_counselors_sessions_partial_update(params: types.paths["/api/counselors/sessions/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/counselors/sessions/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_counselors_sessions_partial_updateSchema if available
    // Example: validators.api_counselors_sessions_partial_updateSchema.parse(params);
    return this.axios.patch('/api/counselors/sessions/{id}/', params);
  }

  async api_counselors_sessions_destroy(params: types.paths["/api/counselors/sessions/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/counselors/sessions/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_counselors_sessions_destroySchema if available
    // Example: validators.api_counselors_sessions_destroySchema.parse(params);
    return this.axios.delete('/api/counselors/sessions/{id}/', params);
  }

  async api_counselors_students_list(params: types.paths["/api/counselors/students/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/counselors/students/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_counselors_students_listSchema if available
    // Example: validators.api_counselors_students_listSchema.parse(params);
    return this.axios.get('/api/counselors/students/', params);
  }

  async api_counselors_students_retrieve(params: types.paths["/api/counselors/students/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/counselors/students/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_counselors_students_retrieveSchema if available
    // Example: validators.api_counselors_students_retrieveSchema.parse(params);
    return this.axios.get('/api/counselors/students/{id}/', params);
  }

  async api_custom_tables_fields_list(params: types.paths["/api/custom_tables/fields/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/fields/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_fields_listSchema if available
    // Example: validators.api_custom_tables_fields_listSchema.parse(params);
    return this.axios.get('/api/custom_tables/fields/', params);
  }

  async api_custom_tables_fields_create(params: types.paths["/api/custom_tables/fields/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/fields/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_fields_createSchema if available
    // Example: validators.api_custom_tables_fields_createSchema.parse(params);
    return this.axios.post('/api/custom_tables/fields/', params);
  }

  async api_custom_tables_fields_retrieve(params: types.paths["/api/custom_tables/fields/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/fields/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_fields_retrieveSchema if available
    // Example: validators.api_custom_tables_fields_retrieveSchema.parse(params);
    return this.axios.get('/api/custom_tables/fields/{id}/', params);
  }

  async api_custom_tables_fields_update(params: types.paths["/api/custom_tables/fields/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/fields/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_fields_updateSchema if available
    // Example: validators.api_custom_tables_fields_updateSchema.parse(params);
    return this.axios.put('/api/custom_tables/fields/{id}/', params);
  }

  async api_custom_tables_fields_partial_update(params: types.paths["/api/custom_tables/fields/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/fields/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_fields_partial_updateSchema if available
    // Example: validators.api_custom_tables_fields_partial_updateSchema.parse(params);
    return this.axios.patch('/api/custom_tables/fields/{id}/', params);
  }

  async api_custom_tables_fields_destroy(params: types.paths["/api/custom_tables/fields/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/fields/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_fields_destroySchema if available
    // Example: validators.api_custom_tables_fields_destroySchema.parse(params);
    return this.axios.delete('/api/custom_tables/fields/{id}/', params);
  }

  async api_custom_tables_tables_list(params: types.paths["/api/custom_tables/tables/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/tables/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_tables_listSchema if available
    // Example: validators.api_custom_tables_tables_listSchema.parse(params);
    return this.axios.get('/api/custom_tables/tables/', params);
  }

  async api_custom_tables_tables_create(params: types.paths["/api/custom_tables/tables/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/tables/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_tables_createSchema if available
    // Example: validators.api_custom_tables_tables_createSchema.parse(params);
    return this.axios.post('/api/custom_tables/tables/', params);
  }

  async api_custom_tables_tables_retrieve(params: types.paths["/api/custom_tables/tables/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/tables/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_tables_retrieveSchema if available
    // Example: validators.api_custom_tables_tables_retrieveSchema.parse(params);
    return this.axios.get('/api/custom_tables/tables/{id}/', params);
  }

  async api_custom_tables_tables_update(params: types.paths["/api/custom_tables/tables/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/tables/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_tables_updateSchema if available
    // Example: validators.api_custom_tables_tables_updateSchema.parse(params);
    return this.axios.put('/api/custom_tables/tables/{id}/', params);
  }

  async api_custom_tables_tables_partial_update(params: types.paths["/api/custom_tables/tables/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/tables/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_tables_partial_updateSchema if available
    // Example: validators.api_custom_tables_tables_partial_updateSchema.parse(params);
    return this.axios.patch('/api/custom_tables/tables/{id}/', params);
  }

  async api_custom_tables_tables_destroy(params: types.paths["/api/custom_tables/tables/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/custom_tables/tables/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_custom_tables_tables_destroySchema if available
    // Example: validators.api_custom_tables_tables_destroySchema.parse(params);
    return this.axios.delete('/api/custom_tables/tables/{id}/', params);
  }

  async api_dashboard_retrieve(params: types.paths["/api/dashboard/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/dashboard/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_dashboard_retrieveSchema if available
    // Example: validators.api_dashboard_retrieveSchema.parse(params);
    return this.axios.get('/api/dashboard/', params);
  }

  async api_fees_fees_list(params: types.paths["/api/fees/fees/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/fees/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_fees_listSchema if available
    // Example: validators.api_fees_fees_listSchema.parse(params);
    return this.axios.get('/api/fees/fees/', params);
  }

  async api_fees_fees_create(params: types.paths["/api/fees/fees/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/fees/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_fees_createSchema if available
    // Example: validators.api_fees_fees_createSchema.parse(params);
    return this.axios.post('/api/fees/fees/', params);
  }

  async api_fees_fees_retrieve(params: types.paths["/api/fees/fees/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/fees/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_fees_retrieveSchema if available
    // Example: validators.api_fees_fees_retrieveSchema.parse(params);
    return this.axios.get('/api/fees/fees/{id}/', params);
  }

  async api_fees_fees_update(params: types.paths["/api/fees/fees/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/fees/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_fees_updateSchema if available
    // Example: validators.api_fees_fees_updateSchema.parse(params);
    return this.axios.put('/api/fees/fees/{id}/', params);
  }

  async api_fees_fees_partial_update(params: types.paths["/api/fees/fees/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/fees/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_fees_partial_updateSchema if available
    // Example: validators.api_fees_fees_partial_updateSchema.parse(params);
    return this.axios.patch('/api/fees/fees/{id}/', params);
  }

  async api_fees_fees_destroy(params: types.paths["/api/fees/fees/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/fees/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_fees_destroySchema if available
    // Example: validators.api_fees_fees_destroySchema.parse(params);
    return this.axios.delete('/api/fees/fees/{id}/', params);
  }

  async api_fees_parent_payments_list(params: types.paths["/api/fees/parent/payments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/parent/payments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_parent_payments_listSchema if available
    // Example: validators.api_fees_parent_payments_listSchema.parse(params);
    return this.axios.get('/api/fees/parent/payments/', params);
  }

  async api_fees_parent_students_unpaid_fees_list(params: types.paths["/api/fees/parent/students/{student_id}/unpaid-fees/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/parent/students/{student_id}/unpaid-fees/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_parent_students_unpaid_fees_listSchema if available
    // Example: validators.api_fees_parent_students_unpaid_fees_listSchema.parse(params);
    return this.axios.get('/api/fees/parent/students/{student_id}/unpaid-fees/', params);
  }

  async api_fees_payments_list(params: types.paths["/api/fees/payments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/payments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_payments_listSchema if available
    // Example: validators.api_fees_payments_listSchema.parse(params);
    return this.axios.get('/api/fees/payments/', params);
  }

  async api_fees_payments_create(params: types.paths["/api/fees/payments/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/payments/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_payments_createSchema if available
    // Example: validators.api_fees_payments_createSchema.parse(params);
    return this.axios.post('/api/fees/payments/', params);
  }

  async api_fees_payments_retrieve(params: types.paths["/api/fees/payments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/payments/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_payments_retrieveSchema if available
    // Example: validators.api_fees_payments_retrieveSchema.parse(params);
    return this.axios.get('/api/fees/payments/{id}/', params);
  }

  async api_fees_payments_update(params: types.paths["/api/fees/payments/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/payments/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_payments_updateSchema if available
    // Example: validators.api_fees_payments_updateSchema.parse(params);
    return this.axios.put('/api/fees/payments/{id}/', params);
  }

  async api_fees_payments_partial_update(params: types.paths["/api/fees/payments/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/payments/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_payments_partial_updateSchema if available
    // Example: validators.api_fees_payments_partial_updateSchema.parse(params);
    return this.axios.patch('/api/fees/payments/{id}/', params);
  }

  async api_fees_payments_destroy(params: types.paths["/api/fees/payments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/fees/payments/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_fees_payments_destroySchema if available
    // Example: validators.api_fees_payments_destroySchema.parse(params);
    return this.axios.delete('/api/fees/payments/{id}/', params);
  }

  async api_librarians_books_list(params: types.paths["/api/librarians/books/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/books/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_books_listSchema if available
    // Example: validators.api_librarians_books_listSchema.parse(params);
    return this.axios.get('/api/librarians/books/', params);
  }

  async api_librarians_books_create(params: types.paths["/api/librarians/books/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/books/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_books_createSchema if available
    // Example: validators.api_librarians_books_createSchema.parse(params);
    return this.axios.post('/api/librarians/books/', params);
  }

  async api_librarians_books_retrieve(params: types.paths["/api/librarians/books/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/books/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_books_retrieveSchema if available
    // Example: validators.api_librarians_books_retrieveSchema.parse(params);
    return this.axios.get('/api/librarians/books/{id}/', params);
  }

  async api_librarians_books_update(params: types.paths["/api/librarians/books/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/books/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_books_updateSchema if available
    // Example: validators.api_librarians_books_updateSchema.parse(params);
    return this.axios.put('/api/librarians/books/{id}/', params);
  }

  async api_librarians_books_partial_update(params: types.paths["/api/librarians/books/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/books/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_books_partial_updateSchema if available
    // Example: validators.api_librarians_books_partial_updateSchema.parse(params);
    return this.axios.patch('/api/librarians/books/{id}/', params);
  }

  async api_librarians_books_destroy(params: types.paths["/api/librarians/books/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/books/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_books_destroySchema if available
    // Example: validators.api_librarians_books_destroySchema.parse(params);
    return this.axios.delete('/api/librarians/books/{id}/', params);
  }

  async api_librarians_borrowing_records_list(params: types.paths["/api/librarians/borrowing-records/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/borrowing-records/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_borrowing_records_listSchema if available
    // Example: validators.api_librarians_borrowing_records_listSchema.parse(params);
    return this.axios.get('/api/librarians/borrowing-records/', params);
  }

  async api_librarians_borrowing_records_create(params: types.paths["/api/librarians/borrowing-records/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/borrowing-records/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_borrowing_records_createSchema if available
    // Example: validators.api_librarians_borrowing_records_createSchema.parse(params);
    return this.axios.post('/api/librarians/borrowing-records/', params);
  }

  async api_librarians_borrowing_records_retrieve(params: types.paths["/api/librarians/borrowing-records/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/borrowing-records/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_borrowing_records_retrieveSchema if available
    // Example: validators.api_librarians_borrowing_records_retrieveSchema.parse(params);
    return this.axios.get('/api/librarians/borrowing-records/{id}/', params);
  }

  async api_librarians_borrowing_records_update(params: types.paths["/api/librarians/borrowing-records/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/borrowing-records/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_borrowing_records_updateSchema if available
    // Example: validators.api_librarians_borrowing_records_updateSchema.parse(params);
    return this.axios.put('/api/librarians/borrowing-records/{id}/', params);
  }

  async api_librarians_borrowing_records_partial_update(params: types.paths["/api/librarians/borrowing-records/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/borrowing-records/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_borrowing_records_partial_updateSchema if available
    // Example: validators.api_librarians_borrowing_records_partial_updateSchema.parse(params);
    return this.axios.patch('/api/librarians/borrowing-records/{id}/', params);
  }

  async api_librarians_borrowing_records_destroy(params: types.paths["/api/librarians/borrowing-records/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/borrowing-records/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_borrowing_records_destroySchema if available
    // Example: validators.api_librarians_borrowing_records_destroySchema.parse(params);
    return this.axios.delete('/api/librarians/borrowing-records/{id}/', params);
  }

  async api_librarians_overdue_books_list(params: types.paths["/api/librarians/overdue-books/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/librarians/overdue-books/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_librarians_overdue_books_listSchema if available
    // Example: validators.api_librarians_overdue_books_listSchema.parse(params);
    return this.axios.get('/api/librarians/overdue-books/', params);
  }

  async api_reports_attendance_list(params: types.paths["/api/reports/attendance/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/attendance/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_attendance_listSchema if available
    // Example: validators.api_reports_attendance_listSchema.parse(params);
    return this.axios.get('/api/reports/attendance/', params);
  }

  async api_reports_classes_list(params: types.paths["/api/reports/classes/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/classes/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_classes_listSchema if available
    // Example: validators.api_reports_classes_listSchema.parse(params);
    return this.axios.get('/api/reports/classes/', params);
  }

  async api_reports_courses_list(params: types.paths["/api/reports/courses/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/courses/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_courses_listSchema if available
    // Example: validators.api_reports_courses_listSchema.parse(params);
    return this.axios.get('/api/reports/courses/', params);
  }

  async api_reports_custom_retrieve(params: types.paths["/api/reports/custom/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/custom/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_custom_retrieveSchema if available
    // Example: validators.api_reports_custom_retrieveSchema.parse(params);
    return this.axios.get('/api/reports/custom/', params);
  }

  async api_reports_custom_create(params: types.paths["/api/reports/custom/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/custom/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_custom_createSchema if available
    // Example: validators.api_reports_custom_createSchema.parse(params);
    return this.axios.post('/api/reports/custom/', params);
  }

  async api_reports_download_report_card_retrieve(params: types.paths["/api/reports/download-report-card/{report_card_id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/download-report-card/{report_card_id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_download_report_card_retrieveSchema if available
    // Example: validators.api_reports_download_report_card_retrieveSchema.parse(params);
    return this.axios.get('/api/reports/download-report-card/{report_card_id}/', params);
  }

  async api_reports_enrollment_list(params: types.paths["/api/reports/enrollment/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/enrollment/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_enrollment_listSchema if available
    // Example: validators.api_reports_enrollment_listSchema.parse(params);
    return this.axios.get('/api/reports/enrollment/', params);
  }

  async api_reports_fees_list(params: types.paths["/api/reports/fees/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/fees/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_fees_listSchema if available
    // Example: validators.api_reports_fees_listSchema.parse(params);
    return this.axios.get('/api/reports/fees/', params);
  }

  async api_reports_financial_list(params: types.paths["/api/reports/financial/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/financial/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_financial_listSchema if available
    // Example: validators.api_reports_financial_listSchema.parse(params);
    return this.axios.get('/api/reports/financial/', params);
  }

  async api_reports_generate_report_card_create(params: types.paths["/api/reports/generate-report-card/{student_id}/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/generate-report-card/{student_id}/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_generate_report_card_createSchema if available
    // Example: validators.api_reports_generate_report_card_createSchema.parse(params);
    return this.axios.post('/api/reports/generate-report-card/{student_id}/', params);
  }

  async api_reports_payments_list(params: types.paths["/api/reports/payments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/payments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_payments_listSchema if available
    // Example: validators.api_reports_payments_listSchema.parse(params);
    return this.axios.get('/api/reports/payments/', params);
  }

  async api_reports_staff_list(params: types.paths["/api/reports/staff/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/staff/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_staff_listSchema if available
    // Example: validators.api_reports_staff_listSchema.parse(params);
    return this.axios.get('/api/reports/staff/', params);
  }

  async api_reports_student_performance_list(params: types.paths["/api/reports/student-performance/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/student-performance/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_student_performance_listSchema if available
    // Example: validators.api_reports_student_performance_listSchema.parse(params);
    return this.axios.get('/api/reports/student-performance/', params);
  }

  async api_reports_students_list(params: types.paths["/api/reports/students/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/reports/students/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_reports_students_listSchema if available
    // Example: validators.api_reports_students_listSchema.parse(params);
    return this.axios.get('/api/reports/students/', params);
  }

  async api_staff_list(params: types.paths["/api/staff/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_listSchema if available
    // Example: validators.api_staff_listSchema.parse(params);
    return this.axios.get('/api/staff/', params);
  }

  async api_staff_create(params: types.paths["/api/staff/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_createSchema if available
    // Example: validators.api_staff_createSchema.parse(params);
    return this.axios.post('/api/staff/', params);
  }

  async api_staff_retrieve(params: types.paths["/api/staff/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_retrieveSchema if available
    // Example: validators.api_staff_retrieveSchema.parse(params);
    return this.axios.get('/api/staff/{id}/', params);
  }

  async api_staff_update(params: types.paths["/api/staff/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_updateSchema if available
    // Example: validators.api_staff_updateSchema.parse(params);
    return this.axios.put('/api/staff/{id}/', params);
  }

  async api_staff_partial_update(params: types.paths["/api/staff/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_partial_updateSchema if available
    // Example: validators.api_staff_partial_updateSchema.parse(params);
    return this.axios.patch('/api/staff/{id}/', params);
  }

  async api_staff_destroy(params: types.paths["/api/staff/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_destroySchema if available
    // Example: validators.api_staff_destroySchema.parse(params);
    return this.axios.delete('/api/staff/{id}/', params);
  }

  async api_staff_payroll_list(params: types.paths["/api/staff/payroll/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/payroll/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_payroll_listSchema if available
    // Example: validators.api_staff_payroll_listSchema.parse(params);
    return this.axios.get('/api/staff/payroll/', params);
  }

  async api_staff_payroll_create(params: types.paths["/api/staff/payroll/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/payroll/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_payroll_createSchema if available
    // Example: validators.api_staff_payroll_createSchema.parse(params);
    return this.axios.post('/api/staff/payroll/', params);
  }

  async api_staff_payroll_retrieve(params: types.paths["/api/staff/payroll/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/payroll/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_payroll_retrieveSchema if available
    // Example: validators.api_staff_payroll_retrieveSchema.parse(params);
    return this.axios.get('/api/staff/payroll/{id}/', params);
  }

  async api_staff_payroll_update(params: types.paths["/api/staff/payroll/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/payroll/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_payroll_updateSchema if available
    // Example: validators.api_staff_payroll_updateSchema.parse(params);
    return this.axios.put('/api/staff/payroll/{id}/', params);
  }

  async api_staff_payroll_partial_update(params: types.paths["/api/staff/payroll/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/payroll/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_payroll_partial_updateSchema if available
    // Example: validators.api_staff_payroll_partial_updateSchema.parse(params);
    return this.axios.patch('/api/staff/payroll/{id}/', params);
  }

  async api_staff_payroll_destroy(params: types.paths["/api/staff/payroll/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/staff/payroll/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_staff_payroll_destroySchema if available
    // Example: validators.api_staff_payroll_destroySchema.parse(params);
    return this.axios.delete('/api/staff/payroll/{id}/', params);
  }

  async api_students_list(params: types.paths["/api/students/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_listSchema if available
    // Example: validators.api_students_listSchema.parse(params);
    return this.axios.get('/api/students/', params);
  }

  async api_students_create(params: types.paths["/api/students/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_createSchema if available
    // Example: validators.api_students_createSchema.parse(params);
    return this.axios.post('/api/students/', params);
  }

  async api_students_retrieve(params: types.paths["/api/students/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_retrieveSchema if available
    // Example: validators.api_students_retrieveSchema.parse(params);
    return this.axios.get('/api/students/{id}/', params);
  }

  async api_students_update(params: types.paths["/api/students/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_updateSchema if available
    // Example: validators.api_students_updateSchema.parse(params);
    return this.axios.put('/api/students/{id}/', params);
  }

  async api_students_partial_update(params: types.paths["/api/students/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_partial_updateSchema if available
    // Example: validators.api_students_partial_updateSchema.parse(params);
    return this.axios.patch('/api/students/{id}/', params);
  }

  async api_students_destroy(params: types.paths["/api/students/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_destroySchema if available
    // Example: validators.api_students_destroySchema.parse(params);
    return this.axios.delete('/api/students/{id}/', params);
  }

  async api_students_applications_list(params: types.paths["/api/students/applications/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/applications/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_applications_listSchema if available
    // Example: validators.api_students_applications_listSchema.parse(params);
    return this.axios.get('/api/students/applications/', params);
  }

  async api_students_applications_create(params: types.paths["/api/students/applications/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/applications/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_applications_createSchema if available
    // Example: validators.api_students_applications_createSchema.parse(params);
    return this.axios.post('/api/students/applications/', params);
  }

  async api_students_applications_retrieve(params: types.paths["/api/students/applications/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/applications/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_applications_retrieveSchema if available
    // Example: validators.api_students_applications_retrieveSchema.parse(params);
    return this.axios.get('/api/students/applications/{id}/', params);
  }

  async api_students_applications_update(params: types.paths["/api/students/applications/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/applications/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_applications_updateSchema if available
    // Example: validators.api_students_applications_updateSchema.parse(params);
    return this.axios.put('/api/students/applications/{id}/', params);
  }

  async api_students_applications_partial_update(params: types.paths["/api/students/applications/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/applications/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_applications_partial_updateSchema if available
    // Example: validators.api_students_applications_partial_updateSchema.parse(params);
    return this.axios.patch('/api/students/applications/{id}/', params);
  }

  async api_students_applications_destroy(params: types.paths["/api/students/applications/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/students/applications/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_students_applications_destroySchema if available
    // Example: validators.api_students_applications_destroySchema.parse(params);
    return this.axios.delete('/api/students/applications/{id}/', params);
  }

  async api_token_refresh_create(params: types.paths["/api/token/refresh/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/token/refresh/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_token_refresh_createSchema if available
    // Example: validators.api_token_refresh_createSchema.parse(params);
    return this.axios.post('/api/token/refresh/', params);
  }

  async api_users_list(params: types.paths["/api/users/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_listSchema if available
    // Example: validators.api_users_listSchema.parse(params);
    return this.axios.get('/api/users/', params);
  }

  async api_users_create(params: types.paths["/api/users/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_createSchema if available
    // Example: validators.api_users_createSchema.parse(params);
    return this.axios.post('/api/users/', params);
  }

  async api_users_retrieve(params: types.paths["/api/users/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_retrieveSchema if available
    // Example: validators.api_users_retrieveSchema.parse(params);
    return this.axios.get('/api/users/{id}/', params);
  }

  async api_users_update(params: types.paths["/api/users/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_updateSchema if available
    // Example: validators.api_users_updateSchema.parse(params);
    return this.axios.put('/api/users/{id}/', params);
  }

  async api_users_partial_update(params: types.paths["/api/users/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_partial_updateSchema if available
    // Example: validators.api_users_partial_updateSchema.parse(params);
    return this.axios.patch('/api/users/{id}/', params);
  }

  async api_users_destroy(params: types.paths["/api/users/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_destroySchema if available
    // Example: validators.api_users_destroySchema.parse(params);
    return this.axios.delete('/api/users/{id}/', params);
  }

  async api_users_profile_retrieve(params: types.paths["/api/users/{id}/profile/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/{id}/profile/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_profile_retrieveSchema if available
    // Example: validators.api_users_profile_retrieveSchema.parse(params);
    return this.axios.get('/api/users/{id}/profile/', params);
  }

  async api_users_login_create(params: types.paths["/api/users/login/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/login/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_login_createSchema if available
    // Example: validators.api_users_login_createSchema.parse(params);
    return this.axios.post('/api/users/login/', params);
  }

  async api_users_logout_create(params: types.paths["/api/users/logout/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/logout/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_logout_createSchema if available
    // Example: validators.api_users_logout_createSchema.parse(params);
    return this.axios.post('/api/users/logout/', params);
  }

  async api_users_me_retrieve(params: types.paths["/api/users/me/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/me/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_me_retrieveSchema if available
    // Example: validators.api_users_me_retrieveSchema.parse(params);
    return this.axios.get('/api/users/me/', params);
  }

  async api_users_me_update(params: types.paths["/api/users/me/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/me/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_me_updateSchema if available
    // Example: validators.api_users_me_updateSchema.parse(params);
    return this.axios.put('/api/users/me/', params);
  }

  async api_users_me_partial_update(params: types.paths["/api/users/me/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/me/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_me_partial_updateSchema if available
    // Example: validators.api_users_me_partial_updateSchema.parse(params);
    return this.axios.patch('/api/users/me/', params);
  }

  async api_users_parent_children_list(params: types.paths["/api/users/parent/children/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_listSchema if available
    // Example: validators.api_users_parent_children_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/', params);
  }

  async api_users_parent_children_retrieve(params: types.paths["/api/users/parent/children/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_retrieveSchema if available
    // Example: validators.api_users_parent_children_retrieveSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{id}/', params);
  }

  async api_users_parent_children_assignments_list(params: types.paths["/api/users/parent/children/{student_id}/assignments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/assignments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_assignments_listSchema if available
    // Example: validators.api_users_parent_children_assignments_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/assignments/', params);
  }

  async api_users_parent_children_attendance_list(params: types.paths["/api/users/parent/children/{student_id}/attendance/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/attendance/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_attendance_listSchema if available
    // Example: validators.api_users_parent_children_attendance_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/attendance/', params);
  }

  async api_users_parent_children_classes_list(params: types.paths["/api/users/parent/children/{student_id}/classes/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/classes/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_classes_listSchema if available
    // Example: validators.api_users_parent_children_classes_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/classes/', params);
  }

  async api_users_parent_children_enrollments_list(params: types.paths["/api/users/parent/children/{student_id}/enrollments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/enrollments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_enrollments_listSchema if available
    // Example: validators.api_users_parent_children_enrollments_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/enrollments/', params);
  }

  async api_users_parent_children_fees_fees_list(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/fees/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_fees_listSchema if available
    // Example: validators.api_users_parent_children_fees_fees_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/fees/fees/', params);
  }

  async api_users_parent_children_fees_fees_create(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/fees/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_fees_createSchema if available
    // Example: validators.api_users_parent_children_fees_fees_createSchema.parse(params);
    return this.axios.post('/api/users/parent/children/{student_id}/fees/fees/', params);
  }

  async api_users_parent_children_fees_fees_retrieve(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_fees_retrieveSchema if available
    // Example: validators.api_users_parent_children_fees_fees_retrieveSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/fees/fees/{id}/', params);
  }

  async api_users_parent_children_fees_fees_update(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_fees_updateSchema if available
    // Example: validators.api_users_parent_children_fees_fees_updateSchema.parse(params);
    return this.axios.put('/api/users/parent/children/{student_id}/fees/fees/{id}/', params);
  }

  async api_users_parent_children_fees_fees_partial_update(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_fees_partial_updateSchema if available
    // Example: validators.api_users_parent_children_fees_fees_partial_updateSchema.parse(params);
    return this.axios.patch('/api/users/parent/children/{student_id}/fees/fees/{id}/', params);
  }

  async api_users_parent_children_fees_fees_destroy(params: types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/fees/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_fees_destroySchema if available
    // Example: validators.api_users_parent_children_fees_fees_destroySchema.parse(params);
    return this.axios.delete('/api/users/parent/children/{student_id}/fees/fees/{id}/', params);
  }

  async api_users_parent_children_fees_parent_payments_list(params: types.paths["/api/users/parent/children/{student_id}/fees/parent/payments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/parent/payments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_parent_payments_listSchema if available
    // Example: validators.api_users_parent_children_fees_parent_payments_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/fees/parent/payments/', params);
  }

  async api_users_parent_children_fees_parent_students_unpaid_fees_list(params: types.paths["/api/users/parent/children/{student_id}/fees/parent/students/{student_id}/unpaid-fees/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/parent/students/{student_id}/unpaid-fees/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_parent_students_unpaid_fees_listSchema if available
    // Example: validators.api_users_parent_children_fees_parent_students_unpaid_fees_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/fees/parent/students/{student_id}/unpaid-fees/', params);
  }

  async api_users_parent_children_fees_payments_list(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/payments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_payments_listSchema if available
    // Example: validators.api_users_parent_children_fees_payments_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/fees/payments/', params);
  }

  async api_users_parent_children_fees_payments_create(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/payments/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_payments_createSchema if available
    // Example: validators.api_users_parent_children_fees_payments_createSchema.parse(params);
    return this.axios.post('/api/users/parent/children/{student_id}/fees/payments/', params);
  }

  async api_users_parent_children_fees_payments_retrieve(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_payments_retrieveSchema if available
    // Example: validators.api_users_parent_children_fees_payments_retrieveSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/fees/payments/{id}/', params);
  }

  async api_users_parent_children_fees_payments_update(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_payments_updateSchema if available
    // Example: validators.api_users_parent_children_fees_payments_updateSchema.parse(params);
    return this.axios.put('/api/users/parent/children/{student_id}/fees/payments/{id}/', params);
  }

  async api_users_parent_children_fees_payments_partial_update(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_payments_partial_updateSchema if available
    // Example: validators.api_users_parent_children_fees_payments_partial_updateSchema.parse(params);
    return this.axios.patch('/api/users/parent/children/{student_id}/fees/payments/{id}/', params);
  }

  async api_users_parent_children_fees_payments_destroy(params: types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/fees/payments/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_fees_payments_destroySchema if available
    // Example: validators.api_users_parent_children_fees_payments_destroySchema.parse(params);
    return this.axios.delete('/api/users/parent/children/{student_id}/fees/payments/{id}/', params);
  }

  async api_users_parent_children_grades_list(params: types.paths["/api/users/parent/children/{student_id}/grades/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/grades/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_grades_listSchema if available
    // Example: validators.api_users_parent_children_grades_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/grades/', params);
  }

  async api_users_parent_children_unpaid_fees_list(params: types.paths["/api/users/parent/children/{student_id}/unpaid-fees/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/children/{student_id}/unpaid-fees/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_children_unpaid_fees_listSchema if available
    // Example: validators.api_users_parent_children_unpaid_fees_listSchema.parse(params);
    return this.axios.get('/api/users/parent/children/{student_id}/unpaid-fees/', params);
  }

  async api_users_parent_payments_list(params: types.paths["/api/users/parent/payments/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parent/payments/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parent_payments_listSchema if available
    // Example: validators.api_users_parent_payments_listSchema.parse(params);
    return this.axios.get('/api/users/parent/payments/', params);
  }

  async api_users_parents_list(params: types.paths["/api/users/parents/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parents/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parents_listSchema if available
    // Example: validators.api_users_parents_listSchema.parse(params);
    return this.axios.get('/api/users/parents/', params);
  }

  async api_users_parents_create(params: types.paths["/api/users/parents/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parents/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parents_createSchema if available
    // Example: validators.api_users_parents_createSchema.parse(params);
    return this.axios.post('/api/users/parents/', params);
  }

  async api_users_parents_retrieve(params: types.paths["/api/users/parents/{id}/"]["get"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parents/{id}/"]["get"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parents_retrieveSchema if available
    // Example: validators.api_users_parents_retrieveSchema.parse(params);
    return this.axios.get('/api/users/parents/{id}/', params);
  }

  async api_users_parents_update(params: types.paths["/api/users/parents/{id}/"]["put"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parents/{id}/"]["put"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parents_updateSchema if available
    // Example: validators.api_users_parents_updateSchema.parse(params);
    return this.axios.put('/api/users/parents/{id}/', params);
  }

  async api_users_parents_partial_update(params: types.paths["/api/users/parents/{id}/"]["patch"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parents/{id}/"]["patch"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parents_partial_updateSchema if available
    // Example: validators.api_users_parents_partial_updateSchema.parse(params);
    return this.axios.patch('/api/users/parents/{id}/', params);
  }

  async api_users_parents_destroy(params: types.paths["/api/users/parents/{id}/"]["delete"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/parents/{id}/"]["delete"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_parents_destroySchema if available
    // Example: validators.api_users_parents_destroySchema.parse(params);
    return this.axios.delete('/api/users/parents/{id}/', params);
  }

  async api_users_password_reset_create(params: types.paths["/api/users/password-reset/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/password-reset/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_password_reset_createSchema if available
    // Example: validators.api_users_password_reset_createSchema.parse(params);
    return this.axios.post('/api/users/password-reset/', params);
  }

  async api_users_password_reset_confirm_create(params: types.paths["/api/users/password-reset/confirm/{uid}/{token}/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/password-reset/confirm/{uid}/{token}/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_password_reset_confirm_createSchema if available
    // Example: validators.api_users_password_reset_confirm_createSchema.parse(params);
    return this.axios.post('/api/users/password-reset/confirm/{uid}/{token}/', params);
  }

  async api_users_register_create(params: types.paths["/api/users/register/"]["post"] extends { parameters: infer P } ? P : undefined): Promise<types.paths["/api/users/register/"]["post"] extends { responses: { 200: { content: infer R } } } ? R : any> {
    // TODO: Validate params with validators.api_users_register_createSchema if available
    // Example: validators.api_users_register_createSchema.parse(params);
    return this.axios.post('/api/users/register/', params);
  }
}
