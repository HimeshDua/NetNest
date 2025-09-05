import { PageProps } from './index';

// Types
interface User {
    id: string;
    name: string;
}
export interface Message {
    id: number;
    message: string;
    sender_id: string;
    receiver_id: string;
    is_read: boolean;
    created_at: string;
    sender?: User;
}

export interface Conversation {
    id: string;
    customer: User;
    lastMessage?: Message;
    unreadCount: number;
}

export interface ChatPageProps extends PageProps {
    messages: Message[];
    vendorId: string;
}
