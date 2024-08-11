import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Upload Assignment</h1>
            <p className="mt-2 text-muted-foreground">
              Submit your assignment by uploading a zip file and filling out the
              form below.
            </p>
          </div>
          <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
            <div className="flex h-40 items-center justify-center rounded-md border-2 border-dashed border-input bg-muted p-6 text-center">
              <div className="space-y-1 text-sm">
                <CloudUploadIcon className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="font-medium text-muted-foreground">
                  Drag and drop your assignment zip file here
                </p>
                <p className="text-xs text-muted-foreground">
                  or click to upload
                </p>
                <input type="file" className="sr-only" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="assignment-name">Assignment</Label>
                <Input
                  id="assignment-name"
                  placeholder="Enter assignment name"
                />
              </div>
              <div>
                <Label htmlFor="student-name">Student Name</Label>
                <Input id="student-name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="discord">Discord Username</Label>
                <Input id="discord" placeholder="Enter your Discord username" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button type="submit">Submit Assignment</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CloudUploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
