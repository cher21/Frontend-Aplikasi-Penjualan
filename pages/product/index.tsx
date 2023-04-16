import React, { useEffect, useState } from 'react';
import AddProduct from './addProduct';
import EditProduct from './editProduct';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import Header from '@/components/shared/header';
import { doDelete, doRequestGetProduct } from '@/redux/action/actionReducerProductSaga';
import Layout from '@/components/shared/layout';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css'

const Product = () => {
  const PAGE_SIZE = 4; // jumlah data per halaman

  // eslint-disable-next-line no-unused-vars
  let { products, message, refresh } = useSelector((state: any) => state.productReducers)
  const dispatch = useDispatch()
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)

  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0
  })

  const editOpen = (id: number) => {
    setIsEdit(prev => {
      return { ...prev, status: true, id: id }
    });
  }

  const deleteOpen = async (id: number) => {
    const confirmed = window.confirm(`Apakah anda yakin akan menghapus product dengan id-${id}?`);
    if (confirmed) {
      dispatch(doDelete(id))
      // .then((result: any)=>{
      toast.success('Product Terhapus ^_^')
      // })
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    dispatch(doRequestGetProduct())
    toast.success('Selamat Datang di menu Product ^_^', { toastId: 'welcome-message' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }
  const start = (currentPage - 1) * PAGE_SIZE; // index data awal
  const end = start + PAGE_SIZE; // index data akhir
  const displayedProducts = products ? products.slice(start, end) : []; // data yang ditampilkan di halaman saat ini
  const totalPages = products && Math.ceil(products.length / PAGE_SIZE); // jumlah halaman total

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  return (
    <Layout>
      <div>
        <Header title='Product' onClick={() => setIsOpen(true)}>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>

              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {/* {products && products.map((product: any) => ( */}
                {displayedProducts.map((product: any) => (
                  <a key={product.prod_id} href={product.href} className="group">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                      <Image
                        src={`http://localhost:3005${product.image}`}
                        alt={`http://localhost:3005${product.image}`}
                        className="img-container group-hover:opacity-75"
                        width={500}
                        height={500}

                      />
                    </div>
                    <h4 className="my-1 text-sm text-gray-700">{`Id: ${product.prod_id}`}</h4>
                    <h3 className="my-1 text-sm text-gray-700">{product.prod_name}</h3>
                    <h3 className="my-1 text-sm text-gray-700">{product.description}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{`Rp. ${product.price}`}</p>
                    <div className='flex-row space-x-4 mt-4 text-right'>
                      <button className="inline-flex justify-center rounded-md border-transparent bg-blue-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => editOpen(product.prod_id)}>
                        Edit</button>
                      <button className="inline-flex justify-center rounded-md border-transparent bg-red-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => deleteOpen(product.prod_id)}>
                        Delete</button>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Header>
        <ToastContainer autoClose={2000} />
        {
          isOpen ? <AddProduct isOpen={isOpen} closeModal={() => setIsOpen(false)} /> : null
        }
        {
          isEdit.status ? <EditProduct isEdit={isEdit} closeModal={() => setIsEdit(prev => {
            return { ...prev, status: false }
          })} /> : null
        }

        <button onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Previous
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages} className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
        </button>

      </div>
    </Layout>
  )
}
export default Product