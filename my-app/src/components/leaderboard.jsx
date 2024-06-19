import React, { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, image_url, bio");

        if (error) {
          console.error("Error fetching users:", error);
        } else {
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-ring loading-lg"></span>{" "}
          {/* Bigger loading spinner */}
        </div>
      ) : (
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Bio</th>
              <th>Workouts Completed</th>
              <th>Profile Picture</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      {/* <div className="mask mask-squircle w-12 h-12">
                        {user.image_url ? (
                          <img
                            src={`https://your-supabase-bucket-url/profile_pictures/${user.image_url}`}
                            alt="User Avatar"
                          />
                        ) : (
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt="Default Avatar"
                          />
                        )}
                      </div> */}
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.first_name} {user.last_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.bio}</td>
                <td>{user.workouts ? user.workouts.length : 0}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      {user.image_url ? (
                        <img
                          src={`https://your-supabase-bucket-url/profile_pictures/${user.image_url}`}
                          alt="User Avatar"
                        />
                      ) : (
                        <img
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          alt="Default Avatar"
                        />
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Bio</th>
              <th>Workouts Completed</th>
              <th>Profile Picture</th>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
