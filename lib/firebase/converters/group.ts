import { Timestamp, DocumentData } from "firebase/firestore";
import { Group } from "@/types";

export const groupConverter = {
  toFirestore(group: Group): DocumentData {
    return group;
  },
  fromFirestore(snapshot: any): Group {
    const data = snapshot.data();
    return { ...data, createdAt: data.createdAt as Timestamp };
  },
};
