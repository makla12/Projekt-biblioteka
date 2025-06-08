import { useRef } from "react";

function showAlertBox(alertRef) {
    if (!alertRef.current) return;
    alertRef.current.classList.remove("hidden");
    alertRef.current.classList.add("flex");
}
function hideAlertBox(alertRef) {
    if (!alertRef.current) return;
    alertRef.current.classList.remove("flex");
    alertRef.current.classList.add("hidden");
}

export { showAlertBox };

export default function AlertBox({ onAccept, alertRef }) {
    return (
        <>
            <div
                className="fixed top-0 left-0 w-screen h-screen hidden z-40 justify-center items-center"
                ref={alertRef}
            >
                <div className="w-full h-full backdrop-blur-lg absolute top-0 left-0" onClick={() => hideAlertBox(alertRef)}/>

                <div className="z-50 sm:w-1/2 w-5/6 sm:p-5 p-1 bg-white dark:bg-black border-4 border-dotted border-blue-600 dark:border-white">
                    <h1 className="text-red-700 font-extrabold text-4xl text-center">UWAGA!</h1>
                    <p className="text-lg mt-2 sm:p-0 p-4">Czy na pewno chcesz zacząć historię od nowa?</p>
                    <div className="flex sm:justify-center justify-between items-center sm:gap-5 gap-1 sm:mt-5">
                        <button onClick={onAccept} className="bg-red-600 sm:w-auto w-[49%] px-4 py-2 rounded-lg text-lg uppercase">Usunąć</button>
                        <button onClick={() => hideAlertBox(alertRef)} className="bg-green-600 sm:w-auto w-[49%] px-4 py-2 rounded-lg text-lg uppercase">nie usuwać</button>
                    </div>
                </div>
            </div>
        </>
    )
}
