import { Button } from '@/components/ui/button';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useState } from 'react';
import { Label } from './ui/label';

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
        <div className="flex w-full flex-col space-y-3">
            <Label className="text-sm font-medium">{label}</Label>
            <Dropzone accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }} onDrop={handleDrop} src={files} className="w-full rounded-md p-6 sm:p-8">
                {!filePreview && <DropzoneEmptyState />}
                <DropzoneContent>
                    {filePreview && (
                        <div className="relative h-full min-h-[180px] w-full overflow-hidden rounded-md sm:min-h-[220px]">
                            <img alt={`${name} preview`} src={filePreview} className="inset-0 w-full object-cover" />
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2 m-1"
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
