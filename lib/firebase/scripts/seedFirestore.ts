import { db } from "@/lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { Group } from "@/types";
import { groupConverter } from "../converters/group";

const seed = async () => {
  const groupRef = doc(collection(db, "groups")).withConverter(groupConverter);

  const newGroup: Group = {
    id: groupRef.id,
    name: "F-Ledger Family",
    leaderId: "leaderUserId",
    memberIds: ["leaderUserId"],
    currency: "USD",
    createdAt: new Date() as any,
  };

  await setDoc(groupRef, newGroup);
  console.log("Seeded group:", newGroup.name);
};

seed().catch(console.error);
