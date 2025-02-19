export default function Review({ user, date, rating, review }){
    return(
    <>
        <div className="w-[800px] h-40 bg-[var(--background2)] p-2">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{user}</div>
                    <div className="h-[75%] w-0.5 bg-black" />
                    <div className="text-xl">{date}</div>
                </div>

                <div className="text-xl font-bold">{rating}</div>
            </div>

            <div className="w-full h-0.5 my-2 bg-black" />

            <div>{review}</div>
        </div>
    </>
    );
}