import ConditionalLayout from '@/components/layout/conditionalLayout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import echo from '@/echo';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

type ConversationSummary = {
    id: number;
    customer_id: number;
    vendor_id: number;
    customer?: {
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

export default function VendorConversations() {
    // Props supplied by the controller (vendorIndex)
    const { conversations: initialConversations = [], auth } = usePage<PageProps>().props as any;
    const vendor = auth?.user;

    const [conversations, setConversations] = useState<ConversationSummary[]>(initialConversations as ConversationSummary[]);
    const [query, setQuery] = useState('');

    // Filtered list
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return conversations;
        return conversations.filter((c) => {
            const name = (c.customer?.name || '').toLowerCase();
            const last = (c.last_message?.body || '').toLowerCase();
            return name.includes(q) || last.includes(q);
        });
    }, [conversations, query]);

    // Subscribe to each conversation's private channel to receive new messages
    useEffect(() => {
        if (!conversations || conversations.length === 0) return;

        const channels: string[] = [];

        conversations.forEach((conv) => {
            const channelName = `chat.${conv.id}`;
            channels.push(channelName);

            const ch = echo.private(channelName);

            ch.listen('MessageSent', (payload: any) => {
                const message = payload?.message;
                if (!message) return;

                setConversations((prev) =>
                    prev.map((c) => {
                        if (c.id !== conv.id) return c;

                        const isFromOther = message.user_id !== vendor.id;

                        return {
                            ...c,
                            last_message: {
                                id: message.id,
                                body: message.body,
                                user_id: message.user_id,
                                created_at: message.created_at,
                            },
                            unread_count: (c.unread_count || 0) + (isFromOther ? 1 : 0),
                        };
                    }),
                );
            });
        });

        return () => {
            // leave channels
            channels.forEach((ch) => echo.leave(ch));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversations.length]);

    const openConversation = async (conversationId: number) => {
        try {
            // Mark as read on server (optional endpoint). If you don't have it, just visit the page.
            await axios.post(`/c/${conversationId}/read`);
        } catch (e) {
            console.log('juice', e);
            // ignore error — endpoint may not exist; the show page should still load
        }

        // Navigate to vendor conversation page (will render Chat/Show)
        router.visit(route('vendor.conversations.show', { conversation: conversationId }));
    };

    return (
        <ConditionalLayout title="Vendor Conversations">
            <div className="mx-auto w-full p-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Messages</CardTitle>
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Search conversations or messages..."
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
                                {filtered.length === 0 && <div className="p-4 text-center text-sm text-muted-foreground">No conversations found</div>}

                                {filtered.map((conv) => (
                                    <div
                                        key={conv.id}
                                        className="flex cursor-pointer items-center gap-4 p-4 hover:bg-muted/50"
                                        onClick={() => openConversation(conv.id)}
                                    >
                                        <Avatar>
                                            {conv.customer?.avatar ? (
                                                <img src={conv.customer.avatar} alt={conv.customer?.name} />
                                            ) : (
                                                <AvatarFallback>{(conv.customer?.name || 'U').charAt(0)}</AvatarFallback>
                                            )}
                                        </Avatar>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="truncate font-medium">{conv.customer?.name || 'Customer'}</div>
                                                <div className="flex items-center gap-2">
                                                    {conv.unread_count && conv.unread_count > 0 ? (
                                                        <Badge variant="destructive">{conv.unread_count}</Badge>
                                                    ) : null}
                                                    <div className="text-xs text-muted-foreground">
                                                        {conv.last_message?.created_at ? new Date(conv.last_message.created_at).toLocaleString() : ''}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="truncate text-sm text-muted-foreground">
                                                {conv.last_message ? conv.last_message.body : 'No messages yet.'}
                                            </div>
                                        </div>

                                        <div>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openConversation(conv.id);
                                                }}
                                            >
                                                Open
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </ConditionalLayout>
    );
}
