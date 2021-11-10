const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded = event => {
    const db = event.target.result;

    const BudgetStore = db.createObjectStore("budget", {
        keyPath: "listID"
    });
}

request.onsuccess = () => {
    const db = request.result;

    // if online check db and send post it to site
    if (navigator.online) {
        //send to function to read through database and post
    }
}