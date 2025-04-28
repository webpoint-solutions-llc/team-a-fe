import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Projects Card */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">12</div>
        </div>

        {/* Documents Card */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">24</div>
        </div>

        {/* Archives Card */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Archives</h2>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">47</div>
        </div>
      </div>
    </div>
  );
}
