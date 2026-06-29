import { NextRequest, NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3";

export async function POST(req: NextRequest) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const body = await req.json();
  const { formType, firstName, surname, name, email, subject, message, optIn, ...bookingFields } = body;

  const isProfessional = formType === "professional";
  const toEmail = isProfessional ? "ross@rosspatel.co" : "dj.polyamoross@gmail.com";
  const displayName = isProfessional ? `${firstName} ${surname}`.trim() : name;

  // Build email content
  const fieldLines = isProfessional
    ? [
        `Subject: ${subject}`,
        `Message:\n${message}`,
      ]
    : [
        bookingFields.eventDate && `Event Date: ${bookingFields.eventDate}`,
        bookingFields.venue && `Venue: ${bookingFields.venue}`,
        bookingFields.location && `Location: ${bookingFields.location}`,
        bookingFields.capacity && `Expected Capacity: ${bookingFields.capacity}`,
        bookingFields.budget && `Budget Range: ${bookingFields.budget}`,
        `Message:\n${message}`,
      ].filter(Boolean);

  const htmlContent = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#ffffff;">
      <p style="color:#00c4b4;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px;">
        ${isProfessional ? "Professional Enquiry" : "DJ / Polyamoross Booking"}
      </p>
      <h2 style="font-size:24px;margin:0 0 24px;">New message from ${displayName}</h2>
      <p style="color:#999;font-size:14px;margin-bottom:4px;">From</p>
      <p style="margin:0 0 16px;">${displayName} &lt;${email}&gt;</p>
      ${fieldLines.map(line => `<p style="color:#999;font-size:14px;margin-bottom:4px;white-space:pre-wrap;">${line}</p>`).join("")}
    </div>
  `;

  // Send transactional email via Brevo
  const emailRes = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: displayName, email: "noreply@rosspatel.co" },
      to: [{ email: toEmail }],
      replyTo: { email },
      subject: isProfessional
        ? `New enquiry: ${subject}`
        : `DJ Booking Enquiry from ${displayName}`,
      htmlContent,
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    console.error("Brevo email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  // Add to mailing list if opted in
  if (optIn) {
    const listId = isProfessional
      ? process.env.BREVO_LIST_PROFESSIONAL
      : process.env.BREVO_LIST_DJ;

    if (listId) {
      const [firstNamePart, ...rest] = displayName.split(" ");
      await fetch(`${BREVO_API_URL}/contacts`, {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName: firstNamePart,
          lastName: rest.join(" ") || undefined,
          listIds: [parseInt(listId, 10)],
          updateEnabled: true,
        }),
      });
    }
  }

  return NextResponse.json({ ok: true });
}
