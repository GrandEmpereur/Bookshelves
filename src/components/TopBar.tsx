import Link from 'next/link';
import Image from 'next/image';
import { Bell, SendHorizontal } from 'lucide-react';
import { Button, } from '@/components/ui/button';

const TopBar = () => {
    return (
        <div className="fixed left-0 right-0 bg-white text-black flex justify-between items-center z-50 h-[100px]">
            <div className='w-full pt-12'>
                <div className='flex w-full items-center justify-between px-5'>
                    <Link href="/feed">
                        <span className='flex items-center justify-center gap-x-2'>
                            <Image src="/Bookish2.svg" alt="logo" width={24} height={24} />
                        </span>
                    </Link>

                    <div className='flex gap-x-[5px]'>
                        <Link href="/notifications">
                            <Button size={'icon'} variant={'icon'}>
                                <Bell size={20} stroke='#2f5046'/>
                            </Button>
                        </Link>

                        <Link href="/messages">
                            <Button size={'icon'} variant={'icon'}>
                                <SendHorizontal size={20} stroke='#2f5046' />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
