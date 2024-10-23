import React, { Suspense } from 'react';
import { Hello } from '../Hello.jsx';
import { Info } from '../Info.jsx';

export const LandingPage = () => {
    return (
        <div className="max-w-3xl min-h-screen mx-auto sm:pt-10">
            <title>React-Router-SSR Upgrade Example</title>
                <Hello />
            <Suspense fallback={<div>Loading...</div>}>
                <Info />
            </Suspense>
        </div>
    );
};
