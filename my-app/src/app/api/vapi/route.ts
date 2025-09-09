import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server'
import { VapiClient } from '@vapi-ai/server-sdk';

const callsDir = path.join(process.cwd(), 'data/calls');
const indexFile = path.join(process.cwd(), 'data/index.json');

const vapi = new VapiClient({ token: process.env.VAPI_API_KEY });

  export async function POST(request: NextRequest) {
    try {
      // Example: Parse JSON body

      console.log("Received request");
      const body = await request.json()
      const phoneNumber = body.candidatePhone;
      const role = body.position;
      const name = body.candidateName;
      console.log(`Phone Number: ${phoneNumber}, Role: ${role}`);
        if (!phoneNumber || !role) {
            return NextResponse.json(
                { error: "Candidate phone number and role are required" },
                { status: 400 }
              )
        }

      const call = await vapi.calls.create({
        assistantId: "926102b3-6e53-4b37-9a61-9ad0bbb42658",
        phoneNumberId: 'c81fef05-58be-4f3f-a794-63534c8c1124',
        customer: { number: phoneNumber, name: name },
      });

      await saveCallData(call);

      return NextResponse.json({
        message: 'Call initiated successfully',
        received: body,
        timestamp: new Date().toISOString(),
        callId: call.id,
      }, { status: 201 })
    } catch (error) {
      console.log("Error occurred:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
  } 


  export async function GET(request: NextRequest) {
    // Example: Get query parameters
    const searchParams = request.nextUrl.searchParams
    const callId = searchParams.get('callId')

    if (!callId) {
        return NextResponse.json(
            { error: "callId parameter is required" },
            { status: 400 }
          )
    }
    try{
      const call = await vapi.calls.get(callId);
      await saveCallData(call)
      return NextResponse.json({
        message: 'Call fetched successfully',
        call: call,
      }, { status: 200 })
    } catch (error) {
      console.log("Error fetching call:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
  }

async function saveCallData(call){

  // Write to index.json
  let index = {}
  try{

    const data = await fs.readFile(indexFile, 'utf-8');
    index = JSON.parse(data);
  } catch {}

  index[call.id] = { id: call.id, number: call.customer.number, name: call.customer.name, status: call.status, createdAt: call.createdAt };
  await fs.writeFile(indexFile, JSON.stringify(index, null, 2));

  //Write to individual call file
  const callFile = path.join(callsDir, `${call.id}.json`);
  await fs.writeFile(callFile, JSON.stringify(call, null, 2));
}