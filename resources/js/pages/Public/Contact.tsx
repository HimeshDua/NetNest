import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardHeader, CardTitle, CardDescription
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Main } from '@/layouts/main';
import { AlertTriangle, CheckCircle, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'; // Added Loader2 and AlertTriangle
import { useState } from 'react';

export default function ContactPage() {
    // Combine validation/submission state for cleaner management
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        // Clear error for the field being edited
        if (validationErrors[name]) {
            setValidationErrors((p) => {
                const newErrors = { ...p };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required.';
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'A valid email is required.';
        }
        if (!formData.message.trim()) {
            errors.message = 'A message is required.';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            setStatus('error');
            return;
        }

        setStatus('loading');
        // Simulate API call delay
        setTimeout(() => {
            // Use success status for final feedback
            setStatus('success');
            // Clear form data after successful submission
            setFormData({ name: '', email: '', phone: '', message: '' });
            setValidationErrors({});

            // Reset status after 3 seconds to allow new submissions
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    const contacts = [
        { icon: Mail, label: 'Email Address', value: 'himeshdua22@gmail.com', href: 'mailto:himeshdua22@gmail.com' },
        { icon: Phone, label: 'Phone Number', value: '+92 3367719555', href: 'tel:+03367719555' },
        { icon: MapPin, label: 'Office Location', value: 'Karachi', href: 'https://maps.google.com' },
    ];

    return (
        <Layout title="Contact">
            <Main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Hero Section - Centered and more prominent */}
                <div className="mb-12 text-center">
                    <Badge variant="secondary" className="mb-3 text-sm font-semibold tracking-wider uppercase">
                        Get in Touch
                    </Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">We’re here to help you grow.</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
                        Contact us for sales, support, or partnership inquiries. We aim to respond within **one business day**.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Quick Contacts - Moved to the left on desktop for better F-pattern flow */}
                    <Card className="h-full p-4 shadow-lg lg:p-6">
                        <CardHeader className="mb-4 p-0">
                            <CardTitle className="text-2xl">Quick Contacts</CardTitle>
                            <CardDescription>Reach out to us directly through these channels.</CardDescription>
                        </CardHeader>
                        <div className="space-y-4">
                            {contacts.map((c, i) => (
                                <a
                                    key={i}
                                    href={c.href}
                                    target={c.label.includes('Location') ? '_blank' : '_self'} // Open map in new tab
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-4 rounded-xl border p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
                                >
                                    <c.icon className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary transition-transform group-hover:scale-105" />
                                    <div>
                                        <div className="text-base font-semibold">{c.label}</div>
                                        <div className="text-sm break-all text-muted-foreground">{c.value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </Card>

                    {/* Form Card - Dominant element on the right */}
                    <Card className="border-2 shadow-xl lg:col-span-2">
                        <CardHeader className="px-6 pt-6 pb-0">
                            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                            <CardDescription>Fill out the form below and we'll be in touch shortly.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="grid gap-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Name <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Full Name"
                                            aria-invalid={!!validationErrors.name}
                                            className={validationErrors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                        />
                                        {validationErrors.name && (
                                            <p className="flex items-center gap-1 text-xs text-red-500">
                                                <AlertTriangle className="h-3 w-3" /> {validationErrors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            aria-invalid={!!validationErrors.email}
                                            className={validationErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                        />
                                        {validationErrors.email && (
                                            <p className="flex items-center gap-1 text-xs text-red-500">
                                                <AlertTriangle className="h-3 w-3" /> {validationErrors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Phone Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone (optional)</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g., +1 (555) 123-4567"
                                        type="tel" // Use tel type for better mobile UX
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="message">
                                        Message <span className="text-red-500">*</span>
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6} // Slightly taller textarea
                                        placeholder="Tell us about your inquiry..."
                                        aria-invalid={!!validationErrors.message}
                                        className={validationErrors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                    />
                                    {validationErrors.message && (
                                        <p className="flex items-center gap-1 text-xs text-red-500">
                                            <AlertTriangle className="h-3 w-3" /> {validationErrors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submission & Feedback */}
                                <div>
                                    <Button
                                        type="submit"
                                        disabled={status === 'loading' || status === 'success'}
                                        className="w-full px-8 py-3 text-lg transition-all duration-300 sm:w-auto"
                                    >
                                        {status === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {status === 'loading' ? (
                                            'Sending...'
                                        ) : status === 'success' ? (
                                            <>
                                                <CheckCircle className="mr-2 h-5 w-5" /> Message Sent!
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" /> Send Message
                                            </>
                                        )}
                                    </Button>

                                    {/* Submission Feedback Messages */}
                                    {status === 'success' && (
                                        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-green-600 animate-in fade-in">
                                            <CheckCircle className="h-4 w-4" /> Thank you! Your message has been sent successfully.
                                        </p>
                                    )}
                                    {status === 'error' && Object.keys(validationErrors).length > 0 && (
                                        <p className="mt-3 flex items-center gap-1 text-sm font-medium text-red-600 animate-in fade-in">
                                            <AlertTriangle className="h-4 w-4" /> Please correct the errors in the required fields above.
                                        </p>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Main>
        </Layout>
    );
}
