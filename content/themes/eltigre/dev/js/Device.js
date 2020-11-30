export default class Device {
    static isMobile() {
        return window.innerWidth < 768;
    }

    static isTouchDevice() {
        return (window.DocumentTouch && document instanceof DocumentTouch);
    }     
};