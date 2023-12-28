"use client"
import { useState } from "react"
//@ts-ignore
import { CircleLoader } from "react-awesome-loaders";
export default function FetchDetails() {

    const [data, setData] = useState(null)

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
                    : ""
            }

        </div>
    )
}