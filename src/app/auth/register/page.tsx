import React from 'react';
import { RegisterForm } from '@client/RegisterFrom';

export default function Page() {
    return (
        <div className='w-full h-full flex flex-col p-10 justify-center items-center'>
            <h1>Register</h1>
            <RegisterForm />
        </div>
    );
}
