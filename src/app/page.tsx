"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { aviano } from '@/lib/const'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAddressByEns } from '@/lib/ens'
import { toast } from 'sonner'
import { Info, Loader2 } from 'lucide-react'
import { isValidEthereumAddress } from '@/lib/helper'

export default function MainPage() {

  const [rotate, setRotate] = useState(true)
  const [count, setCount] = useState(10)
  const address = useRef<any>()
  const router = useRouter()
  useEffect(() => {
    fetchCount()
    setTimeout(() => {
      setRotate(!rotate)
    }, 1000)
  }, [])


  const fetchCount = async () => {
    let res = await axios.get('/api/get-user-count')
    setCount(res.data.data)
  }

  const handleWrap = async () => {
    if (!address.current.value) {
      toast("Please enter a valid address", {
        icon: <Info className='w-4 h-4' />,
      })
      return
    }

    if (address.current.value.endsWith('.eth')) {
      toast("Fetching address from ENS", {
        icon: <Loader2 className='animate-spin w-4 h-4' />,
      })
      let ensAddr = await getAddressByEns(address.current.value as string)
      if (!ensAddr) {
        toast("ENS address not found", {
          icon: <Info className='w-4 h-4' />,
        })
        return
      }
      router.push(`/address/${ensAddr}`)
    } else {
      if (!isValidEthereumAddress(address.current.value)) {
        toast("Please enter a valid address", {
          icon: <Info className='w-5 h-5' />,
        })
        return
      }
      router.push(`/address/${address.current.value}`)
    }
  }

  return (
    <div className="flex px-4 justify-center flex-col gap-2 items-center h-[calc(100vh-150px)] pt-[100px] relative font-aviano">
      <div className="left-[-25%]  absolute h-72 w-72 bg-[#0a69da] rounded-full blur-[5rem] opacity-30 md:left-0" />
      <div className="hidden top-[60vh] right-0 absolute h-72 w-72 bg-[#0a69da] rounded-full blur-[5rem] opacity-30 md:block" />
      <div className={`${aviano.className} text-3xl md:text-6xl txt-gradient w-full text-center txt txt-rotate ${rotate ? "txt-test" : ""}`}>
        ETHEREUM
      </div>
      <div className={`${aviano.className}  text-3xl md:text-6xl  txt-gradient-2 w-full text-center ${rotate ? "txt-test-2" : ""} `}>
        2023
      </div>

      <div className={`logo_letters text-2xl md:text-6xl md:ml-10 flex ${aviano.className} ${rotate ? "txt-test-3" : ""}`}>
        <div className="logo__letter is-loaded">
          <div className="logo__character">W</div>
          <div className="logo__loader-wrapper">
          </div>
        </div>
        <div className="logo__letter is-loaded">
          <div className="logo__character">R</div>
          <div className="logo__loader-wrapper">
          </div>
        </div>
        <div className="logo__letter is-loaded">
          <div className="logo__character">A</div>
          <div className="logo__loader-wrapper">
          </div>
        </div>
        <div className="logo__letter is-loaded">
          <div className="logo__character">P</div>
          <div className="logo__loader-wrapper">
          </div>
        </div>
        <div className="logo__letter is-loaded">
          <div className="logo__character">P</div>
          <div className="logo__loader-wrapper">
          </div>
        </div>
        <div className="logo__letter is-loaded">
          <div className="logo__character">E</div>
          <div className="logo__loader-wrapper">
          </div>
        </div>
        <div className="logo__letter is-loaded">
          <div className="logo__character">D</div>
          <div className="logo__loader-wrapper">
          </div>
        </div>
      </div>

      <div className={` flex items-center text-xs my-2 text-gray-200 gap-8 text-center font-poppins`}>
        <div className='relative'>
          <Avatar className='w-[25px] h-[25px]'>
            <AvatarImage src="https://avatars.githubusercontent.com/u/4763902?v=4" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className='absolute left-2 top-0 w-[25px] h-[25px]'>
            <AvatarImage src="https://ik.imagekit.io/lens/media-snapshot/09fc09c4baa5c3736f5994e611a95267b9f610323c4e9c85e2297977050b5343.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className='absolute left-4 top-0 w-[25px] h-[25px]'>
            <AvatarImage src="https://i.seadn.io/gcs/files/640c9b283dd80e221a26ff5018530708.png?auto=format&dpr=1&w=1000" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <p className='font-sora'>
          {count}+ Users already wrapped
        </p>
      </div>

      <Input ref={address} type="text" placeholder='vitalik.eth or 0x0c81A15f136E92CfDa406247Eb6c21c225Db0A12' className='font-poppins max-w-[400px] bg-[#ffffff1a] text-white mt-4' />
      <Button
        className={`${aviano.className} mt-2 relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent bg-[--btn-border] dark:bg-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg] before:shadow dark:before:hidden dark:border-white/5 after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay] dark:after:-inset-px dark:after:rounded-lg before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)] dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] cursor-pointer hover:opacity-90`}
        onClick={handleWrap}>
        WRAP 🔥
      </Button>

    </div >
  )
}