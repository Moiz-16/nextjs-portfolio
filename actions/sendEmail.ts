"use server"

import { validateString } from "@/lib/utils";
import { error } from "console";
import { Resend } from "resend";
import ContactFormEmail from "@/email/contact-form-email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const getErrorMessage = (error: unknown): string => {
    let message: string
    if (error instanceof Error){
        message = error.message;
        
    } else if (error && typeof error === 'object' && 'message' in error) {
        message = String(error.message);
        
    } else if (typeof error === "string") {
        message = error
    } else {
        message = "Something went wrong";
    }
    return message;
}


export const sendEmail = async (formData: FormData) => {
    const senderEmail = formData.get("senderEmail");
    const message = formData.get("message");

    if(!validateString(senderEmail, 500)){
        return {
            error: "Invalid sender email"
        }
    }
    if(!validateString(message, 5000)){
        return {
            error: "Invalid message"
        }
    }

    try{
        await resend.emails.send({
            from: "onboarding@resend.dev",
            subject: "Message from contact form",
            to: "moizsaleem903@gmail.com",
            reply_to: senderEmail as string,
            react: React.createElement(ContactFormEmail, {
                message: message as string,
                senderEmail: senderEmail as string,
            })
        });
        
    } catch (error: unknown) {
        

        return {
            error: getErrorMessage(error)
        }
            
    }
};
