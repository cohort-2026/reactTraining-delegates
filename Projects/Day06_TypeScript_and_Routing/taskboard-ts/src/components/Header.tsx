import Nav from "./Nav";
import AuthControls from "./AuthControls"
import type { Task } from "../types";

type HeaderProps = {
  tasks: Task[];
};

function Header({ tasks }: HeaderProps) {
  const openCount = tasks.filter((t) => t.status !== "done").length;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold text-gray-900">TaskBoard</h1>
          <Nav />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">
            {openCount} open task{openCount === 1 ? "" : "s"}
          </p>
          <AuthControls />
        </div>
      </div>
    </header>
  );
}

export default Header;