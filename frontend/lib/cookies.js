export function setTokenCookie(token, days = 7) {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  // NOTE: This cookie is not HttpOnly (can't be set from client JS). Prefer setting HttpOnly on the server.
  document.cookie = `token=${encodeURIComponent(token)}; ${expires}; path=/; Secure; SameSite=Lax`;
}

export function getTokenFromCookie() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match("(^|;)\\s*token\\s*=\\s*([^;]+)");
  return match ? decodeURIComponent(match[2]) : "";
}

export function removeTokenCookie() {
  if (typeof document === "undefined") return;
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
