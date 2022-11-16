import api from "../utils/api";
import CustomToaster from "./toaster";
import clsx from "clsx";
import { createFormControl, createFormGroup } from "solid-forms";
import { Component, createSignal } from "solid-js";
import toast from "solid-toast";
import { Button } from "ui/kit-new/buttons";
import { Checkbox, FormTextAreaInput, FormTextInput, TextAreaInput, TextInput } from "ui/kit-new/inputs";
import Select from "ui/kit-new/select";

const NewIdeaForm: Component<{ class?: string }> = (props) => {
  const [notDuplicate, setNotDuplicate] = createSignal(false);
  const [allowContact, setAllowContact] = createSignal(false);
  const [contactPlatform, setContactPlatform] = createSignal<any>();
  const form = createFormGroup({
    title: createFormControl("", {
      required: true,
    }),
    handle: createFormControl("", {
      required: allowContact(),
      disabled: !allowContact(),
    }),
    description: createFormControl(""),
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.isSubmitted || !notDuplicate()) return;
    form.markPending(true)
    const payload = { ...form.value, ...(contactPlatform().value && { platform: contactPlatform().value }) };
    await api.records
      .create("new_idea_form", payload)
      .then(() => {
        toast.success("Idea submitted!")
        form.markSubmitted(true)
      })
      .catch((err) => toast.error(err.message));
    form.markPending(false)
  };
  return (
    <>
      <form onSubmit={handleSubmit} class={clsx("flex flex-col space-y-5 items-center w-full", props.class)}>
        <Checkbox onChange={(e) => setNotDuplicate(!allowContact())} checked={notDuplicate()}>
          I have checked on the main{" "}
          <a href="/projects/vote" class="underline text-melon-500">
            voting
          </a>{" "}
          page and my idea will not be a duplicate
        </Checkbox>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <FormTextInput name="title" placeholder="Title" control={form.controls.title} />
          <Checkbox onChange={(e) => setAllowContact(!allowContact())} checked={allowContact()}>
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
            disabled={!allowContact()}
          />
          <FormTextInput name="handle" placeholder="Handle" control={form.controls.handle} />
          <FormTextAreaInput
            name="description"
            class="sm:col-span-2"
            placeholder="Description"
            control={form.controls.description}
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

export default NewIdeaForm;
