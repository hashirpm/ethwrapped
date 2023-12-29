"use client"
import { useEffect, useState } from "react"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { shortWalletAddress } from "@/lib/const";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Data } from "@/lib/types";
import html2canvas from 'html2canvas';
import { Button } from "@/components/ui/button";

export default function FetchDetails() {

    const [data, setData] = useState<Data | null>(null)

    const path = usePathname()
    const downloadImage = () => {
        // Get the reference to the div you want to download
        const divToDownload = document.getElementById('divToDownload');

        // Use html2canvas to convert the div to a canvas
        html2canvas(divToDownload as HTMLElement)
            .then((canvas) => {
                // Convert the canvas to a data URL
                const dataURL = canvas.toDataURL('image/png');

                // Create a link element
                const link = document.createElement('a');

                // Set the href attribute of the link to the data URL
                link.href = dataURL;

                // Set the download attribute to specify the filename
                link.download = 'div_image.png';

                // Append the link to the document
                document.body.appendChild(link);

                // Trigger a click on the link to start the download
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error('Error generating image:', error);
            });
    };
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
                    <div className="flex justify-center flex-col gap-10 items-center h-screen">
                        <div className="w-[960px] h-[540px] bg-black rounded-lg grid grid-cols-2 gap-2" id="divToDownload">
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
                                                <p className="text-2xl font-bold text-gray-200">{data.cumulativeGasUsed}</p>
                                                <p className="text-gray-400 text-xs">Total txn fee paid</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                        <div className="box bg-zinc-900 rounded-lg flex flex-col justify-center items-center gap-10 h-full" >
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
                        <Button onClick={downloadImage}>
                            Download
                        </Button>
                    </div>
            }

        </div>
    )
}