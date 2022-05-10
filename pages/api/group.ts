import prisma from "@/libs/prisma";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  // Create new group
  if (req.method === "POST") {
    try {
      const { name } = req.body;

      // Get use cuid
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "User does not exist. This should not happen" });
      }

      const group = await prisma.group.create({
        data: {
          name,
          creatorId: user.id,
          recipients: 1,
        },
      });
      res.status(200).json(group);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong with Stoore" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
