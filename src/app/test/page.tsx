"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { aviano } from '@/lib/const'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'


export default function MainPage() {

    const [rotate, setRotate] = useState(true)
    const address = useRef<any>()
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            setRotate(!rotate)
        }, 1000)
    }, [])


    return (
        <div className="flex justify-center flex-col gap-2 items-center h-screen relative font-aviano">
            <div className={`${aviano.className} text-7xl txt-gradient w-full text-center txt txt-rotate ${rotate ? "txt-test" : ""}`}>
                ETHEREUM
            </div>
            <div className={`${aviano.className} -mt-[55px] text-7xl  txt-gradient-2 w-full text-center ${rotate ? "txt-test-2" : ""} `}>
                2023
            </div>

            <div className={`logo_letters text-5xl flex ${aviano.className} ${rotate ? "txt-test-3" : ""}`}>
                <div className={`logo__letter is-loaded `}>
                    <div className="logo__character ">U</div>
                    <div className="logo__loader-wrapper">
                    </div>
                </div>
                <div className={`logo__letter is-loaded `}>
                    <div className="logo__character ">N</div>
                    <div className="logo__loader-wrapper">
                    </div>
                </div>
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

            <Input ref={address} type="text" placeholder='0x0c81A15f136E92CfDa406247Eb6c21c225Db0A12' className='font-poppins max-w-[400px] bg-[#ffffff1a] text-white mt-4' />
            <Button className={`bg-[#ffffff5a] ${aviano.className} tracking-wider mt-3 `} onClick={() => router.push(`/address/${address.current.value}`)}>
                UNWRAP 🔥
            </Button>

        </div>
    )
}