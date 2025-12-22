import React, { useState } from "react";
import { Alert, DialogTitle, Dialog, DialogContent } from "@mui/material";
import { CreateNewMember } from "../../service/UserAPI";
import { useForm } from "react-hook-form";
import { InputField, DropDownField } from "@gtn/utility";
import { MemberRegistrationFields as MR } from "../../utils/MemberRegistrationFields";
import { FormData } from "../../utils/types";

export default function RegisterNewMember({
  setRegisterNewMemberClicked,
}: {
  setRegisterNewMemberClicked?: (value: boolean) => void;
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
      await CreateNewMember(data);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setRegisterNewMemberClicked && setRegisterNewMemberClicked(false);
      }, 3000);
    } catch (err) {
      setError("Failed to register member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">
        Register New Member
      </DialogTitle>
      <button
        onClick={() =>
          setRegisterNewMemberClicked && setRegisterNewMemberClicked(false)
        }
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <DialogContent className="pt-1">
        {submitted && (
          <Alert severity="success" className="mb-6">
            Member has been registered successfully!
          </Alert>
        )}

        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <div>
            <InputField
              label={MR.FullName.label}
              name={MR.FullName.name}
              type={MR.FullName.type}
              placeholder={MR.FullName.placeholder}
              register={register}
              errors={errors}
              validation={MR.FullName.validation}
              inputFilter={MR.FullName.inputFilter}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <InputField
              label={MR.Email.label}
              name={MR.Email.name}
              type={MR.Email.type}
              placeholder={MR.Email.placeholder}
              register={register}
              errors={errors}
              validation={MR.Email.validation}
              className="flex-1"
            />
            <InputField
              label={MR.PhoneNumber.label}
              name={MR.PhoneNumber.name}
              type={MR.PhoneNumber.type}
              placeholder={MR.PhoneNumber.placeholder}
              register={register}
              errors={errors}
              validation={MR.PhoneNumber.validation}
              inputFilter={MR.PhoneNumber.inputFilter}
              className="flex-1"
            />
          </div>

          <div>
            <InputField
              label={MR.Address.label}
              name={MR.Address.name}
              type={MR.Address.type}
              placeholder={MR.Address.placeholder}
              register={register}
              errors={errors}
              validation={MR.Address.validation}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <InputField
              label={MR.DateOfBirth.label}
              name={MR.DateOfBirth.name}
              type={MR.DateOfBirth.type}
              placeholder={MR.DateOfBirth.placeholder}
              register={register}
              errors={errors}
              validation={MR.DateOfBirth.validation}
              className="flex-1"
            />

            <DropDownField
              label={MR.Gender.label}
              name={MR.Gender.name}
              options={MR.Gender.options}
              register={register}
              errors={errors}
              validation={MR.Gender.validation}
              className="flex-1"
            />

            <InputField
              label={MR.NIC.label}
              name={MR.NIC.name}
              type={MR.NIC.type}
              placeholder={MR.NIC.placeholder}
              register={register}
              errors={errors}
              validation={MR.NIC.validation}
              className="flex-1"
            />
          </div>

          <div className="flex gap-2">
            <InputField
              label={MR.MembershipDate.label}
              name={MR.MembershipDate.name}
              type={MR.MembershipDate.type}
              placeholder={MR.MembershipDate.placeholder}
              register={register}
              errors={errors}
              validation={MR.MembershipDate.validation}
              className="flex-1"
            />

            <DropDownField
              label={MR.Type.label}
              name={MR.Type.name}
              options={MR.Type.options}
              register={register}
              errors={errors}
              validation={MR.Type.validation}
              className="flex-1"
            />

            <DropDownField
              label={MR.Status.label}
              name={MR.Status.name}
              options={MR.Status.options}
              register={register}
              errors={errors}
              validation={MR.Status.validation}
              className="flex-1"
            />
          </div>

          <div>
            <InputField
              label={MR.RegisteredBy.label}
              name={MR.RegisteredBy.name}
              type={MR.RegisteredBy.type}
              placeholder={MR.RegisteredBy.placeholder}
              register={register}
              errors={errors}
              validation={MR.RegisteredBy.validation}
              className="w-full"
            />
          </div>

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
