import { Gender, Status } from "./enums";

const MemberRegistrationFields = {
    PhoneNumber: {
        label: "Phone Number",
        name: "phone",
        type: "text",
        placeholder: "Enter phone number",
        inputFilter: /[^\+0-9]/g,
        validation: {
            required: "Phone number is required",
            pattern: {
                value: /^\+[0-9]{11}$/,
                message: "Phone must be in format +94771234567",
            },
        },
    },
    FullName: {
        label: "Full Name",
        name: "fullname",
        type: "text",
        placeholder: "Enter full name",
        validation: {
            required: "Full name is required",
        },
        inputFilter: /[^a-zA-Z\s]/g,
    },
    Email: {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Enter email address",
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
            },
        },
    },
    Address:{
        label: "Address",
        name: "address",
        type: "text",
        placeholder: "Enter address",
        validation: {
            required: "Address is required",
        },
    },
    DateOfBirth:{
        label: "Date of Birth",
        name: "dateOfBirth",
        type: "date",
        placeholder: "Enter date of birth",
        validation: {
            required: "Date of birth is required",
        },
    },
    Gender:{
        label: "Gender",
        name: "gender",
        type: "select",
        placeholder: "Select gender",
        options: [
            { value: Gender.Male, label: "Male" },
            { value: Gender.Female, label: "Female" },
            { value: Gender.Other, label: "Other" },
        ],
        validation: {
            required: "Gender is required",
        },
    },
    NIC: {
        label: "NIC",
        name: "nic",
        type: "text",
        placeholder: "Enter NIC",
        validation: {
            required: "NIC is required",
            pattern: {
                value: /^([0-9]{9}[vV]|[0-9]{12})$/,
                message: "NIC must be 9 digits followed by 'v' or 'V', or 12 digits",
            },
        },
        inputFilter: /[^0-9vV]/g,
    },
    MembershipDate: {
        label: "Membership Date",
        name: "membershipDate",
        type: "date",
        placeholder: "Enter membership date",
        validation: {
            required: "Membership date is required",
        },
    },
    Type: {
        label: "Member Type",
        name: "type",
        type: "select",
        placeholder: "Select member type",
        options: [
            { value: "member", label: "Member" },
            { value: "teacher", label: "Teacher" },
            { value: "general", label: "General" },
        ],
        validation: {
            required: "Member type is required",
        },
    },
    Status: {
        label: "Status",
        name: "status",
        type: "select",
        placeholder: "Select status",
        options: [
            { value: Status.Active, label: "Active" },
            { value: Status.Inactive, label: "Inactive" },
        ],
        validation: {
            required: "Status is required",
        },
    },
    RegisteredBy: {
        label: "Registered By",
        name: "registeredBy",
        type: "text",
        placeholder: "Enter registrar's name",
        validation: {
            required: "Registrar's name is required",
        },
        inputFilter: /[^a-zA-Z\s]/g,
    },
}

export { MemberRegistrationFields };