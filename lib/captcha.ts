// CAPTCHA verification utility for reCAPTCHA v3

export async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey) {
      console.warn("[v0] CAPTCHA secret key not configured, skipping verification")
      return true
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()

    // reCAPTCHA v3 returns a score between 0 and 1
    // 1.0 is very likely a legitimate interaction, 0.0 is very likely a bot
    // We accept scores above 0.5
    return data.success && data.score > 0.5
  } catch (error) {
    console.error("[v0] CAPTCHA verification error:", error)
    // Fail open - allow submission if verification fails
    return true
  }
}
