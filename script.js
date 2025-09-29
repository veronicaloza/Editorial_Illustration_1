// IIFE to avoid polluting global scope
(function () {
    const display = document.getElementById('timer');
    const startTime = Date.now();

    function pad(n) {
        return n.toString().padStart(2, '0');
    }

    function update() {
        const diff = Date.now() - startTime;      // elapsed ms
        const seconds = Math.floor((diff % 60000) / 1000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const hours = Math.floor(diff / 3600000);

        display.textContent =
            `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        requestAnimationFrame(update);
    }

    // kick it off immediately
    update();
})();