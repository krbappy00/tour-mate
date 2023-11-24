declare module 'lottie-web' {
  export function loadAnimation(params: LottieParams): {
    play: () => void;
    stop: () => void;
    pause: () => void;
    setSpeed: (speed: number) => void;
    setDirection: (direction: number) => void;
    destroy: () => void;
    addEventListener: (event: string, handler: () => void) => void;
  };

  export interface LottieParams {
    container: HTMLElement | Element;
    renderer?: string;
    loop?: boolean;
    autoplay?: boolean;
    animationData: any;
    // Add other options as needed
  }
}
