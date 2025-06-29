import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Assignment = z
  .object({
    id: z.number().int(),
    teacher: z.string(),
    course: z.string(),
    class_assigned: z.string(),
    title: z.string().max(255),
    description: z.string(),
    due_date: z.string(),
    max_score: z
      .string()
      .regex(/^-?\d{0,3}(?:\.\d{0,2})?$/)
      .optional(),
  })
  .passthrough();
const PatchedAssignment = z
  .object({
    id: z.number().int(),
    teacher: z.string(),
    course: z.string(),
    class_assigned: z.string(),
    title: z.string().max(255),
    description: z.string(),
    due_date: z.string(),
    max_score: z.string().regex(/^-?\d{0,3}(?:\.\d{0,2})?$/),
  })
  .partial()
  .passthrough();
const Status352Enum = z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]);
const Attendance = z
  .object({
    id: z.number().int(),
    date: z.string(),
    status: Status352Enum.optional(),
    remark: z.string().nullish(),
    student: z.number().int(),
    class_session: z.number().int(),
  })
  .passthrough();
const LevelEnum = z.enum(["PRIMARY", "JHS", "SHS", "UNIVERSITY"]);
const GradingScale = z
  .object({
    id: z.number().int(),
    name: z.string().max(50),
    level: LevelEnum,
    grades: z.unknown(),
    is_active: z.boolean().optional(),
  })
  .passthrough();
const BlankEnum = z.unknown();
const NullEnum = z.unknown();
const Course = z
  .object({
    id: z.number().int(),
    grading_scale: GradingScale,
    name: z.string().max(100),
    code: z.string().max(20),
    description: z.string().nullish(),
    level: z.union([LevelEnum, BlankEnum, NullEnum]).nullish(),
    credit_hours: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000)
      .optional(),
  })
  .passthrough();
const ClassTeacher = z
  .object({
    id: z.number().int(),
    username: z
      .string()
      .max(150)
      .regex(/^[\w.@+-]+$/),
    first_name: z.string().max(150).optional(),
    last_name: z.string().max(150).optional(),
  })
  .passthrough();
const Class = z
  .object({
    id: z.number().int(),
    courses: z.array(Course),
    class_teacher: ClassTeacher,
    name: z.string().max(50),
    academic_year: z.string().max(20),
    max_students: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000)
      .optional(),
    start_time: z.string().nullish(),
    end_time: z.string().nullish(),
    room: z.string().max(50).nullish(),
  })
  .passthrough();
const PatchedClass = z
  .object({
    id: z.number().int(),
    courses: z.array(Course),
    class_teacher: ClassTeacher,
    name: z.string().max(50),
    academic_year: z.string().max(20),
    max_students: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    start_time: z.string().nullable(),
    end_time: z.string().nullable(),
    room: z.string().max(50).nullable(),
  })
  .partial()
  .passthrough();
const PatchedCourse = z
  .object({
    id: z.number().int(),
    grading_scale: GradingScale,
    name: z.string().max(100),
    code: z.string().max(20),
    description: z.string().nullable(),
    level: z.union([LevelEnum, BlankEnum, NullEnum]).nullable(),
    credit_hours: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
  })
  .partial()
  .passthrough();
const Enrollment = z
  .object({
    id: z.number().int(),
    student: z.number().int(),
    course: z.number().int(),
    class_enrolled: z.number().int(),
    enrollment_date: z.string(),
  })
  .passthrough();
const ComponentTypeEnum = z.enum(["QUIZ", "ASSIGNMENT", "MIDSEM", "EXAM"]);
const GradeComponent = z
  .object({
    id: z.number().int(),
    name: z.string().max(50),
    component_type: ComponentTypeEnum,
    max_score: z
      .string()
      .regex(/^-?\d{0,3}(?:\.\d{0,2})?$/)
      .optional(),
    weight: z
      .string()
      .regex(/^-?\d{0,3}(?:\.\d{0,2})?$/)
      .optional(),
    course: z.number().int(),
    grading_scale: z.number().int().nullish(),
  })
  .passthrough();
const PatchedGradeComponent = z
  .object({
    id: z.number().int(),
    name: z.string().max(50),
    component_type: ComponentTypeEnum,
    max_score: z.string().regex(/^-?\d{0,3}(?:\.\d{0,2})?$/),
    weight: z.string().regex(/^-?\d{0,3}(?:\.\d{0,2})?$/),
    course: z.number().int(),
    grading_scale: z.number().int().nullable(),
  })
  .partial()
  .passthrough();
const Grade = z
  .object({
    id: z.number().int(),
    grading_scale: z.number().int(),
    final_grade: z
      .string()
      .regex(/^-?\d{0,3}(?:\.\d{0,2})?$/)
      .nullable(),
    letter_grade: z.string().nullable(),
    date: z.string(),
    student: z.number().int(),
    course: z.number().int(),
  })
  .passthrough();
const PatchedGradingScale = z
  .object({
    id: z.number().int(),
    name: z.string().max(50),
    level: LevelEnum,
    grades: z.unknown(),
    is_active: z.boolean(),
  })
  .partial()
  .passthrough();
const LessonPlan = z
  .object({
    id: z.number().int(),
    teacher: z.string(),
    course: z.string(),
    class_taught: z.string(),
    title: z.string().max(255),
    content: z.string(),
    date: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    is_approved: z.boolean().optional(),
  })
  .passthrough();
const PatchedLessonPlan = z
  .object({
    id: z.number().int(),
    teacher: z.string(),
    course: z.string(),
    class_taught: z.string(),
    title: z.string().max(255),
    content: z.string(),
    date: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    is_approved: z.boolean(),
  })
  .partial()
  .passthrough();
const Score = z
  .object({
    id: z.number().int(),
    score: z.string().regex(/^-?\d{0,3}(?:\.\d{0,2})?$/),
    date: z.string(),
    student: z.number().int(),
    component: z.number().int(),
  })
  .passthrough();
const PatchedScore = z
  .object({
    id: z.number().int(),
    score: z.string().regex(/^-?\d{0,3}(?:\.\d{0,2})?$/),
    date: z.string(),
    student: z.number().int(),
    component: z.number().int(),
  })
  .partial()
  .passthrough();
const Fee = z
  .object({
    id: z.number().int(),
    student: z.string(),
    name: z.string().max(100),
    description: z.string().nullish(),
    amount: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    due_date: z.string(),
  })
  .passthrough();
const StatusC8bEnum = z.enum(["Pending", "Completed", "Failed"]);
const Payment = z
  .object({
    id: z.number().int(),
    fee: z.string(),
    amount_paid: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    payment_date: z.string(),
    transaction_id: z.string().max(100).nullish(),
    payment_method: z.string().max(50).nullish(),
    status: StatusC8bEnum.optional(),
    notes: z.string().nullish(),
  })
  .passthrough();
const TokenObtainPair = z
  .object({
    username: z.string(),
    password: z.string(),
    access: z.string(),
    refresh: z.string(),
  })
  .passthrough();
const TokenBlacklist = z.object({ refresh: z.string() }).passthrough();
const DeliveryMethodEnum = z.enum(["email", "sms"]);
const BulkMessageStatusEnum = z.enum(["Pending", "Sent", "Failed"]);
const BulkMessage = z
  .object({
    id: z.number().int(),
    sender: z.string(),
    recipient_group: z.string().max(50),
    custom_recipients: z.string().nullish(),
    subject: z.string().max(255),
    message_body: z.string(),
    delivery_method: DeliveryMethodEnum.optional(),
    status: BulkMessageStatusEnum,
    scheduled_time: z.string().datetime({ offset: true }).nullish(),
    sent_time: z.string().datetime({ offset: true }).nullable(),
  })
  .passthrough();
