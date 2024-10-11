import { type NextRequest, NextResponse } from "next/server";
import { pinata } from "../../../../utils/config";


export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const url = await pinata.gateways.createSignedURL({
        cid: data.cid,
      expires: 7776000
    }).optimizeImage({
    width: 300,
    height: 300,
    format: "webp",
    fit: "contain",
    quality: 90,
    dpr: 2,
    sharpen: 1
  })
    // console.log(url)
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ text: "Error creating API Key:" }, { status: 500 });
  }
}
