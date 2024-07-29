import { TOTP } from "totp-generator";
import clipboard from "clipboardy";

const input = process.argv[2] ?? clipboard.readSync();

console.log("Use secret:", input);

const now = new Date();
const valid = createToken();

if (valid < 10) {
  await wait(valid);
  console.log("Create new");
  createToken();
}

function createToken() {
  const { otp, expires } = TOTP.generate(input);

  const validForSeconds = (new Date(expires).getTime() - now.getTime()) / 1000;
  console.log("New totp:", otp);
  console.log("Valid for the next " + validForSeconds + " seconds");

  clipboard.writeSync(otp);
  console.log("copied OTP in clipboard");

  return validForSeconds;
}

async function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