const PatchedBulkMessage = z
  .object({
    id: z.number().int(),
    sender: z.string(),
    recipient_group: z.string().max(50),
    custom_recipients: z.string().nullable(),
    subject: z.string().max(255),
    message_body: z.string(),
    delivery_method: DeliveryMethodEnum,
    status: BulkMessageStatusEnum,
    scheduled_time: z.string().datetime({ offset: true }).nullable(),
    sent_time: z.string().datetime({ offset: true }).nullable(),
  })
  .partial()
  .passthrough();
const RoleEnum = z.enum([
  "ADMIN",
  "TEACHER",
  "STUDENT",
  "PARENT",
  "STAFF",
  "ACCOUNTANT",
  "LIBRARIAN",
  "COUNSELOR",
]);
const User = z
  .object({
    id: z.number().int(),
    username: z
      .string()
      .max(150)
      .regex(/^[\w.@+-]+$/),
    email: z.string().max(254).email().optional(),
    role: RoleEnum.optional(),
    first_name: z.string().max(150).optional(),
    last_name: z.string().max(150).optional(),
    profile_picture: z.string().url().nullish(),
  })
  .passthrough();
const Message = z
  .object({
    id: z.number().int(),
    sender: User,
    recipient: User,
    student: z.string(),
    subject: z.string().max(255),
    body: z.string(),
    timestamp: z.string().datetime({ offset: true }),
    is_read: z.boolean().optional(),
  })
  .passthrough();
const PatchedMessage = z
  .object({
    id: z.number().int(),
    sender: User,
    recipient: User,
    student: z.string(),
    subject: z.string().max(255),
    body: z.string(),
    timestamp: z.string().datetime({ offset: true }),
    is_read: z.boolean(),
  })
  .partial()
  .passthrough();
const StudentCounselor = z
  .object({ id: z.number().int(), user: User })
  .passthrough();
const CounselingSession = z
  .object({
    id: z.number().int(),
    counselor: z.string(),
    student: StudentCounselor,
    session_date: z.string().datetime({ offset: true }),
    notes: z.string(),
    summary: z.string().nullish(),
    is_confidential: z.boolean().optional(),
  })
  .passthrough();
const PatchedCounselingSession = z
  .object({
    id: z.number().int(),
    counselor: z.string(),
    student: StudentCounselor,
    session_date: z.string().datetime({ offset: true }),
    notes: z.string(),
    summary: z.string().nullable(),
    is_confidential: z.boolean(),
  })
  .partial()
  .passthrough();
const DataTypeEnum = z.enum([
  "CharField",
  "IntegerField",
  "DecimalField",
  "BooleanField",
  "DateField",
  "DateTimeField",
]);
const CustomField = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    label: z.string().max(255),
    data_type: DataTypeEnum,
    required: z.boolean().optional(),
    default_value: z.string().max(255).nullish(),
    help_text: z.string().max(255).nullish(),
    choices: z.unknown().nullish(),
    table: z.number().int(),
  })
  .passthrough();
const PatchedCustomField = z
  .object({
    id: z.number().int(),
    name: z.string().max(255),
    label: z.string().max(255),
    data_type: DataTypeEnum,
    required: z.boolean(),
    default_value: z.string().max(255).nullable(),
    help_text: z.string().max(255).nullable(),
    choices: z.unknown().nullable(),
    table: z.number().int(),
  })
  .partial()
  .passthrough();
const CustomTable = z
  .object({
    id: z.number().int(),
    fields: z.array(CustomField),
    name: z.string().max(255),
    description: z.string().nullish(),
    is_active: z.boolean().optional(),
    owner: z.number().int(),
  })
  .passthrough();
const PatchedCustomTable = z
  .object({
    id: z.number().int(),
    fields: z.array(CustomField),
    name: z.string().max(255),
    description: z.string().nullable(),
    is_active: z.boolean(),
    owner: z.number().int(),
  })
  .partial()
  .passthrough();
const PatchedFee = z
  .object({
    id: z.number().int(),
    student: z.string(),
    name: z.string().max(100),
    description: z.string().nullable(),
    amount: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    due_date: z.string(),
  })
  .partial()
  .passthrough();
const PatchedPayment = z
  .object({
    id: z.number().int(),
    fee: z.string(),
    amount_paid: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    payment_date: z.string(),
    transaction_id: z.string().max(100).nullable(),
    payment_method: z.string().max(50).nullable(),
    status: StatusC8bEnum,
    notes: z.string().nullable(),
  })
  .partial()
  .passthrough();
const Book = z
  .object({
    id: z.number().int(),
    title: z.string().max(255),
    author: z.string().max(255),
    isbn: z.string().max(20),
    publisher: z.string().max(255),
    publication_year: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    genre: z.string().max(50),
    copies_available: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000)
      .optional(),
    total_copies: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000)
      .optional(),
  })
  .passthrough();
const PatchedBook = z
  .object({
    id: z.number().int(),
    title: z.string().max(255),
    author: z.string().max(255),
    isbn: z.string().max(20),
    publisher: z.string().max(255),
    publication_year: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    genre: z.string().max(50),
    copies_available: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
    total_copies: z
      .number()
      .int()
      .gte(-9223372036854776000)
      .lte(9223372036854776000),
  })
  .partial()
  .passthrough();
const BorrowingRecordStatusEnum = z.enum(["Borrowed", "Returned", "Overdue"]);
const BorrowingRecord = z
  .object({
    id: z.number().int(),
    book: z.string(),
    student: z.string(),
    staff: z.string(),
    borrow_date: z.string(),
    due_date: z.string(),
    return_date: z.string().nullish(),
    status: BorrowingRecordStatusEnum,
  })
  .passthrough();
const PatchedBorrowingRecord = z
  .object({
    id: z.number().int(),
    book: z.string(),
    student: z.string(),
    staff: z.string(),
    borrow_date: z.string(),
    due_date: z.string(),
    return_date: z.string().nullable(),
    status: BorrowingRecordStatusEnum,
  })
  .partial()
  .passthrough();
const StudentReport = z
  .object({
    id: z.number().int(),
    first_name: z.string().max(50),
    last_name: z.string().max(50),
    student_id: z.string().max(20),
  })
  .passthrough();
const AttendanceReport = z
  .object({
    student: StudentReport,
    class_session: z.string(),
    date: z.string(),
    status: Status352Enum.optional(),
  })
  .passthrough();
const ClassReport = z
  .object({
    id: z.number().int(),
    name: z.string().max(50),
    academic_year: z.string().max(20),
    start_time: z.string().nullish(),
    end_time: z.string().nullish(),
    room: z.string().max(50).nullish(),
  })
  .passthrough();
const CourseReport = z
  .object({
    id: z.number().int(),
    name: z.string().max(100),
    code: z.string().max(20),
    level: z.union([LevelEnum, BlankEnum, NullEnum]).nullish(),
  })
  .passthrough();
const EnrollmentReport = z
  .object({
    student: StudentReport,
    course: z.string(),
    class_enrolled: z.string(),
    enrollment_date: z.string(),
  })
  .passthrough();
const FeeReport = z
  .object({
    student: StudentReport,
    name: z.string().max(100),
    description: z.string().nullish(),
    amount: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    due_date: z.string(),
  })
  .passthrough();
const PaymentReport = z
  .object({
    fee: FeeReport,
    amount_paid: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    payment_date: z.string(),
    transaction_id: z.string().max(100).nullish(),
    status: StatusC8bEnum.optional(),
  })
  .passthrough();
