import * as yup from "yup";
// const PanRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const PhoneRegex = /^[0]*(\+?91(\s|-)?)?[1-9][0-9]{9}$/;
const getMinCharactersMsg = (keyLabel = "Entered value", minimumCount) =>
  `${keyLabel} must be at least ${minimumCount} characters long`;

export const mockInterviewRequestValidation = yup.object().shape({
  isAgreed: yup
    .boolean()
    .required("Please agree to terms and conditions")
    .test("isAgreed", "Please agree to terms and conditions", function (val) {
      return val;
    }),
  name: yup
    .string()
    .required("First name must be valid")
    .min(2, getMinCharactersMsg("Name", 2)),
  email: yup.string().email("Invalid Email").required("Email must be valid"),
  phone: yup
    .string()
    .matches(PhoneRegex, "Invalid Phone Number")
    .required("Phone Number required"),
  date: yup.string().required("Date required"),
  time: yup.string().required("Time required"),
  countryCode: yup.string().required("Country code required"),
  skills: yup
    .array()
    .min(1, "Select at least 1 skill")
    .required("Skills required"),
  resume: yup.string().required("Resume required"),
});
export const consultationRequestFormValidation = yup.object().shape({
  isAgreed: yup
    .boolean()
    .required("Please agree to terms and conditions")
    .test("isAgreed", "Please agree to terms and conditions", function (val) {
      return val;
    }),
  name: yup
    .string()
    .required("First name must be valid")
    .min(2, getMinCharactersMsg("Name", 2)),
  email: yup.string().email("Invalid Email").required("Email must be valid"),
  phone: yup
    .string()
    .matches(PhoneRegex, "Invalid Phone Number")
    .required("Phone Number required"),

  countryCode: yup.string().required("Country code required"),
  description: yup.string().required("Description required"),
  skills: yup
    .array()
    .min(1, "Select at least 1 skill")
    .required("Skills required"),
});
export const validateName = yup.object().shape({
  firstName: yup
    .string()
    .required("First name must be valid")
    .min(2, getMinCharactersMsg("First name", 2)),
  lastName: yup
    .string()
    .required("Last name must be valid")
    .min(2, getMinCharactersMsg("Last name", 2)),
  phone: yup
    .string()
    .matches(PhoneRegex, "Invalid Phone Number")
    .required("Phone Number required"),
});
export const validateUpdatePassword = yup.object().shape({
  password: yup
    .string()
    .required("Please enter your password.")

    .min(8, getMinCharactersMsg("Password", 8)),
  confirm_password: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});
export const validateEmail = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email must be valid"),
});
export const validatePassword = yup.object().shape({
  password: yup
    .string()
    .required("Password must be valid")
    .min(5, getMinCharactersMsg("Password", 5)),
});
export const validateVerifyOtp = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email must be valid"),
  otp: yup
    .string()
    .required("Otp must be valid")
    .min(4, "Otp must be 4 digits long")
    .max(4, "Otp must be 4 digits long"),
});
export const validateLogin = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email required"),
  password: yup
    .string()
    .min(5, getMinCharactersMsg("Password", 5))
    .required("Password required"),
});
export const validateRegister = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email required"),
  password: yup
    .string()
    .min(5, getMinCharactersMsg("Password", 5))
    .required("Password required"),
  phone: yup
    .string()
    .matches(PhoneRegex, "Invalid Phone Number")
    .required("Phone Number required"),
  name: yup.string().required("Name required"),
});
const validateHm = {
  name: yup
    .string()
    .required("Name required")
    .min(3, getMinCharactersMsg("Name", 3)),
  phone: yup
    .string()
    .matches(PhoneRegex, "Invalid Phone Number")
    .required("Phone Number required"),
  email: yup.string("Invalid Email").email().required("Email required"),
};
export const validateCreateHm = yup.object().shape({
  ...validateHm,
  password: yup
    .string()
    .required("Password required")
    .min(6, getMinCharactersMsg("Password", 6)),
  department: yup.string().required("Department required"),
});
export const validateEditHm = yup.object().shape({
  ...validateHm,
});

