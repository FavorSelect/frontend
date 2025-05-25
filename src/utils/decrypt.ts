import CryptoJS from "crypto-js";

export function decrypt(
  encryptedText: string | null | undefined
): string | null {
  const secretKeyHex = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY;

  if (!encryptedText || !secretKeyHex) return null;

  try {
    const [ivHex, encryptedHex] = encryptedText.split(":");

    if (!ivHex || !encryptedHex)
      throw new Error("Invalid encrypted text format");

    const key = CryptoJS.enc.Hex.parse(secretKeyHex);
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    // Convert hex to WordArray and then to Base64 string
    const encryptedBase64 = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Hex.parse(encryptedHex)
    );

    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    return result || null;
  } catch (error: unknown) {
    console.error("Decryption failed:", error);
    return null;
  }
}
