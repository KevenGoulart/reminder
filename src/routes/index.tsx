import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <div className="bg-slate-800 min-h-screen flex justify-center pt-20">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-4xl text-white font-semibold">Alerta Caloteiro</h1>
        <div className="flex items-center gap-4">
          <Link className="bg-slate-300 hover:bg-slate-400 text-slate-800 p-2 rounded-lg cursor-pointer" to="/login">
            Login
          </Link>

          <Link className="bg-slate-300 hover:bg-slate-400 text-slate-800 p-2 rounded-lg cursor-pointer" to="/register">
            Cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}
