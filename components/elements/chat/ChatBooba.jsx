export default function ChatBooba({ message, self }){
    return(
    <>
        <div className={`w-fit max-w-64 h-auto ${self ? "bg-blue-400 dark:bg-blue-500 self-end" : "bg-slate-300 dark:bg-slate-800"} py-2 px-4 rounded-3xl text-lg`}>{message}</div>
    </>
    )
}