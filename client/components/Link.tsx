import Link from 'next/link';

export default function Links({ href, children }) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}
