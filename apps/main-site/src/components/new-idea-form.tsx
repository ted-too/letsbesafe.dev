import api from "../utils/api";
import CustomToaster from "./toaster";
import clsx from "clsx";
import { createForm } from "solid-create-form";
import { Component, createSignal } from "solid-js";
import toast from "solid-toast";
import { Button } from "ui/kit/buttons";
import { Checkbox, TextAreaInput, TextInput } from "ui/kit/inputs";
import Select from "ui/kit/select";

interface FormValues {
  title: string;
  handle: string;
  description: string;
  notDuplicate: boolean;
  allowContact: boolean;
}

const defaultValues = {
  title: "",
  handle: "",
  description: "",
  notDuplicate: false,
  allowContact: false,
};

const NewIdeaForm: Component<{ class?: string }> = (props) => {
  const [contactPlatform, setContactPlatform] = createSignal<any>();
  const form = createForm<FormValues>({ defaultValues });
  const [formLoading, setFormLoading] = createSignal(false);
  const [formSubmitted, setFormSubmitted] = createSignal(false);
  const handleSubmit = async ({ notDuplicate, allowContact, handle, ...data }: FormValues) => {
    if (formSubmitted() || !notDuplicate) return;
    if (allowContact && !contactPlatform().value)
      return toast.error("Please select the platform you wish to be contacted on");
    setFormLoading(true);
    const payload = { ...data, ...(allowContact && { platform: contactPlatform().value, handle }) };
    await api.records
      .create("new_idea_form", payload)
      .then(() => {
        toast.success("Idea submitted!");
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
        <Checkbox
          onChange={(e) => form.handlers.notDuplicate(!form.values().notDuplicate)}
          checked={form.values().notDuplicate}
        >
          I have checked on the main{" "}
          <a href="/projects/vote" class="underline text-melon-500">
            voting
          </a>{" "}
          page and my idea will not be a duplicate
        </Checkbox>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <TextInput
            name="title"
            placeholder="Title"
            value={form.values().title}
            onInput={(e) => form.handlers.title(e.currentTarget.value)}
            required
          />
          <Checkbox
            onChange={(e) => form.handlers.allowContact(!form.values().allowContact)}
            checked={form.values().allowContact}
          >
            I would like to be contacted regarding my idea
          </Checkbox>
          <Select
            placeholder="Platform"
            option={contactPlatform}
            setOption={setContactPlatform}
            options={[
              { id: "platform-twitter", label: "Twitter", value: "twitter" },
              { id: "platform-email", label: "Email", value: "email" },
              { id: "platform-discord", label: "Discord", value: "discord" },
            ]}
            disabled={!form.values().allowContact}
          />
          <TextInput
            name="handle"
            placeholder="Handle"
            value={form.values().handle}
            onInput={(e) => form.handlers.handle(e.currentTarget.value)}
            required
            disabled={!form.values().allowContact}
          />
          <TextAreaInput
            name="description"
            class="sm:col-span-2"
            placeholder="Description"
            value={form.values().description}
            onInput={(e) => form.handlers.description(e.currentTarget.value)}
            required
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

export default NewIdeaForm;
