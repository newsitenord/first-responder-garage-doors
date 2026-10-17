/**
 * Cloudflare Pages Function — POST /api/lead
 * Receives the HTML form, optionally forwards the lead to a webhook (CRM, Zapier, Ringba, etc.)
 * and redirects the visitor to /thank-you/.
 *
 * Set LEAD_WEBHOOK_URL in the Cloudflare Pages project settings to enable forwarding.
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  const form = await request.formData();

  const lead = {
    received_at: new Date().toISOString(),
    name: str(form.get("name")),
    phone: str(form.get("phone")),
    email: str(form.get("email")),
    zip: str(form.get("zip")),
    address: str(form.get("address")),
    service: str(form.get("service")),
    message: str(form.get("message")),
    consent: form.get("consent") === "yes",
    source: str(form.get("source")) || "website",
    page: request.headers.get("referer") || "",
    user_agent: request.headers.get("user-agent") || "",
    ip_country: request.headers.get("cf-ipcountry") || "",
  };

  if (!lead.phone || !lead.zip) {
    return Response.redirect(new URL("/contact/?error=missing", request.url).toString(), 303);
  }

  const endpoint = env.LEAD_WEBHOOK_URL;
  if (endpoint) {
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("lead webhook failed", err);
    }
  } else {
    console.log("LEAD_WEBHOOK_URL not set — lead captured but not forwarded", JSON.stringify(lead));
  }

  return Response.redirect(new URL("/thank-you/", request.url).toString(), 303);
}

export async function onRequestGet(context) {
  return Response.redirect(new URL("/contact/", context.request.url).toString(), 302);
}

function str(v) {
  return typeof v === "string" ? v.slice(0, 2000).trim() : "";
}
