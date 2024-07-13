import { redirect } from "next/navigation";

export default async function Home() {
  redirect(`/table/${new Date().getFullYear()}/${new Date().getMonth() + 1}`);
}
