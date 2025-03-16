import useLoggedInUser from "@/hooks/useLoggedInUser";

export default function LogOutBtn() {
  const { mutate } = useLoggedInUser();

  async function handleLogOut() {
    const res = await fetch("/api/logout");

    if (res.ok) {
      mutate();
    }
  }

  return <button onClick={handleLogOut} className="w-full bg-yellowhaus px-4 py-2 text-background font-bold" >LOG OUT</button>;
}
