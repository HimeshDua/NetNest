import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/layout';
import { Main } from '@/layouts/main';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function EnhancedContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        department: 'general',
        budget: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((p: any) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // basic client-side validation
        if (!formData.email || !formData.message || !formData.firstName) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 2500);
            return;
        }

        setStatus('loading');

        // Replace with real API call (fetch / inertia.post / axios)
        setTimeout(() => {
            setStatus('success');

            // keep success visible briefly then reset form
            setTimeout(() => {
                setStatus('idle');
                setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', department: 'general', budget: '' });
            }, 2200);
        }, 1200);
    };

    const contactMethods = [
        {
            Icon: Mail,
            title: 'Email support',
            description: 'Detailed questions, attachments welcome',
            value: 'support@netnest.com',
            action: 'mailto:support@netnest.com',
        },
        {
            Icon: Phone,
            title: 'Talk to sales',
            description: 'Quick pricing & onboarding',
            value: '+1 (555) 123-4567',
            action: 'tel:+15551234567',
        },
        {
            Icon: MapPin,
            title: 'Office',
            description: 'Stop by — drop-ins welcome by appointment',
            value: '123 Tech Avenue, SF, CA',
            action: 'https://maps.google.com',
        },
    ];

    return (
        <Layout title="Contact" className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Main>
                {/* Hero */}
                <div className="mb-12 text-center">
                    <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-semibold">
                        Ready to connect
                    </Badge>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Let's build something reliable — together</h1>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                        Tell us what you need (a quick fix, a migration, or a full deployment). We’ll assign the right person and reply within one
                        business day with next steps.
                    </p>
                </div>

                {/* Layout: form left (wider), contact methods + quick actions right (narrow) */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Form (takes 2 cols on lg) */}
                    <div className="lg:col-span-2">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">Start a conversation</h2>
                                        <p className="text-sm text-muted-foreground">Prefer a quick call? Use "Schedule a call" on the right.</p>
                                    </div>

                                    <Badge variant="outline" className="flex items-center">
                                        <Clock className="mr-1 h-3 w-3" />
                                        Typical reply: <span className="ml-2 font-semibold">24 hours</span>
                                    </Badge>
                                </div>

                                <form onSubmit={handleSubmit} className="grid gap-5">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label htmlFor="firstName" className="mb-2">
                                                First name
                                            </Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="Ammad"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName" className="mb-2">
                                                Last name
                                            </Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Khan"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label htmlFor="email" className="mb-2">
                                                Work email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@company.com"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="phone" className="mb-2">
                                                Phone <span className="text-muted-foreground">(optional)</span>
                                            </Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+92 300 0000000"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label htmlFor="department" className="mb-2">
                                                Department
                                            </Label>
                                            <select
                                                id="department"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                className="w-full rounded-md border p-2 text-sm"
                                            >
                                                <option value="general">General / Support</option>
                                                <option value="sales">Sales / Pricing</option>
                                                <option value="technical">Technical / Integrations</option>
                                                <option value="partnerships">Partnerships</option>
                                            </select>
                                        </div>

                                        <div>
                                            <Label htmlFor="budget" className="mb-2">
                                                Estimated budget <span className="text-muted-foreground">(optional)</span>
                                            </Label>
                                            <select
                                                id="budget"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="w-full rounded-md border p-2 text-sm"
                                            >
                                                <option value="">Not sure / N/A</option>
                                                <option value="<1k">Under $1k</option>
                                                <option value="1k-5k">$1k–$5k</option>
                                                <option value=">5k">$5k+</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="message" className="mb-2">
                                            Tell us about your project
                                        </Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Explain the problem, timeline, and must-have requirements."
                                            rows={6}
                                            required
                                        />
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            Tip: include your stack, current provider, and any deadlines for faster triage.
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <Button type="submit" size="lg" disabled={status === 'loading'} className="flex items-center gap-2">
                                            {status === 'loading' ? (
                                                <>
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4" />
                                                    {formData.department === 'sales' ? 'Request pricing' : 'Send message'}
                                                </>
                                            )}
                                        </Button>

                                        <div aria-live="polite" role="status" className="min-h-[1.25rem]">
                                            {status === 'success' && (
                                                <div className="inline-flex items-center gap-2 rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Message sent — we’ll reply within 24 hours.
                                                </div>
                                            )}

                                            {status === 'error' && (
                                                <div className="inline-flex items-center gap-2 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">
                                                    Please complete required fields.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        By contacting NetNest you agree to our{' '}
                                        <Link href="#" className="font-medium underline">
                                            privacy policy
                                        </Link>
                                        .
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column: quick contact, schedule CTA, hours */}
                    <div className="space-y-6 lg:col-span-1">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <h3 className="mb-4 text-lg font-semibold">Quick contact</h3>
                                <div className="space-y-4">
                                    {contactMethods.map((m, i) => (
                                        <a key={i} href={m.action} className="flex items-start gap-3 rounded-md p-2 hover:bg-muted/50">
                                            <div className="rounded-full bg-primary/10 p-2">
                                                <m.Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">{m.title}</div>
                                                <div className="text-xs text-muted-foreground">{m.description}</div>
                                                <div className="mt-1 text-sm font-medium text-primary">{m.value}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                <div className="mt-6 border-t pt-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">Business hours</div>
                                        <div className="text-sm font-medium">Mon–Fri • 9am–6pm PST</div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="flex-1">
                                                    Schedule a call
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <h3 className="mb-2 text-lg font-bold">Schedule a quick 20‑minute call</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    We’ll send a calendar invite after you pick a time. (Placeholder — connect your calendar
                                                    provider).
                                                </p>
                                                <div className="mt-4 flex justify-end">
                                                    <Button onClick={() => alert('Replace with calendar flow')}>Pick a time</Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        <Button asChild>
                                            <a href="mailto:support@netnest.com" className="flex items-center gap-2">
                                                Email us
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs text-muted-foreground">Response time</div>
                                        <div className="font-semibold">Within 24 hours</div>
                                    </div>

                                    <div className="text-right text-xs text-muted-foreground">
                                        <div>Priority for: urgent outages & verified customers</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* FAQ (keep dialogs for deeper answers) */}
                <div className="mt-14">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold tracking-tight">Questions? We’ve got answers.</h2>
                        <p className="mx-auto mt-2 max-w-3xl text-sm text-muted-foreground">
                            Common questions and what to expect when you work with NetNest.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
                        {[
                            {
                                q: 'How quickly do you respond to inquiries?',
                                a: 'We typically respond within 1 business day. For urgent outages, call our support number.',
                            },
                            {
                                q: 'Do you offer custom development services?',
                                a: 'Yes — we build custom web solutions and integrations. Share your problem and we’ll propose options.',
                            },
                            { q: 'Business hours?', a: 'Mon–Fri • 9:00 AM to 6:00 PM PST. After-hours tickets are handled next business day.' },
                            { q: 'Ongoing maintenance?', a: 'We offer maintenance plans including updates, monitoring, and security patches.' },
                        ].map((item, idx) => (
                            <Dialog key={idx}>
                                <DialogTrigger asChild>
                                    <Card className="cursor-pointer transition-shadow hover:shadow-md">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <h3 className="pr-4 font-medium">{item.q}</h3>
                                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent>
                                    <h3 className="mb-2 text-lg font-bold">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </div>

                {/* Resources */}
                <div className="mt-12">
                    <h2 className="mb-6 text-center text-lg font-bold">Other ways we can help</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="#" className="group flex flex-col rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md">
                            <div className="mb-3 inline-flex items-center justify-center rounded-full bg-blue-100 p-2 text-blue-600">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-semibold">Community forum</h3>
                            <p className="mt-1 text-xs text-muted-foreground">Join other customers and get community support.</p>
                            <p className="mt-3 inline-flex items-center gap-x-1 font-medium text-primary">
                                Join the discussion <ArrowRight className="h-4 w-4" />
                            </p>
                        </Link>

                        <Link href="#" className="group flex flex-col rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md">
                            <div className="mb-3 inline-flex items-center justify-center rounded-full bg-purple-100 p-2 text-purple-600">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-semibold">Knowledgebase</h3>
                            <p className="mt-1 text-xs text-muted-foreground">Search docs and troubleshooting guides.</p>
                            <p className="mt-3 inline-flex items-center gap-x-1 font-medium text-primary">
                                Explore resources <ArrowRight className="h-4 w-4" />
                            </p>
                        </Link>

                        <Link href="#" className="group flex flex-col rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md">
                            <div className="mb-3 inline-flex items-center justify-center rounded-full bg-green-100 p-2 text-green-600">
                                <Phone className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-semibold">Developer APIs</h3>
                            <p className="mt-1 text-xs text-muted-foreground">Docs, quickstarts and API keys.</p>
                            <p className="mt-3 inline-flex items-center gap-x-1 font-medium text-primary">
                                View documentation <ArrowRight className="h-4 w-4" />
                            </p>
                        </Link>
                    </div>
                </div>
            </Main>
        </Layout>
    );
}
