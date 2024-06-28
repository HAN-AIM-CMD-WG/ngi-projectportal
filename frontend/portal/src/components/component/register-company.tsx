import React from "react";
import { Navbar } from "./navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function RegisterCompany() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col min-h-screen w-full overflow-hidden">
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-2xl md:text-3xl">
              Register Company
            </h1>
          </div>
          <div className="border shadow-lg rounded-lg p-6 space-y-4">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2 md:flex md:items-center md:gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    type="text"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="telephone">Telephone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="Enter company telephone"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2 md:flex md:items-center md:gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter company email"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="Enter company website"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2 md:flex md:items-center md:gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="sector">Sector</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2 md:flex md:items-center md:gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    placeholder="Enter company description"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="headquarter-address">
                    Headquarter Address
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street + Number</Label>
                      <Input
                        id="street"
                        type="text"
                        placeholder="Enter street and number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input
                        id="postal-code"
                        type="text"
                        placeholder="Enter postal code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="town">Town</Label>
                      <Input id="town" type="text" placeholder="Enter town" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Province</Label>
                      <Input
                        id="province"
                        type="text"
                        placeholder="Enter province"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <Button type="submit" className="mt-4">
                  Register Company
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
