"use client"

import { FormEvent, Fragment, useEffect, useState } from 'react'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/actions'

interface Props {
  productId: string
}

const Modal = ({ productId: id }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isSubmitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    console.log(isOpen)
  })

  const handleSubmit = async () => {
    setSubmitting(true)

    const status = await addUserEmailToProduct(id, email);
    if(status == null){
      setIsOpen(false)
      return alert("Product already subscribed for status")
    }

    setEmail('')
    setIsOpen(false)
  }

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <>
      <button type="button" className="btn" onClick={open}>
        Track
      </button>
      <Dialog open={isOpen} onClose={close} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="px-10 py-10 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
             <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Stay updated with product pricing alerts right in your inbox!
                  </DialogTitle>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 py-10">
                    Email address
                  </label>
                  <div className="dialog-input_container">
                    <Image 
                      src="/assets/icons/mail.svg"
                      alt='mail'
                      width={18}
                      height={18}
                    />

                    <input 
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className='dialog-input'
                    />
                </div>
                </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              >
                Submit
              </button>
              <button
                type="button"
                data-autofocus
                onClick={close}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>

    </>
  )
}

export default Modal