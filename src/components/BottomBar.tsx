import Link from 'next/link';
import { House, Bookmark, Search, MessageCircle, User, MessagesSquare, BookCopy } from 'lucide-react';

const BottomBar = () => {
  return (
    <div className="fixed h-[100px] w-full bottom-0 left-0 right-0 bg-accent text-black flex items-center justify-center rounded-t-[40px]">
      <div className='flex w-full items-center justify-around px-5'>
        <Link href="/feed" className="flex flex-col items-center">
          <House size={24} />
          <span className="text-xs mt-1">Accueil</span>
        </Link>
        <Link href="/lists" className="flex flex-col items-center">
          <Bookmark size={24} />
          <span className="text-xs mt-1">Mes listes</span>
        </Link>
        <div className="relative flex justify-center items-center -mt-2">
          <Link href="/search" className="bg-primary w-12 h-12 flex items-center justify-center rounded-full shadow-lg">
            <Search size={24} className=" text-white" />
          </Link>
        </div>
        <Link href="/communities" className="flex flex-col items-center">
          <MessagesSquare size={24} />
          <span className="text-xs mt-1">Communautés</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
