import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { doAdd } from "../../redux/action/actionReducerSaga";
import {FaEyeSlash, FaEye} from 'react-icons/fa'

export default function AddUser(props: any) {
  type FormValues = {
    name: string;
    pass: string;
  };
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const dispatch = useDispatch();

  const handleRegistration = async (data: any) => {
    dispatch(doAdd(data))
    props.closeModal()
  }
  const handleError = (errors: any) => { };

  const registerOptions = {
    name: { required: "Name is required" },
    pass: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <Transition appear show={props.isOpen} as={Fragment}>
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
                    Add User
                  </Dialog.Title>
                  <div className="mt-2">

                    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                      <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                        <label>Name</label>
                        <input className="inline-flex justify-center rounded-md border-transparent bg-green-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                          type="text"
                          {...register('name', registerOptions.name)} />
                        <small className="text-danger">
                          {errors?.name && errors.name.message}
                        </small>
                      </div>
                      <div className='grid grid-cols-1 gap-4 max-w-xl m-auto relative'>
                        <label>Password</label>
                        <div className="grid grid-cols-1 gap-4 max-w-xl relative">
                        <input className="inline-flex justify-center rounded-md border-transparent bg-green-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                            type={showPassword ? 'text' : 'password'}
                          {...register('pass', registerOptions.pass)}
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="absolute top-5 right-2 transform -translate-y-1/2 cursor-pointer"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        </div>
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



