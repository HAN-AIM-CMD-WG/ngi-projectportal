import { Button } from "@/components/ui/button";
import { Project } from "./project";
import { Navbar } from "./navbar";
import { ProjectList } from "./project-list.tsx";
import { UserList } from "./user-list.tsx";
import { useAppDispatch, useAppSelector } from "@/app/hooks.ts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUserCompany } from "@/app/slices/authSlice.ts";

export function Landing() {
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.auth.roles);
  const uuid = useAppSelector((state) => state.auth.uuid);
  const applicantCount = useAppSelector(
    (state) => state.company.applicantCount
  );

  useEffect(() => {
    dispatch(getUserCompany(uuid));
  }, [dispatch, uuid]);

  return (
    <div key="1">
      <Navbar />
      <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32 relative">
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
      {roles.includes("OPDRACHTGEVER") && (
        <>
          {/* New Task Information Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
                Current Tasks Overview
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Applicants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{applicantCount}</p>
                    <Link
                      to="#"
                      className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Checkout current applicants
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Tasks Assigned to You</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">8</p>
                    <p className="text-sm text-muted-foreground">3 due today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">
                      5 high priority
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="w-full py-6">
            <div className="container flex flex-wrap md:flex-nowrap px-4 md:px-6">
              <div className="w-full md:w-2/3 md:pr-4">
                <Project />
              </div>
              <div className="w-full md:w-1/3 md:pl-4">
                <UserList />
              </div>
            </div>
          </section>
          <section className="w-full py-6">
            <div className="container px-4 md:px-6">
              <ProjectList />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
