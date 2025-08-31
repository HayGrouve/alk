import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TestUIPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#003C70]">
          shadcn/ui Components Test
        </h1>
        <p className="mt-2 text-gray-600">
          Testing the integration of shadcn/ui components with our furniture
          website branding.
        </p>
      </div>

      <div className="space-y-8">
        {/* Button Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
            <CardDescription>
              Testing different button variants with brand colors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="brand">Brand Primary</Button>
              <Button variant="brand-secondary">Brand Secondary</Button>
              <Button variant="brand-outline">Brand Outline</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Components */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>
              Input and textarea components for contact forms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" placeholder="Enter your message" />
            </div>
            <Button variant="brand" className="w-full">
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Badge Components */}
        <Card>
          <CardHeader>
            <CardTitle>Badge Components</CardTitle>
            <CardDescription>Category and status badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Separator */}
        <div>
          <h3 className="text-lg font-semibold">Section with Separator</h3>
          <p className="text-gray-600">
            This section demonstrates the separator component.
          </p>
          <Separator className="my-4" />
          <p className="text-gray-600">Content below the separator.</p>
        </div>
      </div>
    </div>
  );
}
