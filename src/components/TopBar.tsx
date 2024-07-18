import Link from 'next/link';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TopBar = () => {
    return (
        <div className="fixed top-[-10px] left-0 right-0 bg-accent text-black flex justify-between items-center p-4 z-50 h-[120px]">
            <div className='w-full pt-12'>
                <div className='flex w-full items-center justify-between px-5'>
                    <Link href="/">
                        <span className='flex items-center justify-center gap-x-2'>
                            <Image src="/Bookish-Logo-2.svg" alt="logo" width={40} height={30} />
                            <p className=' capitalize text-secondary-700'>bookish</p>
                        </span>
                    </Link>

                    <Link href="/notification">
                        <Button size={'icon'} variant={'accentVariant'}>
                            <Bell size={24} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
