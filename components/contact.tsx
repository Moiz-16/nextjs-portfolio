'use client'

import React from 'react'
import SectionHeading from './section-heading'
import { FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useSectionInView } from '@/lib/hooks'
import { sendEmail } from '@/actions/sendEmail'


export default function Contact() {
    const { ref } = useSectionInView("Contact")


  return (
    <motion.section ref={ref} id="contact" className='mb-20 sm:mb-28 w-[min(100%,38rem)] text-center'
    initial={{
        opacity: 0,
    }}
    whileInView={{
        opacity: 1,
    }}
    transition={{
        duration: 1,
    }}
    >
        <SectionHeading>Contact me</SectionHeading>
        <p className='text-gray-700 -mt-5'>Please contact me directly at{" "}
            <a className='underline' href='mailto:example@gmail.com'>
                example@gmail.com</a>{" "}or through this form.</p>

        <form className='mt-10 flex flex-col'
        action={async formData => {
            await sendEmail(formData);
        }}>
            <input name="senderEmail" className="h-14 px-4 rounded-lg border-black/10"  
            required maxLength={500} type='email' placeholder='Your email' />
            <textarea name="message" className='h-52 my-3 rounded-lg border-black/10 p-4' 
            placeholder='Your message' required maxLength={5000}/>
            <button type="submit" className='flex group items-center justify-center h-[3rem] w-[8rem] bg-gray-900 text-white
            rounded-full outline-none transition-all gap-2 focus:scale-110 hover:scale-110 
            hover:bg-gray-950 active:scale-105' >
                Submit <FaPaperPlane className='text-xs opacity-65 transition-all
                group-hover:translate-x-1 group-hover:transalate-y-1'/>{" "}
            </button>

        </form>
    </motion.section>
  )
}
