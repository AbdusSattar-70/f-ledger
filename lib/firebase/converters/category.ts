import { Timestamp, DocumentData } from "firebase/firestore";
import { Category } from "@/types";

export const categoryConverter = {
  toFirestore(category: Category): DocumentData {
    return category;
  },
  fromFirestore(snapshot: any): Category {
    const data = snapshot.data();
    return { ...data, createdAt: data.createdAt as Timestamp };
  },
};
