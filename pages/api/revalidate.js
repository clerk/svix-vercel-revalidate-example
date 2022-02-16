import { Webhook } from "svix";
import { buffer } from "micro";

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  const payload = (await buffer(req)).toString();
  const headers = req.headers;

  const wh = new Webhook(process.env.SVIX_SECRET);
  let msg;
  try {
    msg = wh.verify(payload, headers);
  } catch (err) {
    res.status(500).json({ error: "Webhook verification failed" });
  }

  try {
    // Rebuild the homepage to update the recent sign ups
    await res.unstable_revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    res.status(500).json({ error: "Revalidation failed" });
  }
}
