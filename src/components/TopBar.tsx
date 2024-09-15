'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, Bell, SendHorizontal, Settings, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import topBarConfig from '@lib/data/topBarConfig.json'; // Assurez-vous que le chemin soit correct

interface TitleConfig {
    text: string;
    icon?: string; // Rend l'icône optionnelle
}

interface TopBarConfig {
    showBackButton: boolean;
    title: TitleConfig;
    rightIcons: string[];
}

const TopBar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    // Charger la configuration de la route actuelle ou une configuration par défaut
    const config: TopBarConfig = topBarConfig[pathname as keyof typeof topBarConfig] || {
        showBackButton: false,
        title: { text: '', icon: '' },
        rightIcons: []
    };

    // Rendu dynamique des icônes à droite
    const renderRightIcons = (): JSX.Element[] => {
        return config.rightIcons.map((icon, index) => {
            switch (icon) {
                case 'notifications':
                    return (
                        <Link href="/notifications" key={index}>
                            <Button size="icon" variant="icon">
                                <Bell size={20} stroke="#2f5046" />
                            </Button>
                        </Link>
                    );
                case 'messages':
                    return (
                        <Link href="/messages" key={index}>
                            <Button size="icon" variant="icon">
                                <SendHorizontal size={20} stroke="#2f5046" />
                            </Button>
                        </Link>
                    );
                case 'settings':
                    return (
                        <Link href="/settings" key={index}>
                            <Button size="icon" variant="icon">
                                <Settings size={20} stroke="#2f5046" />
                            </Button>
                        </Link>
                    );
                default:
                    return <></>;
            }
        });
    };

    return (
        <div className="fixed left-0 right-0 bg-white text-black flex justify-between items-center z-50 h-[100px]">
            <div className="w-full pt-12">
                <div className="flex w-full items-center justify-between px-5">
                    {config.showBackButton ? (
                        <Button size="icon" variant="ghost" onClick={() => router.back()}>
                            <ChevronLeft size={20} stroke="#b2511a" />
                        </Button>
                    ) : (
                        <Link href="/feed">
                            <Image src="/Bookish2.svg" alt="logo" width={24} height={24} />
                        </Link>
                    )}

                    <div className="flex items-center">
                        {config.title.icon === 'qr-code' && <QrCode size={20} className="mr-2" />}
                        <h1 className="text-lg font-heading">{config.title.text}</h1>
                    </div>

                    <div className="flex gap-x-[5px]">{renderRightIcons()}</div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