export const validateDept = yup.object().shape({
  departmentName: yup
    .string()
    .required("Department Name required")
    .min(2, getMinCharactersMsg("Department Name", 2)),
});

export const validatePanel = yup.object().shape({
  name: yup.string().required("Panel Name required"),
  email: yup.string("Invalid Email").email().required("Email required"),
  phone: yup
    .string()
    .matches(PhoneRegex, "Invalid Phone Number")
    .max(15)
    .required("Phone Number required"),
  skillsCanInterview: yup
    .array()
    .min(1, "Select at least 1 skill")
    .required("Skills required"),
});

export const validateApplicant = yup.object().shape({
  name: yup.string().required("Applicant Name required"),
  email: yup.string("Invalid Email").email().required("Email required"),
  phone: yup
    .string()
    .matches(PhoneRegex, "Invalid Phone Number")
    .required("Phone Number required"),
  skillSet: yup
    .array()
    .min(1, "Select at least 1 skill")
    .required("Skills required"),
});

export const validateRequirement = yup.object().shape({
  positions: yup.string().required("Positions required"),
  jobTitle: yup.string().required("Job Title  required"),
  experienceFrom: yup
    .number()
    .required("Experience  required")
    .test(
      "experienceFrom",
      "Experience from can't be greater than experience to",
      function (val) {
        return !(this.parent.experienceTo && val > this.parent.experienceTo);
      }
    ),
  experienceTo: yup
    .number()
    .required("Experience  required")
    .test(
      "experienceTo",
      "Experience to can't be less than experience from",
      function (val) {
        return !(val < this.parent.experienceFrom);
      }
    ),
  // salary: yup.string().required("Salary required"),
  location: yup
    .array()
    .min(1, "Select at least 1 location")
    .required("Locations  required"),
  description: yup.string().required("Description required"),
  skills: yup
    .array()
    .min(1, "Select at least 1 skill")
    .required("Skills required"),
});

export const addInterveiwerValidation = yup.object().shape({
  firstName: yup.string().required("First Name required"),
  lastName: yup.string().required("Last Name  required"),
  email: yup.string().email("Invalid Email").required("Email required"),
  phone: yup
    .string()
    .matches(PhoneRegex, "Invalid Phone Number")
    .required("Phone Number required"),
  experience: yup.string().email().required("Experience required"),
});

export const validateRequestSchedule = yup.object().shape({
  start_date: yup.string().required("Date required "),
  time: yup.string().required("Time required "),
});

export const validateReschedule = (role) =>
  yup.object().shape({
    date: yup.string().required("Date required "),
    time: yup.string().required("Time required "),
  });
export const validateScheduleUnihireInterview = () =>
  yup.object().shape({
    date: yup.string().required("Date required "),
    time: yup.string().required("Time required "),
    interviewerId: yup.string().required("Panel required"),
  });

export const validateScheduleMockInterview = (role) =>
  yup.object().shape({
    date: yup.string().required("Date required "),
    time: yup.string().required("Time required "),
    interviewerId: yup.string().required("Panel required "),
  });
export const validateScheduleExpertInterview = (role) =>
  yup.object().shape({
    date: yup.string().required("Date required "),
    time: yup.string().required("Time required "),
    interviewerId: yup.string().required("Panel required "),
  });

export const companyValidation = yup.object().shape({
  nameOfTheCompany: yup.string().required("Name required"),
  industry: yup.string().required("Industry required"),
  // state: yup.string().required("State required "),
  // city: yup.string().required("City required "),
  // country: yup.string().required("Country required "),

  address: yup
    .string()
    .min(10, getMinCharactersMsg("Address", 10))
    .required("Address required "),
});

const ratingCommentSchema = yup.object().shape({
  comment: yup.string().required("Comment required"),
  rating: yup.string().required("Rating required"),
});
const noShowStausSchema = (initialSchema, thenSchema) =>
  initialSchema.when("status", {
    is: (val) => val !== "no-show",
    then: thenSchema,
  });
