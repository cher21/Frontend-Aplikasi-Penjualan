import { Menu, Transition } from '@headlessui/react'
import React, { useEffect, useState, Fragment } from 'react'
import { BsFillEyeFill } from 'react-icons/bs'
import { MdDelete, MdEdit } from 'react-icons/md'
import AddUser from './addUser'
import EditUser from './editUser'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { doDelete, doGetUserId, doRequestGetUser } from "@/redux/action/actionReducerSaga";
import Header from '@/components/shared/header'
import Layout from '@/components/shared/layout'

export default function User() {
    const PAGE_SIZE = 7; // jumlah data per halaman
    let { users, message, refresh } = useSelector((state: any) => state.userReducers)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState({
        status: false,
        id: 0
    })

    // const [searchId, setSearchId] = useState('')

    const column = [
        { name: 'No' },
        { name: 'User ID' },
        { name: 'Username' }
    ]
    const editOpen = (id: number) => {
        setIsEdit(prev => {
            return { ...prev, status: true, id: id }
        });
    }

    const deleteOpen = async (id: number) => {
        const token = localStorage.getItem('token');
        if (token) {
            const corfirmed = window.confirm(`Apakah Anda yakin ingin menghapus user dengan id-${id}?`);
            if (corfirmed) {
                dispatch(doDelete(id))
                toast.success("Delete Berhasil ^_^")
            }
        } else {
            toast.error("Tidak dapat menghapus, Login terlebih dahulu!")
        }
    }

    useEffect(() => {
        dispatch(doRequestGetUser());
        toast.success("Selamat Datang di menu User ^_^", { toastId: 'welcome-message' })
    }, [dispatch, message, refresh]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const start = (currentPage - 1) * PAGE_SIZE; // index data awal
    const end = start + PAGE_SIZE; // index data akhir
    const displayedUsers = users ? users.slice(start, end) : [];// data yang ditampilkan di halaman saat ini
    const totalPages = users && Math.ceil(users.length / PAGE_SIZE); // jumlah halaman total

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }


    // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchId(event.target.value)
    // }

    // const searchOpen = async (id: number) => {
    //     dispatch(doGetUserId(id))
    // }

    const pageLimit = 2; // Jumlah halaman yang ingin ditampilkan
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);


    return (
        <Layout>
            <div>
                <Header title='User' onClick={() => setIsOpen(true)}>
                    {/* <form>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                             dark:focus:border-blue-500" placeholder="Search by user id" required
                                value={searchId}
                                onChange={handleSearch}
                            />
                            <button type="button" onClick={() => searchOpen(parseInt(searchId))} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form> */}
                    <table className='min-w-full table-fixed'>
                        <thead>
                            <tr className='border-t border-gray-200'>
                                {((column && column) || []).map((col) => (
                                    <th
                                        key={col.name}
                                        className='pr-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'
                                    >
                                        <span className='lg:pl-2'>
                                            {col.name}
                                        </span>
                                    </th>
                                ))}
                                <th className='pr-6 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-whiter divide-y divide-gray-100'>
                            {(displayedUsers || []).map((dt: any, index: number) =>
                                // {(users || []).map((dt: any, index: number) =>
                                <tr key={dt.id}>
                                    <td className='px-6 py-3 text-sm text-gray-900'>{start + index + 1}</td>
                                    <td className='px-6 py-3 text-sm text-gray-900'>{dt.user_id}</td>
                                    <td className='px-6 py-3 text-sm text-gray-900'>{dt.username}</td>
                                    <td className='px-6 py-3 text-sm text-gray-900'>

                                        <div className="w-full text-right">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium 
                            text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                        <BsFillEyeFill
                                                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                            aria-hidden="true"
                                                        />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 mt-2 w-56 z-10 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="px-1 py-1 ">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                        onClick={() => editOpen(dt.user_id)}>
                                                                        {active ? (
                                                                            <MdEdit
                                                                                className="mr-2 h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <MdEdit
                                                                                className="mr-2 h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                        Edit
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>

                                                        <div className="px-1 py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                        onClick={() => deleteOpen(dt.user_id)}>
                                                                        {active ? (
                                                                            <MdDelete
                                                                                className="mr-2 h-5 w-5 text-violet-400"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <MdDelete
                                                                                className="mr-2 h-5 w-5 text-violet-400"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </Header>
                <ToastContainer autoClose={2000} />
                {
                    isOpen ? <AddUser isOpen={isOpen} closeModal={() => setIsOpen(false)} /> : null
                }
                {
                    isEdit.status ? <EditUser isEdit={isEdit} closeModal={() => setIsEdit(prev => {
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
                <div>

                    <button onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Previous
                    </button>
                    {Array.from({ length: pageLimit }, (_, i) => i + startPage).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            disabled={currentPage === pageNumber}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            {pageNumber}
                        </button>
                    ))}
                    {endPage < totalPages && (
                        <button onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                        </button>
                    )}
                    <div>
                        Page {currentPage} of {totalPages}
                    </div>
                </div>

            </div>
        </Layout>
    )
}
