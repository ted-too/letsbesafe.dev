import api from "../utils/api";
import CustomToaster from "./toaster";
import clsx from "clsx";
import { createForm } from "solid-create-form";
import { Component, createSignal } from "solid-js";
import toast from "solid-toast";
import { Button } from "ui/kit-new/buttons";
import { TextAreaInput, TextInput } from "ui/kit-new/inputs";
import Select from "ui/kit-new/select";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const defaultValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm: Component<{ class?: string }> = (props) => {
  const [regarding, setRegarding] = createSignal<any>();
  const form = createForm<FormValues>({ defaultValues });
  const [formLoading, setFormLoading] = createSignal(false);
  const [formSubmitted, setFormSubmitted] = createSignal(false);
  const handleSubmit = async (data: FormValues) => {
    if (formSubmitted()) return;
    setFormLoading(true);
    const payload = { ...data, regarding: regarding().value || "other" };
    await api.records
      .create("contact_form", payload)
      .then(() => {
        toast.success("Message sent!");
        setFormSubmitted(true);
      })
      .catch((err) => toast.error(err.message));
    setFormLoading(false);
  };
  return (
    <>
      <form
        onSubmit={form.wrapSubmit(handleSubmit)}
        class={clsx("flex flex-col space-y-5 items-center w-full", props.class)}
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <TextInput
            name="name"
            placeholder="Name"
            value={form.values().name}
            onInput={(e) => form.handlers.name(e.currentTarget.value)}
          />
          <TextInput
            name="email"
            type="email"
            placeholder="Email"
            value={form.values().email}
            onInput={(e) => form.handlers.email(e.currentTarget.value)}
          />
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
          <TextInput
            name="subject"
            placeholder="Subject"
            value={form.values().subject}
            onInput={(e) => form.handlers.subject(e.currentTarget.value)}
          />
          <TextAreaInput
            name="message"
            class="sm:col-span-2"
            placeholder="Message"
            value={form.values().message}
            onInput={(e) => form.handlers.message(e.currentTarget.value)}
          />
        </div>
        <Button type="submit" loading={formLoading()} disabled={!form.isDirty() || formSubmitted()} size="lg">
          Submit
        </Button>
      </form>
      <CustomToaster />
    </>
  );
};

export default ContactForm;
