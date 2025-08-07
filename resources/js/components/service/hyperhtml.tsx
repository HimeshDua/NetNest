import '../../css/styles/tiptap.scss';
function HyperHtml(description: any) {
    return (
        <div className="mt-10 space-y-6">
            <div className="mt-10 space-y-6">
                <h2 className="text-lg font-semibold">Full Description</h2>
                <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    );
}

export default HyperHtml;
