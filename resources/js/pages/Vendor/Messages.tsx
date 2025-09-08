import VendorMessages from '@/components/vendor/vendor-message';
import Layout from '@/layouts/layout';

function Messages() {
    return (
        <Layout clasname="w-full" title="Vendor Conversations">
            <div className="mx-auto max-w-4xl p-6">
                <VendorMessages />
            </div>
        </Layout>
    );
}

export default Messages;
