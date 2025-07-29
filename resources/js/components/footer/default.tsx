import { ChevronRight, Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';

export default function FooterWithNewsletter() {
    return (
        <section className="mt-20">
            <footer className="border-t">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                        <div className="space-y-4 md:col-span-2">
                            <Typography as="h3" variant="2xl/semibold">
                                NetNest Co.
                            </Typography>
                            <Typography as="p" variant="sm/normal" className="mt-2 text-muted-foreground">
                                Powering the next generation of ISPs. Stay informed with product updates, feature releases, and helpful tips.
                            </Typography>
                            <form className="space-y-2">
                                <Input type="email" placeholder="Enter your email" className="w-full md:w-64" />
                                <Button type="button" className="w-full md:w-auto">
                                    Subscribe
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </div>

                        <div>
                            <Typography as="h4" variant="md/medium" className="mb-4">
                                Quick Links
                            </Typography>
                            <ul className="space-y-3 text-sm">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'Plans', href: '/plans' },
                                    { name: 'Dashboard', href: '/dashboard' },
                                    { name: 'Admin Panel', href: '/admin' },
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a href={item.href} className="text-muted-foreground transition-colors duration-300 hover:text-primary">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <Typography as="h4" variant="md/medium" className="mb-4">
                                Company
                            </Typography>
                            <ul className="space-y-3 text-sm">
                                {[
                                    { name: 'Contact', href: '/contact' },
                                    { name: 'Support', href: '/support' },
                                    { name: 'CMS', href: '/admin/cms' },
                                    { name: 'Terms & Privacy', href: '/terms' },
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a href={item.href} className="text-muted-foreground transition-colors duration-300 hover:text-primary">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <Typography as="h4" variant="md/medium" className="mb-4">
                                Follow Us
                            </Typography>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, index) => (
                                    <a key={index} href="#" className="text-muted-foreground transition-colors duration-300 hover:text-primary">
                                        <Icon className="size-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-700">
                        <Typography as="p" variant="sm/normal" className="text-muted-foreground">
                            &copy; {new Date().getFullYear()} NetNest Co. All rights reserved.
                        </Typography>
                    </div>
                </div>
            </footer>
        </section>
    );
}
