"use client"
import { useState } from "react"
export default function FetchDetails() {

    const [data, setData] = useState(1)

    return (
        <div>
            {
                data == null ?
                    <div className="flex justify-center items-center flex-col h-screen">
                        Loading
                    </div>
                    :
                    <div className="flex justify-center items-center h-screen">
                        <div className="w-[960px] h-[540px] rounded-lg grid grid-cols-2 gap-2">
                            <div className=" grid grid-rows-2 gap-2">
                                <div className=" grid grid-cols-2 gap-2">
                                    <div className="grid grid-rows-2 gap-2">
                                        <div className=" box" />
                                        <div className=" box" />
                                    </div>
                                    <div className=" box" />
                                </div>
                                <div className=" box" />
                            </div>
                            <div className=" grid grid-rows-2 gap-2">
                                <div className=" box" />
                                <div className=" grid grid-cols-2 gap-2">
                                    <div className=" box" />
                                    <div className=" box" />
                                    <div className=" box col-span-2" />
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}