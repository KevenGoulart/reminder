import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '#/store/auth';

export function Header() {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };
  return (
    <div className="bg-slate-700 p-4 flex">
      <Link to="/" className="text-3xl text-white ml-4 mr-6">
        Alerta Caloteiro
      </Link>
      <div className="flex items-center gap-2 text-2xl ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {token ? (
              <Avatar size="lg" className="cursor-pointer">
                <AvatarImage src="https://avatars.githubusercontent.com/u/94140750?v=4" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar size="lg">
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            {token ? (
              <DropdownMenuItem asChild>
                <button onClick={handleLogout} className="w-full cursor-pointer font-semibold">
                  Logout
                </button>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <button onClick={() => navigate({ to: '/' })} className="w-full cursor-pointer font-semibold">
                  Login
                </button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
