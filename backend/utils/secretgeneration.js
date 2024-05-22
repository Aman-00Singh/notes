import crypto from "crypto";
const tokenBuffer = crypto.randomBytes(64);
const secret = tokenBuffer.toString("hex");
console.log(secret);
export default secret;
