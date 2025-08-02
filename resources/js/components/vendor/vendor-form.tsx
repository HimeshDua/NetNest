import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { router } from "@inertiajs/react";

export default function VendorForm() {
  const [formData, setFormData] = useState({
    title: "",
    vendorName: "",
    vendorLogo: "",
    location: "",
    connectionType: "fiber",
    price: "",
    postedDate: "",
    description: "",
    highlight: "undefined",
    features: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features
        .split(",")
        .map((feature) => feature.trim())
        .filter((f) => f !== ""),
    };
    router.post(route('submission.store'), payload); // POST route to your store() method
  };

  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-10">
      <Card>
        <CardHeader>
          <CardTitle>Vendor Submission Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter service title"
              />

              <Label htmlFor="vendorName">Vendor Name</Label>
              <Input
                id="vendorName"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleChange}
                placeholder="Vendor Name"
              />

              <Label htmlFor="vendorLogo">Vendor Logo URL</Label>
              <Input
                id="vendorLogo"
                name="vendorLogo"
                value={formData.vendorLogo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />

              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Karachi, Pakistan"
              />
            </div>

            {/* Connection Info */}
            <div className="space-y-4">
              <Label htmlFor="connectionType">Connection Type</Label>
              <select
                id="connectionType"
                name="connectionType"
                value={formData.connectionType}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="fiber">Fiber</option>
                <option value="dsl">DSL</option>
                <option value="wireless">Wireless</option>
              </select>

              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 1500 PKR"
              />

              <Label htmlFor="postedDate">Posted Date</Label>
              <Input
                id="postedDate"
                name="postedDate"
                type="date"
                value={formData.postedDate}
                onChange={handleChange}
              />
            </div>

            {/* Description and Tags */}
            <div className="space-y-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write details about the vendor or service"
              />

              <Label htmlFor="highlight">Highlight</Label>
              <select
                id="highlight"
                name="highlight"
                value={formData.highlight}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="new">New</option>
                <option value="trending">Trending</option>
                <option value="reliable">Reliable</option>
                <option value="popular">Popular</option>
                <option value="undefined">None</option>
              </select>

              <Label htmlFor="features">Features (comma separated)</Label>
              <Input
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Fast speed, Low latency, Free router"
              />
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button type="submit">Submit Vendor</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
