import StateDispatcher from "./StateDispatcher.js";

export const installationDispatcher = new StateDispatcher();
// installationDispatcher.add(installation => console.log("Installation changed: ", installation));

export const currentElementDispatcher = new StateDispatcher();
// currentElementDispatcher.add(currentElement => console.log("CurrentElement changed: ", currentElement));
