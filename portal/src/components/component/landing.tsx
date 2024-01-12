import { Button } from "@/components/ui/button"
import { Project } from "./project"
import { Navbar } from "./navbar"

export function Landing() {

  return (
    <div key="1">
      <Navbar />
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Projojo
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Start creating your projects easily and efficiently.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="default">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="container px-4 md:px-6">
          <Project />
        </div>
      </section>
    </div>
  )
}
