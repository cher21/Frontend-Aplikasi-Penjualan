import React, { useEffect } from 'react'
import Layout from '@/components/shared/layout'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Image from 'next/image';
import logo from '../../components/image/kisspng-computer.png'
import logoProduct from '../../components/image/product.jpg'
import logoJari from '../../components/image/jari.png'

export default function Home() {

  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.success('Harus Login Terlebih Dahulu')
      router.push('/');
      return;
    }
  })

  const handleUser = async () => {
    router.push('/user')
  }
  const handleProduct = async () => {
    router.push('/user')
  }

  return (
    <Layout>
      <div> <p className="text-gray-700 text-3xl mb-16 font-bold">Home</p>
        <div className="grid lg:grid-cols-3 gap-5 mb-16">
          <div onClick={handleUser} className="rounded bg-white h-40 shadow-sm" 
          style={{ cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <Image
              src={logo}
              alt='logo'
              width={150}
              height={100}
            />
          </div>
          <div className="rounded bg-white h-40 shadow-sm"
            style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
          <Image
              src={logoJari}
              alt='logo'
              width={100}
              height={100}
            />
          </div>
          <div className="rounded bg-white h-40 shadow-sm">
            <div onClick={handleProduct} className="rounded bg-white h-40 shadow-sm"
              style={{ cursor: 'pointer', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <Image
              src={logoProduct}
              alt='logo'
              width={200}
              height={100}
            />
          </div></div>
        </div>
        <div className="grid col-1 bg-white h-96 shadow-sm"></div>
      </div>
    </Layout>
  )
}
