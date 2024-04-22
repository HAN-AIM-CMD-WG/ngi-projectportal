import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';

export function ProjectDetail() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white px-4 py-2 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FlagIcon className="h-8 w-8 text-[#bd1e59]" />
            <span className="text-xl font-semibold text-gray-800">Projojo</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-[#bd1e59] text-white">
              Start een project
            </Button>
            <Button className="text-[#bd1e59]">Vind challenge</Button>
            <div className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5 text-gray-600" />
              <Input placeholder="Zoeken" />
            </div>
            <SignalIcon className="h-6 w-6 text-gray-600" />
            <div className="flex items-center space-x-2">
              <CoinsIcon className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium">300</span>
            </div>
            <Avatar>
              <AvatarImage
                alt="Sten van Litsenburg"
                src="/placeholder.svg?height=32&width=32"
              />
              <AvatarFallback>SL</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Titel project</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <img
              alt="Project designs"
              className="rounded-lg shadow-lg mb-4 items-center"
              height="400"
              src="https://nandbox.com/wp-content/uploads/2023/03/Innovative-App-Ideas-You-Can-Build-with-No-Code.webp"
              width="600"
            />
            <div className="flex justify-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-gray-300" />
              <div className="h-3 w-3 rounded-full bg-gray-500" />
              <div className="h-3 w-3 rounded-full bg-gray-300" />
              <div className="h-3 w-3 rounded-full bg-gray-300" />
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Wiki</h2>
              <p className="text-gray-600">
                Here you can find all the information about the project,
                guidelines, and resources. Feel free to contribute to the wiki
                to help keep the project documentation up to date.
              </p>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Drag and Drop Designs
              </h2>
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  Drag and drop your design files here, or click to select files
                  to upload.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Gezochte Expertises
            </h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800">HTML</h3>
                <p className="text-gray-600 mb-2">
                  Omdat we een website willen maken hebben we iemand nodig die
                  goed overweg kan met HTML
                </p>
                <Button className="text-[#bd1e59] bg-gray-100">
                  Aanmelden
                </Button>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Adobe Illustrator
                </h3>
                <p className="text-gray-600 mb-2">
                  Omdat we een website willen maken hebben we iemand nodig die
                  goed overweg kan met Adobe Illustrator
                </p>
                <Button className="text-[#bd1e59] bg-gray-100">
                  Aanmelden
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Unity</h3>
                <p className="text-gray-600 mb-2">
                  Omdat we een website willen maken hebben we iemand nodig die
                  goed overweg kan met Unity
                </p>
                <Button className="text-[#bd1e59] bg-gray-100">
                  Aanmelden
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SignalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </svg>
  );
}

function CoinsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
