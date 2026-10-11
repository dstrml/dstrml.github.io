import { Logo } from '../components/Logo';

export function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#ebebeb] p-6 text-[#282828]">
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <Logo className="w-full" />
        <p className="text-center text-lg">Open-source software for the public good</p>
      </div>
    </main>
  );
}
