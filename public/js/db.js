const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded = event => {
    const db = event.target.result;

    const BudgetStore = db.createObjectStore("budgetList", {
        keyPath: "listID"
    });
}

request.onsuccess = () => {
    const db = request.result;

    // if online check db and send post it to site
    if (navigator.online) {
        //send to function to read through database and post
        databaseCheck();
    }
}

function databaseCheck() {
    //grab database and store with right permissions
    const transaction = db.transaction(["budgetList"], "readwrite");
    const BudgetStore = transaction.objectStore("budgetList");

    //grab all data in db
    const data = BudgetStore.getAll();

    data.onsuccess = () => {
        //if not empty
        if (data.result.length > 0) {
            //post data
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(data.result),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                //return data to screen
                .then((response) => {
                    return response.json();
                })
                //delete posted data out of cache
                .then(() => {
                    const transaction = db.transaction(["budgetList"], "readwrite");
                    const BudgetStore = transaction.objectStore("budgetList");
                    BudgetStore.clear();
                });
        };
    };
};

//anytime site comes online automatically check & post
window.addEventListener("online", databaseCheck);