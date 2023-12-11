import itemChecker from "./itemChecker.worker";

export default async function startWorker() {
    console.log("Worker started");
    setInterval(itemChecker, 15 * 60 * 1000); // Recall itemChecker every 15 minutes
}

