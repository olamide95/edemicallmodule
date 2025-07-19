// src/types/school.ts
export interface SchoolDetails {
  id?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  academicYear: string;
  country: string;
  logo: string | null;
  tenantId?: string;
}

export interface Branch {
  id?: string;
  name: string;
  address: string;
  admin: string;
  startTime: string;
  startTimeTill: string;
  endTimeFrom: string;
  endTime: string;
  recess1Start: string;
  recess1End: string;
  recess2Start: string;
  recess2End: string;
  schoolId?: string;
}

export interface Department {
  id?: string;
  name: string;
  isAcademic: boolean;
  type: 'parent' | 'department';
  parentDepartment: string | null;
  schoolId?: string;
}

export interface Employee {
  id?: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subDepartment: string;
  class: string;
  branch: string;
  schoolId?: string;
}

export interface Class {
  id?: string;
  name: string;
  department: string;
  branch: string;
  schoolId?: string;
}

export interface ClassSection {
  id?: string;
  name: string;
  teacher: string;
  assistantTeacher: string;
  capacity: string;
  building: string;
  floor: string;
  wing: string;
  classId?: string;
}

export interface Subject {
  id?: string;
  code: string;
  name: string;
  class: string;
  section: string;
  teacher: string;
  assistantTeacher: string;
  schoolId?: string;
}

export interface Student {
  id?: string;
  name: string;
  admissionNumber: string;
  class: string;
  section: string;
  schoolId?: string;
}

export interface Parent {
  id?: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  studentId?: string;
}

export interface Session {
  id?: string;
  branch: string;
  startDate: string;
  endDate: string;
  schoolId?: string;
}

export interface NotificationSettings {
  id?: string;
  emailAlerts: boolean;
  pushNotifications: boolean;
  schoolId?: string;
}

export interface SchoolData {
  schoolDetails: SchoolDetails;
  branches: Branch[];
  departments: Department[];
  employees: Employee[];
  classes: Class[];
  subjects: Subject[];
  students: Student[];
  sessions: Session[];
  notifications: NotificationSettings;
}