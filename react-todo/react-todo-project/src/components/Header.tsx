import { ImCheckmark } from "react-icons/im";

export function Header() {
  return (
    <>
      <header className="container flex items-center justify-center gap-2 mt-4 text-4xl text-primary max-h-[20vh]">
        <h1 className="font-bold ">Todo </h1>
        <span>
          <ImCheckmark className="" />
        </span>
      </header>
    </>
  );
}
