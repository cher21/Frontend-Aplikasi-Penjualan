import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { doAdd } from "@/redux/action/actionReducerProductSaga";
import { getCategories } from "../../api/apiMethodCategory";

export default function AddProduct(props: any) {
  type Category = {
    cate_id: number;
    cate_name: string;
  }
  
  type FormValues = {
    name: string;
    desc: string;
    cateid: number;
    price: number;
    file: string;
  };
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleRegistration = async (data: any) => {
    const dataForm = {
      name: data.name,
      desc: data.desc,
      cateid: data.cateid,
      price: data.price,
      file: data.file[0]
    }
    dispatch(doAdd(dataForm))
    props.closeModal()
  }


  const handleError = (errors: any) => { };

  const registerOptions = {
    name: { required: "Name is required" },
    desc: { required: "Decription is required" },
    cateid: { required: "Category ID is required" },
    price: { required: "Price is required" },
    file: { required: "File is required" },
  };

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
                    Add Product
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                      <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                        <label>Name Product</label>
                        <input className="inline-flex justify-center rounded-md border-transparent bg-green-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                          type="text" {...register('name', registerOptions.name)} />
                        <small className="text-danger">
                          {errors?.name && errors.name.message}
                        </small>
                      </div>
                      <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                        <label>Description</label>
                        <input className="inline-flex justify-center rounded-md border-transparent bg-green-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                          type="text"
                          {...register('desc', registerOptions.desc)}
                        />
                        <small className="text-danger">
                          {errors?.desc && errors.desc.message}
                        </small>
                      </div>
                      {/* <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                        <label>Category ID</label>
                        <input className="inline-flex justify-center rounded-md border-transparent bg-green-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                          type="text"
                          {...register('cateid', registerOptions.cateid)}
                        />
                        <small className="text-danger">
                          {errors?.cateid && errors.cateid.message}
                        </small>
                      </div> */}

                      <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                        <label>Category ID</label>
                          <select id="countries" className="bg-green-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           {...register('cateid', registerOptions.cateid)}>
                            <option selected>Choose a category</option>
                            {categories.map((category) => (
                              <option value={category.cate_id} key={category.cate_id}>
                                {category.cate_id}. {category.cate_name}
                              </option>
                                ))}
                          </select>
                        </div>

                      <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                        <label>Price</label>
                        <input className="inline-flex justify-center rounded-md border-transparent bg-green-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                          type="number"
                          {...register('price', registerOptions.price)}
                        />
                        <small className="text-danger">
                          {errors?.price && errors.price.message}
                        </small>
                      </div>
                      <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                        <label>File</label>
                        <input className="inline-flex justify-center rounded-md border-transparent bg-green-100 px-4 py-2 text-sm font-medium
                            text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2"
                          type="file"
                          {...register('file', registerOptions.file)}
                        />
                        <small className="text-danger">
                          {errors?.file && errors.file.message}
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



