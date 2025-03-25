import db from "@/lib/db";
import { RowDataPacket } from "mysql2";
interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
}
export default async function Userlist() {
  const users = await fetchUsers();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 p-2">{user.id}</td>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

async function fetchUsers() {
  try {
    const [users] = await db.execute<User[]>(
      "SELECT * FROM users WHERE 1 = 1");
    return users;
  } catch (error) {
    console.error("Database connection failed:", error);
    return [];
  }
}
