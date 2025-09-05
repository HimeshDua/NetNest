// resources/js/echo.ts
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Echo: any;
        Pusher: typeof Pusher;
    }
}
window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: import.meta.env.VITE_PUSHER_FORCE_TLS === 'true',
    authEndpoint: '/broadcasting/auth',
    withCredentials: true,
    auth: {
        headers: {
            'X-CSRF-Token': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '',
        },
    },
});

export default echo;
