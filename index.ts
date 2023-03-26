import {
  getSetCookies,
  type Cookie,
} from "https://deno.land/std@0.181.0/http/cookie.ts";

import secrets from "./secrets.json" assert { type: "json" };

const cookiesOf = (h: Headers) =>
  new Map<string, Cookie>(getSetCookies(h).map((o) => <const>[o.name, o]));

interface Connection {
  sessionId: string;
}

const createConnection = async (): Promise<Connection> => {
  const res = await fetch(
    `https://korpus.cz/login?personal_access_token=${secrets.apiToken}`
  );

  const sessionId = cookiesOf(res.headers).get("cnc_toolbar_sid")?.value;
  if (sessionId === undefined) throw new Error("Did not recieve a session id cookie.")

  return {
    sessionId
  };
}

console.log(await createConnection());
