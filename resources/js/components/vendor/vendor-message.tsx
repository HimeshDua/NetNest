import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChatPageProps, Conversation, Message } from '@/types/chat';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, Loader2, Menu, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Main component
const VendorMessages: React.FC = () => {
    const { messages: initialMessages, vendorId } = usePage<ChatPageProps>().props;
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>(initialMessages || []);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);

    // Fetch conversations/threads
    useEffect(() => {
        const fetchThreads = async () => {
            try {
                setIsLoading(true);
                // Update this endpoint to match your actual route
                const response = await axios.get('/vendor/threads');
                const threadsData = response.data;

                // Transform threads data to conversations format
                const formattedConversations: Conversation[] = Object.keys(threadsData).map((senderId) => {
                    const threadMessages: Message[] = threadsData[senderId];
                    const lastMessage = threadMessages[0];
                    const customer = lastMessage.sender || { id: senderId, name: 'Customer' };

                    // Calculate unread count
                    const unreadCount = threadMessages.filter((msg) => !msg.is_read && msg.sender_id !== vendorId).length;

                    return {
                        id: senderId,
                        customer,
                        lastMessage,
                        unreadCount,
                    };
                });

                setConversations(formattedConversations);
            } catch (error) {
                console.error('Error fetching threads:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchThreads();
    }, [vendorId]);

    // Load messages when a conversation is selected
    useEffect(() => {
        const loadConversation = async () => {
            if (!selectedConversation) return;

            try {
                setIsLoading(true);
                // Update this endpoint to match your actual route
                const response = await axios.get(`/vendor/conversations/${selectedConversation}`);
                setMessages(response.data);

                // Update unread count in conversations
                setConversations((prev) =>
                    prev.map((conv) => {
                        if (conv.id === selectedConversation) {
                            return { ...conv, unreadCount: 0 };
                        }
                        return conv;
                    }),
                );

                // Close mobile sidebar when a conversation is selected
                setIsMobileSidebarOpen(false);
            } catch (error) {
                console.error('Error loading conversation:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadConversation();
    }, [selectedConversation, vendorId]);

    const handleSendMessage = async (content: string) => {
        if (!selectedConversation) return;

        try {
            setIsSending(true);
            // Update this endpoint to match your actual route
            const response = await axios.post('/vendor/messages', {
                receiver_id: selectedConversation,
                message: content,
            });

            // Add the new message to the current conversation
            const newMessage = response.data.message;
            setMessages((prev) => [...prev, newMessage]);

            // Update the conversation list with the new last message
            setConversations((prev) =>
                prev.map((conv) => {
                    if (conv.id === selectedConversation) {
                        return {
                            ...conv,
                            lastMessage: newMessage,
                            unreadCount: 0,
                        };
                    }
                    return conv;
                }),
            );
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const selectedConversationData = conversations.find((c) => c.id === selectedConversation) || null;

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            <div className="flex items-center border-b bg-white p-4 shadow-sm md:hidden">
                <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Menu className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 p-0">
                        <ConversationSidebar
                            conversations={conversations}
                            selectedConversation={selectedConversation}
                            onSelectConversation={setSelectedConversation}
                            isLoading={isLoading}
                        />
                    </SheetContent>
                </Sheet>
                <h1 className="ml-4 text-xl font-semibold text-gray-800">Messages</h1>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar for desktop */}
                <div className="hidden w-80 border-r bg-white md:block">
                    <ConversationSidebar
                        conversations={conversations}
                        selectedConversation={selectedConversation}
                        onSelectConversation={setSelectedConversation}
                        isLoading={isLoading}
                    />
                </div>

                {/* Main chat area */}
                <div className="flex flex-1 flex-col bg-white">
                    <ChatWindow
                        conversation={selectedConversationData}
                        messages={messages}
                        vendorId={vendorId}
                        onBack={() => setSelectedConversation(null)}
                        isLoading={isLoading}
                    />
                    <MessageInput
                        onSendMessage={handleSendMessage}
                        disabled={!selectedConversation || isLoading || isSending}
                        isSending={isSending}
                    />
                </div>
            </div>
        </div>
    );
};

// Sub-components
const MessageBubble: React.FC<{ message: Message; isSender: boolean }> = ({ message, isSender }) => {
    return (
        <div className={`mb-4 flex ${isSender ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                    isSender ? 'rounded-br-none bg-blue-600 text-white' : 'rounded-bl-none bg-gray-100 text-gray-800'
                }`}
            >
                <p className="text-sm">{message.message}</p>
                <p className={`mt-1 text-xs ${isSender ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(message.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </div>
    );
};

const ConversationItem: React.FC<{
    conversation: Conversation;
    isActive: boolean;
    onClick: () => void;
}> = ({ conversation, isActive, onClick }) => {
    return (
        <div className={`flex cursor-pointer items-center border-b p-3 ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}`} onClick={onClick}>
            <Avatar className="mr-3 h-10 w-10">
                <AvatarFallback className="bg-blue-100 text-blue-800">{conversation.customer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                    <p className="truncate font-medium text-gray-800">{conversation.customer.name}</p>
                    {conversation.lastMessage && (
                        <span className="text-xs text-gray-500">{new Date(conversation.lastMessage.created_at).toLocaleDateString()}</span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <p className="truncate text-sm text-gray-500">{conversation.lastMessage?.message || 'No messages yet'}</p>
                    {conversation.unreadCount > 0 && <Badge className="ml-2 bg-blue-600">{conversation.unreadCount}</Badge>}
                </div>
            </div>
        </div>
    );
};

const ConversationSidebar: React.FC<{
    conversations: Conversation[];
    selectedConversation: string | null;
    onSelectConversation: (id: string) => void;
    isLoading: boolean;
}> = ({ conversations, selectedConversation, onSelectConversation, isLoading }) => {
    return (
        <div className="h-full border-r">
            <div className="border-b p-4">
                <h2 className="text-xl font-semibold text-gray-800">Conversations</h2>
            </div>
            <ScrollArea className="h-full">
                {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                        <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin" />
                        Loading conversations...
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No conversations yet</div>
                ) : (
                    conversations.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            isActive={selectedConversation === conversation.id}
                            onClick={() => onSelectConversation(conversation.id)}
                        />
                    ))
                )}
            </ScrollArea>
        </div>
    );
};

const ChatWindow: React.FC<{
    conversation: Conversation | null;
    messages: Message[];
    vendorId: string;
    onBack?: () => void;
    isLoading: boolean;
}> = ({ conversation, messages, vendorId, onBack, isLoading }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    if (!conversation) {
        return (
            <div className="flex h-full items-center justify-center bg-gray-50">
                <div className="p-8 text-center">
                    <div className="mx-auto mb-4 h-16 w-16 text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-16 w-16"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-700">Select a conversation</h3>
                    <p className="text-gray-500">Choose a customer from the sidebar to start chatting</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center border-b bg-white p-4 shadow-sm">
                {onBack && (
                    <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                )}
                <Avatar className="mr-2 h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-800">{conversation.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium text-gray-800">{conversation.customer.name}</p>
                    <p className="text-xs text-gray-500">Last seen {new Date().toLocaleTimeString()}</p>
                </div>
            </div>

            <ScrollArea className="flex-1 bg-gray-50 p-4" ref={scrollRef}>
                {isLoading ? (
                    <div className="py-4 text-center text-gray-500">
                        <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin" />
                        Loading messages...
                    </div>
                ) : messages.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">No messages yet. Start the conversation!</div>
                ) : (
                    <div className="space-y-2">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} isSender={message.sender_id === vendorId} />
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

const MessageInput: React.FC<{
    onSendMessage: (message: string) => void;
    disabled?: boolean;
    isSending?: boolean;
}> = ({ onSendMessage, disabled, isSending }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t bg-white p-4">
            <div className="flex space-x-2">
                <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={disabled}
                    className="flex-1"
                />
                <Button type="submit" size="icon" disabled={disabled || !message.trim() || isSending} className="bg-blue-600 hover:bg-blue-700">
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
            </div>
        </form>
    );
};

export default VendorMessages;
