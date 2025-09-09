'use client'

import {Table} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function CallsTable() {
    const [calls, setCalls] = useState([]);

    useEffect(() => {
        async function fetchCalls() {
            try {
                const response = await fetch('/api/vapi/calls');
                const data = await response.json();
                setCalls(data.calls);
                // Here you would typically set the fetched data to state
            } catch (error) {
                console.error('Error fetching call logs:', error);
            }
        }

        fetchCalls();
    }, []);

    return(
        <>
        <Table>
            <thead>
                <tr>
                    <th>Call ID</th>
                    <th>Candidate Name</th>
                    <th>Candidate Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    calls.map((call) => (
                        <tr key={call.id}>
                            <td>{call.id}</td>
                            <td>{call.name || 'N/A'}</td>
                            <td>{call.number}</td>
                            <td>{call.status}</td>
                            <td>
                                <Button disabled={call.status != "ended"}size="sm" variant="outline">Refresh</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </>
    )
}