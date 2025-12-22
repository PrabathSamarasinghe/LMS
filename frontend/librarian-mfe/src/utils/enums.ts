enum ActivityType {
  RETURN = "return",
  ISSUE = "issue",
  REGISTRATION = "registration",
  RENEWAL = "renewal",
}

enum BookCondition {
  EXCELLENT = "excellent",
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
}


enum RequestStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  DECLINED = "Declined",
}

enum FormType {
  TEXT = 'text',
  EMAIL = 'email',
  TEL = 'tel',
  DATE = 'date',
  SELECT = 'select',
}


enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

enum Status {
  Active = "Active",
  Inactive = "Inactive",
}

export { ActivityType, BookCondition, RequestStatus, FormType, Gender, Status };