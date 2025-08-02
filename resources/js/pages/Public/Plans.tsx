import ComparisonSection from '@/components/plans/comparison-section';
import PricingCard from '@/components/plans/default';
import { Typography } from '@/components/ui/typography';
import { pricingTiers } from '@/data/pricingTiers';
import Layout from '@/layouts/layout';

function PricingsPage() {
    return (
        <Layout>
            <div className="relative">
                <div className="mx-auto max-w-7xl px-4 py-24">
                    <div className="mx-auto mb-20 max-w-2xl text-center">
                        <Typography as="h1" variant="5xl/bold" className="tracking-tight text-foreground">
                            Start growing today
                        </Typography>

                        <Typography as="p" variant="lg/normal" className="mt-6 leading-8 text-muted-foreground">
                            Choose a plan that fits your needs. Get access to our team of designers and developers ready to help you grow.
                        </Typography>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {pricingTiers.map((tier: any) => (
                            <PricingCard key={tier.name} {...tier} />
                        ))}
                    </div>

                    <ComparisonSection />

                    <div className="mt-16 text-center">
                        <Typography as="p" variant="sm/normal" className="text-muted-foreground">
                            All plans include unlimited revisions, priority support, and a satisfaction guarantee.
                        </Typography>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PricingsPage;
