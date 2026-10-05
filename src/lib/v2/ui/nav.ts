export interface NavItem {
  href: string;
  label: string;
  icon: string;
  /** Path prefixes that also mark this item active. */
  match?: string[];
}

export function isActive(item: NavItem, pathname: string): boolean {
  if (pathname === item.href) return true;
  return (item.match ?? []).some((p) => pathname.startsWith(p));
}