const reviewValidationObject = {
  message: noShowStausSchema(
    yup.string(),
    yup
      .string()
      .required("Candidate summary required")
      .min(50, getMinCharactersMsg("Candidate summary", 50))
  ),
  technical: noShowStausSchema(yup.object(), ratingCommentSchema),
  communications: noShowStausSchema(yup.object(), ratingCommentSchema),
  pastWorkExperience: noShowStausSchema(yup.object(), ratingCommentSchema),
  professionalImpression: noShowStausSchema(yup.object(), ratingCommentSchema),
  positionKnowledge: noShowStausSchema(yup.object(), ratingCommentSchema),
};
export const reviewValidation = yup.object().shape({
  ...reviewValidationObject,
  status: yup
    .string()
    .required("Feedback required")
    .test("status", "Feedback is required", (val) => val !== "attended"),
});
export const unihireReviewValidation = yup.object().shape({
  message: yup
    .string()
    .required("Candidate summary required")
    .min(50, getMinCharactersMsg("Candidate summary", 50)),
  professionalImpression: yup
    .object()
    .shape({ rating: yup.string().required("Rating required") }),
  communications: yup
    .object()
    .shape({ rating: yup.string().required("Rating required") }),
});
export const mockCandidateReviewValidation = yup.object().shape({
  ...reviewValidationObject,
});

const personal = yup.object().shape({
  firstName: yup.string().required("First Name required"),
  lastName: yup.string().required("Last Name required"),
  state: yup.string().required("State required "),
  city: yup.string().required("City required "),
  country: yup.string().required("Country required "),
  // panCard: yup.string().matches(PanRegex, "PAN Card invalid").required(),
  address: yup
    .string()
    .min(10, getMinCharactersMsg("Address", 10))
    .required("Address required "),
});
const work = yup.object().shape({
  experienced: yup.boolean().required("Experience required "),
  workExperienceYears: yup.string().required("Experience required "),
  workExperienceMonths: yup.string().required("Experience required "),
});
const education = yup.object().shape({
  skillSet: yup
    .array()
    .min(1, "Select at least 1 skill")
    .required("Skills are required"),
  expectedSalary: yup.string().required("Expected Salary required"),

  // education: yup.string().required('Education should be valid '),
});
// const contact = yup.object().shape({
//   email: yup.string().email(``).required("Contact should be valid "),
// });
export const validateCandidateProfile = [personal, work, education];

export const validateInterviewerProfileSchemaObject = {
  firstName: yup.string().required("First Name required"),
  lastName: yup.string().required("Last Name required"),
  bio: yup
    .string()
    .required("Summary required")
    .min(25, getMinCharactersMsg("Summary", 25)),
  skillsCanInterview: yup
    .array()
    .min(1, "Select at least 1 skill")
    .required("Skills required"),
  currentDesignation: yup.string().required("Designation required"),
  address: yup.string(),
};
export const validateCreateInterviewerProfile = yup.object().shape({
  ...validateInterviewerProfileSchemaObject,
  resume: yup.string().required("Resume required"),
});
export const validateUpdateInterviewerProfile = yup.object().shape({
  ...validateInterviewerProfileSchemaObject,
});

//MB (1)
// const FILE_LIMIT = 1000000;
export const validateApplicants = yup.object({
  name: yup.string().required("Required field"),
  email: yup.string().email("Invalid email").required("Required field"),
  phone: yup
    .string()
    // .number("only numbers allowed")
    // .typeError("phone must be a number")
    .matches(PhoneRegex, "Invalid Phone Number")
    .required("Required field"),
  skillSet: yup.array().min(1, "Minimum 1 skill required"),
  resume: yup.mixed().nullable().required("Required field"),
  experience: yup.string().required("Required field"),
});

export const validateSchedulingRequirement = yup.object().shape({
  requirementId: yup.string().required("Job Id required"),
  /**  date: "",
      time: "",
      interviewerId: "",
      candidateId: "", */
  date: yup.string().required("Date required"),
  time: yup.string().required("Time required"),
  interviewerId: yup.string().required("Interviewer required"),
  applicantId: yup.string().required("Candidate  required"),
});

export const validateCancelRequirement = yup.object().shape({
  reason: yup.string().required("Skills required"),
  comment: yup.string().required("comment required"),
});
