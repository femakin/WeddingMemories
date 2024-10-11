import { NextResponse } from "next/server";
import { env } from "process";


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${env.PINATA_JWT}`,
      },
      cache: 'no-cache'
    };

    const response = await fetch('https://api.pinata.cloud/v3/files', options);

    if (!response.ok) {
      return NextResponse.json({ text: "Error listing files" }, { status: response.status });
    }

    const { data } = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error, "Error listing files");
    return NextResponse.json({ text: "Error listing files" }, { status: 500 });
  }
}
