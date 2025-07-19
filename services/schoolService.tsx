// src/services/schoolService.ts
import { api } from '@/lib/api';
import {
  SchoolDetails,
  Branch,
  Department,
  Employee,
  Class,
  Subject,
  Student,
  Session,
  NotificationSettings,
  SchoolData
} from '@/types/school';

export const SchoolService = {
  // School CRUD
  async createSchool(data: SchoolDetails) {
    return api.post<SchoolDetails>('/school-setup/school', data);
  },

  async updateSchool(schoolId: string, data: Partial<SchoolDetails>) {
    return api.put<SchoolDetails>(`/school-setup/school/${schoolId}`, data);
  },

  async getSchool(schoolId: string) {
    return api.get<SchoolDetails>(`/school-setup/school/${schoolId}`);
  },

  async getSchoolsByTenant(tenantId: string) {
    return api.get<SchoolDetails[]>(`/school-setup/tenant/${tenantId}/schools`);
  },

  async deleteSchool(schoolId: string) {
    return api.delete(`/school-setup/school/${schoolId}`);
  },

  // Branch CRUD
  async createBranch(data: Branch) {
    return api.post<Branch>('/school-setup/branch', data);
  },

  async updateBranch(branchId: string, data: Partial<Branch>) {
    return api.put<Branch>(`/school-setup/branch/${branchId}`, data);
  },

  async getBranch(branchId: string) {
    return api.get<Branch>(`/school-setup/branch/${branchId}`);
  },

  async getBranchesBySchool(schoolId: string) {
    return api.get<Branch[]>(`/school-setup/school/${schoolId}/branches`);
  },

  async deleteBranch(branchId: string) {
    return api.delete(`/school-setup/branch/${branchId}`);
  },

  // Department CRUD
  async createDepartment(data: Department | Department[]) {
    return api.post<Department | Department[]>('/school-setup/department', data);
  },

  async updateDepartment(departmentId: string, data: Partial<Department>) {
    return api.put<Department>(`/school-setup/department/${departmentId}`, data);
  },

  async getDepartmentsByBranch(branchId: string) {
    return api.get<Department[]>(`/school-setup/branch/${branchId}/departments`);
  },

  async deleteDepartment(departmentId: string) {
    return api.delete(`/school-setup/department/${departmentId}`);
  },

  // Employee CRUD
  async createEmployee(data: Employee | Employee[]) {
    return api.post<Employee | Employee[]>('/school-setup/employee', data);
  },

  async getEmployeesByBranch(branchId: string, role?: string) {
    const endpoint = role 
      ? `/school-setup/branch/${branchId}/employees?role=${role}`
      : `/school-setup/branch/${branchId}/employees`;
    return api.get<Employee[]>(endpoint);
  },

  // Class CRUD
  async createClass(data: Class) {
    return api.post<Class>('/school-setup/class', data);
  },

  async updateClass(classId: string, data: Partial<Class>) {
    return api.put<Class>(`/school-setup/class/${classId}`, data);
  },

  async getClass(classId: string) {
    return api.get<Class>(`/school-setup/class/${classId}`);
  },

  async getClassesByBranch(branchId: string) {
    return api.get<Class[]>(`/school-setup/branch/${branchId}/classes`);
  },

  async getClassesBySchool(schoolId: string) {
    return api.get<Class[]>(`/school-setup/school/${schoolId}/classes`);
  },

  async deleteClass(classId: string) {
    return api.delete(`/school-setup/class/${classId}`);
  },

  // Subject CRUD
  async createSubject(data: Subject) {
    return api.post<Subject>('/school-setup/subject', data);
  },

  async getSubjectsByClass(classId: string) {
    return api.get<Subject[]>(`/school-setup/class/${classId}/subjects`);
  },

  // Student CRUD
  async createStudent(data: Student | Student[]) {
    return api.post<Student | Student[]>('/school-setup/student', data);
  },

  async getStudentsByClass(classId: string) {
    return api.get<Student[]>(`/school-setup/class/${classId}/students`);
  },

  // Session CRUD
  async createSession(data: Session) {
    return api.post<Session>('/school-setup/session', data);
  },

  async getSessionsByBranch(branchId: string) {
    return api.get<Session[]>(`/school-setup/branch/${branchId}/sessions`);
  },

  // Notification Settings
  async updateNotificationSettings(data: NotificationSettings) {
    return api.put<NotificationSettings>('/school-setup/notifications', data);
  },

  // Complete onboarding
  async completeOnboarding(schoolId: string) {
    return api.post(`/school-setup/onboarding/complete`, { schoolId });
  },

  // Bulk operations
  async importData(data: Partial<SchoolData>) {
    return api.post('/school-setup/import', data);
  }
};