import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import UserModel, { UserDocument } from '~/models/user';
import { connectDB } from '~/utils/database';
import { removeVietnameseAccents } from '~/utils/helpers/transform.helper';

type SessionWithUserId = Session & { user: { id?: string } };

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // NOTE: config provider google console: https://youtu.be/wm5gMKuwSYk?t=6219
  ],
  callbacks: {
    async session({ session }): Promise<SessionWithUserId> {
      // console.log({ session });

      // store the user id from MongoDB to session
      const sessionUser = await UserModel.findOne({
        email: session.user?.email,
      });

      const sessionWithUserId = session as SessionWithUserId;
      sessionWithUserId.user.id = sessionUser?._id.toString();

      return sessionWithUserId;
    },

    async signIn({ profile }): Promise<boolean> {
      try {
        // console.log({ profile });

        await connectDB();

        // check if user already exists
        const userExists = await UserModel.findOne({ email: profile?.email });

        // if not, create a new user
        if (!userExists) {
          await UserModel.create<UserDocument>({
            email: profile?.email,
            // username: profile?.name?.replaceAll(' ', '').toLowerCase(),
            username: removeVietnameseAccents(profile?.name as string)
              ?.replaceAll(' ', '')
              .toLowerCase(), // get username from name: remove VN accents, remove all spaces
            image: profile?.image || (profile as any)?.picture, // profile oauth include "picture" not "image", force as any to use
          });
        }

        return true;
      } catch (error: any) {
        console.log('Error checking if user exists: ', error.message);
        console.log('Details: ', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
