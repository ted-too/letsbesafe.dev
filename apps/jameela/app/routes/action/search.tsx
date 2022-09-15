import { ActionFunction, json, redirect } from "@remix-run/node";
import ytdl from "ytdl-core";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const search = formData.get("search")?.toString() || "";
  if (search == "") return json({ error: "Search can not be empty!" });
  let searchId = "";
  try {
    searchId = ytdl.getVideoID(search);
  } catch (error) {
    // search not youtube
  }
  if (searchId) return redirect(`/video?type=yt&id=${searchId}`);
  return redirect(`/search?type=yt&query=${encodeURIComponent(search)}`);
};
