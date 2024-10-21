import Logo from "@/app/components/logox";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black z-50">
            <div className="flex flex-col">
                <Logo width={150} height={42} />
                <p className="text-white text-xl mt-4">Loading...</p>
            </div>
        </div>
    );
}
