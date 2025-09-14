const delay = ms => new Promise(res => setTimeout(res, ms));
const byteSize = str => new Blob([str]).size;

function setLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

function getLocalStorage(name) {
    let value = localStorage.getItem(name);
    if(value == "" || value == null) throw new Error("Data not Found");
    return value;
}

const updateChatHistory = (obj) => {
    let cookieObj = {hist: [...JSON.parse(getLocalStorage("chatHistory")).hist, obj]};

    while(byteSize(JSON.stringify(cookieObj)) > 4000) {
        cookieObj.hist.splice(0, 1);
    }

    setLocalStorage("chatHistory", JSON.stringify(cookieObj));
}

const updateInventory = (obj) => {
    setLocalStorage("inventory", JSON.stringify({inv:[...JSON.parse(getLocalStorage("inventory")).inv, obj]}));
}

const message = (message) => {
    updateChatHistory({message:message, self:false});

    const functionAfter = async ({setChatMessages}) => {
        await delay(500);
        setChatMessages(prev => [...prev, {message:message, self:false}]);
    }
    return [false, [functionAfter]];
};

const goToDialogPath = (path) => {
    setLocalStorage("location", path);
    const functionAfter = async ({setDialogPath}) => {
        setDialogPath(path);
    }
    return [false, [functionAfter]];
};

const giveItem = (item) => {
    updateInventory(item);
    const functionAfter = async ({setInventory}) => {
        setInventory(prev => [...prev, item]);
    }
    return [false, [functionAfter]];
};

const checkInventory = (items, actions) => {
    const inventory = JSON.parse(getLocalStorage("inventory")).inv;
    if (items.every(item => inventory.includes(item))) {
        return [true, executeActions(actions)];
    } else {
        return [false, []];
    }
}

const solvePuzzle = (answer, message, actions) => {
    if(message.trim() === answer) {
        return [false, executeActions(actions.success)];
    } else {
        return [false, executeActions(actions.fail)];
    }
}

const executeActions = (actions, messageInput = null) => {
    let functionsAfter = [];
    for(const action of actions){
        const [breakLoop, functionAfter] = action({messageInput:messageInput});
        functionsAfter = functionsAfter.concat(functionAfter);
        if(breakLoop) break;
    }
    return functionsAfter;
}

export {message, goToDialogPath, giveItem, checkInventory, solvePuzzle, executeActions};