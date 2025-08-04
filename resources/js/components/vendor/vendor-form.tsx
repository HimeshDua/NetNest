import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function VendorForm() {
  const [formData, setFormData] = useState({
    title: '',
    vendorName: '',
    vendorLogo: '',
    location: '',
    connectionType: 'fiber',
    price: '',
    billingCycle: '',
    postedDate: '',
    shortDescription: '',
    fullDescription: '',
    highlight: 'undefined',
    features: '',
    faqs: '',
    images: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      features: formData.features
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f !== ''),
      faqs: JSON.parse(formData.faqs || '[]'),
      images: formData.images
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i !== ''),
    };

    router.post(route('submission.store'), payload);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create Vendor Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Service Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. FastNet 100 Mbps Plan" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input id="vendorName" name="vendorName" value={formData.vendorName} onChange={handleChange} placeholder="e.g. FastNet" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vendorLogo">Logo URL or Path</Label>
                  <Input id="vendorLogo" name="vendorLogo" value={formData.vendorLogo} onChange={handleChange} placeholder="e.g. /storage/logos/logo.png" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Karachi" />
                </div>
              </div>

              <Separator />

              {/* Technical Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="connectionType">Connection Type</Label>
                  <Select value={formData.connectionType} onValueChange={(val) => handleSelectChange('connectionType', val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiber">Fiber</SelectItem>
                      <SelectItem value="dsl">DSL</SelectItem>
                      <SelectItem value="wireless">Wireless</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (PKR)</Label>
                  <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} placeholder="e.g. 2500" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingCycle">Billing Cycle</Label>
                  <Input id="billingCycle" name="billingCycle" value={formData.billingCycle} onChange={handleChange} placeholder="e.g. Monthly" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postedDate">Posted Date</Label>
                  <Input id="postedDate" name="postedDate" type="date" value={formData.postedDate} onChange={handleChange} />
                </div>
              </div>

              <Separator />

              {/* Descriptions */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="e.g. Affordable fiber plan with no FUP." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Full Description</Label>
                  <Textarea id="fullDescription" name="fullDescription" value={formData.fullDescription} onChange={handleChange} placeholder="Write a detailed overview of the service..." rows={5} />
                </div>
              </div>

              <Separator />

              {/* Extras */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="highlight">Highlight</Label>
                  <Select value={formData.highlight} onValueChange={(val) => handleSelectChange('highlight', val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose highlight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="reliable">Reliable</SelectItem>
                      <SelectItem value="popular">Popular</SelectItem>
                      <SelectItem value="undefined">Undefined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Input id="features" name="features" value={formData.features} onChange={handleChange} placeholder="e.g. Unlimited Data, Free Router, 24/7 Support" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faqs">FAQs (JSON format)</Label>
                  <Textarea id="faqs" name="faqs" value={formData.faqs} onChange={handleChange} placeholder='e.g. [{"question": "Is it unlimited?", "answer": "Yes, truly unlimited."}]' />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Images (comma separated URLs)</Label>
                  <Textarea id="images" name="images" value={formData.images} onChange={handleChange} placeholder="e.g. /images/1.jpg, /images/2.jpg" />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit">Submit Service</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
