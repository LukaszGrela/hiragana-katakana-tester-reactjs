import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { getData } from "./handlers/data";

console.log("SETUP MSW SERWER", import.meta.env.BASE_URL);
export const mswServer = setupServer(
  getData,
  http.options(import.meta.env.BASE_URL, () => {
    return HttpResponse.json(
      {
        headers: {
          Allow: "GET,POST,HEAD,PUT,PATCH,DELETE",
        },
      },
      { status: 200 },
    );
  }),
);