const StaffReport = z
  .object({
    id: z.number().int(),
    first_name: z.string().max(50),
    last_name: z.string().max(50),
    staff_id: z.string().max(20),
  })
  .passthrough();
const GradeReport = z
  .object({
    student: StudentReport,
    course: z.string(),
    final_grade: z
      .string()
      .regex(/^-?\d{0,3}(?:\.\d{0,2})?$/)
      .nullish(),
    letter_grade: z.string().max(5).nullish(),
  })
  .passthrough();
const Staff = z
  .object({
    id: z.number().int(),
    user: z.number().int(),
    staff_id: z.string(),
    first_name: z.string().max(50),
    last_name: z.string().max(50),
    middle_name: z.string().max(50).nullish(),
    date_of_birth: z.string(),
    gender: z.string().max(10),
    address: z.string().max(255),
    city: z.string().max(50),
    region: z.string().max(50),
    nationality: z.string().max(50).optional(),
    email: z.string().max(254).email(),
    phone_number: z.string().max(20),
    qualification: z.string().max(100),
    experience: z.string().nullish(),
    date_joined: z.string(),
    social_security_number: z.string().max(20).nullish(),
    bank_name: z.string().max(50).nullish(),
    bank_account_number: z.string().max(50).nullish(),
    bank_branch: z.string().max(50).nullish(),
    salary: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
  })
  .passthrough();
const PatchedStaff = z
  .object({
    id: z.number().int(),
    user: z.number().int(),
    staff_id: z.string(),
    first_name: z.string().max(50),
    last_name: z.string().max(50),
    middle_name: z.string().max(50).nullable(),
    date_of_birth: z.string(),
    gender: z.string().max(10),
    address: z.string().max(255),
    city: z.string().max(50),
    region: z.string().max(50),
    nationality: z.string().max(50),
    email: z.string().max(254).email(),
    phone_number: z.string().max(20),
    qualification: z.string().max(100),
    experience: z.string().nullable(),
    date_joined: z.string(),
    social_security_number: z.string().max(20).nullable(),
    bank_name: z.string().max(50).nullable(),
    bank_account_number: z.string().max(50).nullable(),
    bank_branch: z.string().max(50).nullable(),
    salary: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
  })
  .partial()
  .passthrough();
const PayrollStatusEnum = z.enum(["Pending", "Paid"]);
const Payroll = z
  .object({
    id: z.number().int(),
    staff: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    basic_salary: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    allowances: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    deductions: z
      .string()
      .regex(/^-?\d{0,8}(?:\.\d{0,2})?$/)
      .optional(),
    net_pay: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    payment_date: z.string(),
    status: PayrollStatusEnum.optional(),
    notes: z.string().nullish(),
  })
  .passthrough();
const PatchedPayroll = z
  .object({
    id: z.number().int(),
    staff: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    basic_salary: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    allowances: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    deductions: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    net_pay: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/),
    payment_date: z.string(),
    status: PayrollStatusEnum,
    notes: z.string().nullable(),
  })
  .partial()
  .passthrough();
const StudentUser = z
  .object({
    id: z.number().int(),
    username: z
      .string()
      .max(150)
      .regex(/^[\w.@+-]+$/),
    email: z.string().max(254).email().optional(),
    first_name: z.string().max(150).optional(),
    last_name: z.string().max(150).optional(),
    profile_picture: z.string().url().nullish(),
  })
  .passthrough();
const Parent = z
  .object({
    id: z.number().int(),
    user: z.number().int(),
    first_name: z.string().max(50),
    last_name: z.string().max(50),
    middle_name: z.string().max(50).nullish(),
    occupation: z.string().max(100).nullish(),
    email: z.string().max(254).email(),
    phone_number: z.string().max(20),
    address: z.string().max(255).nullish(),
    place_of_work: z.string().max(100).nullish(),
  })
  .passthrough();
const Student = z
  .object({
    id: z.number().int(),
    user: StudentUser,
    parent: Parent,
    student_id: z.string(),
    first_name: z.string().max(50),
    last_name: z.string().max(50),
    middle_name: z.string().max(50).nullish(),
    date_of_birth: z.string(),
    gender: z.string().max(10),
    address: z.string().max(255),
    city: z.string().max(50),
    region: z.string().max(50),
    nationality: z.string().max(50).optional(),
    email: z.string().max(254).email(),
    phone_number: z.string().max(20).nullish(),
    admission_number: z.string(),
    admission_date: z.string(),
    emergency_contact_name: z.string().max(100),
    emergency_contact_phone: z.string().max(20),
    emergency_contact_relationship: z.string().max(50),
    medical_conditions: z.string().nullish(),
    allergies: z.string().nullish(),
    previous_school_name: z.string().max(100).nullish(),
    previous_school_address: z.string().max(255).nullish(),
    previous_school_contact: z.string().max(20).nullish(),
    religion: z.string().max(50).nullish(),
    denomination: z.string().max(50).nullish(),
  })
  .passthrough();
const PatchedStudent = z
  .object({
    id: z.number().int(),
    user: StudentUser,
    parent: Parent,
    student_id: z.string(),
    first_name: z.string().max(50),
    last_name: z.string().max(50),
    middle_name: z.string().max(50).nullable(),
    date_of_birth: z.string(),
    gender: z.string().max(10),
    address: z.string().max(255),
    city: z.string().max(50),
    region: z.string().max(50),
    nationality: z.string().max(50),
    email: z.string().max(254).email(),
    phone_number: z.string().max(20).nullable(),
    admission_number: z.string(),
    admission_date: z.string(),
    emergency_contact_name: z.string().max(100),
    emergency_contact_phone: z.string().max(20),
    emergency_contact_relationship: z.string().max(50),
    medical_conditions: z.string().nullable(),
    allergies: z.string().nullable(),
    previous_school_name: z.string().max(100).nullable(),
    previous_school_address: z.string().max(255).nullable(),
    previous_school_contact: z.string().max(20).nullable(),
    religion: z.string().max(50).nullable(),
    denomination: z.string().max(50).nullable(),
  })
  .partial()
  .passthrough();
const AdmissionApplicationStatusEnum = z.enum([
  "PENDING",
  "REVIEWED",
  "ACCEPTED",
  "REJECTED",
]);
const AdmissionApplication = z
  .object({
    id: z.number().int(),
    birth_certificate: z.string().url().optional(),
    transcript: z.string().url().optional(),
    passport_photo: z.string().url().optional(),
    first_name: z.string().max(255),
    last_name: z.string().max(255),
    middle_name: z.string().max(255).nullish(),
    date_of_birth: z.string(),
    gender: z.string().max(10),
    email: z.string().max(254).email(),
    phone_number: z.string().max(20).nullish(),
    address: z.string().max(255),
    city: z.string().max(50),
    region: z.string().max(50),
    nationality: z.string().max(50).optional(),
    guardian_name: z.string().max(255),
    guardian_phone_number: z.string().max(20),
    guardian_email: z.string().max(254).email(),
    guardian_relationship: z.string().max(50),
    previous_school: z.string().max(255).nullish(),
    application_date: z.string().datetime({ offset: true }),
    status: AdmissionApplicationStatusEnum,
    program_of_study: z.string().max(255).nullish(),
    notes: z.string().nullish(),
  })
  .passthrough();
