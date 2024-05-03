"use client";

import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/app/LanguageContext';
import { i18n } from '@/app/i18n';

let navigation = [
  { name: 'start', href: '/#start' },
  { name: '1', href: '/#1' },
  { name: '2', href: '/#2' },
  { name: '3', href: '/#3' },
  { name: '4', href: '/#4' },
  { name: '5', href: '/#5' },
  { name: '6', href: '/#6' },
  { name: '7', href: '/#7' },
  { name: '8', href: '/#8' },
  { name: '9', href: '/#9' },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

  const { language, setLanguage } = useLanguage();
  const [bgColor, setBgColor] = useState('bg-transparent');
  const [currentBgColor, setCurrentBgColor] = useState('bg-red-500');
  const [textColor, setTextColor] = useState('text-white');
  const [currentMenuItem, setCurrentMenuItem] = useState('start');

  navigation[0].name = i18n[language].header_start_button;

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 64;
        const sectionBottom = sectionTop + section.clientHeight;
        const scrollPosition = window.scrollY || window.pageYOffset;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const color = section.getAttribute('data-bg-color');
          const currentMenuColor = section.getAttribute('data-current-nav-color');
          const textColor = section.getAttribute('data-text-color');
          const id = section.id;
          setBgColor(color || 'bg-transparent');
          setCurrentMenuItem(id);
          setCurrentBgColor(currentMenuColor || 'text-black');
          setTextColor(textColor || 'text-white');
        }
      });
    };

    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === 'childList') {
          handleScroll();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove event listener and disconnect observer
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`transition fixed inset-x-0 top-0 z-50 ${textColor} ${bgColor}`}>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 lg:px-0">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className={classNames(
                    '#start' === `#${currentMenuItem}`
                      ? `hidden opacity-0`
                      : `flex opacity-1`,
                    'transition flex-shrink-0 items-center font-bold'
                  )}>
                    <Link href="/#start">
                      <Image src="/images/pokemon_logo.png" width={100} height={60} alt="" />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-auto sm:flex">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.href === `#${currentMenuItem}`
                              ? `${currentBgColor} text-black ${item.href === '#start' ? 'text-white' : ''}`
                              : `${textColor} hover:bg-white hover:text-black`,
                            'transition rounded-md px-3 py-2 text-sm font-medium capitalize'
                          )}
                          aria-current={item.href === `#${currentMenuItem}` ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className='flex ml-16 space-x-4'>
                      <button onClick={() => { setLanguage('de') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='shadow-md rounded w-8 h-auto' viewBox="0 0 5 3"><path d="M0 0h5v3H0z" /><path fill="#D00" d="M0 1h5v2H0z" /><path fill="#FFCE00" d="M0 2h5v1H0z" /></svg>
                      </button>
                      <button onClick={() => { setLanguage('en') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='shadow-md rounded w-8 h-auto' viewBox="0 0 60 30"><clipPath id="a"><path d="M0 0v30h60V0z" /></clipPath><clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z" /></clipPath><g clipPath="url(#a)"><path fill="#012169" d="M0 0v30h60V0z" /><path stroke="#fff" strokeWidth="6" d="m0 0 60 30m0-30L0 30" /><path stroke="#C8102E" strokeWidth="4" d="m0 0 60 30m0-30L0 30" clipPath="url(#b)" /><path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" /><path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60" /></g></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-4 py-3 flex justify-between items-center w-full">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.href === `#${currentMenuItem}`
                        ? `${currentBgColor} text-black ${item.href === '#start' ? 'text-white' : ''}`
                        : `${textColor} hover:bg-white hover:text-black`,
                      'rounded-md px-3 py-2 text-sm font-medium capitalize'
                    )}
                    aria-current={item.href === `#${currentMenuItem}` ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <div className="absolute top-2 right-2 space-x-5 p-3">
                  <Disclosure.Button onClick={() => { setLanguage('de') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='shadow-md rounded aspect-video w-8 h-auto' viewBox="0 0 5 3"><path d="M0 0h5v3H0z" /><path fill="#D00" d="M0 1h5v2H0z" /><path fill="#FFCE00" d="M0 2h5v1H0z" /></svg>
                  </Disclosure.Button>
                  <Disclosure.Button onClick={() => { setLanguage('en') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='shadow-md rounded aspect-video w-8 h-auto' viewBox="0 0 60 30"><clipPath id="a"><path d="M0 0v30h60V0z" /></clipPath><clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z" /></clipPath><g clipPath="url(#a)"><path fill="#012169" d="M0 0v30h60V0z" /><path stroke="#fff" strokeWidth="6" d="m0 0 60 30m0-30L0 30" /><path stroke="#C8102E" strokeWidth="4" d="m0 0 60 30m0-30L0 30" clipPath="url(#b)" /><path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" /><path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60" /></g></svg>
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  )
}
