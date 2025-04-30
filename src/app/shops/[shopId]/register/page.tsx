import ShopRegisterForm from "./components/ShopRegisterForm";

export default function MyStoreRegisterPage() {
  return (
    <main className="lg:max-w-[964px] mx-auto mt-[60px] sm:min-mx-[32px]">
      <h1 className="font-bold text-lg text-black">가게 정보</h1>
      <ShopRegisterForm />
    </main>
  );
}
