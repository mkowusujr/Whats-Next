import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';

export default function GoogleMedia({ name }: { name: string }) {
  const searchQuery = encodeURIComponent(name);
  const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}`;

  return (
    <button className="mb-auto">
      <a href={googleSearchUrl}>
        <MagnifyingGlassCircleIcon className="size-5" />
      </a>
    </button>
  );
}
