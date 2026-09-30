'use client';

import { useEffect, useLayoutEffect, RefObject } from 'react';
import gsap from 'gsap';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useHeroAnimation(rootRef: RefObject<HTMLElement | null>, slideKey: string) {
    useIsoLayoutEffect(() => {
        if (!rootRef.current) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo('.hero-bg', { scale: 1.12, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 7, ease: 'power1.out' }, 0)
                .fromTo('.hero-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.2)
                .fromTo('.hero-line', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.15 }, 0.35)
                .fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.9)
                .fromTo('.hero-btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.05)
                .fromTo('.hero-count', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.2)
                .fromTo('.hero-progress', { scaleX: 0 }, { scaleX: 1, duration: 6, ease: 'none' }, 0);
        }, rootRef);

        return () => ctx.revert();
    }, [slideKey]);
}