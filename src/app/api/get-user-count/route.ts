import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const supabase = createClient(process.env.SUPABASE_PROJECT_URL as string, process.env.SUPABASE_API_KEY as string)
    const data = await supabase
        .from('wallets')
        .select('*', { count: 'exact', head: true })
    console.log(data)

    if (data.error == null) {
        return NextResponse.json({ status: true, data: data.count })
    } else {
        return NextResponse.json({ status: false })
    }


}