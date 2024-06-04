import React from 'react';
import { LoginForm } from '@client/LoginForm';

export default function Page() {
    return (
        <div className='w-full h-full flex flex-col p-10 justify-center items-center'>
            <h1 className='pt-5'>Login</h1>
            <LoginForm />
        </div>
    );
}

