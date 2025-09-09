'use client'

import {Form} from "@/components/ui/form"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"



export function CandidateForm(){
    const [candidateName, setCandidateName] = useState('')
    const [candidatePhone, setCandidatePhone] = useState('')
    const [position, setPosition] = useState('')
    const [loading, setLoading] = useState(false)
    const [transcript, setTranscript] = useState('')
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send data to an API
        if (!candidateName || !candidatePhone || !position) {
            alert('Please fill in all fields.');
            return;
        }
        console.log(`Starting call with ${candidateName} for the position of ${position} at phone number ${candidatePhone}`);
        
        setLoading(true)
        try {
            const response = await fetch('/api/vapi', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                candidatePhone: candidatePhone,
                position: position,
                candidateName: candidateName
              })
            })
            const result = await response.json()
            setTranscript(result.callId)

          } catch (error) {
            console.error('Error posting data:', error.message)
          } finally {
            setLoading(false)
          }
          
    }
    return(
        <Form>
                <div>
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input id="candidateName" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} placeholder="e.g. Jane Doe" className="mb-4 mt-1" />
                </div>
                <div>
                  <Label htmlFor="candidatePhone">Candidate Phone Number</Label>
                  <Input id="candidatePhone" value={candidatePhone} onChange={(e) => setCandidatePhone(e.target.value)} placeholder="e.g. +1234567890" className="mb-4 mt-1" />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Software Engineer" className="mb-4 mt-1" />
                </div>
              <Button onClick={handleSubmit} disabled={loading}>{loading ? "Call in progress" : "Start Call"}</Button>
              {transcript && (<div className="mt-4 p-4 border rounded bg-gray-50">
                <h3 className="font-semibold mb-2">Call initiated successfully!</h3>
                <p><strong>Call ID:</strong> {transcript}</p>
              </div>
            )}
              </Form>
    )
}