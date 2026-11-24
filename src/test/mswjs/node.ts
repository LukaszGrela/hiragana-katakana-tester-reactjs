import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

console.log("SETUP MSW SERWER", import.meta.env.BASE_URL);
export const mswServer = setupServer(
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
