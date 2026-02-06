'use client';

import { useEffect, useRef } from 'react';
import { trackVisit } from '@/app/actions/analytics';

export function VisitTracker() {
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            trackVisit();
        }
    }, []);

    return null;
}
