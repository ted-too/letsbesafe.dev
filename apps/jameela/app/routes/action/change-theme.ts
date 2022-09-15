import { ActionFunction, redirect } from "@remix-run/node";
import { Theme, colorSchemeCookie, getColorScheme } from "~/utils/theme.server";

export const action: ActionFunction = async ({ request }) => {
  const currentColorScheme = await getColorScheme(request);
  const newColorScheme = currentColorScheme === "light" ? Theme.Dark : Theme.Light;

  return redirect(request.url, {
    headers: {
      "Set-Cookie": await colorSchemeCookie.serialize(newColorScheme),
    },
  });
};
