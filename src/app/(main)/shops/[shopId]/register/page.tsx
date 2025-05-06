import ShopRegisterForm from "./components/ShopRegisterForm";

export default function MyStoreRegisterPage() {
  return (
    <main className="w-full h-screen px-[12px] py-[40px] bg-gray-5 sm:pt-[60px] sm:px-[32px]">
      <div className="w-full max-w-[964px] mx-auto">
        <h1 className="font-bold text-lg text-black">가게 정보</h1>
        <ShopRegisterForm />
      </div>
    </main>
  );
}
