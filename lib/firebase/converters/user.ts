import { Timestamp, DocumentData } from "firebase/firestore";
import { User } from "@/types";

export const userConverter = {
  toFirestore(user: User): DocumentData {
    return user;
  },
  fromFirestore(snapshot: any): User {
    const data = snapshot.data();
    return { ...data, createdAt: data.createdAt as Timestamp };
  },
};
