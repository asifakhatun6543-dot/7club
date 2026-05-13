import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="navbar container">
      <Link href="/home" className="navbar-brand">Streammore</Link>
      <nav className="navbar-links">
        <Link href="/home">Home</Link>
        <Link href="/short-drama">Short Drama</Link>
        <Link href="/downloads">Downloads</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </div>
  );
}
