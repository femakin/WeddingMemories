// // /pages/api/files.ts

// import { NextResponse } from "next/server";
// import { pinata } from "../../../../utils/config";
// import { env } from "process";


// export const dynamic = "force-dynamic";

// export async function GET() {
//   try {
//     const files = await pinata.files.list();
//     console.log(files, 'files')
//     console.log(env)

//     // Create a signed URL for each file
//     return NextResponse.json(files, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ text: "Error listing files" }, { status: 500 });
//   }
// }


// /pages/api/files.ts

 import { NextResponse } from "next/server";
 import { env } from "process";

// export const dynamic = "force-dynamic";

// export async function GET() {
//   try {
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${env.PINATA_JWT}`, // Replace with your token
//       },
//          cache: 'no-store',
//     };

//     // Make the fetch request to the Pinata API
//     const response = await fetch('https://api.pinata.cloud/v3/files', options);

//     // Check if the response is successful
//     console.log(response.ok, 'response');
//     if (!response.ok) {
//       console.error(`Error fetching files: ${response.statusText}`);
//       return NextResponse.json({ text: "Error listing files" }, { status: response.status });
//     }

//  /*    const files = await response.json(); */
//   const { data } = await response.json();
//    /*  console.log(data, 'files'); */
//     // console.log(env);

//     // Return the list of files in the response
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ text: "Error listing files" }, { status: 500 });
//   }
// }


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${env.PINATA_JWT}`,
      },
      cache: 'no-store', // This will now work as 'no-store' is a valid RequestCache type
    };

    const response = await fetch('https://api.pinata.cloud/v3/files', options);

    if (!response.ok) {
      return NextResponse.json({ text: "Error listing files" }, { status: response.status });
    }

    const { data } = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ text: "Error listing files" }, { status: 500 });
  }
}
