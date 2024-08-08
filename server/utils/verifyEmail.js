import ZeroBounceSDK from "@zerobounce/zero-bounce-sdk";
import dotenv from 'dotenv';
dotenv.config();
// console.log(typeof ZeroBounceSDK)
const zeroBounce = new ZeroBounceSDK();

zeroBounce.init(process.env.EMAIL_API_KEY);

// const email = "toxic@example.com"; // The email address you want to validate
const ip_address = "127.0.0.1"; // The IP Address the email signed up from (Optional)

const findCredits = async () => {
    try {
        const response = await zeroBounce.getCredits();
        console.log(response);
      } catch (error) {
        console.error(error);
    }
}



export const verifyEmail = async (email) => {
    // console.log(email);
    try {
        const response = await zeroBounce.validateEmail(email, ip_address);
        // console.log(response);
        return response.status;
    } catch (error) {
        console.error(error);
    }
}