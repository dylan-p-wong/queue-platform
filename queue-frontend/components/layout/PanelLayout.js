import Link from "next/link";

export default function PanelLayout({ children }) {
  return (
    <>
    <div>
      <Link href="/admin/queues">Queues</Link>
      <Link href="/admin/queues/create">Create</Link>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
    </div>
    {children}
    </>
  )
}
