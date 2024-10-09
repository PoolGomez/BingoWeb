// import type { NextAuthOptions } from "next-auth"
// import NextAuth from "next-auth"
// import jwt from "jsonwebtoken"
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//     providers:[
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//         // add providers
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     jwt: {
//         async encode({ secret, token }) {
//         return jwt.sign(token, secret)
//         },
//         async decode({ secret, token }) {
//         return jwt.verify(token, secret)
//         },
//     },
// }
// export default NextAuth(authOptions)



// import { authOptions } from "@/app/lib/authOptions";
// import NextAuth from "next-auth/next";

// const handler =  NextAuth(authOptions);

// export { handler as GET, handler as POST};