
import { Link } from "react-router";
import { Plus, Pencil, Trash2 } from "lucide-react";

function AdminDashboard() {





    
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Admin Dashboard
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage problems on your coding platform.
          </p>
        </div>


        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



          {/* Create */}
          <Link
            to="/admin/create"
            className="group border border-zinc-800 rounded-2xl p-7 
                       bg-zinc-950 hover:bg-zinc-900 
                       hover:border-zinc-600 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-900 
                            flex items-center justify-center mb-6
                            group-hover:bg-white group-hover:text-black
                            transition">
              <Plus size={24} />
            </div>

            <h2 className="text-xl font-semibold">
              Create Problem
            </h2>

            <p className="text-zinc-400 text-sm mt-3 leading-6">
              Add a new coding problem with test cases,
              difficulty, tags and solutions.
            </p>

            <div className="mt-6 text-sm font-medium">
              Create Problem →
            </div>
          </Link>



          {/* Update */}
          <Link
            to="/admin/update"
            className="group border border-zinc-800 rounded-2xl p-7 
                       bg-zinc-950 hover:bg-zinc-900 
                       hover:border-zinc-600 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-900 
                            flex items-center justify-center mb-6
                            group-hover:bg-white group-hover:text-black
                            transition">
              <Pencil size={22} />
            </div>

            <h2 className="text-xl font-semibold">
              Update Problem
            </h2>

            <p className="text-zinc-400 text-sm mt-3 leading-6">
              Edit existing problems, test cases,
              difficulty, tags and solutions.
            </p>

            <div className="mt-6 text-sm font-medium">
              Update Problem →
            </div>
          </Link>



          {/* Delete */}
          <Link
            to="/admin/delete"
            className="group border border-zinc-800 rounded-2xl p-7 
                       bg-zinc-950 hover:bg-zinc-900 
                       hover:border-zinc-600 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-900 
                            flex items-center justify-center mb-6
                            group-hover:bg-white group-hover:text-black
                            transition">
              <Trash2 size={22} />
            </div>

            <h2 className="text-xl font-semibold">
              Delete Problem
            </h2>

            <p className="text-zinc-400 text-sm mt-3 leading-6">
              Remove an existing problem from the
              coding platform.
            </p>

            <div className="mt-6 text-sm font-medium">
              Delete Problem →
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;