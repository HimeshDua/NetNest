import { Button } from '@/components/ui/button';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useState } from 'react';

interface ImageUploadProps {
    name: string;
    label: string;
    value?: string | null; // existing file path from DB
    onChange: (file: File | null) => void;
}

export const ImageUpload = ({ name, label, value, onChange }: ImageUploadProps) => {
    const [files, setFiles] = useState<File[] | undefined>();
    const [filePreview, setFilePreview] = useState<string | undefined>(value ? `/storage/${value}` : undefined);

    const handleDrop = (files: File[]) => {
        setFiles(files);
        if (files.length > 0) {
            const file = files[0];
            onChange(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    setFilePreview(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <Dropzone accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} onDrop={handleDrop} src={files} className="h-full p-6">
                {!filePreview ? <DropzoneEmptyState /> : null}
                <DropzoneContent>
                    {filePreview && (
                        <div className="relative h-full min-h-[180px] w-full overflow-hidden rounded-md">
                            <img alt={`${name} preview`} className="absolute top-0 left-0 h-full w-full object-cover" src={filePreview} />
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                    setFilePreview(undefined);
                                    setFiles(undefined);
                                    onChange(null);
                                }}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </DropzoneContent>
            </Dropzone>
        </div>
    );
};
