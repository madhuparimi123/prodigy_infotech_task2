let isRunning = false;
        let startTime;
        let lapStartTime;
        let lapNumber = 1;
        let interval;

        function startStop() {
            if (isRunning) {
                clearInterval(interval);
                document.getElementById("startStop").textContent = "Start";
                isRunning = false;
            } else {
                if (!lapStartTime) {
                    lapStartTime = Date.now();
                }
                startTime = Date.now() - (lapTime || 0);
                interval = setInterval(updateDisplay, 10);
                document.getElementById("startStop").textContent = "Stop";
                isRunning = true;
            }
        }

        function reset() {
            clearInterval(interval);
            document.getElementById("display").textContent = "00:00:00";
            document.getElementById("startStop").textContent = "Start";
            document.getElementById("lapList").innerHTML = "";
            isRunning = false;
            lapTime = 0;
            lapStartTime = null;
            lapNumber = 1;
        }

        function lap() {
            if (isRunning) {
                const lapList = document.getElementById("lapList");
                const currentTime = Date.now();
                const lapElapsed = currentTime - lapStartTime;
                const lapItem = document.createElement("li");
                lapItem.textContent = `Lap ${lapNumber}: ${formatTime(lapElapsed)}`;
                lapList.appendChild(lapItem);
                lapNumber++;
                lapStartTime = currentTime;
            }
        }

        function updateDisplay() {
            const currentTime = Date.now();
            lapTime = currentTime - startTime;
            document.getElementById("display").textContent = formatTime(lapTime);
        }

        function formatTime(time) {
            const date = new Date(time);
            const minutes = date.getUTCMinutes().toString().padStart(2, "0");
            const seconds = date.getUTCSeconds().toString().padStart(2, "0");
            const milliseconds = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, "0");
            return `${minutes}:${seconds}:${milliseconds}`;
        }