import React, { useState } from "react";
import { Alert, DialogTitle, Dialog, DialogContent } from "@mui/material";
import { RegisterLibrarian } from "../../service/UserAPI";
import { useForm } from "react-hook-form";
import { InputField, DropDownField } from "@gtn/utility";
import { LibrarianRegistrationFields as LR } from "../../utils/LibrarianRegistrationFields";
import { FormData } from "../../utils/types";

export default function RegisterNewLibrarian({
  setRegisterNewLibrarianClicked,
}: {
  setRegisterNewLibrarianClicked?: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      await RegisterLibrarian(data);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setRegisterNewLibrarianClicked && setRegisterNewLibrarianClicked(false);
      }, 3000);
    } catch (err) {
      setError("Failed to register librarian. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">
        Register New Librarian
      </DialogTitle>
      <button
        onClick={() =>
          setRegisterNewLibrarianClicked &&
          setRegisterNewLibrarianClicked(false)
        }
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <DialogContent className="pt-1">
        {submitted && (
          <Alert severity="success" className="mb-6">
            Librarian has been registered successfully!
          </Alert>
        )}

        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <InputField
            label={LR.FullName.label}
            name={LR.FullName.name}
            type={LR.FullName.type}
            placeholder={LR.FullName.placeholder}
            register={register}
            errors={errors}
            validation={LR.FullName.validation}
            inputFilter={LR.FullName.inputFilter}
            className="flex-1"
          />

          <div className="flex gap-2">
            <InputField
              label={LR.Email.label}
              name={LR.Email.name}
              type={LR.Email.type}
              placeholder={LR.Email.placeholder}
              register={register}
              errors={errors}
              validation={LR.Email.validation}
              className="flex-1"
            />

            <InputField
              label={LR.PhoneNumber.label}
              name={LR.PhoneNumber.name}
              type={LR.PhoneNumber.type}
              placeholder={LR.PhoneNumber.placeholder}
              register={register}
              errors={errors}
              validation={LR.PhoneNumber.validation}
              inputFilter={LR.PhoneNumber.inputFilter}
              className="flex-1"
            />
          </div>

          <InputField
            label={LR.Address.label}
            name={LR.Address.name}
            type={LR.Address.type}
            placeholder={LR.Address.placeholder}
            register={register}
            errors={errors}
            validation={LR.Address.validation}
            className="w-full"
          />

          <div className="flex gap-2">
            <InputField
              label={LR.DateOfBirth.label}
              name={LR.DateOfBirth.name}
              type={LR.DateOfBirth.type}
              placeholder={LR.DateOfBirth.placeholder}
              register={register}
              errors={errors}
              validation={LR.DateOfBirth.validation}
              className="flex-1"
            />

            <DropDownField
              label={LR.Gender.label}
              name={LR.Gender.name}
              options={LR.Gender.options}
              register={register}
              errors={errors}
              validation={LR.Gender.validation}
              className="flex-1"
            />

            <InputField
              label={LR.NIC.label}
              name={LR.NIC.name}
              type={LR.NIC.type}
              placeholder={LR.NIC.placeholder}
              register={register}
              errors={errors}
              validation={LR.NIC.validation}
              inputFilter={LR.NIC.inputFilter}
              className="flex-1"
            />
          </div>

          <div className="flex gap-2">
            <InputField
              label={LR.MembershipDate.label}
              name={LR.MembershipDate.name}
              type={LR.MembershipDate.type}
              placeholder={LR.MembershipDate.placeholder}
              register={register}
              errors={errors}
              validation={LR.MembershipDate.validation}
              className="flex-1"
            />
            
            <DropDownField
              label={LR.Type.label}
              name={LR.Type.name}
              options={LR.Type.options}
              register={register}
              errors={errors}
              validation={LR.Type.validation}
              className="flex-1"
            />

            <DropDownField
              label={LR.Status.label}
              name={LR.Status.name}
              options={LR.Status.options}
              register={register}
              errors={errors}
              validation={LR.Status.validation}
              className="flex-1"
            />
          </div>

          <InputField
            label={LR.RegisteredBy.label}
            name={LR.RegisteredBy.name}
            type={LR.RegisteredBy.type}
            placeholder={LR.RegisteredBy.placeholder}
            register={register}
            errors={errors}
            validation={LR.RegisteredBy.validation}
            className="w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-3 py-1.5 bg-black text-white rounded font-medium text-xs outline-none hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Registering...
              </>
            ) : (
              "Register Member"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
