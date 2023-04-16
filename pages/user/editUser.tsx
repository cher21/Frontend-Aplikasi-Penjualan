import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { doUpdate } from "@/redux/action/actionReducerSaga";
import { toast } from "react-toastify";


export default function AddUser(props: any) {
    type FormValues = {
        name: string;
        pass: string;
      };
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    let { users } = useSelector((state: any) => state.userReducers)
    const dispatch = useDispatch()

    const [data, setData] = useState<any>({})

    const handleEdit = async (user:any) => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(doUpdate(props.isEdit.id, user))
            props.closeModal()
        } else {
            toast.error("Tidak dapat mengupdate, Login terlebih dahulu!")
        }
    }
    
    const handleError = (errors: any) => { };

    useEffect(() => {
        const getData = async () => {
            setData(users.filter((user: any) => user.user_id === props.isEdit.id)[0])
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const registerOptions = {
        name: {
            required: "Name is required"
        },
        pass: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
            }
        }
    };

    return (
        <div>
            <Transition appear show={props.isEdit.status} as={Fragment}>
                <Dialog as="div" className="relative z-10" static onClose={() => null}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Edit User
                                    </Dialog.Title>
                                    <div className="mt-2">

                                        <form onSubmit={handleSubmit(handleEdit, handleError)}>
                                            <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                                                <label>Name</label>
                                                <input className="inline-flex justify-center rounded-md border-transparent bg-green-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                                                    type="text" 
                                                    defaultValue={data?.username}
                                                    {...register('name', registerOptions.name)} />
                                                <small className="text-danger">
                                                    {errors?.name && errors.name.message}
                                                </small>
                                            </div>
                                            <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                                                <label>Password</label>
                                                <input defaultValue={data?.user_password} className="inline-flex justify-center rounded-md border-transparent bg-green-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                                                    type="password"
                                                    {...register('pass', registerOptions.pass)}
                                                />
                                                <small className="text-danger">
                                                    {errors?.pass && errors.pass.message}
                                                </small>
                                            </div>

                                            <div className='flex-row space-x-4 mt-4 text-right'>
                                                <button className="inline-flex justify-center rounded-md border-transparent bg-blue-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2">
                                                    Submit</button>
                                                <button className="inline-flex justify-center rounded-md border-transparent bg-red-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={props.closeModal}>
                                                    Cancel</button>
                                            </div>

                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}