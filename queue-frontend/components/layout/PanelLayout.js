import Link from "next/link";

export default function PanelLayout({ children }) {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <div style={{ margin: 4}}>
        <Link href="/admin/queues">Queues</Link>
      </div>
      <div style={{ margin: 4}}>
        <Link href="/admin/queues/create">Create</Link>
      </div>
      <div style={{ margin: 4}}>
        <Link href="/auth/login">Login</Link>
      </div>
      <div style={{ margin: 4}}>
        <Link href="/auth/register">Register</Link>
      </div>
    </div>
    {children}
    </>
  )
}
