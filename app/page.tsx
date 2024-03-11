import Image from "next/image";
import InputFileSelect from "@/app/ui/InputFileSelect";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-between p-6">
        <InputFileSelect />
      </div>
    </main>
  );
}
