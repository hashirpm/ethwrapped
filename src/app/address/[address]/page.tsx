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
import { getBalanceByTimestamp, getDeployedContracts, getMintedNFTs, getTokenBalances } from "@/lib/alchemy";
import { calculatePercentageChange } from "@/lib/helper";
import confetti from 'canvas-confetti';
import { fetchPoaps } from "@/lib/poap";
import XLogo from "../../../../public/x.svg"
import { Download, Share2 } from "lucide-react";
import Link from "next/link";
export default function FetchDetails() {

    const [data, setData] = useState<Data | null>(null)
    const [nftsMintedCount, setNftsMintedCount] = useState<number>(0)
    const [contractsDeployed, setContractsDeployed] = useState<number>(0)
    const [portfolio, setPortfolio] = useState<number>(0)
    const [totalPoaps, setTotalPoaps] = useState<number>(0)
    const elementRef = useRef(null);
    const path = usePathname()

    const fetchData = async () => {
        let address = path.split('/')[2]

        let nftsMinted = await getMintedNFTs(address)
        let contractCount = await getDeployedContracts(address)
        let poap = await fetchPoaps(address)
        setTotalPoaps(poap?.total)
        setContractsDeployed(contractCount.contractAddresses.length)
        setNftsMintedCount(nftsMinted.erc1155List.length + nftsMinted.erc721List.length)
        let start = await getBalanceByTimestamp(
            address,
            "2023-01-01T00:00:00Z"
        );
        let end = await getBalanceByTimestamp(
            address,
            "2023-12-31T23:59:59Z"
        );
        if (start.balance == end.balance) {
            setPortfolio(0)
        } else (
            setPortfolio(calculatePercentageChange(Number(start.balance), Number(end.balance)))
        )
        await axios.get('/api/fetchAddressData', {
            params: {
                address
            }
        }).then(async (res) => {
            setData(res.data)
            await axios.get('/api/add-address', {
                params: {
                    address
                }
            })
            var end = Date.now() + (3 * 1000);

            // go Buckeyes!
            var colors = ['#bb0000', '#ffffff'];

            (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }).catch((err) => {
            console.log(err)
        })
    }

    const htmlToImageConvert = () => {

        confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
            }
        });
        confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
            }
        });
        confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
            }
        });

        if (elementRef.current)
            toPng(elementRef.current, { cacheBust: false })
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.download = "ethwrapped.png";
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
                    <div className="flex justify-center flex-col gap-10 items-center xl:h-[calc(100vh-150px)] pt-[100px]">
                        <div id="divToDownload" className="bg-black p-3" ref={elementRef}>
                            <div className="w-full lg:w-[960px] lg:h-[540px] bg-black rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-2" >
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
                                                <div className="box bg-zinc-900 rounded-lg flex justify-center items-center flex-col h-full py-4" >
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
                                            <p className="text-3xl font-bold text-gray-200">
                                                <Link href={`https://etherscan.io/address/${data.mostTransactedAddress}`} target="_blank">
                                                    {shortWalletAddress(data.mostTransactedAddress)}
                                                </Link>
                                            </p>
                                            <p className="text-gray-400 text-xs">Address you most interacted with</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" grid grid-rows-2 gap-2">
                                    <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                        <div className=" box bg-zinc-900 rounded-lg flex justify-center items-center flex-col h-full">
                                            <p className="text-4xl font-bold text-gray-200">{nftsMintedCount}</p>
                                            <p className="text-gray-400 text-xs">Total NFTs Minted</p>
                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-2 gap-2">
                                        <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                            <div className="box bg-zinc-900 rounded-lg flex justify-center items-center flex-col h-full py-3">
                                                <p className="text-2xl font-bold text-gray-200">{contractsDeployed}</p>
                                                <p className="text-gray-400 text-xs">Contracts Deployed</p>
                                            </div>
                                        </div>
                                        <div className="relative h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                            <div className=" box bg-zinc-900 rounded-lg flex justify-center items-center flex-col h-full">
                                                <p className="text-2xl font-bold text-gray-200">{totalPoaps}</p>
                                                <p className="text-gray-400 text-xs">POAPs Minted</p>
                                            </div>
                                        </div>
                                        <div className="relative col-span-2 h-full w-full rounded-xl bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
                                            <div className="box bg-zinc-900 rounded-lg flex justify-center items-center flex-col h-full py-3">
                                                <p className="text-3xl font-bold text-gray-200">{portfolio == 0 ? "" : portfolio > 0 ? "+" : ""}{portfolio.toFixed(2)} %</p>
                                                <p className="text-gray-400 text-xs">
                                                    {
                                                        portfolio == 0 ? "No Change in Portfolio"
                                                            : portfolio > 0 ? "Portfolio Increased by"
                                                                : "Portfolio Decreased by"
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Image src={Logo} alt="logo" className="w-full max-w-[500px] mx-auto py-4" />

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
                        {/* <Button onClick={htmlToImageConvert} */}
                        <div className="flex gap-4 dark">
                            <button onClick={htmlToImageConvert}
                                className="relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent bg-[--btn-border] dark:bg-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg] before:shadow dark:before:hidden dark:border-white/5 after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay] dark:after:-inset-px dark:after:rounded-lg before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)] dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] cursor-pointer hover:opacity-90"
                            >
                                <Download className=" w-4 h-4" />
                                Download
                            </button>
                            <Link href={`https://twitter.com/intent/tweet?text=${data.txnCount}%20transactions%20in%202023🤯.wanna%20get%20yours?%20checkout%20https://ethwrapped.xyz`} target="_blank">
                                <button

                                    className="relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent bg-[--btn-border] dark:bg-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg] before:shadow dark:before:hidden dark:border-white/5 after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay] dark:after:-inset-px dark:after:rounded-lg before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)] dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] cursor-pointer hover:opacity-90"
                                >
                                    <Share2 className=" w-4 h-4" />
                                    Share on <Image src={XLogo} alt="twitter" className="w-6 h-6" />
                                </button>
                            </Link>
                        </div>
                    </div>
            }

        </div>
    )
}