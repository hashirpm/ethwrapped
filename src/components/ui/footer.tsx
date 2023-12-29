import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <div className=" h-[100px] mt-20 relative flex flex-col items-center max-w-6xl px-4 pt-6 mx-auto before:absolute before:h-px before:inset-x-0 before:top-0 before:bg-gradient-to-r before:from-transparent before:via-gray-50/20">
            <p className={`text-sm text-gray-400`}>
                Made by <Link href="https://twitter.com/0xShiyasmohd" className="text-gray-300">@shiyasmohd</Link> & <Link href="https://twitter.com/0xhashir" className="text-gray-300">@hashirpm</Link>
            </p>
        </div>
    )
}