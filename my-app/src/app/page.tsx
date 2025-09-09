import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExampleApiUsage } from "@/components/example-api-usage"
import { CandidateForm } from "@/components/candidate_form"
import {CallsTable} from "@/components/callsTable"
export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Phone Screen Operator Console</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Start New Call</CardTitle>
              <CardDescription>
                Initiate an automated phone screen with a candidate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CandidateForm/>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
              <CardDescription>
                View transcripts and details from previous screening calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CallsTable/>
            </CardContent>
          </Card>

          <ExampleApiUsage />
        </div>
      </div>
    </main>
  )
}
