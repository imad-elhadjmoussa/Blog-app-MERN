import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import { Error } from '../components/Error'
import { useAuth } from '../hooks/useAuth'
import { PropagateLoader } from 'react-spinners'

export const Layout = () => {
    const { isLoading } = useAuth();
    if (isLoading) {
        return (
            <div className='container appLoader'>
                <PropagateLoader
                    color="#61677A"
                    size={15}
                />
            </div>
        )
    }
    return (
        <main className='container'>
            <Header />
            <Outlet />
        </main >
    )
}
