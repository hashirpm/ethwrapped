"use client"
import { useEffect, useRef, useState } from "react"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { aviano, shortWalletAddress } from "@/lib/const";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Data } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Logo from "../../../../public/logo.png"
import Image from "next/image";
import { toPng } from 'html-to-image';

export default function FetchDetails() {

    const [data, setData] = useState<Data | null>(null)
    const elementRef = useRef(null);
    const path = usePathname()

    const fetchData = async () => {
        await axios.get('/api/fetchAddressData', {
            params: {
                address: path.split('/')[2]
            }
        }).then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const htmlToImageConvert = () => {
        if (elementRef.current)
            toPng(elementRef.current, { cacheBust: false })
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.download = "my-image-name.png";
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.log(err);
                });
    };
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            {
                data == null ?
                    <div className="flex justify-center items-center flex-col h-screen">
                        <Player
                            autoplay
                            loop
                            src="https://lottie.host/339d259e-2994-4784-b719-9b3a1876fdd9/RT3WDIIDBN.json"
                            style={{ height: '300px', width: '300px' }}
                        >
                            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                        </Player>
                    </div>
                    :
                    <div className="flex justify-center flex-col gap-10 items-center h-screen">
                        <div id="divToDownload" className="bg-black p-3" ref={elementRef}>
                            <div className="w-[960px] h-[540px] bg-black rounded-lg grid grid-cols-2 gap-2" >
                                <div className=" grid grid-rows-2 gap-2">
                                    <div className=" grid grid-cols-2 gap-2">
                                        <div className="grid grid-rows-2 gap-2">
                                            <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                                <div className="box bg-zinc-900 rounded-lg flex justify-center items-center flex-col h-full">
                                                    <p className="text-2xl font-bold text-gray-200">{data.txnCount}</p>
                                                    <p className="text-gray-400 text-xs">Transactions</p>
                                                </div>
                                            </div>
                                            <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                                <div className="box bg-zinc-900 rounded-lg flex justify-center items-center flex-col h-full" >
                                                    <p className="text-2xl font-bold text-gray-200">{(data.cumulativeGasUsed / 1e9).toFixed(4)} $ETH</p>
                                                    <p className="text-gray-400 text-xs">Total txn fee paid</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                            <div className="box bg-zinc-900 rounded-lg flex flex-col justify-center items-center gap-10 h-full" >
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-200">{data.totalEthSent.toFixed(4)}</p>
                                                    <p className="text-gray-400 text-xs">ETH Sent</p>
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-gray-200">{data.totalEthRecieved.toFixed(4)}</p>
                                                    <p className="text-gray-400 text-xs">ETH Received</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                        <div className="box bg-zinc-900 rounded-lg flex justify-center items-center flex-col h-full" >
                                            <p className="text-2xl font-bold text-gray-200">{shortWalletAddress(data.mostTransactedAddress)}</p>
                                            <p className="text-gray-400 text-xs">Address you most interacted with</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" grid grid-rows-2 gap-2">
                                    <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                        <div className=" box bg-zinc-900 rounded-lg" />
                                    </div>
                                    <div className=" grid grid-cols-2 gap-2">
                                        <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                            <div className=" box bg-zinc-900 rounded-lg" />
                                        </div>
                                        <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                            <div className=" box bg-zinc-900 rounded-lg" />
                                        </div>
                                        <div className="relative col-span-2 h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                            <div className=" box bg-zinc-900 rounded-lg " />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Image src={Logo} alt="logo" className="max-w-[500px] mx-auto py-4" />

                            {/* <div className="flex items-center justify-center mt-4 text-4xl">
                                <div className={`${aviano.className}  px-4  txt-gradient text-center txt txt-rotate`}>
                                    ETHEREUM
                                </div>
                                <div className={`${aviano.className}  txt-gradient px-4  text-center `}>
                                    2023
                                </div>

                                <div className={`${aviano.className}  txt-gradient px-4  text-center `}>
                                    UNWRAPPED
                                </div>
                            </div> */}
                        </div>
                        <Button onClick={htmlToImageConvert}
                            className="relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent bg-[--btn-border] dark:bg-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg] before:shadow dark:before:hidden dark:border-white/5 after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay] dark:after:-inset-px dark:after:rounded-lg before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)] dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] cursor-pointer hover:opacity-90"
                        >
                            Download
                        </Button>
                    </div>
            }

        </div>
    )
}