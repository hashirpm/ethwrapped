import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url as string);
    const walletAddress = searchParams.get("address") as string;
    const supabase = createClient(process.env.SUPABASE_PROJECT_URL as string, process.env.SUPABASE_API_KEY as string)
    console.log("inside server");
    const data = await supabase
        .from('wallets')
        .insert([
            { address: walletAddress },
        ])
        .select("*")

    if (data.error == null) {
        return NextResponse.json({ status: true, data })
    } else {
        return NextResponse.json({ status: false })
    }


}