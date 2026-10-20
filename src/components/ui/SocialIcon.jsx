const paths = {
  Facebook: <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.5-1.5h1.4V5.1c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6V11H8.4v3h2.4v7h2.7z" fill="currentColor" />,
  Instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="16.4" cy="7.6" r="0.6" fill="currentColor" />
    </g>
  ),
  LinkedIn: <path d="M6.5 9.5h2.7V18H6.5V9.5zM7.85 5.5a1.55 1.55 0 110 3.1 1.55 1.55 0 010-3.1zM11 9.5h2.6v1.2c.4-.7 1.3-1.4 2.7-1.4 2.7 0 3.2 1.8 3.2 4.1V18h-2.7v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1V18H11V9.5z" fill="currentColor" />,
  Pinterest: <path d="M12.2 5C8.6 5 6.8 7.4 6.8 9.6c0 1.3.5 2.4 1.6 2.8.2.1.3 0 .3-.2l.2-.7c.1-.2 0-.3-.1-.5-.3-.4-.5-.8-.5-1.5 0-1.9 1.4-3.6 3.8-3.6 2.1 0 3.2 1.2 3.2 2.9 0 2.2-1 4-2.4 4-.8 0-1.4-.7-1.2-1.5.2-1 .7-2 .7-2.7 0-.6-.3-1.1-1-1.1-.8 0-1.4.8-1.4 1.9 0 .7.2 1.2.2 1.2l-1 4.1c-.2.9 0 2.1 0 2.2 0 .1.1.1.2 0 .1-.1 1.100-1.400 1.400-2.600l.5-2c.3.5 1 .9 1.800.9 2.400 0 4-2.200 4-5.100C17.800 7 15.800 5 12.200 5z" fill="currentColor" />,
};

export default function SocialIcon({ name, href = "#", color }) {
  return (
    <a
      href={href}
      aria-label={name}
      style={{ backgroundColor: color }}
      className="flex h-5 w-5 items-center justify-center rounded-full text-white transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        {paths[name]}
      </svg>
    </a>
  );
}
