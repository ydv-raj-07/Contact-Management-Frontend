import { useEffect, useState } from "react";
import API from "./api";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  // fetch all contacts of logged-in user
  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts/my");
      setContacts(res.data.data);
    } catch (error) {
      console.error("Fetch contacts error", error);
    } finally {
      setLoading(false);
    }
  };

  // add new contact
  const addContact = async () => {
    if (!name) return alert("Name is required");

    try {
      await API.post("/contacts/create", {
        name,
        email,
        phone,
      });

      // clear inputs
      setName("");
      setEmail("");
      setPhone("");

      fetchContacts();
    } catch (error) {
      console.error("Add contact error", error);
    }
  };

  // delete contact
  const deleteContact = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Delete contact error", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="card">
      <h2>My Contacts</h2>

      <button
        style={{
          marginBottom: "15px",
          background: "#ff4d4f",
          color: "white",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer",
        }}
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>



      <input
        placeholder="Contact name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={addContact}>Add Contact</button>

      {loading ? (
        <p>Loading...</p>
      ) : contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <ul>
          {contacts.map((c) => (
            <li key={c._id} style={{ marginTop: "10px" }}>
              <strong>{c.name}</strong>
              <br />
              <small>{c.email}</small>
              <br />
              <small>{c.phone}</small>
              <br />
              <button
                style={{ marginTop: "5px" }}
                onClick={() => deleteContact(c._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
