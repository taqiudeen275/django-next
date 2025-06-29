// // hooks.ts - React Query hooks using ApiProvider
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useApi } from './api-context';
// import * as types from './types';

// // Example hook for a GET endpoint
// export function useApi_academics_assignments_teacher_list(params?: types.paths["/api/academics/assignments/teacher/"]["get"] extends { parameters: infer P } ? P : undefined) {
//   const api = useApi();
//   return useQuery({
//     queryKey: ['api_academics_assignments_teacher_list', params],
//     queryFn: () => api.api_academics_assignments_teacher_list(params),
//   });
// }

// // Example hook for a POST endpoint
// export function useApi_academics_assignments_teacher_create() {
//   const api = useApi();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: types.paths["/api/academics/assignments/teacher/"]["post"] extends { parameters: infer P } ? P : undefined) => api.api_academics_assignments_teacher_create(data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['api_academics_assignments_teacher_list'] });
//     },
//   });
// }

// // ...repeat for other endpoints as needed
