import api from "../utils/api";
import CustomToaster from "./toaster";
import clsx from "clsx";
import { createFormControl, createFormGroup } from "solid-forms";
import { Component, createSignal } from "solid-js";
import toast from "solid-toast";
import { Button } from "ui/kit-new/buttons";
import { FormTextAreaInput, FormTextInput, TextAreaInput, TextInput } from "ui/kit-new/inputs";
import Select from "ui/kit-new/select";

const ContactForm: Component<{ class?: string }> = (props) => {
  const [regarding, setRegarding] = createSignal<any>();
  const form = createFormGroup({
    name: createFormControl("", {
      required: true,
    }),
    email: createFormControl("", {
      required: true,
      // Add validation
    }),
    subject: createFormControl("", {
      required: true,
    }),
    message: createFormControl("", {
      required: true,
    }),
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.isSubmitted) return;
    form.markPending(true);
    const payload = { ...form.value, regarding: regarding().value || "other" };
    await api.records
      .create("contact_form", payload)
      .then(() => {
        toast.success("Message sent!");
        form.markSubmitted(true);
      })
      .catch((err) => toast.error(err.message));
    form.markPending(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit} class={clsx("flex flex-col space-y-5 items-center w-full", props.class)}>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <FormTextInput name="name" placeholder="Name" control={form.controls.name} />
          <FormTextInput name="email" type="email" placeholder="Email" control={form.controls.email} />
          <Select
            placeholder="Regarding"
            option={regarding}
            setOption={setRegarding}
            options={[
              { id: "regarding-general", label: "General", value: "general" },
              { id: "regarding-bug", label: "Site Bug", value: "site-bug" },
              { id: "regarding-idea", label: "Project Ideas", value: "project-idea" },
              { id: "regarding-other", label: "Other", value: "other" },
            ]}
          />
          <FormTextInput name="subject" placeholder="Subject" control={form.controls.subject} />
          <FormTextAreaInput
            name="message"
            class="sm:col-span-2"
            placeholder="Message"
            control={form.controls.message}
          />
        </div>
        <Button type="submit" loading={form.isPending} disabled={form.isSubmitted} size="lg">
          Submit
        </Button>
      </form>
      <CustomToaster />
    </>
  );
};

export default ContactForm;
