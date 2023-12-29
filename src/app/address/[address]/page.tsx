"use client"
import { useState } from "react"
//@ts-ignore
import { CircleLoader } from "react-awesome-loaders";
export default function FetchDetails() {

    const [data, setData] = useState(1)

    return (
        <div>
            {
                data == null ?
                    <div className="flex justify-center items-center flex-col h-screen">
                        <CircleLoader
                            meshColor={"#6366F1"}
                            lightColor={"#E0E7FF"}
                            duration={1.5}
                            desktopSize={"90px"}
                            mobileSize={"64px"}
                        />
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