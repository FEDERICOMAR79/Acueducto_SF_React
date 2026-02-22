document.addEventListener('DOMContentLoaded', () => {
    const notifications = document.querySelectorAll('.notification');

    const dismiss = (notification) => {
        if (!notification) return;
        notification.classList.add('closing');
        notification.addEventListener('transitionend', () => notification.remove(), { once: true });
    };

    notifications.forEach((notification) => {
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => dismiss(notification));
        }

        setTimeout(() => dismiss(notification), 4000);
    });
});
