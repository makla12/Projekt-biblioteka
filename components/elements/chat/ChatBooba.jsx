export default function ChatBooba({ message, self }){
    return(
    <>
        <div className={`w-fit max-w-64 rounded-3xl  h-auto ${self ? "bg-blue-400 dark:bg-blue-500 self-end rounded-br-sm" : "bg-slate-300 dark:bg-slate-800 rounded-bl-sm"} py-2 px-4  text-lg`}>{message}</div>
    </>
    )
}