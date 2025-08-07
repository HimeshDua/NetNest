'use client';

import { Button } from '@/components/ui/button';
import '@/css/styles/tiptap.scss';
import { cn } from '@/lib/utils';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function RichEditor({ value, onChange }: { value?: string; onChange?: (html: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } }), Underline, Strike, Heading, CodeBlock, HorizontalRule],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    if (!editor) return null;

    const isActive = (fn: () => boolean) => (fn() ? 'bg-muted text-foreground' : 'bg-background text-muted-foreground');

    return (
        <div className="space-y-3 rounded-md border bg-card p-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1">
                {/* Headings */}
                <div className="flex gap-1 border-r pr-2">
                    {([1, 2, 3] as const).map((level) => (
                        <Button
                            key={level}
                            type="button"
                            size="sm"
                            variant="ghost"
                            className={cn(isActive(() => editor.isActive('heading', { level })))}
                            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                        >
                            H{level}
                        </Button>
                    ))}
                </div>

                {/* Text styles */}
                <div className="flex gap-1 border-r px-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className={cn(isActive(() => editor.isActive('bold')))}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        Bold
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className={cn(isActive(() => editor.isActive('italic')))}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        Italic
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className={cn(isActive(() => editor.isActive('underline')))}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        Underline
                    </Button>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r px-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className={cn(isActive(() => editor.isActive('bulletList')))}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        • List
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className={cn(isActive(() => editor.isActive('orderedList')))}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        1. List
                    </Button>
                </div>

                {/* Other */}
                <div className="flex gap-1 px-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={cn(isActive(() => editor.isActive('blockquote')))}
                    >
                        Quote
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={cn(isActive(() => editor.isActive('codeBlock')))}
                    >
                        Code
                    </Button>

                    <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        —
                    </Button>

                    <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().undo().run()}>
                        Undo
                    </Button>

                    <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().redo().run()}>
                        Redo
                    </Button>
                </div>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="prose prose-lg dark:prose-invert max-w-none rounded-md focus:outline-none" />
        </div>
    );
}
