function Sidebar({ users, openSidebar, setOpenSidebar, onLogout }) {
  return (
    <div
      className={`
        fixed md:static
        top-0 left-0 h-full
        w-64 bg-gray-800
        flex flex-col
        border-r border-gray-700 p-4
        transform transition-transform duration-300
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        z-50
      `}
    >
      {/* Close button */}
      <div className="md:hidden mb-2 flex justify-end">
        <button
          onClick={() => setOpenSidebar(false)}
          className="text-white text-xl"
        >
          ✕
        </button>
      </div>

      {/* 🔼 TOP CONTENT */}
      <div className="flex-1 text-center">
        <h1 className="font-bold mb-4 text-2xl">Members</h1>

        {users.map((user) => (
          <div
            key={user.id}
            className="text-lg border-t border-b rounded p-2 mb-2 hover:bg-gray-500"
          >
            {user.username}
          </div>
        ))}
      </div>

      {/* 🔽 BOTTOM CONTENT */}
      <div className="text-center">
        <span
          className="text-red-500 font-bold hover:cursor-pointer"
          onClick={onLogout}
        >
          Log Out
        </span>
      </div>
    </div>
  );
}

export default Sidebar;