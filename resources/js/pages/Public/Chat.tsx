import ConditionalLayout from '@/components/layout/conditionalLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import echo from '@/echo';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { Loader2, Send, Smile } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
    id: number;
    body: string;
    user_id: number;
    created_at: string;
    user: {
        id: number;
        name: string;
        avatar?: string;
    };
}

interface MessageEvent {
    message: Message;
}

export default function Chat() {
    const { auth, conversationId } = usePage<PageProps>().props;
    const user = auth.user;

    const [messages, setMessages] = useState<Message[]>([]);
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch messages
    useEffect(() => {
        if (!conversationId) return;

        setIsLoading(true);
        axios
            .get(`/conversations/${conversationId}/messages`)
            .then((res) => {
                setMessages(res.data);
                setIsLoading(false);
            })
            .catch(console.error);
    }, [conversationId]);

    // Setup Echo listener
    useEffect(() => {
        if (!conversationId) return;

        const channel = echo.private(`chat.${conversationId}`);

        channel.listen('MessageSent', (e: { message: Message }) => {
            setMessages((prev) => [...prev, e.message]);
        });

        channel.subscribed(() => console.log('subscribed to', `chat.${conversationId}`));
        channel.error((err: any) => console.error('channel error', err));

        return () => {
            echo.leave(`chat.${conversationId}`);
        };
    }, [conversationId]);

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input on load
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!body.trim() || isSending) return;

        setIsSending(true);
        try {
            await axios.post(route('conversations.send', { conversation: conversationId }), { body });
            // setMessages((prev) => [...prev, res.data]);
            setBody('');
            inputRef.current?.focus();
        } catch (err) {
            console.error('Send failed', err);
        } finally {
            setIsSending(false);
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // const getInitials = (name: string) => {
    //     return name
    //         .split(' ')
    //         .map((part) => part[0])
    //         .join('')
    //         .toUpperCase();
    // };

    return (
        <ConditionalLayout title="Chat">
            <Card className="flex min-h-[600px] flex-col border shadow-sm">
                <CardHeader className="border-b py-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Chat Conversation</CardTitle>
                        <Badge variant="outline" className="ml-2">
                            {messages.length} messages
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col p-0">
                    {isLoading ? (
                        <div className="flex flex-1 items-center justify-center">
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            <span>Loading messages...</span>
                        </div>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                    {messages.length === 0 ? (
                                        <div className="flex h-60 flex-col items-center justify-center text-center">
                                            <div className="rounded-full bg-muted p-4">
                                                <Smile className="h-8 w-8" />
                                            </div>
                                            <h3 className="mt-4 text-lg font-semibold">No messages yet</h3>
                                            <p className="mt-2 text-muted-foreground">Start the conversation by sending a message.</p>
                                        </div>
                                    ) : (
                                        messages.map((msg) => {
                                            const isCurrentUser = msg.user_id === user?.id;
                                            return (
                                                <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`flex max-w-[80%] gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                                                        {/* <Avatar className="h-8 w-8">
                                                            <AvatarImage src={msg.user.avatar} />
                                                            <AvatarFallback>{getInitials(msg.user.name)}</AvatarFallback>
                                                        </Avatar> */}
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                {!isCurrentUser && <span className="text-sm font-medium">{msg?.user?.name}</span>}
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <span className="text-xs text-muted-foreground">
                                                                                {formatTime(msg.created_at)}
                                                                            </span>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p>{new Date(msg.created_at).toLocaleString()}</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                            <div
                                                                className={`mt-1 rounded-2xl px-4 py-2 ${
                                                                    isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                                                }`}
                                                            >
                                                                {msg.body}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            <form onSubmit={sendMessage} className="border-t p-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        ref={inputRef}
                                        className="flex-1"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        placeholder="Type your message..."
                                        disabled={isSending}
                                    />
                                    <Button type="submit" size="icon" className="flex-shrink-0" disabled={!body.trim() || isSending}>
                                        {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}
                </CardContent>
            </Card>
        </ConditionalLayout>
    );
}
