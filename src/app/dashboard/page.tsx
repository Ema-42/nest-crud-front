"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [cats, setCats] = useState([]);

  interface Breed {
    id: number;
    name: string;
    deletedAt: string | null;
  }

  interface Cat {
    age: number;
    breed: Breed;
    createdAt: string;
    deletedAt: string | null;
    id: number;
    name: string;
    userEmail: string;
    weight: number;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  const getCats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
      method: "GET",
      headers: {
        "Content-Type": "Aplication/son",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
    setCats(await res.json());
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button className="btn btn-primary" onClick={getCats}>
        Get Cats
      </button>

      <div
        className="container mt-4"
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <h2 className="mb-3 text-center">Tabla de Gatos</h2>
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Peso</th>
              <th>Raza</th>
              <th>Email del Usuario</th>
              <th>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((cat: Cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.age}</td>
                <td>{cat.weight}</td>
                <td>{cat.breed.name}</td>
                <td>{cat.userEmail}</td>
                <td>{new Date(cat.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dashboard;
