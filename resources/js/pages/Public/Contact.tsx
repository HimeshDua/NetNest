import CenterAligned from '@/components/contact/default';
import Layout from '@/layouts/layout';
import { Head } from '@inertiajs/react';

function Contact() {
    return (
        <>
            <Head>
                <title>Contact Us - NetNest</title>
                <meta
                    name="description"
                    content="Get in touch with NetNest for any inquiries, support, or business collaborations. We are here to help you with web solutions, services, and support."
                />
                <meta name="keywords" content="NetNest contact, get in touch, customer support, business inquiries, web services support" />
                <meta property="og:title" content="Contact Us - NetNest" />
                <meta
                    property="og:description"
                    content="Reach out to NetNest for inquiries, support, or collaborations. We’re just one message away."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourdomain.com/contact" />
                <meta property="og:site_name" content="NetNest" />
                <meta property="og:locale" content="en_US" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Contact Us - NetNest" />
                <meta name="twitter:description" content="Contact NetNest for inquiries, support, and collaborations." />
            </Head>
            <Layout title="Contact Us">
                <CenterAligned />
            </Layout>
        </>
    );
}

export default Contact;
