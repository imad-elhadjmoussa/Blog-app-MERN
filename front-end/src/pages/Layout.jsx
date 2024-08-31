import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import { Error } from '../components/Error'
import { useAuth } from '../hooks/useAuth'

export const Layout = () => {
    const { loading } = useAuth();
    return (
        <main className='container'>
            <Header />
            {
                loading ?
                    <p>Loading...</p>
                    :
                    <Outlet />
            }
        </main>
    )
}
