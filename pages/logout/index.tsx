import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { doGetLogoutResponse } from '@/redux/action/actionLogin'


const Logout = (props:any) => {

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(doGetLogoutResponse());
        router.push('/');
    }, [dispatch, router])

    return (
        <div>
        </div>
    )
}

export default Logout