const PatchedAdmissionApplication = z
  .object({
    id: z.number().int(),
    birth_certificate: z.string().url(),
    transcript: z.string().url(),
    passport_photo: z.string().url(),
    first_name: z.string().max(255),
    last_name: z.string().max(255),
    middle_name: z.string().max(255).nullable(),
    date_of_birth: z.string(),
    gender: z.string().max(10),
    email: z.string().max(254).email(),
    phone_number: z.string().max(20).nullable(),
    address: z.string().max(255),
    city: z.string().max(50),
    region: z.string().max(50),
    nationality: z.string().max(50),
    guardian_name: z.string().max(255),
    guardian_phone_number: z.string().max(20),
    guardian_email: z.string().max(254).email(),
    guardian_relationship: z.string().max(50),
    previous_school: z.string().max(255).nullable(),
    application_date: z.string().datetime({ offset: true }),
    status: AdmissionApplicationStatusEnum,
    program_of_study: z.string().max(255).nullable(),
    notes: z.string().nullable(),
  })
  .partial()
  .passthrough();
const TokenRefresh = z
  .object({ access: z.string(), refresh: z.string() })
  .passthrough();
const UserCreate = z
  .object({
    id: z.number().int(),
    username: z
      .string()
      .max(150)
      .regex(/^[\w.@+-]+$/),
    email: z.string().max(254).email().optional(),
    password: z.string(),
    role: RoleEnum,
    first_name: z.string().max(150).optional(),
    last_name: z.string().max(150).optional(),
    profile_picture: z.string().url().nullish(),
    date_of_birth: z.string().optional(),
    gender: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    region: z.string().optional(),
    nationality: z.string().optional().default("Ghanaian"),
    phone_number: z.string().optional(),
    is_active: z.boolean().optional(),
    is_staff: z.boolean().optional(),
    is_superuser: z.boolean().optional(),
  })
  .passthrough();
const PatchedUser = z
  .object({
    id: z.number().int(),
    username: z
      .string()
      .max(150)
      .regex(/^[\w.@+-]+$/),
    email: z.string().max(254).email(),
    role: RoleEnum,
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    profile_picture: z.string().url().nullable(),
  })
  .partial()
  .passthrough();
const PatchedParent = z
  .object({
    id: z.number().int(),
    user: z.number().int(),
    first_name: z.string().max(50),
    last_name: z.string().max(50),
    middle_name: z.string().max(50).nullable(),
    occupation: z.string().max(100).nullable(),
    email: z.string().max(254).email(),
    phone_number: z.string().max(20),
    address: z.string().max(255).nullable(),
    place_of_work: z.string().max(100).nullable(),
  })
  .partial()
  .passthrough();

