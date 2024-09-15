// BottomBar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bottomBarConfigs, BottomBarConfig, BottomBarItem } from '@lib/data/bottomBarConfig'; // Import des types

const BottomBar: React.FC = () => {
  const pathname = usePathname();
  const config: BottomBarConfig = bottomBarConfigs[pathname] || { show: true, items: [] };

  // Si la bottom bar ne doit pas être affichée sur cette page
  if (!config.show) return null;

  return (
    <div className="fixed h-[100px] w-full bottom-0 left-0 right-0 bg-white text-black flex items-center justify-center rounded-t-[40px]">
      <div className="flex w-full items-center justify-around px-5">
        {config.items.map((item: BottomBarItem, index: number) =>
          item.special ? (
            <div key={index} className="relative flex justify-center items-center -mt-2">
              <Link
                href={item.href}
                className="bg-primary w-12 h-12 flex items-center justify-center rounded-full shadow-lg"
              >
                {item.icon}
              </Link>
            </div>
          ) : (
            <Link key={index} href={item.href} className="flex flex-col items-center">
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default BottomBar;
