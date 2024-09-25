import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

type Options = {
    canSwipeLeft?: boolean;
    canSwipeRight?: boolean;
    offset?: number;
    threshold?: number;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
}

export const useSwipeAction = (element: Ref<HTMLElement>, options: Options = {}) => {
    const start = { x: 0, y: 0 };
    const diff = { x: 0, y: 0 };
    const canSwipeLeft = options.canSwipeLeft ?? true;
    const canSwipeRight = options.canSwipeRight ?? true;
    const offset = options.offset ?? 100;
    const threshold = options.threshold ?? 80;
    let hasTouchStarted = false;
    let isTouchCancelled = false;

    const progress = ref(0);
    const isSwipedLeft = ref(false);
    const isSwipedRight = ref(false);

    const onTouchStart = (event: TouchEvent) => {
        if (event.touches.length !== 1) return;
        const [touch] = event.touches;
        start.x = touch.clientX;
        start.y = touch.clientY;
        hasTouchStarted = false;
        isTouchCancelled = false;
    };

    const onTouchMove = (event: TouchEvent) => {
        if (event.touches.length !== 1 || isTouchCancelled) return;
        const [touch] = event.touches;
        diff.x = touch.clientX - start.x;
        diff.y = touch.clientY - start.y;

        if (!hasTouchStarted && !isTouchCancelled && Math.abs(diff.x) < Math.abs(diff.y)) {
            isTouchCancelled = true;
            return;
        } else {
            hasTouchStarted = true;
        }

        diff.x = Math.min(offset, Math.max(-offset, diff.x));

        if (!canSwipeLeft) {
            diff.x = Math.max(0, diff.x);
        }

        if (!canSwipeRight) {
            diff.x = Math.min(0, diff.x);
        }

        element.value.style.transform = `translateX(${diff.x}px)`;
        progress.value = Math.round(Math.abs(diff.x / offset) * 100);

        isSwipedLeft.value = diff.x <= -offset * threshold / 100;
        isSwipedRight.value = diff.x >= offset * threshold / 100;

        event.preventDefault();
    };

    const onTouchEnd = () => {
        if (diff.x <= -offset * threshold / 100) {
            options.onSwipeLeft?.();
        }

        if (diff.x >= offset * threshold / 100) {
            options.onSwipeRight?.();
        }

        element.value.style.transform = "translateX(0)";
    };

    onMounted(() => {
        element.value.addEventListener("touchstart", onTouchStart);
        element.value.addEventListener("touchmove", onTouchMove);
        element.value.addEventListener("touchend", onTouchEnd);
    });

    onBeforeUnmount(() => {
        element.value.removeEventListener("touchstart", onTouchStart);
        element.value.removeEventListener("touchmove", onTouchMove);
        element.value.removeEventListener("touchend", onTouchEnd);
    });

    return {
        progress,
        isSwipedLeft,
        isSwipedRight,
    };
};