export const schemas = {
  Assignment,
  PatchedAssignment,
  Status352Enum,
  Attendance,
  LevelEnum,
  GradingScale,
  BlankEnum,
  NullEnum,
  Course,
  ClassTeacher,
  Class,
  PatchedClass,
  PatchedCourse,
  Enrollment,
  ComponentTypeEnum,
  GradeComponent,
  PatchedGradeComponent,
  Grade,
  PatchedGradingScale,
  LessonPlan,
  PatchedLessonPlan,
  Score,
  PatchedScore,
  Fee,
  StatusC8bEnum,
  Payment,
  TokenObtainPair,
  TokenBlacklist,
  DeliveryMethodEnum,
  BulkMessageStatusEnum,
  BulkMessage,
  PatchedBulkMessage,
  RoleEnum,
  User,
  Message,
  PatchedMessage,
  StudentCounselor,
  CounselingSession,
  PatchedCounselingSession,
  DataTypeEnum,
  CustomField,
  PatchedCustomField,
  CustomTable,
  PatchedCustomTable,
  PatchedFee,
  PatchedPayment,
  Book,
  PatchedBook,
  BorrowingRecordStatusEnum,
  BorrowingRecord,
  PatchedBorrowingRecord,
  StudentReport,
  AttendanceReport,
  ClassReport,
  CourseReport,
  EnrollmentReport,
  FeeReport,
  PaymentReport,
  StaffReport,
  GradeReport,
  Staff,
  PatchedStaff,
  PayrollStatusEnum,
  Payroll,
  PatchedPayroll,
  StudentUser,
  Parent,
  Student,
  PatchedStudent,
  AdmissionApplicationStatusEnum,
  AdmissionApplication,
  PatchedAdmissionApplication,
  TokenRefresh,
  UserCreate,
  PatchedUser,
  PatchedParent,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/api/academics/assignments/teacher/",
    alias: "api_academics_assignments_teacher_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Assignment),
  },
  {
    method: "post",
    path: "/api/academics/assignments/teacher/",
    alias: "api_academics_assignments_teacher_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Assignment,
      },
    ],
    response: Assignment,
  },
  {
    method: "get",
    path: "/api/academics/assignments/teacher/:id/",
    alias: "api_academics_assignments_teacher_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Assignment,
  },
  {
    method: "put",
    path: "/api/academics/assignments/teacher/:id/",
    alias: "api_academics_assignments_teacher_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Assignment,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Assignment,
  },
  {
    method: "patch",
    path: "/api/academics/assignments/teacher/:id/",
    alias: "api_academics_assignments_teacher_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedAssignment,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Assignment,
  },
  {
    method: "delete",
    path: "/api/academics/assignments/teacher/:id/",
    alias: "api_academics_assignments_teacher_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/academics/attendance/parent/",
    alias: "api_academics_attendance_parent_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Attendance),
  },
  {
    method: "get",
    path: "/api/academics/attendance/student/",
    alias: "api_academics_attendance_student_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Attendance),
  },
  {
    method: "get",
    path: "/api/academics/attendance/teacher/",
    alias: "api_academics_attendance_teacher_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Attendance),
  },
  {
    method: "post",
    path: "/api/academics/attendance/teacher/",
    alias: "api_academics_attendance_teacher_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Attendance,
      },
    ],
    response: Attendance,
  },
  {
    method: "get",
    path: "/api/academics/classes/",
    alias: "api_academics_classes_list",
    requestFormat: "json",
    parameters: [
      {
        name: "academic_year",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "class_teacher",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "courses",
        type: "Query",
        schema: z.array(z.number().int()).optional(),
      },
      {
        name: "end_time",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "room",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "start_time",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Class),
  },
  {
    method: "post",
    path: "/api/academics/classes/",
    alias: "api_academics_classes_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Class,
      },
    ],
    response: Class,
  },
  {
    method: "get",
    path: "/api/academics/classes/:id/",
    alias: "api_academics_classes_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Class,
  },
  {
    method: "put",
    path: "/api/academics/classes/:id/",
    alias: "api_academics_classes_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Class,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Class,
  },
  {
    method: "patch",
    path: "/api/academics/classes/:id/",
    alias: "api_academics_classes_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedClass,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Class,
  },
  {
    method: "delete",
    path: "/api/academics/classes/:id/",
    alias: "api_academics_classes_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/academics/courses/",
    alias: "api_academics_courses_list",
    requestFormat: "json",
    response: z.array(Course),
  },
  {
    method: "post",
    path: "/api/academics/courses/",
    alias: "api_academics_courses_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Course,
      },
    ],
    response: Course,
  },
  {
    method: "get",
    path: "/api/academics/courses/:id/",
    alias: "api_academics_courses_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Course,
  },
  {
    method: "put",
    path: "/api/academics/courses/:id/",
    alias: "api_academics_courses_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Course,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Course,
  },
  {
    method: "patch",
    path: "/api/academics/courses/:id/",
    alias: "api_academics_courses_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedCourse,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Course,
  },
  {
    method: "delete",
    path: "/api/academics/courses/:id/",
    alias: "api_academics_courses_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/academics/courses/available/",
    alias: "api_academics_courses_available_list",
    requestFormat: "json",
    response: z.array(Course),
  },
  {
    method: "get",
    path: "/api/academics/enrollments/",
    alias: "api_academics_enrollments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "class_enrolled",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "course",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(Enrollment),
  },
  {
    method: "post",
    path: "/api/academics/enrollments/",
    alias: "api_academics_enrollments_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Enrollment,
      },
    ],
    response: Enrollment,
  },
  {
    method: "get",
    path: "/api/academics/enrollments/:id/",
    alias: "api_academics_enrollments_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Enrollment,
  },
  {
    method: "delete",
    path: "/api/academics/enrollments/:id/",
    alias: "api_academics_enrollments_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/academics/grade-components/",
    alias: "api_academics_grade_components_list",
    requestFormat: "json",
    parameters: [
      {
        name: "component_type",
        type: "Query",
        schema: z.enum(["ASSIGNMENT", "EXAM", "MIDSEM", "QUIZ"]).optional(),
      },
      {
        name: "course",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(GradeComponent),
  },
  {
    method: "post",
    path: "/api/academics/grade-components/",
    alias: "api_academics_grade_components_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: GradeComponent,
      },
    ],
    response: GradeComponent,
  },
  {
    method: "get",
    path: "/api/academics/grade-components/:id/",
    alias: "api_academics_grade_components_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: GradeComponent,
  },
  {
    method: "put",
    path: "/api/academics/grade-components/:id/",
    alias: "api_academics_grade_components_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: GradeComponent,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: GradeComponent,
  },
  {
    method: "patch",
    path: "/api/academics/grade-components/:id/",
    alias: "api_academics_grade_components_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedGradeComponent,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: GradeComponent,
  },
  {
    method: "delete",
    path: "/api/academics/grade-components/:id/",
    alias: "api_academics_grade_components_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/academics/grades/parent/",
    alias: "api_academics_grades_parent_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Grade),
  },
  {
    method: "get",
    path: "/api/academics/grades/student/",
    alias: "api_academics_grades_student_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Grade),
  },
  {
    method: "get",
    path: "/api/academics/grades/teacher/",
    alias: "api_academics_grades_teacher_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Grade),
  },
  {
    method: "post",
    path: "/api/academics/grades/teacher/",
    alias: "api_academics_grades_teacher_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Grade,
      },
    ],
    response: Grade,
  },
  {
    method: "get",
    path: "/api/academics/grading-scales/",
    alias: "api_academics_grading_scales_list",
    requestFormat: "json",
    response: z.array(GradingScale),
  },
  {
    method: "post",
    path: "/api/academics/grading-scales/",
    alias: "api_academics_grading_scales_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: GradingScale,
      },
    ],
    response: GradingScale,
  },
  {
    method: "get",
    path: "/api/academics/grading-scales/:id/",
    alias: "api_academics_grading_scales_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: GradingScale,
  },
  {
    method: "put",
    path: "/api/academics/grading-scales/:id/",
    alias: "api_academics_grading_scales_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: GradingScale,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: GradingScale,
  },
  {
    method: "patch",
    path: "/api/academics/grading-scales/:id/",
    alias: "api_academics_grading_scales_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedGradingScale,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: GradingScale,
  },
  {
    method: "delete",
    path: "/api/academics/grading-scales/:id/",
    alias: "api_academics_grading_scales_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/academics/lesson-plans/teacher/",
    alias: "api_academics_lesson_plans_teacher_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(LessonPlan),
  },
  {
    method: "post",
    path: "/api/academics/lesson-plans/teacher/",
    alias: "api_academics_lesson_plans_teacher_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: LessonPlan,
      },
    ],
    response: LessonPlan,
  },
  {
    method: "get",
    path: "/api/academics/lesson-plans/teacher/:id/",
    alias: "api_academics_lesson_plans_teacher_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: LessonPlan,
  },
  {
    method: "put",
    path: "/api/academics/lesson-plans/teacher/:id/",
    alias: "api_academics_lesson_plans_teacher_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: LessonPlan,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: LessonPlan,
  },
  {
    method: "patch",
    path: "/api/academics/lesson-plans/teacher/:id/",
    alias: "api_academics_lesson_plans_teacher_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedLessonPlan,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: LessonPlan,
  },
  {
    method: "delete",
    path: "/api/academics/lesson-plans/teacher/:id/",
    alias: "api_academics_lesson_plans_teacher_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/academics/scores/",
    alias: "api_academics_scores_list",
    requestFormat: "json",
    parameters: [
      {
        name: "component",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(Score),
  },
  {
    method: "post",
    path: "/api/academics/scores/",
    alias: "api_academics_scores_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Score,
      },
    ],
    response: Score,
  },
  {
    method: "get",
    path: "/api/academics/scores/:id/",
    alias: "api_academics_scores_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Score,
  },
  {
    method: "put",
    path: "/api/academics/scores/:id/",
    alias: "api_academics_scores_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Score,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Score,
  },
  {
    method: "patch",
    path: "/api/academics/scores/:id/",
    alias: "api_academics_scores_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedScore,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Score,
  },
  {
    method: "delete",
    path: "/api/academics/scores/:id/",
    alias: "api_academics_scores_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/academics/student/enrollments/",
    alias: "api_academics_student_enrollments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Enrollment),
  },
  {
    method: "post",
    path: "/api/academics/student/enrollments/",
    alias: "api_academics_student_enrollments_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Enrollment,
      },
    ],
    response: Enrollment,
  },
  {
    method: "get",
    path: "/api/academics/student/enrollments/:id/",
    alias: "api_academics_student_enrollments_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Enrollment,
  },
  {
    method: "delete",
    path: "/api/academics/student/enrollments/:id/",
    alias: "api_academics_student_enrollments_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/accountants/fees/",
    alias: "api_accountants_fees_list",
    requestFormat: "json",
    parameters: [
      {
        name: "due_date",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(Fee),
  },
  {
    method: "get",
    path: "/api/accountants/fees/:id/",
    alias: "api_accountants_fees_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Fee,
  },
  {
    method: "get",
    path: "/api/accountants/financial-report/",
    alias: "api_accountants_financial_report_list",
    requestFormat: "json",
    response: z.array(Payment),
  },
  {
    method: "get",
    path: "/api/accountants/payments/",
    alias: "api_accountants_payments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "fee",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "payment_method",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.enum(["Completed", "Failed", "Pending"]).optional(),
      },
    ],
    response: z.array(Payment),
  },
  {
    method: "get",
    path: "/api/accountants/payments/:id/",
    alias: "api_accountants_payments_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payment,
  },
  {
    method: "post",
    path: "/api/auth/login/",
    alias: "api_auth_login_create",
    description: `Takes a set of user credentials and returns an access and refresh JSON web
token pair to prove the authentication of those credentials.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: TokenObtainPair,
      },
    ],
    response: TokenObtainPair,
  },
  {
    method: "post",
    path: "/api/auth/logout/",
    alias: "api_auth_logout_create",
    description: `Takes a token and blacklists it. Must be used with the
&#x60;rest_framework_simplejwt.token_blacklist&#x60; app installed.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ refresh: z.string() }).passthrough(),
      },
    ],
    response: z.object({ refresh: z.string() }).passthrough(),
  },
  {
    method: "get",
    path: "/api/communications/bulk-messages/",
    alias: "api_communications_bulk_messages_list",
    requestFormat: "json",
    parameters: [
      {
        name: "delivery_method",
        type: "Query",
        schema: z.enum(["email", "sms"]).optional(),
      },
      {
        name: "recipient_group",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.enum(["Failed", "Pending", "Sent"]).optional(),
      },
    ],
    response: z.array(BulkMessage),
  },
  {
    method: "post",
    path: "/api/communications/bulk-messages/",
    alias: "api_communications_bulk_messages_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: BulkMessage,
      },
    ],
    response: BulkMessage,
  },
  {
    method: "get",
    path: "/api/communications/bulk-messages/:id/",
    alias: "api_communications_bulk_messages_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: BulkMessage,
  },
  {
    method: "put",
    path: "/api/communications/bulk-messages/:id/",
    alias: "api_communications_bulk_messages_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: BulkMessage,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: BulkMessage,
  },
  {
    method: "patch",
    path: "/api/communications/bulk-messages/:id/",
    alias: "api_communications_bulk_messages_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedBulkMessage,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: BulkMessage,
  },
  {
    method: "delete",
    path: "/api/communications/bulk-messages/:id/",
    alias: "api_communications_bulk_messages_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/communications/messages/",
    alias: "api_communications_messages_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Message),
  },
  {
    method: "post",
    path: "/api/communications/messages/",
    alias: "api_communications_messages_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Message,
      },
    ],
    response: Message,
  },
  {
    method: "get",
    path: "/api/communications/messages/:id/",
    alias: "api_communications_messages_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Message,
  },
  {
    method: "put",
    path: "/api/communications/messages/:id/",
    alias: "api_communications_messages_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Message,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Message,
  },
  {
    method: "patch",
    path: "/api/communications/messages/:id/",
    alias: "api_communications_messages_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedMessage,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Message,
  },
  {
    method: "delete",
    path: "/api/communications/messages/:id/",
    alias: "api_communications_messages_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/counselors/sessions/",
    alias: "api_counselors_sessions_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(CounselingSession),
  },
  {
    method: "post",
    path: "/api/counselors/sessions/",
    alias: "api_counselors_sessions_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CounselingSession,
      },
    ],
    response: CounselingSession,
  },
  {
    method: "get",
    path: "/api/counselors/sessions/:id/",
    alias: "api_counselors_sessions_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CounselingSession,
  },
  {
    method: "put",
    path: "/api/counselors/sessions/:id/",
    alias: "api_counselors_sessions_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CounselingSession,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CounselingSession,
  },
  {
    method: "patch",
    path: "/api/counselors/sessions/:id/",
    alias: "api_counselors_sessions_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedCounselingSession,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CounselingSession,
  },
  {
    method: "delete",
    path: "/api/counselors/sessions/:id/",
    alias: "api_counselors_sessions_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/counselors/students/",
    alias: "api_counselors_students_list",
    requestFormat: "json",
    parameters: [
      {
        name: "first_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "gender",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "last_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "region",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(StudentCounselor),
  },
  {
    method: "get",
    path: "/api/counselors/students/:id/",
    alias: "api_counselors_students_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: StudentCounselor,
  },
  {
    method: "get",
    path: "/api/custom_tables/fields/",
    alias: "api_custom_tables_fields_list",
    requestFormat: "json",
    response: z.array(CustomField),
  },
  {
    method: "post",
    path: "/api/custom_tables/fields/",
    alias: "api_custom_tables_fields_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CustomField,
      },
    ],
    response: CustomField,
  },
  {
    method: "get",
    path: "/api/custom_tables/fields/:id/",
    alias: "api_custom_tables_fields_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CustomField,
  },
  {
    method: "put",
    path: "/api/custom_tables/fields/:id/",
    alias: "api_custom_tables_fields_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CustomField,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CustomField,
  },
  {
    method: "patch",
    path: "/api/custom_tables/fields/:id/",
    alias: "api_custom_tables_fields_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedCustomField,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CustomField,
  },
  {
    method: "delete",
    path: "/api/custom_tables/fields/:id/",
    alias: "api_custom_tables_fields_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/custom_tables/tables/",
    alias: "api_custom_tables_tables_list",
    requestFormat: "json",
    response: z.array(CustomTable),
  },
  {
    method: "post",
    path: "/api/custom_tables/tables/",
    alias: "api_custom_tables_tables_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CustomTable,
      },
    ],
    response: CustomTable,
  },
  {
    method: "get",
    path: "/api/custom_tables/tables/:id/",
    alias: "api_custom_tables_tables_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CustomTable,
  },
  {
    method: "put",
    path: "/api/custom_tables/tables/:id/",
    alias: "api_custom_tables_tables_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CustomTable,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CustomTable,
  },
  {
    method: "patch",
    path: "/api/custom_tables/tables/:id/",
    alias: "api_custom_tables_tables_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedCustomTable,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: CustomTable,
  },
  {
    method: "delete",
    path: "/api/custom_tables/tables/:id/",
    alias: "api_custom_tables_tables_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/dashboard/",
    alias: "api_dashboard_retrieve",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/fees/fees/",
    alias: "api_fees_fees_list",
    requestFormat: "json",
    parameters: [
      {
        name: "due_date",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(Fee),
  },
  {
    method: "post",
    path: "/api/fees/fees/",
    alias: "api_fees_fees_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Fee,
      },
    ],
    response: Fee,
  },
  {
    method: "get",
    path: "/api/fees/fees/:id/",
    alias: "api_fees_fees_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Fee,
  },
  {
    method: "put",
    path: "/api/fees/fees/:id/",
    alias: "api_fees_fees_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Fee,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Fee,
  },
  {
    method: "patch",
    path: "/api/fees/fees/:id/",
    alias: "api_fees_fees_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedFee,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Fee,
  },
  {
    method: "delete",
    path: "/api/fees/fees/:id/",
    alias: "api_fees_fees_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/fees/parent/payments/",
    alias: "api_fees_parent_payments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Payment),
  },
  {
    method: "get",
    path: "/api/fees/parent/students/:student_id/unpaid-fees/",
    alias: "api_fees_parent_students_unpaid_fees_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Fee),
  },
  {
    method: "get",
    path: "/api/fees/payments/",
    alias: "api_fees_payments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "fee",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "payment_method",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.enum(["Completed", "Failed", "Pending"]).optional(),
      },
    ],
    response: z.array(Payment),
  },
  {
    method: "post",
    path: "/api/fees/payments/",
    alias: "api_fees_payments_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Payment,
      },
    ],
    response: Payment,
  },
  {
    method: "get",
    path: "/api/fees/payments/:id/",
    alias: "api_fees_payments_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payment,
  },
  {
    method: "put",
    path: "/api/fees/payments/:id/",
    alias: "api_fees_payments_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Payment,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payment,
  },
  {
    method: "patch",
    path: "/api/fees/payments/:id/",
    alias: "api_fees_payments_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedPayment,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payment,
  },
  {
    method: "delete",
    path: "/api/fees/payments/:id/",
    alias: "api_fees_payments_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/librarians/books/",
    alias: "api_librarians_books_list",
    requestFormat: "json",
    parameters: [
      {
        name: "author",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "genre",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "title",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Book),
  },
  {
    method: "post",
    path: "/api/librarians/books/",
    alias: "api_librarians_books_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Book,
      },
    ],
    response: Book,
  },
  {
    method: "get",
    path: "/api/librarians/books/:id/",
    alias: "api_librarians_books_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Book,
  },
  {
    method: "put",
    path: "/api/librarians/books/:id/",
    alias: "api_librarians_books_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Book,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Book,
  },
  {
    method: "patch",
    path: "/api/librarians/books/:id/",
    alias: "api_librarians_books_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedBook,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Book,
  },
  {
    method: "delete",
    path: "/api/librarians/books/:id/",
    alias: "api_librarians_books_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/librarians/borrowing-records/",
    alias: "api_librarians_borrowing_records_list",
    requestFormat: "json",
    parameters: [
      {
        name: "book",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "staff",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.enum(["Borrowed", "Overdue", "Returned"]).optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(BorrowingRecord),
  },
  {
    method: "post",
    path: "/api/librarians/borrowing-records/",
    alias: "api_librarians_borrowing_records_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: BorrowingRecord,
      },
    ],
    response: BorrowingRecord,
  },
  {
    method: "get",
    path: "/api/librarians/borrowing-records/:id/",
    alias: "api_librarians_borrowing_records_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: BorrowingRecord,
  },
  {
    method: "put",
    path: "/api/librarians/borrowing-records/:id/",
    alias: "api_librarians_borrowing_records_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: BorrowingRecord,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: BorrowingRecord,
  },
  {
    method: "patch",
    path: "/api/librarians/borrowing-records/:id/",
    alias: "api_librarians_borrowing_records_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedBorrowingRecord,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: BorrowingRecord,
  },
  {
    method: "delete",
    path: "/api/librarians/borrowing-records/:id/",
    alias: "api_librarians_borrowing_records_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/librarians/overdue-books/",
    alias: "api_librarians_overdue_books_list",
    requestFormat: "json",
    parameters: [
      {
        name: "book",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "staff",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.enum(["Borrowed", "Overdue", "Returned"]).optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(BorrowingRecord),
  },
  {
    method: "get",
    path: "/api/reports/attendance/",
    alias: "api_reports_attendance_list",
    requestFormat: "json",
    parameters: [
      {
        name: "class_session",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "date",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.enum(["ABSENT", "EXCUSED", "LATE", "PRESENT"]).optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(AttendanceReport),
  },
  {
    method: "get",
    path: "/api/reports/classes/",
    alias: "api_reports_classes_list",
    requestFormat: "json",
    parameters: [
      {
        name: "academic_year",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "class_teacher",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "courses",
        type: "Query",
        schema: z.array(z.number().int()).optional(),
      },
      {
        name: "end_time",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "room",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "start_time",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(ClassReport),
  },
  {
    method: "get",
    path: "/api/reports/courses/",
    alias: "api_reports_courses_list",
    requestFormat: "json",
    parameters: [
      {
        name: "code",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "level",
        type: "Query",
        schema: z.enum(["JHS", "PRIMARY", "SHS", "UNIVERSITY"]).nullish(),
      },
      {
        name: "name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(CourseReport),
  },
  {
    method: "get",
    path: "/api/reports/custom/",
    alias: "api_reports_custom_retrieve",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/reports/custom/",
    alias: "api_reports_custom_create",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/reports/download-report-card/:report_card_id/",
    alias: "api_reports_download_report_card_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "report_card_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/reports/enrollment/",
    alias: "api_reports_enrollment_list",
    requestFormat: "json",
    parameters: [
      {
        name: "class_enrolled",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "course",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(EnrollmentReport),
  },
  {
    method: "get",
    path: "/api/reports/fees/",
    alias: "api_reports_fees_list",
    requestFormat: "json",
    parameters: [
      {
        name: "due_date",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(FeeReport),
  },
  {
    method: "get",
    path: "/api/reports/financial/",
    alias: "api_reports_financial_list",
    requestFormat: "json",
    response: z.array(FeeReport),
  },
  {
    method: "post",
    path: "/api/reports/generate-report-card/:student_id/",
    alias: "api_reports_generate_report_card_create",
    requestFormat: "json",
    parameters: [
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/reports/payments/",
    alias: "api_reports_payments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "fee",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "payment_method",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.enum(["Completed", "Failed", "Pending"]).optional(),
      },
    ],
    response: z.array(PaymentReport),
  },
  {
    method: "get",
    path: "/api/reports/staff/",
    alias: "api_reports_staff_list",
    requestFormat: "json",
    parameters: [
      {
        name: "date_joined",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "gender",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "qualification",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "region",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "user__role",
        type: "Query",
        schema: z
          .enum([
            "ACCOUNTANT",
            "ADMIN",
            "COUNSELOR",
            "LIBRARIAN",
            "PARENT",
            "STAFF",
            "STUDENT",
            "TEACHER",
          ])
          .optional(),
      },
    ],
    response: z.array(StaffReport),
  },
  {
    method: "get",
    path: "/api/reports/student-performance/",
    alias: "api_reports_student_performance_list",
    requestFormat: "json",
    parameters: [
      {
        name: "course",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "letter_grade",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.array(GradeReport),
  },
  {
    method: "get",
    path: "/api/reports/students/",
    alias: "api_reports_students_list",
    requestFormat: "json",
    parameters: [
      {
        name: "admission_number",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "gender",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__first_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__last_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__middle_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__occupation",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__phone_number",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__user__email",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "region",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(StudentReport),
  },
  {
    method: "get",
    path: "/api/staff/",
    alias: "api_staff_list",
    requestFormat: "json",
    parameters: [
      {
        name: "date_joined",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "gender",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "qualification",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "region",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "user__role",
        type: "Query",
        schema: z
          .enum([
            "ACCOUNTANT",
            "ADMIN",
            "COUNSELOR",
            "LIBRARIAN",
            "PARENT",
            "STAFF",
            "STUDENT",
            "TEACHER",
          ])
          .optional(),
      },
    ],
    response: z.array(Staff),
  },
  {
    method: "post",
    path: "/api/staff/",
    alias: "api_staff_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Staff,
      },
    ],
    response: Staff,
  },
  {
    method: "get",
    path: "/api/staff/:id/",
    alias: "api_staff_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Staff,
  },
  {
    method: "put",
    path: "/api/staff/:id/",
    alias: "api_staff_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Staff,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Staff,
  },
  {
    method: "patch",
    path: "/api/staff/:id/",
    alias: "api_staff_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedStaff,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Staff,
  },
  {
    method: "delete",
    path: "/api/staff/:id/",
    alias: "api_staff_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/staff/payroll/",
    alias: "api_staff_payroll_list",
    requestFormat: "json",
    parameters: [
      {
        name: "end_date",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "staff",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "start_date",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.enum(["Paid", "Pending"]).optional(),
      },
    ],
    response: z.array(Payroll),
  },
  {
    method: "post",
    path: "/api/staff/payroll/",
    alias: "api_staff_payroll_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Payroll,
      },
    ],
    response: Payroll,
  },
  {
    method: "get",
    path: "/api/staff/payroll/:id/",
    alias: "api_staff_payroll_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payroll,
  },
  {
    method: "put",
    path: "/api/staff/payroll/:id/",
    alias: "api_staff_payroll_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Payroll,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payroll,
  },
  {
    method: "patch",
    path: "/api/staff/payroll/:id/",
    alias: "api_staff_payroll_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedPayroll,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payroll,
  },
  {
    method: "delete",
    path: "/api/staff/payroll/:id/",
    alias: "api_staff_payroll_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/students/",
    alias: "api_students_list",
    requestFormat: "json",
    parameters: [
      {
        name: "admission_number",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "gender",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__first_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__last_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__middle_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__occupation",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__phone_number",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "parent__user__email",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "region",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Student),
  },
  {
    method: "post",
    path: "/api/students/",
    alias: "api_students_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Student,
      },
    ],
    response: Student,
  },
  {
    method: "get",
    path: "/api/students/:id/",
    alias: "api_students_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Student,
  },
  {
    method: "put",
    path: "/api/students/:id/",
    alias: "api_students_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Student,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Student,
  },
  {
    method: "patch",
    path: "/api/students/:id/",
    alias: "api_students_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedStudent,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Student,
  },
  {
    method: "delete",
    path: "/api/students/:id/",
    alias: "api_students_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/students/applications/",
    alias: "api_students_applications_list",
    requestFormat: "json",
    response: z.array(AdmissionApplication),
  },
  {
    method: "post",
    path: "/api/students/applications/",
    alias: "api_students_applications_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: AdmissionApplication,
      },
    ],
    response: AdmissionApplication,
  },
  {
    method: "get",
    path: "/api/students/applications/:id/",
    alias: "api_students_applications_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: AdmissionApplication,
  },
  {
    method: "put",
    path: "/api/students/applications/:id/",
    alias: "api_students_applications_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: AdmissionApplication,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: AdmissionApplication,
  },
  {
    method: "patch",
    path: "/api/students/applications/:id/",
    alias: "api_students_applications_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedAdmissionApplication,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: AdmissionApplication,
  },
  {
    method: "delete",
    path: "/api/students/applications/:id/",
    alias: "api_students_applications_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/token/refresh/",
    alias: "api_token_refresh_create",
    description: `Takes a refresh type JSON web token and returns an access type JSON web
token if the refresh token is valid.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: TokenRefresh,
      },
    ],
    response: TokenRefresh,
  },
  {
    method: "get",
    path: "/api/users/",
    alias: "api_users_list",
    requestFormat: "json",
    parameters: [
      {
        name: "email",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "is_active",
        type: "Query",
        schema: z.boolean().optional(),
      },
      {
        name: "role",
        type: "Query",
        schema: z
          .enum([
            "ACCOUNTANT",
            "ADMIN",
            "COUNSELOR",
            "LIBRARIAN",
            "PARENT",
            "STAFF",
            "STUDENT",
            "TEACHER",
          ])
          .optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(User),
  },
  {
    method: "post",
    path: "/api/users/",
    alias: "api_users_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UserCreate,
      },
    ],
    response: UserCreate,
  },
  {
    method: "get",
    path: "/api/users/:id/",
    alias: "api_users_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: User,
  },
  {
    method: "put",
    path: "/api/users/:id/",
    alias: "api_users_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: User,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: User,
  },
  {
    method: "patch",
    path: "/api/users/:id/",
    alias: "api_users_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedUser,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: User,
  },
  {
    method: "delete",
    path: "/api/users/:id/",
    alias: "api_users_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/users/:id/profile/",
    alias: "api_users_profile_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: User,
  },
  {
    method: "post",
    path: "/api/users/login/",
    alias: "api_users_login_create",
    description: `Takes a set of user credentials and returns an access and refresh JSON web
token pair to prove the authentication of those credentials.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: TokenObtainPair,
      },
    ],
    response: TokenObtainPair,
  },
  {
    method: "post",
    path: "/api/users/logout/",
    alias: "api_users_logout_create",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/users/me/",
    alias: "api_users_me_retrieve",
    requestFormat: "json",
    response: User,
  },
  {
    method: "put",
    path: "/api/users/me/",
    alias: "api_users_me_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: User,
      },
    ],
    response: User,
  },
  {
    method: "patch",
    path: "/api/users/me/",
    alias: "api_users_me_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedUser,
      },
    ],
    response: User,
  },
  {
    method: "get",
    path: "/api/users/parent/children/",
    alias: "api_users_parent_children_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Student),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:id/",
    alias: "api_users_parent_children_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Student,
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/assignments/",
    alias: "api_users_parent_children_assignments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Assignment),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/attendance/",
    alias: "api_users_parent_children_attendance_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Attendance),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/classes/",
    alias: "api_users_parent_children_classes_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Class),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/enrollments/",
    alias: "api_users_parent_children_enrollments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Enrollment),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/fees/fees/",
    alias: "api_users_parent_children_fees_fees_list",
    requestFormat: "json",
    parameters: [
      {
        name: "due_date",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Fee),
  },
  {
    method: "post",
    path: "/api/users/parent/children/:student_id/fees/fees/",
    alias: "api_users_parent_children_fees_fees_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Fee,
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Fee,
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/fees/fees/:id/",
    alias: "api_users_parent_children_fees_fees_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Fee,
  },
  {
    method: "put",
    path: "/api/users/parent/children/:student_id/fees/fees/:id/",
    alias: "api_users_parent_children_fees_fees_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Fee,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Fee,
  },
  {
    method: "patch",
    path: "/api/users/parent/children/:student_id/fees/fees/:id/",
    alias: "api_users_parent_children_fees_fees_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedFee,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Fee,
  },
  {
    method: "delete",
    path: "/api/users/parent/children/:student_id/fees/fees/:id/",
    alias: "api_users_parent_children_fees_fees_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/fees/parent/payments/",
    alias: "api_users_parent_children_fees_parent_payments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Payment),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/fees/parent/students/:student_id/unpaid-fees/",
    alias: "api_users_parent_children_fees_parent_students_unpaid_fees_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Fee),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/fees/payments/",
    alias: "api_users_parent_children_fees_payments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "fee",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "payment_method",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z.enum(["Completed", "Failed", "Pending"]).optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Payment),
  },
  {
    method: "post",
    path: "/api/users/parent/children/:student_id/fees/payments/",
    alias: "api_users_parent_children_fees_payments_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Payment,
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payment,
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/fees/payments/:id/",
    alias: "api_users_parent_children_fees_payments_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payment,
  },
  {
    method: "put",
    path: "/api/users/parent/children/:student_id/fees/payments/:id/",
    alias: "api_users_parent_children_fees_payments_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Payment,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payment,
  },
  {
    method: "patch",
    path: "/api/users/parent/children/:student_id/fees/payments/:id/",
    alias: "api_users_parent_children_fees_payments_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedPayment,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Payment,
  },
  {
    method: "delete",
    path: "/api/users/parent/children/:student_id/fees/payments/:id/",
    alias: "api_users_parent_children_fees_payments_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/grades/",
    alias: "api_users_parent_children_grades_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Grade),
  },
  {
    method: "get",
    path: "/api/users/parent/children/:student_id/unpaid-fees/",
    alias: "api_users_parent_children_unpaid_fees_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "student_id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.array(Fee),
  },
  {
    method: "get",
    path: "/api/users/parent/payments/",
    alias: "api_users_parent_payments_list",
    requestFormat: "json",
    parameters: [
      {
        name: "search",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Payment),
  },
  {
    method: "get",
    path: "/api/users/parents/",
    alias: "api_users_parents_list",
    requestFormat: "json",
    response: z.array(Parent),
  },
  {
    method: "post",
    path: "/api/users/parents/",
    alias: "api_users_parents_create",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Parent,
      },
    ],
    response: Parent,
  },
  {
    method: "get",
    path: "/api/users/parents/:id/",
    alias: "api_users_parents_retrieve",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Parent,
  },
  {
    method: "put",
    path: "/api/users/parents/:id/",
    alias: "api_users_parents_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Parent,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Parent,
  },
  {
    method: "patch",
    path: "/api/users/parents/:id/",
    alias: "api_users_parents_partial_update",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: PatchedParent,
      },
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: Parent,
  },
  {
    method: "delete",
    path: "/api/users/parents/:id/",
    alias: "api_users_parents_destroy",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/users/password-reset/",
    alias: "api_users_password_reset_create",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/users/password-reset/confirm/:uid/:token/",
    alias: "api_users_password_reset_confirm_create",
    requestFormat: "json",
    parameters: [
      {
        name: "token",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "uid",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/api/users/register/",
    alias: "api_users_register_create",
    requestFormat: "json",
    response: z.void(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
