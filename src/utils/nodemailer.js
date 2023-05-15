import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
   service: "gmail",
   port: 8080,
   auth:{
    user: 'jibocchi14@gmail.com',
    pass: "kqhkkhmuzarecdnn"
   }
})