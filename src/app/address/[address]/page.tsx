"use client"
import { useEffect, useState } from "react"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { shortWalletAddress } from "@/lib/const";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Data } from "@/lib/types";

export default function FetchDetails() {

    const [data, setData] = useState<Data | null>(null)

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
                    <div className="flex justify-center items-center h-screen">
                        <div className="w-[960px] h-[540px] rounded-lg grid grid-cols-2 gap-2">
                            <div className=" grid grid-rows-2 gap-2">
                                <div className=" grid grid-cols-2 gap-2">
                                    <div className="grid grid-rows-2 gap-2">
                                        <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                            <div className="box flex justify-center items-center flex-col h-full">
                                                <p className="text-2xl font-bold text-gray-200">{data.txnCount}</p>
                                                <p className="text-gray-400 text-xs">Transactions</p>
                                            </div>
                                        </div>
                                        <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                            <div className="box flex justify-center items-center flex-col h-full" >
                                                <p className="text-2xl font-bold text-gray-200">{data.cumulativeGasUsed}</p>
                                                <p className="text-gray-400 text-xs">Total txn fee paid</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                        <div className="box flex flex-col justify-center items-center gap-10 h-full" >
                                            <div>
                                                <p className="text-2xl font-bold text-gray-200">{data.totalEthSent}</p>
                                                <p className="text-gray-400 text-xs">ETH Sent</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-gray-200">{data.totalEthRecieved}</p>
                                                <p className="text-gray-400 text-xs">ETH Received</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                    <div className="box flex justify-center items-center flex-col h-full" >
                                        <p className="text-2xl font-bold text-gray-200">{shortWalletAddress(data.mostTransactedAddress)}</p>
                                        <p className="text-gray-400 text-xs">Address you most interacted with</p>
                                    </div>
                                </div>
                            </div>
                            <div className=" grid grid-rows-2 gap-2">
                                <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                    <div className=" box" />
                                </div>
                                <div className=" grid grid-cols-2 gap-2">
                                    <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                        <div className=" box" />
                                    </div>
                                    <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                        <div className=" box" />
                                    </div>
                                    <div className="relative col-span-2 h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                        <div className=" box " />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}