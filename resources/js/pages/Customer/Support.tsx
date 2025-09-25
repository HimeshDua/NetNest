import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import echo from '@/echo';
import Layout from '@/layouts/layout';
import { Main } from '@/layouts/main';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

type SupportThread = {
    id: number;
    vendor_id: number;
    vendor: {
        id: number;
        name: string;
        avatar?: string | null;
    };
    last_message?: {
        id: number;
        body: string;
        user_id: number;
        created_at: string;
    } | null;
    unread_count?: number;
};

export default function CustomerSupport() {
    const { supportThreads: initialThreads = [], auth } = usePage<PageProps>().props as any;
    const customer = auth?.user;

    const [threads, setThreads] = useState<SupportThread[]>(initialThreads as SupportThread[]);
    const [query, setQuery] = useState('');

    console.log('Support Threads:', threads);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return threads;
        return threads.filter((t) => {
            const name = (t.vendor?.name || '').toLowerCase();
            const last = (t.last_message?.body || '').toLowerCase();
            return name.includes(q) || last.includes(q);
        });
    }, [threads, query]);

    useEffect(() => {
        if (!threads || threads.length === 0) return;

        const channels: string[] = [];

        threads.forEach((thread) => {
            const channelName = `chat.${thread.id}`;
            channels.push(channelName);

            const ch = echo.private(channelName);

            ch.listen('MessageSent', (payload: any) => {
                const message = payload?.message;
                if (!message) return;

                setThreads((prev) =>
                    prev.map((t) => {
                        if (t.id !== thread.id) return t;

                        const isFromOther = message.user_id !== customer.id;

                        return {
                            ...t,
                            last_message: {
                                id: message.id,
                                body: message.body,
                                user_id: message.user_id,
                                created_at: message.created_at,
                            },
                            unread_count: (t.unread_count || 0) + (isFromOther ? 1 : 0),
                        };
                    }),
                );
            });
        });

        return () => {
            channels.forEach((ch) => echo.leave(ch));
        };
    }, [threads.length]);

    const openThread = async (conversationId: number) => {
        try {
            await axios.get(route('chat.open', conversationId));
        } catch (e: any) {
            console.log("Couldn't Open Chat ", e.message);
            // ignore
        }

        router.visit(route('chat.open', conversationId));
    };

    return (
        <Layout title="Customer Support">
            <Main className="container mt-12 px-3">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>
                                <Typography as="h2" variant="lg/semibold" className="flex items-center gap-2 sm:text-xl">
                                    Customer Support
                                </Typography>
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Search vendors or messages..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="max-w-xs"
                                />
                                <Button onClick={() => setQuery('')}>Clear</Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <ScrollArea className="h-[600px]">
                            <div className="divide-y">
                                {filtered.length === 0 && <div className="p-4 text-center text-sm text-muted-foreground">No vendors found</div>}

                                {filtered.map((thread) => (
                                    <div
                                        key={thread.id}
                                        className="flex cursor-pointer items-center gap-4 p-4 hover:bg-muted/50"
                                        onClick={() => openThread(thread?.vendor.id)}
                                        title={`Chat with ${thread.vendor?.name || 'Vendor'}`}
                                    >
                                        <div className="flex w-full items-center gap-4">
                                            <Avatar>
                                                {thread.vendor?.avatar ? (
                                                    <img src={thread.vendor.avatar} alt={thread.vendor?.name} />
                                                ) : (
                                                    <AvatarFallback>{(thread.vendor?.name || 'V').charAt(0)}</AvatarFallback>
                                                )}
                                            </Avatar>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="truncate font-medium">{thread.vendor?.name || 'Vendor'}</div>
                                                    <div className="flex items-center gap-2">
                                                        {thread.unread_count && thread.unread_count > 0 ? (
                                                            <Badge variant="destructive">{thread.unread_count}</Badge>
                                                        ) : null}
                                                        <div className="text-xs text-muted-foreground">
                                                            {thread.last_message?.created_at
                                                                ? new Date(thread.last_message.created_at).toLocaleString()
                                                                : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="truncate text-sm text-muted-foreground">
                                                    {thread.last_message ? thread.last_message.body : 'No messages yet.'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </Main>
        </Layout>
    );
}
