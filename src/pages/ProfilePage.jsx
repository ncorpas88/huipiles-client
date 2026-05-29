import { useContext } from "react"

import { AuthContext } from "../context/auth.context"

function ProfilePage() {
  const { user } =
    useContext(AuthContext)

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        Perfil
      </h1>

      <div className="flex flex-col gap-2">
        <p>
          <strong>ID:</strong>{" "}
          {user?._id}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user?.role}
        </p>
      </div>
    </div>
  )
}

export default ProfilePage