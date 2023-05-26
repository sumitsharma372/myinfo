import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({session}){
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();
            session.user.image = sessionUser.image;
            return session;
        },
        async signIn({profile}){
            try {
                await connectToDB();

                const user = await User.findOne({
                    email: profile.email
                })

                if(!user){
                    await User.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture || profile.avatar_url
                    })
                }

                return true;
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export {handler as GET, handler as POST};